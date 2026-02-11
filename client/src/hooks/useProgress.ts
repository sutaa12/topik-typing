import { useState, useEffect, useCallback } from 'react';

type LevelProgress = {
  correct: number;
  total: number;
  streak: number;
  bestStreak: number;
  masteredWords: string[];
  wrongWords: string[];
  lastPracticed: string | null;
};

type ProgressData = Record<string, LevelProgress>;

const STORAGE_KEY = 'topik-typing-progress';

const defaultProgress: LevelProgress = {
  correct: 0,
  total: 0,
  streak: 0,
  bestStreak: 0,
  masteredWords: [],
  wrongWords: [],
  lastPracticed: null,
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const getLevel = useCallback((level: string): LevelProgress => {
    return progress[level] || { ...defaultProgress };
  }, [progress]);

  const recordAnswer = useCallback((level: string, word: string, correct: boolean) => {
    setProgress(prev => {
      const current = prev[level] || { ...defaultProgress };
      const newStreak = correct ? current.streak + 1 : 0;
      const masteredWords = correct && !current.masteredWords.includes(word)
        ? [...current.masteredWords, word]
        : current.masteredWords;
      const wrongWords = !correct && !current.wrongWords.includes(word)
        ? [...current.wrongWords, word]
        : correct
          ? current.wrongWords.filter(w => w !== word)
          : current.wrongWords;

      return {
        ...prev,
        [level]: {
          correct: current.correct + (correct ? 1 : 0),
          total: current.total + 1,
          streak: newStreak,
          bestStreak: Math.max(current.bestStreak, newStreak),
          masteredWords,
          wrongWords,
          lastPracticed: new Date().toISOString(),
        },
      };
    });
  }, []);

  const resetLevel = useCallback((level: string) => {
    setProgress(prev => {
      const next = { ...prev };
      delete next[level];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setProgress({});
  }, []);

  const getOverallStats = useCallback(() => {
    let totalCorrect = 0;
    let totalAttempts = 0;
    let totalMastered = 0;
    let bestStreak = 0;

    Object.values(progress).forEach(p => {
      totalCorrect += p.correct;
      totalAttempts += p.total;
      totalMastered += p.masteredWords.length;
      bestStreak = Math.max(bestStreak, p.bestStreak);
    });

    return { totalCorrect, totalAttempts, totalMastered, bestStreak };
  }, [progress]);

  return { progress, getLevel, recordAnswer, resetLevel, resetAll, getOverallStats };
}
