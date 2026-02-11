/*
 * Design: Casual Study Cafe - Korean Virtual Keyboard (2-beolsik)
 * Warm beige keys, terracotta accents, soft shadows
 * Responsive: compact on mobile, full on desktop
 * Fixed to bottom of screen in game view
 */
import { useState, useCallback } from 'react';
import { KEYBOARD_LAYOUT } from '@/lib/hangul';
import { motion } from 'framer-motion';
import { Delete, ArrowBigUp } from 'lucide-react';

type Props = {
  onKeyPress: (jamo: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onEnter: () => void;
  activeKeys?: Set<string>;
  disabled?: boolean;
};

export default function KoreanKeyboard({ onKeyPress, onBackspace, onSpace, onEnter, activeKeys, disabled }: Props) {
  const [isShift, setIsShift] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handleKeyClick = useCallback((key: { key: string; jamo: string; shift: string }) => {
    if (disabled) return;
    const jamo = isShift && key.shift ? key.shift : key.jamo;
    onKeyPress(jamo);
    setPressedKey(key.key);
    setTimeout(() => setPressedKey(null), 150);
    if (isShift) setIsShift(false);
  }, [isShift, onKeyPress, disabled]);

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      <div className="space-y-[3px] sm:space-y-1.5">
        {KEYBOARD_LAYOUT.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex justify-center gap-[2px] sm:gap-1"
            style={{ paddingLeft: rowIdx === 1 ? '2%' : rowIdx === 2 ? '0' : 0 }}
          >
            {rowIdx === 2 && (
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsShift(!isShift)}
                disabled={disabled}
                className={`
                  flex items-center justify-center rounded-md sm:rounded-lg text-xs font-medium
                  h-[36px] sm:h-11 w-[36px] sm:w-12
                  transition-all duration-150
                  ${isShift
                    ? 'bg-terracotta text-white shadow-md'
                    : 'bg-white/80 text-charcoal border border-warm-beige shadow-sm hover:bg-warm-beige/50'
                  }
                  disabled:opacity-40
                `}
              >
                <ArrowBigUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            )}
            {row.map((key) => {
              const isActive = activeKeys?.has(key.key);
              const isPressed = pressedKey === key.key;
              const displayJamo = isShift && key.shift ? key.shift : key.jamo;

              return (
                <motion.button
                  key={key.key}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleKeyClick(key)}
                  disabled={disabled}
                  className={`
                    relative flex flex-col items-center justify-center rounded-md sm:rounded-lg
                    h-[36px] sm:h-11 flex-1 max-w-[34px] sm:max-w-12
                    transition-all duration-150
                    ${isActive
                      ? 'bg-terracotta/20 border-2 border-terracotta text-terracotta shadow-md'
                      : isPressed
                        ? 'bg-warm-beige border border-terracotta/30 shadow-inner'
                        : 'bg-white/90 border border-warm-beige/80 shadow-sm hover:bg-warm-beige/40 hover:shadow-md active:bg-warm-beige'
                    }
                    disabled:opacity-40 disabled:hover:bg-white/90
                  `}
                >
                  <span className="korean-text text-[13px] sm:text-lg font-medium leading-none">
                    {displayJamo}
                  </span>
                  <span className="text-[6px] sm:text-[9px] text-muted-foreground/50 leading-none mt-px uppercase hidden sm:block">
                    {key.key}
                  </span>
                </motion.button>
              );
            })}
            {rowIdx === 2 && (
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => { if (!disabled) onBackspace(); }}
                disabled={disabled}
                className="flex items-center justify-center rounded-md sm:rounded-lg text-xs font-medium
                  h-[36px] sm:h-11 w-[36px] sm:w-12
                  bg-white/80 text-charcoal border border-warm-beige shadow-sm
                  hover:bg-coral/10 hover:border-coral/30 active:bg-coral/20
                  transition-all duration-150
                  disabled:opacity-40"
              >
                <Delete className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            )}
          </div>
        ))}
        {/* Space bar and Enter row */}
        <div className="flex justify-center gap-[3px] sm:gap-1.5 pt-0.5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { if (!disabled) onSpace(); }}
            disabled={disabled}
            className="flex items-center justify-center rounded-md sm:rounded-lg text-[11px] sm:text-sm
              h-[36px] sm:h-11 flex-1 max-w-[180px] sm:max-w-xs
              bg-white/90 border border-warm-beige shadow-sm
              hover:bg-warm-beige/40 hover:shadow-md active:bg-warm-beige
              transition-all duration-150
              disabled:opacity-40"
          >
            スペース
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => { if (!disabled) onEnter(); }}
            disabled={disabled}
            className="flex items-center justify-center rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold
              h-[36px] sm:h-11 w-14 sm:w-24
              bg-terracotta text-white shadow-md
              hover:bg-terracotta/90 hover:shadow-lg active:bg-terracotta/80
              transition-all duration-150
              disabled:opacity-40"
          >
            確定
          </motion.button>
        </div>
      </div>
    </div>
  );
}
