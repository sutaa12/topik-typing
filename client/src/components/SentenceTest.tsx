/*
 * Design: Casual Study Cafe - Sentence Typing Test Component
 * Practice mode: shows Korean + Japanese + katakana + romanization
 * Normal mode: shows Japanese only, user types Korean sentence
 * After feedback, displays grammar notes and pronunciation notes
 */
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Sentence } from '@/lib/sentences';
import { shuffleArray } from '@/lib/words';
import {
  type HangulState,
  createInitialState,
  processJamo,
  processBackspace,
  processSpace,
  commitCurrent,
  KEYBOARD_MAP,
} from '@/lib/hangul';
import KoreanKeyboard from './KoreanKeyboard';
import { useProgress } from '@/hooks/useProgress';
import {
  CheckCircle2,
  XCircle,
  SkipForward,
  RotateCcw,
  Flame,
  Eye,
  EyeOff,
  Lightbulb,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type Props = {
  sentences: Sentence[];
  level: string;
  mode: 'practice' | 'normal';
  onBack: () => void;
  sentenceCount?: number;
};

const SUCCESS_IMG = 'https://private-us-east-1.manuscdn.com/sessionFile/p9upPMTuLHgu3rnxkdbiCh/sandbox/cgIeJhSn89sUnP6L9cOwlm-img-5_1770788707000_na1fn_c3VjY2Vzcy1pbGx1c3RyYXRpb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcDl1cFBNVHVMSGd1M3JueGtkYmlDaC9zYW5kYm94L2NnSWVKaFNuODlzVW5QNkw5Y093bG0taW1nLTVfMTc3MDc4ODcwNzAwMF9uYTFmbl9jM1ZqWTJWemN5MXBiR3gxYzNSeVlYUnBiMjQucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qDb1rtZ1AlM~sU2dcyvFqMYkysT~O6Kl8LO6esSxS-oORumXILKvcpalio-lTi8BcQf4RoD4cNtq6UGzJY~uncGQMxqqiQ32wWRc9gcJVx5woWl0zBC1JpCaKFFBwjwM3j9dkRl-llFdL4yR88tNIRSyzaVAbFJZzSU70azZwZLQ4NZHM4KcOQvbJlAVHoL-NBbUPb9LEdlGRxXYscUOlNWWVXCWFfFMcJ8glFDgewT0RwDTPqGzpBgPOp6YQsZkS2XE77gMqjnoZ8tH5iwNIK86-tU5GyQF7deMEUSNlFH2lbDIYmYz7Qxx3D7KghRMu8jUvXNiQrW9LyqoLYu71Q__';

export default function SentenceTest({ sentences, level, mode, onBack, sentenceCount = 5 }: Props) {
  const gameSentences = useMemo(() => shuffleArray(sentences).slice(0, sentenceCount), [sentences, sentenceCount]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hangulState, setHangulState] = useState<HangulState>(createInitialState());
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const { recordAnswer } = useProgress();
  const hangulStateRef = useRef(hangulState);
  const feedbackRef = useRef(feedback);
  const currentIdxRef = useRef(currentIdx);

  // Keep refs in sync
  useEffect(() => { hangulStateRef.current = hangulState; }, [hangulState]);
  useEffect(() => { feedbackRef.current = feedback; }, [feedback]);
  useEffect(() => { currentIdxRef.current = currentIdx; }, [currentIdx]);

  const currentSentence = gameSentences[currentIdx];
  const progressPercent = ((currentIdx) / gameSentences.length) * 100;

  const doSubmit = useCallback(() => {
    if (feedbackRef.current) return;
    const sentence = gameSentences[currentIdxRef.current];
    if (!sentence) return;

    const committed = commitCurrent(hangulStateRef.current);
    const userInput = committed.display.trim();
    const isCorrect = userInput === sentence.korean;

    setFeedback(isCorrect ? 'correct' : 'wrong');
    recordAnswer(level, sentence.korean, isCorrect);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
    }));

    setTimeout(() => {
      if (currentIdxRef.current + 1 >= gameSentences.length) {
        setIsComplete(true);
      } else {
        setCurrentIdx(prev => prev + 1);
        setHangulState(createInitialState());
        setFeedback(null);
        setShowHint(false);
      }
    }, isCorrect ? 2000 : 4000);
  }, [gameSentences, level, recordAnswer]);

  // Physical keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete || feedbackRef.current) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        setHangulState(prev => processBackspace(prev));
      } else if (e.key === ' ') {
        e.preventDefault();
        setHangulState(prev => processSpace(prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        doSubmit();
      } else if (e.key.length === 1) {
        e.preventDefault();
        const key = e.shiftKey ? e.key : e.key.toLowerCase();
        const jamo = KEYBOARD_MAP[key];
        if (jamo) {
          setHangulState(prev => processJamo(prev, jamo));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete, doSubmit]);

  const handleVirtualKeyPress = useCallback((jamo: string) => {
    if (feedback) return;
    setHangulState(prev => processJamo(prev, jamo));
  }, [feedback]);

  const handleVirtualBackspace = useCallback(() => {
    if (feedback) return;
    setHangulState(prev => processBackspace(prev));
  }, [feedback]);

  const handleVirtualSpace = useCallback(() => {
    if (feedback) return;
    setHangulState(prev => processSpace(prev));
  }, [feedback]);

  const handleSkip = useCallback(() => {
    if (feedback) return;
    const sentence = gameSentences[currentIdx];
    if (!sentence) return;
    recordAnswer(level, sentence.korean, false);
    setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));

    if (currentIdx + 1 >= gameSentences.length) {
      setIsComplete(true);
    } else {
      setCurrentIdx(prev => prev + 1);
      setHangulState(createInitialState());
      setShowHint(false);
    }
  }, [feedback, currentIdx, gameSentences, level, recordAnswer]);

  const handleRestart = useCallback(() => {
    setCurrentIdx(0);
    setHangulState(createInitialState());
    setFeedback(null);
    setShowHint(false);
    setScore({ correct: 0, wrong: 0 });
    setIsComplete(false);
  }, []);

  // Completion screen
  if (isComplete) {
    const accuracy = score.correct + score.wrong > 0
      ? Math.round((score.correct / (score.correct + score.wrong)) * 100)
      : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center"
      >
        <img src={SUCCESS_IMG} alt="完了" className="w-32 h-32 sm:w-48 sm:h-48 object-contain mb-4 sm:mb-6" />
        <h2 className="display-text text-2xl sm:text-3xl font-bold text-charcoal mb-2">
          例文練習完了！
        </h2>
        <p className="text-muted-foreground mb-6">お疲れ様でした</p>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 w-full max-w-sm">
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-warm-beige">
            <div className="text-2xl sm:text-3xl font-bold text-terracotta mono-text">{score.correct}</div>
            <div className="text-xs text-muted-foreground mt-1">正解</div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-warm-beige">
            <div className="text-2xl sm:text-3xl font-bold text-coral mono-text">{score.wrong}</div>
            <div className="text-xs text-muted-foreground mt-1">不正解</div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-warm-beige">
            <div className="text-2xl sm:text-3xl font-bold text-teal mono-text">{accuracy}%</div>
            <div className="text-xs text-muted-foreground mt-1">正答率</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleRestart} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" /> もう一度
          </Button>
          <Button onClick={onBack} className="gap-2 bg-terracotta hover:bg-terracotta/90 text-white">
            <ArrowLeft className="w-4 h-4" /> 級選択に戻る
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!currentSentence) return null;

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden">
      {/* Header bar - compact */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white/60 backdrop-blur-sm border-b border-warm-beige flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-charcoal transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">戻る</span>
        </button>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-xs text-muted-foreground hidden sm:inline">例文テスト</span>
          <div className="flex items-center gap-1.5 text-sm">
            <Flame className="w-4 h-4 text-terracotta" />
            <span className="mono-text font-medium">{score.correct}</span>
          </div>
          <div className="text-xs text-muted-foreground mono-text">
            {currentIdx + 1} / {gameSentences.length}
          </div>
        </div>
        <button
          onClick={() => setShowKeyboard(!showKeyboard)}
          className="text-sm text-muted-foreground hover:text-charcoal transition-colors flex items-center gap-1"
        >
          {showKeyboard ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span className="hidden sm:inline">キーボード</span>
        </button>
      </div>

      {/* Progress bar */}
      <Progress value={progressPercent} className="h-1 rounded-none flex-shrink-0" />

      {/* Main content - scrollable area */}
      <div className="flex-1 flex flex-col items-center px-4 py-2 sm:py-4 gap-2 sm:gap-3 min-h-0 overflow-y-auto">
        {/* Sentence display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center space-y-1 sm:space-y-2 w-full max-w-lg"
          >
            {mode === 'practice' ? (
              <>
                <div className="korean-text text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal tracking-wide leading-relaxed">
                  {currentSentence.korean}
                </div>
                <div className="text-sm sm:text-lg text-teal font-medium">
                  {currentSentence.japanese}
                </div>
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                  <span className="bg-warm-beige/60 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                    {currentSentence.katakana}
                  </span>
                  <span className="bg-warm-beige/60 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full mono-text text-[10px] sm:text-xs">
                    [{currentSentence.romanization}]
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="text-lg sm:text-2xl font-bold text-charcoal leading-relaxed">
                  {currentSentence.japanese}
                </div>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap"
                  >
                    <span className="bg-terracotta/10 px-2 py-0.5 rounded-full text-terracotta text-xs">
                      {currentSentence.katakana}
                    </span>
                    <span className="bg-terracotta/10 px-2 py-0.5 rounded-full mono-text text-[10px] text-terracotta">
                      [{currentSentence.romanization}]
                    </span>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Input display */}
        <div
          className={`
            relative w-full max-w-lg mx-auto
            bg-white rounded-xl sm:rounded-2xl border-2 px-4 sm:px-6 py-2.5 sm:py-3.5
            shadow-sm transition-all duration-200
            ${feedback === 'correct'
              ? 'border-sage bg-sage-light/30'
              : feedback === 'wrong'
                ? 'border-coral bg-coral/5'
                : 'border-warm-beige focus-within:border-terracotta/50'
            }
          `}
        >
          <div className="korean-text text-base sm:text-xl lg:text-2xl text-center min-h-[1.8rem] sm:min-h-[2.2rem] flex items-center justify-center">
            {hangulState.display || (
              <span className="text-muted-foreground/40 text-xs sm:text-base">ここに入力...</span>
            )}
            {!feedback && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-5 sm:h-7 bg-terracotta ml-0.5"
              />
            )}
          </div>

          {/* Feedback overlay */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-2.5 -right-2.5"
              >
                {feedback === 'correct' ? (
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-sage drop-shadow-sm" />
                ) : (
                  <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-coral drop-shadow-sm" />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show correct answer on wrong */}
          {feedback === 'wrong' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-1.5 text-xs sm:text-sm text-coral"
            >
              正解: <span className="korean-text font-bold">{currentSentence.korean}</span>
            </motion.div>
          )}
        </div>

        {/* Action buttons */}
        {!feedback && (
          <div className="flex items-center gap-2">
            {mode === 'normal' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(!showHint)}
                className="text-muted-foreground hover:text-terracotta gap-1 h-8 text-xs sm:text-sm"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                ヒント
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-teal gap-1 h-8 text-xs sm:text-sm"
            >
              <SkipForward className="w-3.5 h-3.5" />
              スキップ
            </Button>
          </div>
        )}

        {/* Grammar & Pronunciation Notes - shown after feedback */}
        <AnimatePresence>
          {feedback && (currentSentence.grammar || currentSentence.pronunciation) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full max-w-lg space-y-2 sm:space-y-3 pb-2"
            >
              {/* Grammar notes */}
              {currentSentence.grammar && currentSentence.grammar.length > 0 && (
                <div className="bg-white rounded-xl border border-warm-beige shadow-sm p-3 sm:p-4">
                  <h4 className="text-xs font-semibold text-teal uppercase tracking-wider mb-2">文法ノート</h4>
                  <div className="space-y-2.5">
                    {currentSentence.grammar.map((note, i) => (
                      <div key={i} className="text-xs sm:text-sm space-y-0.5">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="korean-text font-bold text-charcoal text-sm sm:text-base">{note.particle}</span>
                          <span className="text-muted-foreground">{note.meaning}</span>
                        </div>
                        <div className="text-muted-foreground">
                          例: <span className="korean-text">{note.example}</span>
                        </div>
                        <div className="text-terracotta/80 bg-terracotta/5 rounded px-2 py-1 text-xs">
                          {note.difference}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pronunciation notes */}
              {currentSentence.pronunciation && currentSentence.pronunciation.length > 0 && (
                <div className="bg-white rounded-xl border border-warm-beige shadow-sm p-3 sm:p-4">
                  <h4 className="text-xs font-semibold text-teal uppercase tracking-wider mb-2">発音ノート</h4>
                  <div className="space-y-2">
                    {currentSentence.pronunciation.map((note, i) => (
                      <div key={i} className="text-xs sm:text-sm space-y-0.5">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="korean-text font-bold text-charcoal">{note.korean}</span>
                          <span className="text-muted-foreground">→</span>
                          <span className={`korean-text font-medium ${note.highlighted ? 'text-violet-600' : 'text-charcoal'}`}>
                            {note.reading}
                          </span>
                        </div>
                        <div className={`${note.highlighted ? 'text-violet-600' : 'text-muted-foreground'}`}>
                          {note.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Virtual keyboard - fixed to bottom */}
      <AnimatePresence>
        {showKeyboard && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="flex-shrink-0 bg-warm-beige/40 backdrop-blur-sm border-t border-warm-beige px-1 sm:px-2 py-1.5 sm:py-3"
          >
            <KoreanKeyboard
              onKeyPress={handleVirtualKeyPress}
              onBackspace={handleVirtualBackspace}
              onSpace={handleVirtualSpace}
              onEnter={doSubmit}
              disabled={!!feedback}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
