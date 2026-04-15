/*
 * Design: Casual Study Cafe - Sentence Flashcard viewer
 * Browse all example sentences for a level, filter, search, study with flashcards
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Sentence } from '@/lib/sentences';
import { ArrowLeft, Search, RotateCcw, ChevronLeft, ChevronRight, BookOpen, Volume2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
  sentences: Sentence[];
  levelName: string;
  onBack: () => void;
};

export default function SentenceFlashcard({ sentences, levelName, onBack }: Props) {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [expandedGrammar, setExpandedGrammar] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    if (!search.trim()) return sentences;
    const q = search.toLowerCase();
    return sentences.filter(s =>
      s.korean.includes(q) ||
      s.japanese.includes(q) ||
      s.katakana.includes(q) ||
      s.romanization.includes(q)
    );
  }, [sentences, search]);

  const currentFlashcard = filtered[flashcardIdx];

  const toggleGrammar = (key: string) => {
    setExpandedGrammar(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-warm-beige">
        <div className="container py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-charcoal transition-colors">
              <ArrowLeft className="w-4 h-4" />
              戻る
            </button>
            <h1 className="display-text text-base sm:text-lg font-bold text-charcoal">{levelName} 例文帳</h1>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${viewMode === 'list' ? 'bg-terracotta text-white' : 'bg-warm-beige/50 text-muted-foreground'}`}
              >
                一覧
              </button>
              <button
                onClick={() => { setViewMode('flashcard'); setFlashcardIdx(0); setShowAnswer(false); }}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${viewMode === 'flashcard' ? 'bg-terracotta text-white' : 'bg-warm-beige/50 text-muted-foreground'}`}
              >
                カード
              </button>
            </div>
          </div>
          {viewMode === 'list' && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="例文を検索..."
                className="pl-9 bg-white/80 border-warm-beige"
              />
            </div>
          )}
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="container py-4 sm:py-6">
          <p className="text-xs text-muted-foreground mb-3">{filtered.length}文</p>
          <div className="space-y-2">
            {filtered.map((sentence, i) => (
              <motion.div
                key={`${sentence.korean}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.5) }}
                className="bg-white rounded-xl p-3 sm:p-4 border border-warm-beige shadow-sm"
              >
                {/* Korean sentence */}
                <div className="korean-text text-lg sm:text-xl font-bold text-charcoal mb-1">
                  {sentence.korean}
                </div>

                {/* Japanese translation */}
                <div className="font-medium text-sm sm:text-base text-charcoal mb-1">
                  {sentence.japanese}
                </div>

                {/* Katakana & Romanization badges */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block text-xs bg-warm-beige/50 text-muted-foreground px-2 py-0.5 rounded-full">
                    {sentence.katakana}
                  </span>
                  <span className="inline-block text-xs bg-warm-beige/30 text-muted-foreground/60 mono-text px-2 py-0.5 rounded-full">
                    [{sentence.romanization}]
                  </span>
                </div>

                {/* Words used */}
                {sentence.words.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {sentence.words.map(word => (
                      <span key={word} className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full">
                        {word}
                      </span>
                    ))}
                  </div>
                )}

                {/* Grammar notes (collapsible) */}
                {sentence.grammar && sentence.grammar.length > 0 && (
                  <div className="mt-2">
                    <button
                      onClick={() => toggleGrammar(sentence.korean)}
                      className="flex items-center gap-1.5 text-xs text-violet-600 hover:text-violet-800 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      文法ノート ({sentence.grammar.length})
                      <ChevronRight className={`w-3 h-3 transition-transform ${expandedGrammar[sentence.korean] ? 'rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expandedGrammar[sentence.korean] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 space-y-2">
                            {sentence.grammar.map((note, gi) => (
                              <div key={gi} className="bg-sage/10 rounded-lg p-2.5 text-xs space-y-1">
                                <div>
                                  <span className="text-violet-600 font-bold">{note.particle}</span>
                                  <span className="ml-1.5 text-charcoal">{note.meaning}</span>
                                </div>
                                <div className="text-muted-foreground italic">例: {note.example}</div>
                                {note.difference && (
                                  <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded px-2 py-1 text-xs">
                                    {note.difference}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Pronunciation notes */}
                {sentence.pronunciation && sentence.pronunciation.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {sentence.pronunciation.map((note, pi) => (
                      <div key={pi} className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Volume2 className="w-3 h-3 text-blue-500" />
                          <span className="korean-text text-charcoal">{note.korean}</span>
                          <span className="text-muted-foreground">→</span>
                          <span className={`korean-text ${note.highlighted ? 'text-violet-600 text-sm font-medium' : 'text-charcoal'}`}>
                            {note.reading}
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-0.5 ml-5">{note.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Flashcard mode */
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          {currentFlashcard ? (
            <>
              <p className="text-xs text-muted-foreground mb-4 mono-text">
                {flashcardIdx + 1} / {filtered.length}
              </p>
              <motion.div
                key={flashcardIdx}
                initial={{ opacity: 0, rotateY: -10 }}
                animate={{ opacity: 1, rotateY: 0 }}
                className="w-full max-w-sm"
              >
                <div
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-warm-beige shadow-lg cursor-pointer
                    hover:shadow-xl transition-shadow min-h-[200px] flex flex-col items-center justify-center text-center"
                >
                  <div className="korean-text text-2xl sm:text-3xl font-bold text-charcoal mb-3">
                    {currentFlashcard.korean}
                  </div>
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3 w-full"
                      >
                        <div className="text-lg font-medium text-teal">{currentFlashcard.japanese}</div>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <span>{currentFlashcard.katakana}</span>
                          <span className="mono-text text-xs">[{currentFlashcard.romanization}]</span>
                        </div>

                        {/* Grammar notes in flashcard */}
                        {currentFlashcard.grammar && currentFlashcard.grammar.length > 0 && (
                          <div className="text-left space-y-1.5 mt-2 pt-2 border-t border-warm-beige">
                            {currentFlashcard.grammar.map((note, gi) => (
                              <div key={gi} className="bg-sage/10 rounded-lg p-2 text-xs space-y-0.5">
                                <div>
                                  <span className="text-violet-600 font-bold">{note.particle}</span>
                                  <span className="ml-1.5 text-charcoal">{note.meaning}</span>
                                </div>
                                <div className="text-muted-foreground italic">例: {note.example}</div>
                                {note.difference && (
                                  <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded px-2 py-1 text-xs mt-1">
                                    {note.difference}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Pronunciation notes in flashcard */}
                        {currentFlashcard.pronunciation && currentFlashcard.pronunciation.length > 0 && (
                          <div className="text-left space-y-1.5 mt-1">
                            {currentFlashcard.pronunciation.map((note, pi) => (
                              <div key={pi} className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs">
                                <div className="flex items-center gap-1.5">
                                  <Volume2 className="w-3 h-3 text-blue-500" />
                                  <span className="korean-text text-charcoal">{note.korean}</span>
                                  <span className="text-muted-foreground">→</span>
                                  <span className={`korean-text ${note.highlighted ? 'text-violet-600 text-sm font-medium' : 'text-charcoal'}`}>
                                    {note.reading}
                                  </span>
                                </div>
                                <p className="text-muted-foreground mt-0.5 ml-5">{note.explanation}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!showAnswer && (
                    <p className="text-xs text-muted-foreground/50 mt-4">タップして答えを表示</p>
                  )}
                </div>
              </motion.div>

              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => { setFlashcardIdx(Math.max(0, flashcardIdx - 1)); setShowAnswer(false); }}
                  disabled={flashcardIdx === 0}
                  className="p-2 rounded-full bg-white border border-warm-beige shadow-sm disabled:opacity-30 hover:bg-warm-beige/30 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { setFlashcardIdx(0); setShowAnswer(false); }}
                  className="p-2 rounded-full bg-white border border-warm-beige shadow-sm hover:bg-warm-beige/30 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setFlashcardIdx(Math.min(filtered.length - 1, flashcardIdx + 1)); setShowAnswer(false); }}
                  disabled={flashcardIdx >= filtered.length - 1}
                  className="p-2 rounded-full bg-white border border-warm-beige shadow-sm disabled:opacity-30 hover:bg-warm-beige/30 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">例文がありません</p>
          )}
        </div>
      )}
    </div>
  );
}
