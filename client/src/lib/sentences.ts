// TOPIK Example Sentence Data
// Each sentence uses vocabulary from the corresponding level in words.ts

export type GrammarNote = {
  particle: string;
  meaning: string;
  example: string;
  difference: string;
};

export type PronunciationNote = {
  korean: string;
  reading: string;
  explanation: string;
  highlighted?: boolean;
};

export type Sentence = {
  korean: string;
  japanese: string;
  katakana: string;
  romanization: string;
  words: string[];
  level: number;
  grammar?: GrammarNote[];
  pronunciation?: PronunciationNote[];
};

export type SentenceRaw = {
  korean: string;
  japanese: string;
  katakana: string;
  romanization: string;
  words: string[];
  grammar?: GrammarNote[];
  pronunciation?: PronunciationNote[];
};

const sentencesData: Record<string, SentenceRaw[]> = {
  "1": [
    {
      korean: "가게에서 과일을 샀어요.",
      japanese: "店で果物を買いました。",
      katakana: "カゲエソ クァイルル サッソヨ",
      romanization: "gageeseo gwaireul sasseoyo",
      words: ["가게", "과일"],
      grammar: [
        { particle: "에서", meaning: "～で（動作の場所）", example: "학교에서 공부해요", difference: "日本語の「で」に相当するが、動作が行われる場所にのみ使う。存在の場所には「에」を使う" },
        { particle: "을/를", meaning: "～を（目的語）", example: "물을 마셔요", difference: "日本語の「を」とほぼ同じだが、パッチムの有無で을/를を使い分ける" },
      ],
      pronunciation: [
        { korean: "가게에서", reading: "가게에서", explanation: "에서は場所を表す助詞で、そのまま読む", highlighted: false },
      ],
    },
    {
      korean: "강아지가 귀여워요.",
      japanese: "子犬がかわいいです。",
      katakana: "カンアジガ クィヨウォヨ",
      romanization: "gangajiga gwiyeowoyo",
      words: ["강아지"],
      grammar: [
        { particle: "이/가", meaning: "～が（主語）", example: "날씨가 좋아요", difference: "日本語の「が」に相当。パッチムありなら이、なしなら가を使う" },
      ],
    },
    {
      korean: "내일 날씨가 좋아요.",
      japanese: "明日天気がいいです。",
      katakana: "ネイル ナルッシガ チョアヨ",
      romanization: "naeil nalssiga joayo",
      words: ["내일", "날씨"],
      pronunciation: [
        { korean: "날씨", reading: "날씨", explanation: "ㅆは濃音。日本語にない強い「ッシ」の発音", highlighted: true },
      ],
    },
    {
      korean: "학교에서 한국어를 공부해요.",
      japanese: "学校で韓国語を勉強します。",
      katakana: "ハッキョエソ ハングゴルル コンブヘヨ",
      romanization: "hakgyoeso hangugoreul gongbuhaeyo",
      words: ["학교", "한국어", "공부"],
      grammar: [
        { particle: "에서", meaning: "～で（動作の場所）", example: "도서관에서 책을 읽어요", difference: "動作が行われる場所を表す。日本語の「で」に近い" },
      ],
      pronunciation: [
        { korean: "학교", reading: "학꾜", explanation: "경음화（硬音化）：ㄱの後のㄱがㄲに変わる → [학꾜]", highlighted: true },
        { korean: "한국어", reading: "한구거", explanation: "연음법칙（連音法則）：パッチムが次の母音に移る → [한구거]", highlighted: true },
      ],
    },
    {
      korean: "도서관에서 책을 읽어요.",
      japanese: "図書館で本を読みます。",
      katakana: "トソグァネソ チェグル イルゴヨ",
      romanization: "doseogwaneseo chaegeul ilgeoyo",
      words: ["도서관", "책"],
      pronunciation: [
        { korean: "읽어요", reading: "일거요", explanation: "ㄹㄱパッチムの後に母音が来ると、ㄱが連音化する → [일거요]", highlighted: true },
      ],
    },
    {
      korean: "식당에서 김치와 밥을 먹었어요.",
      japanese: "食堂でキムチとご飯を食べました。",
      katakana: "シクタンエソ キムチワ パブル モゴッソヨ",
      romanization: "sikdangeseo gimchiwa babeul meogeosseoyo",
      words: ["식당", "김치", "밥"],
      grammar: [
        { particle: "와/과", meaning: "～と（並列）", example: "사과와 귤을 샀어요", difference: "日本語の「と」に相当。パッチムなしなら와、ありなら과を使う" },
      ],
      pronunciation: [
        { korean: "식당", reading: "식땅", explanation: "경음화：ㄱの後のㄷがㄸに変わる → [식땅]", highlighted: true },
      ],
    },
    {
      korean: "공원에서 운동을 해요.",
      japanese: "公園で運動をします。",
      katakana: "コンウォネソ ウンドンウル ヘヨ",
      romanization: "gongwoneseo undongeul haeyo",
      words: ["공원", "운동"],
    },
    {
      korean: "버스로 학교에 가요.",
      japanese: "バスで学校に行きます。",
      katakana: "ポスロ ハッキョエ カヨ",
      romanization: "beoseuro hakgyoe gayo",
      words: ["버스", "학교"],
      grammar: [
        { particle: "-(으)로", meaning: "～で（手段）", example: "지하철로 가요", difference: "手段・方法を表す。日本語の「で」に近いが、方向を表すこともある" },
        { particle: "에", meaning: "～に（方向・時間）", example: "집에 가요", difference: "方向や時間を表す。日本語の「に」に相当" },
      ],
    },
    {
      korean: "아침에 우유를 마셔요.",
      japanese: "朝に牛乳を飲みます。",
      katakana: "アチメ ウユルル マショヨ",
      romanization: "achime uyureul masyeoyo",
      words: ["아침", "우유"],
      grammar: [
        { particle: "에", meaning: "～に（時間）", example: "오후에 운동해요", difference: "時間を表す「に」。日本語とほぼ同じ使い方" },
      ],
    },
    {
      korean: "친구와 영화를 봤어요.",
      japanese: "友達と映画を見ました。",
      katakana: "チングワ ヨンファルル パッソヨ",
      romanization: "chinguwa yeonghwareul bwasseoyo",
      words: ["영화"],
      grammar: [
        { particle: "와/과", meaning: "～と（一緒に）", example: "가족과 여행을 가요", difference: "日本語の「と」と同様に人と一緒に行動する意味で使う" },
      ],
    },
    {
      korean: "지하철 역이 집에서 가까워요.",
      japanese: "地下鉄の駅が家から近いです。",
      katakana: "チハチョル ヨギ チベソ カッカウォヨ",
      romanization: "jihacheol yeogi jibeseo gakkawoyo",
      words: ["지하철", "역", "집"],
      grammar: [
        { particle: "에서", meaning: "～から（出発点）", example: "서울에서 부산까지", difference: "「에서」は場所だけでなく、出発点「～から」の意味もある" },
      ],
    },
    {
      korean: "생일에 케이크를 먹어요.",
      japanese: "誕生日にケーキを食べます。",
      katakana: "センイレ ケイクルル モゴヨ",
      romanization: "saengire keikereul meogeoyo",
      words: ["생일"],
    },
    {
      korean: "오후에 카페에서 커피를 마셨어요.",
      japanese: "午後にカフェでコーヒーを飲みました。",
      katakana: "オフエ カペエソ コピルル マショッソヨ",
      romanization: "ohue kapeeseo keopireul masyeosseoyo",
      words: ["오후", "카페"],
    },
    {
      korean: "방에서 음악을 들어요.",
      japanese: "部屋で音楽を聴きます。",
      katakana: "パンエソ ウマグル トゥロヨ",
      romanization: "bangeseo eumageul deureoyo",
      words: ["방", "음악"],
      pronunciation: [
        { korean: "음악", reading: "으막", explanation: "연음법칙：ㅁパッチムが次の母音に連音化 → [으막]", highlighted: true },
      ],
    },
    {
      korean: "주말에 가족과 산에 갔어요.",
      japanese: "週末に家族と山に行きました。",
      katakana: "チュマレ カジョクグァ サネ カッソヨ",
      romanization: "jumare gajokgwa sane gasseoyo",
      words: ["주말", "가족", "산"],
    },
    {
      korean: "병원에서 의사를 만났어요.",
      japanese: "病院で医者に会いました。",
      katakana: "ピョンウォネソ ウィサルル マンナッソヨ",
      romanization: "byeongwoneseo uisareul mannasseoyo",
      words: ["병원", "의사"],
      pronunciation: [
        { korean: "만났어요", reading: "만나써요", explanation: "ㄴパッチム+ㄴは連音せず、ㅆは濃音で強く発音", highlighted: false },
      ],
    },
    {
      korean: "시장에서 생선과 고기를 샀어요.",
      japanese: "市場で魚と肉を買いました。",
      katakana: "シジャンエソ センソングァ コギルル サッソヨ",
      romanization: "sijangeseo saengseongwa gogireul sasseoyo",
      words: ["시장", "생선", "고기"],
    },
    {
      korean: "겨울에 눈이 많이 와요.",
      japanese: "冬に雪がたくさん降ります。",
      katakana: "キョウレ ヌニ マニ ワヨ",
      romanization: "gyeoure nuni mani wayo",
      words: ["겨울", "눈"],
      pronunciation: [
        { korean: "눈이", reading: "누니", explanation: "연음법칙：ㄴパッチムが次の이に連音化 → [누니]", highlighted: false },
      ],
    },
    {
      korean: "택시로 공항에 갔어요.",
      japanese: "タクシーで空港に行きました。",
      katakana: "テクシロ コンハンエ カッソヨ",
      romanization: "taeksiro gonghange gasseoyo",
      words: ["택시", "공항"],
      pronunciation: [
        { korean: "공항", reading: "공항", explanation: "ㅎは弱く発音されることがあるが、ここではそのまま", highlighted: false },
      ],
    },
    {
      korean: "편의점에서 빵과 주스를 샀어요.",
      japanese: "コンビニでパンとジュースを買いました。",
      katakana: "ピョニジョメソ ッパングァ チュスルル サッソヨ",
      romanization: "pyeonuijeomeseo ppanggwa jusureul sasseoyo",
      words: ["편의점", "빵", "주스"],
      pronunciation: [
        { korean: "빵", reading: "빵", explanation: "ㅃは濃音。唇を強く閉じてから発音する", highlighted: true },
      ],
    },
    {
      korean: "선생님이 교실에 계세요.",
      japanese: "先生が教室にいらっしゃいます。",
      katakana: "ソンセンニミ キョシレ ケセヨ",
      romanization: "seonsaengnimi gyosire gyeseyo",
      words: ["선생님", "교실"],
      pronunciation: [
        { korean: "선생님이", reading: "선생니미", explanation: "연음법칙：ㅁパッチム+이 → [니미]", highlighted: true },
      ],
    },
  ],
  "2": [
    {
      korean: "요즘 한국어 공부가 점점 어려워요.",
      japanese: "最近韓国語の勉強がだんだん難しくなっています。",
      katakana: "ヨジュム ハングゴ コンブガ チョムジョム オリョウォヨ",
      romanization: "yojeum hangugeo gongbuga jeomjeom eoryeowoyo",
      words: ["한국어", "공부", "어렵다"],
      grammar: [
        { particle: "이/가", meaning: "～が（主語）", example: "시험이 어려워요", difference: "形容詞文の主語に使う。日本語の「が」と同じ" },
      ],
    },
    {
      korean: "결혼 준비가 바빠서 힘들어요.",
      japanese: "結婚の準備が忙しくて大変です。",
      katakana: "キョロン チュンビガ パッパソ ヒムドゥロヨ",
      romanization: "gyeoron junbiga bappaseo himdeuleoyo",
      words: ["결혼", "준비", "바쁘다", "힘들다"],
      grammar: [
        { particle: "-아서/어서", meaning: "～して、～ので（原因・順序）", example: "배가 아파서 병원에 갔어요", difference: "原因や順序を表す。日本語の「～て」「～ので」に近いが、過去形と一緒に使えない" },
      ],
    },
    {
      korean: "여행 경험이 많으면 좋겠어요.",
      japanese: "旅行の経験が多ければいいのですが。",
      katakana: "ヨヘン キョンホミ マヌミョン チョッケッソヨ",
      romanization: "yeohaeng gyeonghomi maneumyeon jokesseoyo",
      words: ["여행", "경험"],
      grammar: [
        { particle: "-면", meaning: "～ば、～たら（条件）", example: "시간이 있으면 같이 가요", difference: "条件を表す。日本語の「～ば」「～たら」に相当" },
      ],
      pronunciation: [
        { korean: "많으면", reading: "마느면", explanation: "ㄹㅎパッチムのうちㅎが脱落し、ㄹが連音化 → [마느면]", highlighted: true },
      ],
    },
    {
      korean: "친구를 기다리면서 커피를 마셨어요.",
      japanese: "友達を待ちながらコーヒーを飲みました。",
      katakana: "チングルル キダリミョンソ コピルル マショッソヨ",
      romanization: "chingureul gidarimyeonseo keopireul masyeosseoyo",
      words: ["기다리다"],
      grammar: [
        { particle: "-면서", meaning: "～しながら（同時進行）", example: "음악을 들으면서 공부해요", difference: "日本語の「～ながら」に相当。二つの動作の同時進行を表す" },
      ],
    },
    {
      korean: "한국 음식은 맵지만 맛있어요.",
      japanese: "韓国料理は辛いけどおいしいです。",
      katakana: "ハングク ウムシグン メプチマン マシッソヨ",
      romanization: "hanguk eumsigeun maepjiman masisseoyo",
      words: ["음식"],
      grammar: [
        { particle: "-지만", meaning: "～けど、～が（逆接）", example: "비싸지만 사고 싶어요", difference: "日本語の「～けど」に相当。前文と後文が対立する内容を表す" },
        { particle: "은/는", meaning: "～は（話題）", example: "저는 학생이에요", difference: "日本語の「は」に相当。話題を提示する" },
      ],
      pronunciation: [
        { korean: "맛있어요", reading: "마시써요", explanation: "ㅅパッチム+있 → 연음법칙で[마시써요]", highlighted: true },
      ],
    },
    {
      korean: "약속 시간에 늦어서 실수했어요.",
      japanese: "約束の時間に遅れてしまいました。",
      katakana: "ヤクソク シガネ ヌジョソ シルスヘッソヨ",
      romanization: "yaksok sigane neujeoseo silsuhaesseoyo",
      words: ["약속", "시간", "실수"],
    },
    {
      korean: "이 도시는 교통이 편하고 깨끗해요.",
      japanese: "この都市は交通が便利できれいです。",
      katakana: "イ トシヌン キョトンイ ピョナゴ ッケックテヨ",
      romanization: "i dosineun gyotongi pyeonhago kkaekkeuthaeyo",
      words: ["도시", "교통", "편하다", "깨끗하다"],
      grammar: [
        { particle: "-고", meaning: "～して、～で（並列）", example: "크고 넓어요", difference: "日本語の「～て」「～で」に近い。二つの事実を並列する" },
      ],
    },
    {
      korean: "건강하려면 운동을 자주 해야 해요.",
      japanese: "健康でいるためには運動をよくしなければなりません。",
      katakana: "コンガンハリョミョン ウンドンウル チャジュ ヘヤ ヘヨ",
      romanization: "geongangharyeomyeon undongeul jaju haeya haeyo",
      words: ["운동", "건강하다", "자주"],
      grammar: [
        { particle: "-려면", meaning: "～しようとするなら", example: "한국어를 잘하려면 많이 연습해야 해요", difference: "意図・目的の条件を表す。日本語の「～するためには」に相当" },
      ],
    },
    {
      korean: "주말에 가끔 등산을 가요.",
      japanese: "週末にたまに登山に行きます。",
      katakana: "チュマレ カックム トゥンサヌル カヨ",
      romanization: "jumare gakkeum deungsaneul gayo",
      words: ["주말", "가끔"],
    },
    {
      korean: "유명한 식당이라서 예약이 필요해요.",
      japanese: "有名な食堂なので予約が必要です。",
      katakana: "ユミョンハン シクタンイラソ イェヤギ ピリョヘヨ",
      romanization: "yumyeonghan sikdangiraseo yeyagi piryohaeyo",
      words: ["식당", "유명하다", "예약", "필요하다"],
      grammar: [
        { particle: "-(이)라서", meaning: "～なので（名詞+理由）", example: "학생이라서 할인돼요", difference: "名詞に付く理由の表現。日本語の「～なので」に相当" },
      ],
    },
    {
      korean: "이사를 해서 새 집이 조용해요.",
      japanese: "引っ越したので新しい家が静かです。",
      katakana: "イサルル ヘソ セ チビ チョヨンヘヨ",
      romanization: "isareul haeseo sae jibi joyonghaeyo",
      words: ["이사", "집", "조용하다"],
    },
    {
      korean: "한국어를 배우는 것이 즐거워요.",
      japanese: "韓国語を習うのが楽しいです。",
      katakana: "ハングゴルル ペウヌン ゴシ チュルゴウォヨ",
      romanization: "hangugoreul baeuneun geosi jeulgeowoyo",
      words: ["한국어", "즐겁다"],
      grammar: [
        { particle: "-는 것", meaning: "～すること（名詞化）", example: "읽는 것을 좋아해요", difference: "動詞を名詞化する表現。日本語の「～すること」「～するの」に相当" },
      ],
    },
    {
      korean: "갑자기 비가 와서 우산을 빌렸어요.",
      japanese: "急に雨が降ったので傘を借りました。",
      katakana: "カプチャギ ピガ ワソ ウサヌル ピルリョッソヨ",
      romanization: "gapjagi biga waseo usaneul billyeosseoyo",
      words: ["비", "우산", "갑자기", "빌리다"],
    },
    {
      korean: "걱정하지 마세요. 괜찮아요.",
      japanese: "心配しないでください。大丈夫です。",
      katakana: "コクチョンハジ マセヨ. クェンチャナヨ",
      romanization: "geokjeonghaji maseyo. gwaenchannayo",
      words: ["걱정", "괜찮다"],
      pronunciation: [
        { korean: "괜찮아요", reading: "괜차나요", explanation: "ㅎパッチムの弱化：ㄴㅎ+아 → [차나요]", highlighted: true },
      ],
    },
    {
      korean: "소개를 받아서 좋은 사람을 만났어요.",
      japanese: "紹介を受けていい人に会いました。",
      katakana: "ソゲルル パダソ チョウン サラムル マンナッソヨ",
      romanization: "sogaereul badaseo joeun sarameul mannasseoyo",
      words: ["소개", "사람"],
    },
    {
      korean: "한국어 연습을 많이 하면 잘할 수 있어요.",
      japanese: "韓国語の練習をたくさんすれば上手になれます。",
      katakana: "ハングゴ ヨンスブル マニ ハミョン チャラル ス イッソヨ",
      romanization: "hangugeo yeonseubeul mani hamyeon jalhal su isseoyo",
      words: ["한국어", "연습"],
      pronunciation: [
        { korean: "연습을", reading: "연스블", explanation: "ㅂパッチム+을 → 연음法則で[연스블]", highlighted: true },
      ],
    },
    {
      korean: "이 가방은 예쁘지만 무거워요.",
      japanese: "このかばんはきれいだけど重いです。",
      katakana: "イ カバンウン イェップジマン ムゴウォヨ",
      romanization: "i gabangeun yeppeudjiman mugeowoyo",
      words: ["가방", "예쁘다", "무겁다"],
      grammar: [
        { particle: "-지만", meaning: "～けれど（逆接）", example: "작지만 좋아요", difference: "前後で対比する内容を繋ぐ。日本語の「～けど」と同じ" },
      ],
    },
    {
      korean: "다음 주에 고향에서 친척이 와요.",
      japanese: "来週故郷から親戚が来ます。",
      katakana: "タウム チュエ コヒャンエソ チンチョギ ワヨ",
      romanization: "daeum jue gohyangeseo chincheogi wayo",
      words: ["친척"],
    },
    {
      korean: "요즘 일이 많아서 쉬고 싶어요.",
      japanese: "最近仕事が多くて休みたいです。",
      katakana: "ヨジュム イリ マナソ シュイゴ シポヨ",
      romanization: "yojeum iri manaseo swigo sipeoyo",
      words: ["일", "쉬다"],
      grammar: [
        { particle: "-고 싶다", meaning: "～したい（希望）", example: "여행을 가고 싶어요", difference: "日本語の「～したい」に相当。動詞の語幹に付ける" },
      ],
    },
    {
      korean: "한복이 따뜻하고 편해요.",
      japanese: "韓服が暖かくて楽です。",
      katakana: "ハンボギ ッタットゥタゴ ピョネヨ",
      romanization: "hanbogi ttatteuthago pyeonhaeyo",
      words: ["한복", "따뜻하다", "편하다"],
      pronunciation: [
        { korean: "따뜻하고", reading: "따뜨타고", explanation: "ㅅパッチム+ㅎ → 격음화で[따뜨타고]", highlighted: true },
      ],
    },
  ],
  "3": [
    {
      korean: "이번 시험의 결과가 기대와 달랐어요.",
      japanese: "今回の試験の結果が期待と違いました。",
      katakana: "イボン シホメ キョルグァガ キデワ タルラッソヨ",
      romanization: "ibeon siheome gyeolgwaga gidaewa dallasseoyo",
      words: ["결과"],
      grammar: [
        { particle: "의", meaning: "～の（所有・所属）", example: "한국의 문화", difference: "日本語の「の」に相当。口語では省略されることも多い" },
      ],
    },
    {
      korean: "경제 발전을 위해 다양한 정책이 필요합니다.",
      japanese: "経済発展のためにさまざまな政策が必要です。",
      katakana: "キョンジェ パルチョヌル ウィヘ タヤンハン チョンチェギ ピリョハムニダ",
      romanization: "gyeongje baljoneul wihae dayanghan jeongchaegi piryohamnida",
      words: ["경제", "발전", "다양하다", "정책"],
      grammar: [
        { particle: "을/를 위해", meaning: "～のために（目的）", example: "건강을 위해 운동해요", difference: "日本語の「～のために」に相当。名詞+을/를 위해の形で使う" },
      ],
      pronunciation: [
        { korean: "필요합니다", reading: "피료함니다", explanation: "비음화：ㅂ+ㄴ → [ㅁㄴ]で[함니다]", highlighted: true },
      ],
    },
    {
      korean: "교육의 목표는 학생들의 능력을 키우는 것입니다.",
      japanese: "教育の目標は学生たちの能力を伸ばすことです。",
      katakana: "キョユゲ モクピョヌン ハクセンドゥレ ヌンニョグル キウヌン ゴシムニダ",
      romanization: "gyoyuge mokpyoneun haksaengdeure neungnyeogeul kiuneun gosimnida",
      words: ["교육", "목표", "능력"],
      pronunciation: [
        { korean: "능력", reading: "능녁", explanation: "ㄹ+ㅕ → [녀]と発音。流音の後の母音変化", highlighted: true },
      ],
    },
    {
      korean: "국제 관계에서 협력이 중요합니다.",
      japanese: "国際関係において協力が重要です。",
      katakana: "クッチェ クァンゲエソ ヒョムニョギ チュンヨハムニダ",
      romanization: "gukje gwangyeeseo hyeomnyeogi jungyohamnida",
      words: ["국제", "관계", "협력"],
      pronunciation: [
        { korean: "협력", reading: "혐녁", explanation: "비음화：ㅂ+ㄹ → [ㅁㄴ]で[혐녁]", highlighted: true },
      ],
    },
    {
      korean: "이 문제를 해결하기 위해 분석이 필요해요.",
      japanese: "この問題を解決するために分析が必要です。",
      katakana: "イ ムンジェルル ヘギョラギ ウィヘ プンソギ ピリョヘヨ",
      romanization: "i munjereur haegyeorhagi wihae bunsogi piryohaeyo",
      words: ["해결", "분석"],
      grammar: [
        { particle: "-기 위해", meaning: "～するために（目的）", example: "성공하기 위해 노력해요", difference: "動詞の語幹に付いて目的を表す。日本語の「～するために」に相当" },
      ],
    },
    {
      korean: "최근 연구 결과에 의하면 환경 보호가 시급합니다.",
      japanese: "最近の研究結果によると環境保護が急務です。",
      katakana: "チェグン ヨング キョルグァエ ウィハミョン ファンギョン ポホガ シグパムニダ",
      romanization: "choegeun yeongu gyeolgwae uihamyeon hwangyeong bohoga sigupamnida",
      words: ["연구", "결과", "보호"],
      grammar: [
        { particle: "에 의하면", meaning: "～によると（引用・根拠）", example: "뉴스에 의하면 내일 비가 와요", difference: "情報の出所を示す。日本語の「～によると」に相当" },
      ],
    },
    {
      korean: "소비자의 선택이 시장 경쟁에 영향을 미칩니다.",
      japanese: "消費者の選択が市場競争に影響を及ぼします。",
      katakana: "ソビジャエ ソンテギ シジャン キョンジェンエ ヨンヒャンウル ミチムニダ",
      romanization: "sobijae sontaegi sijang gyeongjaenge yeonghyangeul michimnida",
      words: ["소비", "선택", "경쟁", "영향"],
    },
    {
      korean: "이 공연의 표현이 정말 인상적이었어요.",
      japanese: "この公演の表現が本当に印象的でした。",
      katakana: "イ コンヨネ ピョヒョニ チョンマル インサンジョギオッソヨ",
      romanization: "i gongyeone pyohyeoni jeongmal insangjeogieosseoyo",
      words: ["공연", "표현", "인상"],
    },
    {
      korean: "성공하려면 도전과 실력이 모두 필요합니다.",
      japanese: "成功するためには挑戦と実力がどちらも必要です。",
      katakana: "ソンゴンハリョミョン トジョングァ シルリョギ モドゥ ピリョハムニダ",
      romanization: "seonggongharyeomyeon dojeongwa sillyeogi modu piryohamnida",
      words: ["성공", "도전", "실력"],
      pronunciation: [
        { korean: "실력", reading: "실력", explanation: "ㄹ+ㄹ連続はそのまま[실력]と発音", highlighted: false },
      ],
    },
    {
      korean: "예술 활동에 대한 지원이 증가하고 있습니다.",
      japanese: "芸術活動に対する支援が増加しています。",
      katakana: "イェスル ファルトンエ テハン チウォニ チュンガハゴ イッスムニダ",
      romanization: "yesul hwaldtonge daehan jiwoni jeunggahago isseumnida",
      words: ["예술", "활동", "지원", "증가"],
      grammar: [
        { particle: "에 대한", meaning: "～に対する、～についての", example: "환경에 대한 관심", difference: "日本語の「～に対する」「～についての」に相当。名詞修飾の形" },
      ],
    },
    {
      korean: "이 제도의 장점과 효과를 비교해 봅시다.",
      japanese: "この制度の長所と効果を比較してみましょう。",
      katakana: "イ チェドエ チャンジョムグァ ヒョグァルル ピギョヘ ポプシダ",
      romanization: "i jedoe jangjeomgwa hyogwareul bigyohae bopsida",
      words: ["제도", "장점", "효과", "비교"],
    },
    {
      korean: "계약 기간이 끝나서 새로운 조건을 조사했어요.",
      japanese: "契約期間が終わったので新しい条件を調査しました。",
      katakana: "ケヤク キガニ ックンナソ セロウン チョゴヌル チョサヘッソヨ",
      romanization: "gyeyak gigani kkeunnaseo seroun jogoneul josahaesseoyo",
      words: ["계약", "기간", "조사"],
    },
    {
      korean: "발표 과정에서 감정을 잘 표현하는 것이 중요해요.",
      japanese: "発表の過程で感情をうまく表現することが大事です。",
      katakana: "パルピョ クァジョンエソ カムジョンウル チャル ピョヒョナヌン ゴシ チュンヨヘヨ",
      romanization: "balpyo gwajongeseo gamjeongeul jal pyohyeonhaneun gosi jungyohaeyo",
      words: ["발표", "과정", "감정", "표현"],
    },
    {
      korean: "체험 학습을 통해 기술의 가치를 알 수 있어요.",
      japanese: "体験学習を通じて技術の価値がわかります。",
      katakana: "チェホム ハクスブル トンヘ キスレ カチルル アル ス イッソヨ",
      romanization: "cheheom hakseubeul tonghae gisule gachireul al su isseoyo",
      words: ["체험", "기술", "가치"],
      grammar: [
        { particle: "을/를 통해", meaning: "～を通じて（手段・経由）", example: "인터넷을 통해 정보를 얻어요", difference: "日本語の「～を通じて」に相当。手段や経由を表す" },
      ],
    },
    {
      korean: "이 상품은 국내에서 생산된 재료로 만들었어요.",
      japanese: "この商品は国内で生産された材料で作りました。",
      katakana: "イ サンプムン クンネエソ センサンデン チェリョロ マンドゥロッソヨ",
      romanization: "i sangpumeun gungnaeeseo saengsandoen jaeryoro mandeureosseoyo",
      words: ["상품", "국내", "생산", "재료"],
      pronunciation: [
        { korean: "국내", reading: "궁내", explanation: "비음화：ㄱ+ㄴ → [ㅇㄴ]で[궁내]", highlighted: true },
      ],
    },
    {
      korean: "전문가의 의견에 따르면 이 사업은 투자 가치가 있어요.",
      japanese: "専門家の意見によるとこの事業は投資の価値があります。",
      katakana: "チョンムンガエ ウィギョネ ッタルミョン イ サオブン トゥジャ カチガ イッソヨ",
      romanization: "jeonmungae uigyeone ttareumyeon i saeobeun tuja gachiga isseoyo",
      words: ["전문", "의견", "사업", "투자", "가치"],
    },
    {
      korean: "규칙을 지켜야 공정한 경쟁이 가능합니다.",
      japanese: "規則を守ってこそ公正な競争が可能です。",
      katakana: "キュチグル チキョヤ コンジョンハン キョンジェンイ カヌンハムニダ",
      romanization: "gyuchigeul jikyeoya gongjeonghan gyeongjaengi ganeunghamnida",
      words: ["규칙", "경쟁"],
    },
  ],
  "4": [
    {
      korean: "이 문제의 핵심은 개인의 인식 변화에 있습니다.",
      japanese: "この問題の核心は個人の認識変化にあります。",
      katakana: "イ ムンジェエ ヘクシムン ケイネ インシク ピョナエ イッスムニダ",
      romanization: "i munjee haeksimeun gaeine insik byeonhwae isseumnida",
      words: ["핵심", "개인", "인식", "변화"],
      grammar: [
        { particle: "에 있다", meaning: "～にある（所在・原因）", example: "원인은 제도에 있다", difference: "原因や理由の所在を示す。日本語の「～にある」に相当" },
      ],
    },
    {
      korean: "법률을 검토한 결과 새로운 대책이 필요합니다.",
      japanese: "法律を検討した結果、新しい対策が必要です。",
      katakana: "ポムニュルル コムトハン キョルグァ セロウン テチェギ ピリョハムニダ",
      romanization: "beomnyuleul geomtohan gyeolgwa seroun daechaegi piryohamnida",
      words: ["법률", "검토", "결론", "대책"],
      pronunciation: [
        { korean: "법률", reading: "범뉼", explanation: "비음화＋流音化：ㅂ+ㄹ → [ㅁㄴ]、ㄴ+ㄹ → [ㄹㄹ]で最終的に[범뉼]", highlighted: true },
      ],
    },
    {
      korean: "사회의 안정을 위해서는 평등이 보장되어야 합니다.",
      japanese: "社会の安定のためには平等が保障されなければなりません。",
      katakana: "サフェエ アンジョンウル ウィヘソヌン ピョンドゥンイ ポジャンドェオヤ ハムニダ",
      romanization: "sahoee anjeoneul wiheseoneun pyeongdeungi bojangdoeoya hamnida",
      words: ["안정", "평등", "보장"],
      grammar: [
        { particle: "-어야 하다", meaning: "～しなければならない（義務）", example: "규칙을 지켜야 해요", difference: "日本語の「～しなければならない」に相当。義務・必要性を表す" },
      ],
    },
    {
      korean: "기초적인 연결 구조를 파악하는 것이 중요합니다.",
      japanese: "基礎的な連結構造を把握することが重要です。",
      katakana: "キチョジョギン ヨンギョル クジョルル パアカヌン ゴシ チュンヨハムニダ",
      romanization: "gichojeogin yeongyeol gujoreul paakaneun gosi jungyohamnida",
      words: ["기초", "연결", "구조", "파악"],
    },
    {
      korean: "이 정책에 대한 반대 의견도 고려해야 합니다.",
      japanese: "この政策に対する反対意見も考慮しなければなりません。",
      katakana: "イ チョンチェゲ テハン パンデ ウィギョンド コリョヘヤ ハムニダ",
      romanization: "i jeongchaege daehan bandae uigyeondo goryeohaeya hamnida",
      words: ["반대", "고려"],
      grammar: [
        { particle: "도", meaning: "～も（添加）", example: "나도 가고 싶어요", difference: "日本語の「も」に相当。追加や包含を表す" },
      ],
    },
    {
      korean: "이 시도가 성장의 기본이 될 수 있을지 예측하기 어렵습니다.",
      japanese: "この試みが成長の基本になれるかどうか予測しがたいです。",
      katakana: "イ シドガ ソンジャンエ キボニ テル ス イッスルジ イェチュカギ オリョプスムニダ",
      romanization: "i sidoga seongjangeui giboni doel su isseulji yechukagi eoryeopseumnida",
      words: ["시도", "성장", "기본", "예측"],
    },
    {
      korean: "제도의 개발과 운영에 대한 책임은 누구에게 있습니까?",
      japanese: "制度の開発と運営に対する責任は誰にありますか？",
      katakana: "チェドエ ケバルグァ ウニョンエ テハン チェギムン ヌグエゲ イッスムニッカ",
      romanization: "jedoe gaebalgwa unyeonge daehan chaegimeun nuguege isseumnikka",
      words: ["개발", "운영", "책임"],
    },
    {
      korean: "자본의 공급이 부족하면 경제 발생에 장애가 됩니다.",
      japanese: "資本の供給が不足すると経済発展に障害となります。",
      katakana: "チャボネ コングブイ プジョカミョン キョンジェ パルセンエ チャンエガ テムニダ",
      romanization: "jabone gonggeupi bujokamyeon gyeongje balsaenge jangaega doemnida",
      words: ["자본", "공급", "부족", "장애"],
    },
    {
      korean: "원칙에 따라 모든 과정을 기록해야 합니다.",
      japanese: "原則に従ってすべての過程を記録しなければなりません。",
      katakana: "ウォンチゲ ッタラ モドゥン クァジョンウル キロケヤ ハムニダ",
      romanization: "wonchige ttara modeun gwajongeul girokaeya hamnida",
      words: ["원칙", "기록"],
      grammar: [
        { particle: "에 따라", meaning: "～に従って、～により", example: "상황에 따라 달라요", difference: "日本語の「～に従って」「～により」に相当。基準や根拠を表す" },
      ],
    },
    {
      korean: "통합적인 관리 체계를 구성하는 것이 필요합니다.",
      japanese: "統合的な管理体系を構成することが必要です。",
      katakana: "トンハプチョギン クァルリ チェゲルル クソンハヌン ゴシ ピリョハムニダ",
      romanization: "tonghapjeogin gwalli chegyereul guseonghaneun gosi piryohamnida",
      words: ["통합", "관리", "체계", "구성"],
    },
    {
      korean: "이 이론에 따르면 속도 조절이 핵심 요소입니다.",
      japanese: "この理論に従えば速度の調節が核心要素です。",
      katakana: "イ イロネ ッタルミョン ソクト チョジョリ ヘクシム ヨソイムニダ",
      romanization: "i irone ttareumyeon sokdo jojeori haeksim yosoimnida",
      words: ["이론", "속도", "조절", "핵심", "요소"],
    },
    {
      korean: "이 사실을 감소 경향과 함께 해석해야 합니다.",
      japanese: "この事実を減少傾向と合わせて解釈しなければなりません。",
      katakana: "イ サシルル カムソ キョンヒャングァ ハムッケ ヘソケヤ ハムニダ",
      romanization: "i sasireul gamso gyeonghyanggwa hamkke haesokhaeya hamnida",
      words: ["사실", "감소", "경향", "해석"],
    },
    {
      korean: "국민의 의무와 권리는 법률에 의해 보장됩니다.",
      japanese: "国民の義務と権利は法律によって保障されます。",
      katakana: "クンミネ ウィムワ クォルリヌン ポムニュレ ウィヘ ポジャンデムニダ",
      romanization: "gunmine uimuwa gwollneun beomnyure uihae bojangdoemnida",
      words: ["의무", "법률", "보장"],
    },
    {
      korean: "의식의 변화가 사회 발견의 반응을 바꿀 수 있습니다.",
      japanese: "意識の変化が社会的発見の反応を変えることができます。",
      katakana: "ウィシゲ ピョナガ サフェ パルギョネ パヌンウル パックル ス イッスムニダ",
      romanization: "uisige byeonhwaga sahoe balgyeone baneungeul bakkul su isseumnida",
      words: ["의식", "변화", "발견", "반응"],
    },
    {
      korean: "강화된 기능은 현대 사회의 수준을 높여 줍니다.",
      japanese: "強化された機能は現代社会のレベルを高めてくれます。",
      katakana: "カンファデン キヌンウン ヒョンデ サフェエ スジュヌル ノピョ チュムニダ",
      romanization: "ganghwadoen gineungeun hyeondae sahoee sujuneul nopyeo jumnida",
      words: ["강화", "기능", "현대", "수준"],
    },
    {
      korean: "적용 가능한 해석을 바탕으로 주장을 펼쳐야 합니다.",
      japanese: "適用可能な解釈をもとに主張を展開しなければなりません。",
      katakana: "チョギョン カヌンハン ヘソグル パタンウロ チュジャンウル ピョルチョヤ ハムニダ",
      romanization: "jeogyong ganeunghan haesogeul batangeuro jujangeul pyeolcheoyo hamnida",
      words: ["적용", "해석", "주장"],
      grammar: [
        { particle: "을/를 바탕으로", meaning: "～をもとに（基盤）", example: "경험을 바탕으로 판단해요", difference: "日本語の「～をもとに」に相当。基盤・根拠を表す" },
      ],
    },
    {
      korean: "등록된 정보의 정의와 표준을 확보해야 합니다.",
      japanese: "登録された情報の定義と標準を確保しなければなりません。",
      katakana: "トゥンノクテン チョンボエ チョンウィワ ピョジュヌル ファクポヘヤ ハムニダ",
      romanization: "deungnokdoen jeongboe jeonguiwa pyojuneul hwakbohaeya hamnida",
      words: ["등록", "정의", "표준", "확보"],
      pronunciation: [
        { korean: "등록", reading: "등녹", explanation: "ㄹ+ㄱ → 流音化せずそのまま[등녹]と発音", highlighted: false },
      ],
    },
  ],
  "5": [
    {
      korean: "이 사례는 사회적 갈등의 근본적인 원인을 시사합니다.",
      japanese: "この事例は社会的葛藤の根本的な原因を示唆しています。",
      katakana: "イ サレヌン サフェジョク カルトゥンエ クンボンジョギン ウォニヌル シサハムニダ",
      romanization: "i saryeneun sahoejeok galdeunge geunbonjeogin wonineul sisahamnida",
      words: ["사례", "갈등", "근본", "시사"],
    },
    {
      korean: "잠재적 우려를 반영하여 방지 대책을 모색해야 합니다.",
      japanese: "潜在的な懸念を反映して防止対策を模索しなければなりません。",
      katakana: "チャムジェジョク ウリョルル パニョンハヨ パンジ テチェグル モセケヤ ハムニダ",
      romanization: "jamjaejeok uryeoreul banyeonghayeo bangji daechaegeul mosaekhaeya hamnida",
      words: ["잠재", "우려", "반영", "방지", "모색"],
      grammar: [
        { particle: "-하여/해서", meaning: "～して（原因・手段）", example: "검토하여 결정합니다", difference: "書面語で使われる「-해서」の硬い形。日本語の「～して」に相当" },
      ],
    },
    {
      korean: "합의에 이르기까지 다양한 관점에서 논쟁이 있었습니다.",
      japanese: "合意に至るまでさまざまな観点から論争がありました。",
      katakana: "ハビエ イルギッカジ タヤンハン クァンジョメソ ノンジェンイ イッソッスムニダ",
      romanization: "habie ireulgikkaji dayanghan gwanjeomeseo nonjaengi isseosseumnida",
      words: ["합의", "관점", "논쟁"],
    },
    {
      korean: "혁신적인 기반을 구축하여 효율을 높여야 합니다.",
      japanese: "革新的な基盤を構築して効率を高めなければなりません。",
      katakana: "ヒョクシンジョギン キバヌル クチュカヨ ヒョユルル ノピョヤ ハムニダ",
      romanization: "hyeoksinjeogin gibaneul guchukhayeo hyoyureul nopyeoya hamnida",
      words: ["혁신", "기반", "구축", "효율"],
    },
    {
      korean: "이 견해에 대해 일관된 근거를 제기할 필요가 있습니다.",
      japanese: "この見解について一貫した根拠を提起する必要があります。",
      katakana: "イ キョネエ テヘ イルグァンデン クンゴルル チェギハル ピリョガ イッスムニダ",
      romanization: "i gyeonhaee daehae ilgwandoen geungeoreul jegihal piryoga isseumnida",
      words: ["견해", "일관", "근거", "제기"],
      grammar: [
        { particle: "에 대해", meaning: "～について（対象）", example: "이 문제에 대해 이야기합시다", difference: "日本語の「～について」に相当。議論や意見の対象を示す" },
      ],
    },
    {
      korean: "범위를 축소하면 충족할 수 없는 요구가 생깁니다.",
      japanese: "範囲を縮小すると充足できない要求が生じます。",
      katakana: "ポムウィルル チュクソハミョン チュンジョカル ス オムヌン ヨグガ センギムニダ",
      romanization: "beomwireul chuksohamyeon chungjokhal su eomneun yoguga saengimnida",
      words: ["범위", "축소", "충족"],
    },
    {
      korean: "자율적인 판단을 전제로 하는 제도가 확립되어야 합니다.",
      japanese: "自律的な判断を前提とする制度が確立されなければなりません。",
      katakana: "チャユルジョギン パンダヌル チョンジェロ ハヌン チェドガ ファンニプテオヤ ハムニダ",
      romanization: "jayuljeogin pandaneul jeonjero haneun jedoga hwangniptoeoya hamnida",
      words: ["자율", "전제", "확립"],
      pronunciation: [
        { korean: "확립", reading: "황닙", explanation: "비음화+流音の鼻音化：ㄱ+ㄹ → [ㅇㄴ]で[황닙]", highlighted: true },
      ],
    },
    {
      korean: "양상을 분류한 뒤 포괄적인 요약을 작성해 주세요.",
      japanese: "様相を分類したあと包括的な要約を作成してください。",
      katakana: "ヤンサンウル プルリュハン トゥィ ポグァルジョギン ヨヤグル チャクソンヘ チュセヨ",
      romanization: "yangsangeul bullyuhan twi pogwaljeogin yoyageul jakseonghae juseyo",
      words: ["양상", "분류", "포괄", "요약"],
    },
    {
      korean: "상호 의존 관계를 이행하기 위해 촉진 방안을 마련해야 합니다.",
      japanese: "相互依存関係を履行するために促進方案を設けなければなりません。",
      katakana: "サンホ ウィジョン クァンゲルル イヘンハギ ウィヘ チョクチン パンアヌル マリョネヤ ハムニダ",
      romanization: "sangho uijon gwangyereul ihaenghagi wihae chokjin banganeul maryeonhaeya hamnida",
      words: ["상호", "의존", "이행", "촉진"],
    },
    {
      korean: "추론에 기반한 진단이 배제되어서는 안 됩니다.",
      japanese: "推論に基づく診断が排除されてはなりません。",
      katakana: "チュロネ キバナン チンダニ ペジェデオソヌン アン テムニダ",
      romanization: "churone gibanan jindani baejedoeseoneun an doemnida",
      words: ["추론", "진단", "배제"],
      grammar: [
        { particle: "-어서는 안 되다", meaning: "～してはならない（禁止）", example: "포기해서는 안 됩니다", difference: "強い禁止を表す。日本語の「～してはならない」に相当" },
      ],
    },
    {
      korean: "이 동향은 사회 전개의 양상을 반영하고 있습니다.",
      japanese: "この動向は社会展開の様相を反映しています。",
      katakana: "イ トンヒャンウン サフェ チョンゲエ ヤンサンウル パニョンハゴ イッスムニダ",
      romanization: "i donghyangeun sahoe jeongaee yangsangeul banyeonghago isseumnida",
      words: ["동향", "전개", "양상", "반영"],
    },
    {
      korean: "필수적인 개념을 탐구하여 통찰을 얻어야 합니다.",
      japanese: "必須の概念を探究して洞察を得なければなりません。",
      katakana: "ピルスジョギン ケニョムル タムグハヨ トンチャルル オドヤ ハムニダ",
      romanization: "pilsujeogin gaenyeomeul tamguhayeo tongchareul eodeoya hamnida",
      words: ["필수", "개념", "탐구", "통찰"],
    },
    {
      korean: "갈등 해소를 위해 대두된 문제를 주도적으로 해결해야 합니다.",
      japanese: "葛藤解消のために台頭した問題を主導的に解決しなければなりません。",
      katakana: "カルトゥン ヘソルル ウィヘ テドゥデン ムンジェルル チュドジョグロ ヘギョレヤ ハムニダ",
      romanization: "galdeung haesoreul wihae daedudoen munjereul judojeogeuro haegyeolhaeya hamnida",
      words: ["갈등", "해소", "대두", "주도"],
    },
    {
      korean: "억제 없이 유발된 문제의 성립 과정을 고찰합니다.",
      japanese: "抑制なく誘発された問題の成立過程を考察します。",
      katakana: "オクチェ オプシ ユバルデン ムンジェエ ソンニプ クァジョンウル コチャラムニダ",
      romanization: "eokje eopsi yubaldoen munje seongnip gwajeongeul gochalhamnida",
      words: ["억제", "유발", "성립", "고찰"],
    },
    {
      korean: "유사한 사례를 추구하여 저해 요인을 차원별로 분석합니다.",
      japanese: "類似した事例を追求して阻害要因を次元別に分析します。",
      katakana: "ユサハン サレルル チュグハヨ チョヘ ヨイヌル チャウォンビョルロ プンソカムニダ",
      romanization: "yusahan saryereul chuguhayeo jeohae yoineul chawonbyeollo bunsokhamnida",
      words: ["유사", "사례", "추구", "저해", "차원"],
    },
    {
      korean: "보완 방안을 지향하면서 방지 체계를 확립해야 합니다.",
      japanese: "補完方案を志向しながら防止体系を確立しなければなりません。",
      katakana: "ポワン パンアヌル チヒャンハミョンソ パンジ チェゲルル ファンニペヤ ハムニダ",
      romanization: "bowan bananeul jihyanghamyeonseo bangji chegyereul hwangniphaeya hamnida",
      words: ["보완", "지향", "방지", "확립"],
    },
  ],
  "6": [
    {
      korean: "이 담론은 현대 사회의 괴리를 간파하고 있다.",
      japanese: "この談論は現代社会の乖離を看破している。",
      katakana: "イ タムロヌン ヒョンデ サフェエ クェリルル カンパハゴ イッタ",
      romanization: "i damroneun hyeondae sahoee goerireul ganpahago itta",
      words: ["담론", "괴리", "간파"],
    },
    {
      korean: "윤리적 관철 없이는 보편적 가치의 구현이 불가능하다.",
      japanese: "倫理的な貫徹なしには普遍的価値の具現は不可能だ。",
      katakana: "ユルリジョク クァンチョル オプシヌン ポピョンジョク カチエ クヒョニ プルガヌンハダ",
      romanization: "yullijeok gwancheol eopsineun bopyeonjeok gachie guhyeoni bulganeunghada",
      words: ["윤리", "관철", "보편", "구현"],
      pronunciation: [
        { korean: "윤리", reading: "율리", explanation: "ㄴ+ㄹ → 流音化で[율리]と発音", highlighted: true },
      ],
    },
    {
      korean: "격동의 시대를 돌파하려면 혁신에 착수해야 한다.",
      japanese: "激動の時代を突破するためには革新に着手しなければならない。",
      katakana: "キョクトンエ シデルル トルパハリョミョン ヒョクシネ チャクスヘヤ ハンダ",
      romanization: "gyeokdonge sidereul dolpaharyeomyeon hyeoksine chaksuhaeya handa",
      words: ["격동", "돌파", "착수"],
    },
    {
      korean: "자원의 고갈 문제는 연쇄적인 파급 효과를 유발한다.",
      japanese: "資源の枯渇問題は連鎖的な波及効果を誘発する。",
      katakana: "チャウォネ コガル ムンジェヌン ヨンセジョギン パグプ ヒョグァルル ユバラダ",
      romanization: "jawone gogal munjeneun yonsaejeogin pageup hyogwareul yubalhada",
      words: ["고갈", "연쇄", "파급"],
    },
    {
      korean: "비약적인 발전의 이면에는 심화되는 상충이 존재한다.",
      japanese: "飛躍的な発展の裏面には深化する相衝が存在する。",
      katakana: "ピヤクチョギン パルチョネ イミョネヌン シムファデヌン サンチュンイ チョンジェハンダ",
      romanization: "biyakjeogin baljeone imyeoneneun simhwadoeneun sangchungi jonjaehanda",
      words: ["비약", "심화", "상충"],
    },
    {
      korean: "기존 제약을 탈피하여 궁극적인 목표를 추구해야 한다.",
      japanese: "既存の制約を脱皮して究極的な目標を追求しなければならない。",
      katakana: "キジョン チェヤグル タルピハヨ クングクチョギン モクピョルル チュグヘヤ ハンダ",
      romanization: "gijon jeyageul talpihayeo gunggukjeogin mokpyoreul chuguhaeya handa",
      words: ["제약", "탈피", "궁극"],
    },
    {
      korean: "사회 전반에 만연한 문제를 면밀히 반추할 필요가 있다.",
      japanese: "社会全般に蔓延した問題を綿密に反芻する必要がある。",
      katakana: "サフェ チョンバネ マニョナン ムンジェルル ミョンミリ パンチュハル ピリョガ イッタ",
      romanization: "sahoe jeonbane manyeonhan munjereul myeonmilhi banchuhal piryoga itta",
      words: ["만연", "면밀", "반추"],
      pronunciation: [
        { korean: "면밀히", reading: "면미리", explanation: "ㄹ+ㅎ → ㅎ弱化で[면미리]と発音", highlighted: true },
      ],
    },
    {
      korean: "이 역설은 해체와 재고를 동시에 촉발하고 있다.",
      japanese: "この逆説は解体と再考を同時に触発している。",
      katakana: "イ ヨクソルン ヘチェワ チェゴルル トンシエ チョクパラゴ イッタ",
      romanization: "i yeokseoreun haechewa jaegoreul dongsie chokbalhago itta",
      words: ["역설", "해체", "재고", "촉발"],
    },
    {
      korean: "축적된 데이터를 인용하여 추이를 분석해야 한다.",
      japanese: "蓄積されたデータを引用して推移を分析しなければならない。",
      katakana: "チュクチョクテン テイトルル イニョンハヨ チュイルル プンソケヤ ハンダ",
      romanization: "chukjeokdoen deitereul inyonghayeo chuireul bunsokhaeya handa",
      words: ["축적", "인용", "추이"],
    },
    {
      korean: "유기적인 연결을 통해 부합하는 체계를 구현할 수 있다.",
      japanese: "有機的な連結を通じて符合する体系を具現することができる。",
      katakana: "ユギジョギン ヨンギョルル トンヘ プハパヌン チェゲルル クヒョナル ス イッタ",
      romanization: "yugijeogin yeongyeoreul tonghae buhapaneun chegyereul guhyeonhal su itta",
      words: ["유기적", "부합", "구현"],
    },
    {
      korean: "갈망하는 목표를 표방하면서도 실질적 제약에 직면한다.",
      japanese: "渇望する目標を標榜しながらも実質的な制約に直面する。",
      katakana: "カルマンハヌン モクピョルル ピョバンハミョンソド シルジルジョク チェヤゲ チンミョナンダ",
      romanization: "galmanghaneun mokpyoreul pyobanghamyeonseodo siljiljeok jeyage jinmyeonhanda",
      words: ["갈망", "표방", "제약"],
      grammar: [
        { particle: "-면서도", meaning: "～しながらも（逆接同時）", example: "알면서도 모른 척해요", difference: "同時進行に逆接が加わる。日本語の「～しながらも」に相当" },
      ],
    },
    {
      korean: "이 함의를 개괄하면 극복의 실마리가 보인다.",
      japanese: "この含意を概括すれば克服の糸口が見える。",
      katakana: "イ ハミルル ケグァラミョン クッポゲ シルマリガ ポインダ",
      romanization: "i hamuireul gaegwalamyeon geukboge silmariga boinda",
      words: ["함의", "개괄", "극복"],
      pronunciation: [
        { korean: "극복", reading: "극뽁", explanation: "경음화：ㄱ+ㅂ → [ㄱㅃ]で[극뽁]", highlighted: true },
      ],
    },
    {
      korean: "고취된 정신은 압도적인 현실 앞에서도 흡수되지 않는다.",
      japanese: "鼓吹された精神は圧倒的な現実の前でも吸収されない。",
      katakana: "コチュィデン チョンシヌン アプトジョギン ヒョンシル アペソド フプスデジ アンヌンダ",
      romanization: "gochwidoen jeongsineun apdojeogin hyeonsil apeseodo heupsudoeji anneunda",
      words: ["고취", "압도", "흡수"],
    },
    {
      korean: "소급 적용 문제를 환기하여 조장되는 혼란을 막아야 한다.",
      japanese: "遡及適用問題を喚起して助長される混乱を防がなければならない。",
      katakana: "ソグプ チョギョン ムンジェルル ファンギハヨ チョジャンデヌン ホルラヌル マガヤ ハンダ",
      romanization: "sogeup jeogyong munjereul hwangihayeo jojangdoeneun hollaneul magaya handa",
      words: ["소급", "환기", "조장"],
    },
    {
      korean: "자명한 사실을 전복하려는 시도는 발굴의 과정을 필요로 한다.",
      japanese: "自明な事実を転覆しようとする試みは発掘の過程を必要とする。",
      katakana: "チャミョンハン サシルル チョンボカリョヌン シドヌン パルグレ クァジョンウル ピリョロ ハンダ",
      romanization: "jamyeonghan sasireul jeonbokaryeoneun sidoneun balgure gwajeongeul piryoro handa",
      words: ["자명", "전복", "발굴"],
    },
    {
      korean: "이 현상의 추이를 면밀히 관찰하고 파급력을 가늠해야 한다.",
      japanese: "この現象の推移を綿密に観察し波及力を推し量らなければならない。",
      katakana: "イ ヒョンサンエ チュイルル ミョンミリ クァンチャラゴ パグムニョグル カヌメヤ ハンダ",
      romanization: "i hyeonsange chuireul myeonmilhi gwanchalhago pageumnyeogeul ganeummhaeya handa",
      words: ["추이", "면밀", "파급"],
    },
  ],
};

export function getSentencesForLevel(level: string): Sentence[] {
  const raw = sentencesData[level] || [];
  return raw.map((s) => ({
    ...s,
    level: parseInt(level, 10),
  }));
}

export function getSentenceCount(level: string): number {
  return (sentencesData[level] || []).length;
}
