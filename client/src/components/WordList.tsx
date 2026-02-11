/*
 * Design: Casual Study Cafe - Word List / Flashcard viewer
 * Browse all words for a level, filter, search
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Word } from '@/lib/words';
import { ArrowLeft, Search, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
  words: Word[];
  levelName: string;
  onBack: () => void;
};

export default function WordList({ words, levelName, onBack }: Props) {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return words;
    const q = search.toLowerCase();
    return words.filter(w =>
      w.korean.includes(q) ||
      w.japanese.includes(q) ||
      w.katakana.includes(q) ||
      w.romanization.includes(q)
    );
  }, [words, search]);

  const currentFlashcard = filtered[flashcardIdx];

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
            <h1 className="display-text text-base sm:text-lg font-bold text-charcoal">{levelName} 単語帳</h1>
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
                placeholder="単語を検索..."
                className="pl-9 bg-white/80 border-warm-beige"
              />
            </div>
          )}
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="container py-4 sm:py-6">
          <p className="text-xs text-muted-foreground mb-3">{filtered.length}語</p>
          <div className="space-y-2">
            {filtered.map((word, i) => (
              <motion.div
                key={word.korean}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.5) }}
                className="bg-white rounded-xl p-3 sm:p-4 border border-warm-beige shadow-sm flex items-center gap-3 sm:gap-4"
              >
                <div className="korean-text text-xl sm:text-2xl font-bold text-charcoal min-w-[4rem] sm:min-w-[5rem]">
                  {word.korean}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm sm:text-base text-charcoal truncate">{word.japanese}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{word.katakana}</span>
                    <span className="text-xs text-muted-foreground/60 mono-text">[{word.romanization}]</span>
                  </div>
                </div>
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
                  <div className="korean-text text-3xl sm:text-4xl font-bold text-charcoal mb-3">
                    {currentFlashcard.korean}
                  </div>
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-2"
                      >
                        <div className="text-xl font-medium text-teal">{currentFlashcard.japanese}</div>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <span>{currentFlashcard.katakana}</span>
                          <span className="mono-text text-xs">[{currentFlashcard.romanization}]</span>
                        </div>
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
            <p className="text-muted-foreground">単語がありません</p>
          )}
        </div>
      )}
    </div>
  );
}
