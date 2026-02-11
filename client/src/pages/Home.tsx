/*
 * Design: Casual Study Cafe
 * Color: warm beige base, terracotta primary, teal accent, sage success
 * Typography: Zen Maru Gothic (display), Noto Sans JP/KR (body), DM Mono (numbers)
 * Layout: asymmetric cards, generous whitespace, soft shadows
 */
import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getWordsForLevel,
  getWordCount,
  getAllLevels,
  levelNames,
  levelDescriptions,
  levelColors,
} from '@/lib/words';
import { useProgress } from '@/hooks/useProgress';
import TypingGame from '@/components/TypingGame';
import StudyTips from '@/components/StudyTips';
import WordList from '@/components/WordList';
import {
  BookOpen,
  Keyboard,
  Lightbulb,
  Trophy,
  Flame,
  Star,
  GraduationCap,
  ChevronRight,
  Sparkles,
  ListChecks,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const HERO_IMG = 'https://private-us-east-1.manuscdn.com/sessionFile/p9upPMTuLHgu3rnxkdbiCh/sandbox/cgIeJhSn89sUnP6L9cOwlm-img-1_1770788706000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcDl1cFBNVHVMSGd1M3JueGtkYmlDaC9zYW5kYm94L2NnSWVKaFNuODlzVW5QNkw5Y093bG0taW1nLTFfMTc3MDc4ODcwNjAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=kld~3I~vmrmywmj5~Gp1TFW9qExflTGP76MfvB8QbfJ3U6XlfT9r3iN6S~EzKuW2AKfC0os-lmpqzjphUEL8z51ZCp66LbTNLBIZ7to9KgRbTo5oPtkR5cm5PEeAHgskeAFudrZ6SoR~XFfi4MAOIPIjjJzk2~npzBhXKggcTnoUYo0tvqxjRFtdcbxwu7cZhhVkU9ddMOzORXI1UZVUxsTc-r3pqKC0oOjeC-gnBLFsa-j5yzgX737aABCaWRxILfrB2myNoH5IbwcXrOLy7ksw7ojjya9donSoSE2mkpcegPrMo7OtL5wCPPMO7gkObo9kkWgD7pjySZYkm~6C7A__';

type View = 'home' | 'level-select' | 'mode-select' | 'game' | 'tips' | 'wordlist' | 'review';

const levelEmojis: Record<string, string> = {
  "1": "🌸", "2": "🌊", "3": "🍂", "4": "🎋", "5": "🏔️", "6": "🏯",
};

export default function Home() {
  const [view, setView] = useState<View>('home');
  const [selectedLevel, setSelectedLevel] = useState<string>('1');
  const [gameMode, setGameMode] = useState<'practice' | 'normal'>('practice');
  const [wordCount, setWordCount] = useState(10);
  const { getLevel, getOverallStats } = useProgress();
  const stats = getOverallStats();

  const words = useMemo(() => getWordsForLevel(selectedLevel), [selectedLevel]);

  // Collect wrong words across all levels for review
  const wrongWordsForReview = useMemo(() => {
    const allWrong: Word[] = [];
    getAllLevels().forEach(lvl => {
      const lvlProgress = getLevel(lvl);
      if (lvlProgress.wrongWords.length > 0) {
        const lvlWords = getWordsForLevel(lvl);
        lvlProgress.wrongWords.forEach(wk => {
          const found = lvlWords.find(w => w.korean === wk);
          if (found) allWrong.push(found);
        });
      }
    });
    return allWrong;
  }, [getLevel]);

  type Word = ReturnType<typeof getWordsForLevel>[number];

  // Study Tips view
  if (view === 'tips') {
    return <StudyTips onBack={() => setView('home')} />;
  }

  // Review wrong words
  if (view === 'review' && wrongWordsForReview.length > 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <TypingGame
          words={wrongWordsForReview}
          level="review"
          mode="practice"
          onBack={() => setView('home')}
          wordCount={Math.min(20, wrongWordsForReview.length)}
        />
      </div>
    );
  }

  // Word List view
  if (view === 'wordlist') {
    return (
      <WordList
        words={words}
        levelName={levelNames[selectedLevel]}
        onBack={() => setView('level-select')}
      />
    );
  }

  // Game view
  if (view === 'game') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <TypingGame
          words={words}
          level={selectedLevel}
          mode={gameMode}
          onBack={() => setView('mode-select')}
          wordCount={wordCount}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Hero Section */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={HERO_IMG}
                  alt=""
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
              </div>

              <div className="relative container pt-12 sm:pt-16 pb-8 sm:pb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-lg"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="korean-text text-sm font-medium text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
                      한국어 학습
                    </span>
                  </div>
                  <h1 className="display-text text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-3">
                    TOPIK単語
                    <br />
                    <span className="text-terracotta">タイピング練習</span>
                  </h1>
                  <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed max-w-md">
                    韓国語能力試験（TOPIK）の頻出単語を、タイピングしながら楽しく覚えましょう。
                    初級から6級まで段階的に学習できます。
                  </p>
                </motion.div>

                {/* Quick stats */}
                {stats.totalAttempts > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 flex gap-3 sm:gap-4 flex-wrap"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-warm-beige shadow-sm flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-terracotta" />
                      <div>
                        <div className="mono-text text-lg font-bold text-charcoal">{stats.totalMastered}</div>
                        <div className="text-[10px] text-muted-foreground">習得単語</div>
                      </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-warm-beige shadow-sm flex items-center gap-2">
                      <Flame className="w-4 h-4 text-coral" />
                      <div>
                        <div className="mono-text text-lg font-bold text-charcoal">{stats.bestStreak}</div>
                        <div className="text-[10px] text-muted-foreground">最高連続</div>
                      </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-warm-beige shadow-sm flex items-center gap-2">
                      <Star className="w-4 h-4 text-teal" />
                      <div>
                        <div className="mono-text text-lg font-bold text-charcoal">
                          {stats.totalAttempts > 0 ? Math.round((stats.totalCorrect / stats.totalAttempts) * 100) : 0}%
                        </div>
                        <div className="text-[10px] text-muted-foreground">正答率</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Main Actions */}
            <div className="container py-6 sm:py-8 space-y-6">
              {/* Start Practice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={() => setView('level-select')}
                  className="w-full group bg-white rounded-2xl p-5 sm:p-6 border border-warm-beige shadow-sm
                    hover:shadow-lg hover:border-terracotta/30 transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                      <Keyboard className="w-6 h-6 sm:w-7 sm:h-7 text-terracotta" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="display-text text-lg sm:text-xl font-bold text-charcoal group-hover:text-terracotta transition-colors">
                        タイピング練習を始める
                      </h2>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        級を選んで韓国語をタイピングしよう
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              </motion.div>

              {/* Review wrong words button */}
              {wrongWordsForReview.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <button
                    onClick={() => setView('review')}
                    className="w-full group bg-coral/5 rounded-2xl p-4 sm:p-5 border border-coral/20 shadow-sm
                      hover:shadow-lg hover:border-coral/40 transition-all duration-300 text-left"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                        <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-coral" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="display-text text-base sm:text-lg font-bold text-charcoal group-hover:text-coral transition-colors">
                          間違えた単語を復習
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {wrongWordsForReview.length}語の復習が必要です
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-coral group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                </motion.div>
              )}

              {/* Secondary actions grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setView('tips')}
                  className="group bg-white rounded-2xl p-4 sm:p-5 border border-warm-beige shadow-sm
                    hover:shadow-lg hover:border-teal/30 transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal group-hover:text-teal transition-colors">学習のコツ</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">効果的な覚え方・試験対策</p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => setView('level-select')}
                  className="group bg-white rounded-2xl p-4 sm:p-5 border border-warm-beige shadow-sm
                    hover:shadow-lg hover:border-sage/30 transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-sage" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal group-hover:text-sage transition-colors">単語帳</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">級別の単語一覧・フラッシュカード</p>
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-warm-beige/30 rounded-2xl p-5 sm:p-6 border border-warm-beige/50"
              >
                <h3 className="display-text font-bold text-charcoal mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-terracotta" />
                  このサイトの特徴
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: Keyboard, text: '韓国語仮想キーボード（2ボル式）', color: 'text-terracotta' },
                    { icon: GraduationCap, text: 'TOPIK 1級〜6級対応', color: 'text-teal' },
                    { icon: ListChecks, text: '練習モード＆通常モード', color: 'text-sage' },
                    { icon: Trophy, text: '学習進捗の記録・統計', color: 'text-terracotta' },
                    { icon: BookOpen, text: '発音記号・カタカナ読み付き', color: 'text-teal' },
                    { icon: Lightbulb, text: '試験対策の学習ヒント', color: 'text-sage' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <f.icon className={`w-4 h-4 ${f.color} flex-shrink-0`} />
                      <span className="text-sm text-charcoal/80">{f.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <footer className="container py-6 border-t border-warm-beige/50">
              <p className="text-xs text-center text-muted-foreground/60">
                TOPIK単語タイピング練習 — 韓国語能力試験対策
              </p>
            </footer>
          </motion.div>
        )}

        {view === 'level-select' && (
          <motion.div
            key="level-select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-warm-beige">
              <div className="container py-4 flex items-center gap-3">
                <button onClick={() => setView('home')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-charcoal transition-colors">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  ホーム
                </button>
                <h1 className="display-text text-lg font-bold text-charcoal">級を選択</h1>
              </div>
            </div>

            <div className="container py-6 sm:py-8 space-y-3 sm:space-y-4 max-w-2xl">
              {getAllLevels().map((level, i) => {
                const colors = levelColors[level];
                const count = getWordCount(level);
                const progress = getLevel(level);
                const masteredPercent = count > 0 ? Math.round((progress.masteredWords.length / count) * 100) : 0;

                return (
                  <motion.div
                    key={level}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <button
                      onClick={() => { setSelectedLevel(level); setView('mode-select'); }}
                      className={`w-full text-left bg-white rounded-2xl p-4 sm:p-5 border ${colors.border} shadow-sm
                        hover:shadow-lg transition-all duration-300 group`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 text-2xl`}>
                          {levelEmojis[level]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className={`font-bold ${colors.text} text-base sm:text-lg`}>
                              {levelNames[level]}
                            </h3>
                            <span className="mono-text text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                              {count}語
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                            {levelDescriptions[level]}
                          </p>
                          {progress.total > 0 && (
                            <div className="mt-2.5">
                              <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                                <span>習得: {progress.masteredWords.length}/{count}</span>
                                <span>{masteredPercent}%</span>
                              </div>
                              <Progress value={masteredPercent} className="h-1.5" />
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-terracotta group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {view === 'mode-select' && (
          <motion.div
            key="mode-select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-warm-beige">
              <div className="container py-4 flex items-center gap-3">
                <button onClick={() => setView('level-select')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-charcoal transition-colors">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  級選択
                </button>
                <h1 className="display-text text-lg font-bold text-charcoal">
                  {levelNames[selectedLevel]}
                </h1>
              </div>
            </div>

            <div className="container py-6 sm:py-8 max-w-lg space-y-6">
              {/* Mode selection */}
              <div className="space-y-3">
                <h2 className="display-text font-bold text-charcoal text-lg">モードを選択</h2>

                <button
                  onClick={() => { setGameMode('practice'); }}
                  className={`w-full text-left rounded-2xl p-5 border-2 transition-all duration-200 ${
                    gameMode === 'practice'
                      ? 'border-terracotta bg-terracotta/5 shadow-md'
                      : 'border-warm-beige bg-white hover:border-terracotta/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BookOpen className="w-5 h-5 text-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal">練習モード</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        韓国語・日本語訳・カタカナ読み・発音記号を全て表示。
                        見ながらタイピングして覚えます。
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => { setGameMode('normal'); }}
                  className={`w-full text-left rounded-2xl p-5 border-2 transition-all duration-200 ${
                    gameMode === 'normal'
                      ? 'border-teal bg-teal/5 shadow-md'
                      : 'border-warm-beige bg-white hover:border-teal/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <GraduationCap className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal">通常モード</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        日本語訳のみ表示。韓国語を推測してタイピング。
                        ヒント機能あり。
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Word count */}
              <div>
                <h2 className="display-text font-bold text-charcoal text-lg mb-3">出題数</h2>
                <div className="flex gap-2 flex-wrap">
                  {[5, 10, 20, 30, 50].map(n => (
                    <button
                      key={n}
                      onClick={() => setWordCount(Math.min(n, getWordCount(selectedLevel)))}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        wordCount === Math.min(n, getWordCount(selectedLevel))
                          ? 'bg-terracotta text-white shadow-md'
                          : 'bg-white border border-warm-beige text-charcoal hover:bg-warm-beige/30'
                      } ${n > getWordCount(selectedLevel) ? 'opacity-40 cursor-not-allowed' : ''}`}
                      disabled={n > getWordCount(selectedLevel)}
                    >
                      {n}問
                    </button>
                  ))}
                </div>
              </div>

              {/* Start button */}
              <Button
                onClick={() => setView('game')}
                size="lg"
                className="w-full h-14 text-lg font-bold bg-terracotta hover:bg-terracotta/90 shadow-lg hover:shadow-xl transition-all rounded-2xl"
              >
                <Keyboard className="w-5 h-5 mr-2" />
                スタート
              </Button>

              {/* Word list link */}
              <button
                onClick={() => setView('wordlist')}
                className="w-full text-center text-sm text-muted-foreground hover:text-teal transition-colors flex items-center justify-center gap-1.5"
              >
                <ListChecks className="w-4 h-4" />
                この級の単語一覧を見る
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
