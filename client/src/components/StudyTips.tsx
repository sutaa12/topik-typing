/*
 * Design: Casual Study Cafe - Study Tips & Learning Strategies
 * Warm card-based layout with helpful TOPIK study information
 */
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Brain, Lightbulb, Target, Clock, Layers, Sparkles } from 'lucide-react';

type Props = {
  onBack: () => void;
};

const tips = [
  {
    icon: Brain,
    title: '間隔反復法（SRS）',
    color: 'text-terracotta',
    bg: 'bg-terracotta/5',
    border: 'border-terracotta/20',
    content: '一度覚えた単語を忘れかけた頃に復習すると記憶が定着します。1日後→3日後→1週間後→2週間後→1ヶ月後のサイクルで復習しましょう。このサイトで毎日少しずつ練習するのが効果的です。',
  },
  {
    icon: Layers,
    title: '漢字語を活用する',
    color: 'text-teal',
    bg: 'bg-teal/5',
    border: 'border-teal/20',
    content: '韓国語の約60%は漢字語です。日本語の漢字知識を活かしましょう。例：「図書館」→도서관（ト・ソ・グァン）、「学生」→학생（ハク・セン）。漢字の韓国語読みパターンを覚えると、未知の単語も推測できます。',
  },
  {
    icon: Lightbulb,
    title: 'パッチム（終声）のコツ',
    color: 'text-sage',
    bg: 'bg-sage/5',
    border: 'border-sage/20',
    content: 'パッチムは7つの代表音（ㄱ,ㄴ,ㄷ,ㄹ,ㅁ,ㅂ,ㅇ）に集約されます。例えば ㄳ,ㄺ,ㅋ は全て [ㄱ] と発音。この法則を覚えれば発音が楽になります。',
  },
  {
    icon: Target,
    title: 'TOPIK頻出テーマ別学習',
    color: 'text-terracotta',
    bg: 'bg-terracotta/5',
    border: 'border-terracotta/20',
    content: 'TOPIK試験では「環境」「教育」「経済」「文化」「技術」が頻出テーマです。テーマごとに関連単語をまとめて覚えると、読解問題で文脈から意味を推測しやすくなります。',
  },
  {
    icon: BookOpen,
    title: '語幹と接辞で語彙を増やす',
    color: 'text-teal',
    bg: 'bg-teal/5',
    border: 'border-teal/20',
    content: '接頭辞・接尾辞を覚えると語彙が爆発的に増えます。例：불（不）+ 편하다 = 불편하다（不便だ）、무（無）+ 관심 = 무관심（無関心）。「적」「성」「화」「력」などの漢字接尾辞も重要です。',
  },
  {
    icon: Clock,
    title: '毎日15分の習慣化',
    color: 'text-sage',
    bg: 'bg-sage/5',
    border: 'border-sage/20',
    content: '1日15分でも毎日続けることが大切です。朝の通勤時間や寝る前の15分を活用しましょう。このサイトで10問ずつ練習すれば、1ヶ月で約300単語に触れることができます。',
  },
  {
    icon: Sparkles,
    title: '連想記憶法',
    color: 'text-terracotta',
    bg: 'bg-terracotta/5',
    border: 'border-terracotta/20',
    content: '単語をイメージや物語と結びつけて覚えましょう。例：사랑（サラン＝愛）→「サラン」ラップで愛を歌う、고양이（コヤンイ＝猫）→「こやんい」と鳴く猫をイメージ。面白い連想ほど記憶に残ります。',
  },
];

const examInfo = [
  { level: 'TOPIK I（1-2級）', vocab: '約1,500〜3,000語', desc: '基本的な日常会話レベル。挨拶、買い物、道案内などの場面で使う単語が中心。' },
  { level: 'TOPIK II（3-4級）', vocab: '約3,000〜6,000語', desc: '社会的な話題を理解し、業務で使える中級レベル。新聞記事や簡単な論説文の語彙が必要。' },
  { level: 'TOPIK II（5-6級）', vocab: '約6,000〜10,000語', desc: '専門分野の議論や学術的な文章を理解できる上級レベル。抽象的な概念や専門用語が求められる。' },
];

export default function StudyTips({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-warm-beige">
        <div className="container py-4 flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-charcoal transition-colors">
            <ArrowLeft className="w-4 h-4" />
            戻る
          </button>
          <h1 className="display-text text-lg font-bold text-charcoal">学習のコツ・覚え方</h1>
        </div>
      </div>

      <div className="container py-6 sm:py-8 space-y-8 sm:space-y-10 max-w-3xl">
        {/* TOPIK Exam Info */}
        <section>
          <h2 className="display-text text-xl sm:text-2xl font-bold text-charcoal mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-terracotta" />
            TOPIK級別の必要語彙数
          </h2>
          <div className="space-y-3">
            {examInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-4 sm:p-5 border border-warm-beige shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-charcoal">{info.level}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{info.desc}</p>
                  </div>
                  <span className="mono-text text-sm font-medium text-terracotta whitespace-nowrap bg-terracotta/5 px-3 py-1 rounded-full">
                    {info.vocab}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Study Tips */}
        <section>
          <h2 className="display-text text-xl sm:text-2xl font-bold text-charcoal mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-teal" />
            効果的な学習法
          </h2>
          <div className="space-y-4">
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-xl p-4 sm:p-5 border ${tip.border} ${tip.bg}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${tip.color}`}>
                    <tip.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${tip.color} mb-1.5`}>{tip.title}</h3>
                    <p className="text-sm text-charcoal/80 leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Keyboard Layout Guide */}
        <section>
          <h2 className="display-text text-xl sm:text-2xl font-bold text-charcoal mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sage" />
            2ボル式キーボード配列のコツ
          </h2>
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-warm-beige shadow-sm space-y-4">
            <p className="text-sm text-charcoal/80 leading-relaxed">
              韓国語の標準キーボード（2ボル式）は、<strong>左手で子音</strong>、<strong>右手で母音</strong>を入力する配置になっています。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-terracotta/5 rounded-lg p-3 border border-terracotta/10">
                <h4 className="font-semibold text-terracotta text-sm mb-2">左手（子音）</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Q=ㅂ W=ㅈ E=ㄷ R=ㄱ T=ㅅ<br />
                  A=ㅁ S=ㄴ D=ㅇ F=ㄹ G=ㅎ<br />
                  Z=ㅋ X=ㅌ C=ㅊ V=ㅍ
                </p>
              </div>
              <div className="bg-teal/5 rounded-lg p-3 border border-teal/10">
                <h4 className="font-semibold text-teal text-sm mb-2">右手（母音）</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Y=ㅛ U=ㅕ I=ㅑ O=ㅐ P=ㅔ<br />
                  H=ㅗ J=ㅓ K=ㅏ L=ㅣ<br />
                  B=ㅜ N=ㅡ
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Shiftキーで濃音（ㄲ,ㄸ,ㅃ,ㅆ,ㅉ）と複合母音（ㅒ,ㅖ）を入力できます。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
