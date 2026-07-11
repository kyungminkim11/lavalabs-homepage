import type { IconKey, Locale } from "./content";

export type ProjectPreviewKind = "space" | "snap" | "follow" | "emoseed" | "heart" | "softmoon";
export type ProjectCard = {
  title: string;
  type: string;
  body: string;
  tags: readonly string[];
  href: string;
  cta: string;
  status: string;
  preview: ProjectPreviewKind;
  group: "operating" | "research";
  statusDetail?: string;
  notice?: string;
  detailHref?: string;
  detailCta?: string;
};

export const projectData = {
  ko: {
    heroAddon: "브랜드 홈페이지부터 360° 공간 경험과 자체 웹 서비스까지, 기획·콘텐츠·디자인·개발을 하나의 흐름으로 연결합니다.",
    seoTitle: "Lava Labs | 브랜드 웹·360° 공간 경험·디지털 서비스 제작",
    seoDescription: "Lava Labs는 브랜드 홈페이지, 포트폴리오, 사진과 콘텐츠, 360° 가상투어와 실용적인 웹 서비스를 기획하고 제작하는 디지털 경험 스튜디오입니다.",
    title: "직접 운영하며 완성도를 증명하는 서비스",
    intro: "아이디어를 화면으로 끝내지 않고 실제 공개, 운영, 개선까지 이어가며 제작 방식과 사용자 경험을 검증합니다.",
    operatingTitle: "운영 중인 디지털 서비스",
    operatingIntro: "현재 공개되어 실제 고객과 사용자를 만나는 Lava Labs의 대표 서비스입니다.",
    researchTitle: "자체 브랜드·연구",
    researchIntro: "제품과 콘텐츠를 직접 운영하며 작은 브랜드의 성장 과정을 축적합니다.",
    siteNote: "현재 보고 있는 Lava Labs 공식 홈페이지 역시 전략, 문구, 디자인, 개발, 배포와 운영 구조를 직접 설계했습니다.",
    webToolService: { icon: "screen" as IconKey, title: "웹 서비스·업무 도구 개발", body: "정보를 정리하고 반복 작업을 줄이는 웹 도구부터 고객이 직접 사용하는 소규모 디지털 서비스까지 기획하고 구축합니다.", tags: ["웹 앱", "업무 자동화", "서비스 운영"] },
    projects: [
      { title: "LavaLabs Space", type: "360° 가상투어·디지털 공간 구축", body: "매장, 스튜디오, 숙박시설, 전시 공간을 온라인에서 직접 둘러보게 하고 방문·문의·예약으로 연결하는 공간 경험 서비스입니다.", tags: ["360° 가상투어", "공간 촬영", "맞춤형 웹", "문의·예약 전환"], href: "https://space.lavalabs.co.kr/", cta: "Space 서비스 보기", status: "운영 중", statusDetail: "360° 데모·가격·상담 제공", notice: "공간 촬영, 인터랙티브 투어, 브랜드 UI와 행동 유도 버튼을 하나의 프로젝트로 구축합니다.", preview: "space", group: "operating" },
      { title: "365 Daily Snap", type: "인물 스냅 포트폴리오", body: "촬영 분위기, 작업 사례, 촬영 가이드와 문의 흐름을 연결한 다국어 반응형 사이트입니다.", tags: ["기획", "문구", "반응형 웹", "KR·EN·JP"], href: "https://snap.lavalabs.co.kr/", cta: "촬영 홈페이지 보기", status: "운영 중", preview: "snap", group: "operating" },
      { title: "맞팔체커", type: "Instagram 팔로우 관계 분석 도구", body: "Instagram에서 내려받은 데이터 ZIP을 브라우저에서 분석해 맞팔, 팔로잉만 하는 계정, 팔로워만 있는 계정을 구분합니다.", tags: ["브라우저 로컬 분석", "로그인 불필요", "개인정보 보호", "웹 앱"], href: "https://unfollow.lavalabs.co.kr/", cta: "맞팔 분석 시작하기", status: "Public Beta", statusDetail: "주요 기능 사용 가능 · 기능 개선 중", notice: "로그인 없이 파일을 서버에 올리지 않고 브라우저에서만 분석합니다. 자동 언팔 기능은 제공하지 않습니다.", detailHref: "/projects/follow-checker/", detailCta: "작동 방식 보기", preview: "follow", group: "operating" },
      { title: "EmoSeed", type: "감정·식물 기반 인터랙티브 웹 서비스", body: "나와 닮은 식물 테스트, 오늘의 식물 운세, 식물 이름 만들기와 궁합을 통해 지금의 마음을 가볍게 들여다보는 디지털 정원입니다.", tags: ["인터랙티브 콘텐츠", "모바일 웹", "브라우저 처리", "결과 이미지"], href: "https://emoseed.lavalabs.co.kr/", cta: "EmoSeed 둘러보기", status: "운영 중", notice: "회원가입 없이 휴대폰에서 바로 사용할 수 있으며, 테스트는 브라우저에서 처리됩니다.", detailHref: "/projects/emoseed/", detailCta: "제작 사례 보기", preview: "emoseed", group: "operating" },
      { title: "마음의 모양", type: "성인 애착 정보·자가점검 웹 서비스", body: "애착 불안과 회피의 두 축, 네 가지 원형, 16가지 관계 조합, 12·36문항 자기점검 테스트와 용어·연구 자료를 한곳에 정리한 모바일 우선 정보 사이트입니다.", tags: ["정보 구조 설계", "자가점검 테스트", "모바일 웹", "콘텐츠 리서치"], href: "https://shape-of-heart.lavalabs.co.kr/", cta: "마음의 모양 둘러보기", status: "운영 중", notice: "테스트는 표준화 심리검사나 임상 진단을 대체하지 않는 교육용 자기점검입니다.", preview: "heart", group: "operating" },
      { title: "SoftMoon", type: "자체 굿즈 브랜드 연구", body: "우주와 자연을 모티프로 엽서, 스티커, 키트와 디지털 콘텐츠를 연구합니다.", tags: ["브랜드 기획", "굿즈", "패키징", "콘텐츠"], href: "/soft_moon/", cta: "브랜드 연구 보기", status: "자체 브랜드 연구", preview: "softmoon", group: "research" }
    ] as readonly ProjectCard[]
  },
  en: {
    heroAddon: "From brand websites to 360° spatial experiences and in-house web services, we connect strategy, content, design, and development in one workflow.",
    seoTitle: "Lava Labs | Brand Websites, 360° Experiences, and Digital Services",
    seoDescription: "Lava Labs is a digital experience studio creating brand websites, portfolios, photography, content, 360° virtual tours, and practical web services.",
    title: "Services proven through real operation",
    intro: "We take ideas beyond launch and validate our work through actual publishing, operation, measurement, and continuous improvement.",
    operatingTitle: "Live digital services",
    operatingIntro: "Public Lava Labs services currently serving real customers and users.",
    researchTitle: "In-house brand and research",
    researchIntro: "Hands-on product and content experiments that deepen our small-brand operating experience.",
    siteNote: "This official Lava Labs website was also planned, written, designed, developed, deployed, and structured for operation in-house.",
    webToolService: { icon: "screen" as IconKey, title: "Web services and workflow tools", body: "We build practical web tools that organize information and reduce repetitive work, as well as small digital services used directly by customers.", tags: ["Web apps", "Workflow automation", "Service operation"] },
    projects: [
      { title: "LavaLabs Space", type: "360° virtual tours and digital space experiences", body: "A spatial experience service that lets visitors explore stores, studios, stays, and exhibitions online, then connects them to visits, inquiries, and bookings.", tags: ["360° virtual tour", "Space photography", "Custom web", "Inquiry conversion"], href: "https://space.lavalabs.co.kr/", cta: "View Space service", status: "Live", statusDetail: "Interactive demo, pricing, and consultation available", notice: "Space photography, interactive tours, branded UI, and conversion actions are delivered as one integrated project.", preview: "space", group: "operating" },
      { title: "365 Daily Snap", type: "Portrait photography portfolio", body: "A multilingual responsive site connecting visual mood, selected work, shoot guidance, and inquiries.", tags: ["Planning", "Copy", "Responsive web", "KR·EN·JP"], href: "https://snap.lavalabs.co.kr/", cta: "View photography site", status: "Live", preview: "snap", group: "operating" },
      { title: "Follow Checker", type: "Instagram follow relationship analyzer", body: "Analyzes an Instagram data ZIP in the browser and separates mutual follows, following-only accounts, and follower-only accounts.", tags: ["Local analysis", "No login", "Privacy-first", "Web app"], href: "https://unfollow.lavalabs.co.kr/", cta: "Start analysis", status: "Public Beta", statusDetail: "Core features available · actively improving", notice: "No login, no server upload, and no automatic unfollowing. The ZIP is analyzed only in your browser.", detailHref: "/en/projects/follow-checker/", detailCta: "How it works", preview: "follow", group: "operating" },
      { title: "EmoSeed", type: "Interactive emotion and plant web experience", body: "A small digital garden featuring a plant personality test, daily plant fortune, plant name generator, and compatibility experience.", tags: ["Interactive content", "Mobile web", "Browser processing", "Shareable results"], href: "https://emoseed.lavalabs.co.kr/", cta: "Explore EmoSeed", status: "Live", notice: "It works without account registration and processes the test experience in the browser.", detailHref: "/en/projects/emoseed/", detailCta: "View case study", preview: "emoseed", group: "operating" },
      { title: "Shape of Heart", type: "Adult attachment information and self-reflection service", body: "A mobile-first information hub covering attachment anxiety and avoidance, four prototypes, 16 relationship pairings, 12- and 36-question self-reflection tests, terminology, and research guidance.", tags: ["Information architecture", "Self-reflection test", "Mobile web", "Content research"], href: "https://shape-of-heart.lavalabs.co.kr/", cta: "Explore Shape of Heart", status: "Live", notice: "The test is an educational self-reflection tool, not a standardized assessment or clinical diagnosis.", preview: "heart", group: "operating" },
      { title: "SoftMoon", type: "In-house goods brand research", body: "An in-house project exploring postcards, stickers, kits, packaging, and digital content inspired by space and nature.", tags: ["Brand planning", "Goods", "Packaging", "Content"], href: "/en/soft_moon/", cta: "View brand research", status: "In-house research", preview: "softmoon", group: "research" }
    ] as readonly ProjectCard[]
  },
  jp: {
    heroAddon: "ブランドサイトから360°空間体験、自社Webサービスまで、企画・コンテンツ・デザイン・開発を一つの流れでつなぎます。",
    seoTitle: "Lava Labs | ブランドWeb・360°空間体験・デジタルサービス制作",
    seoDescription: "Lava Labsは、ブランドサイト、ポートフォリオ、写真、コンテンツ、360°バーチャルツアー、実用的なWebサービスを制作するデジタル体験スタジオです。",
    title: "実際の運営で完成度を証明するサービス",
    intro: "アイデアを公開して終わらせず、実際の運営・改善まで行いながら制作方法とユーザー体験を検証します。",
    operatingTitle: "運営中のデジタルサービス",
    operatingIntro: "現在公開され、実際のお客様とユーザーに利用されているLava Labsのサービスです。",
    researchTitle: "自社ブランド・研究",
    researchIntro: "商品とコンテンツを自ら運営し、小さなブランドの成長プロセスを蓄積します。",
    siteNote: "現在ご覧のLava Labs公式サイトも、戦略・文章・デザイン・開発・公開・運営構成を自社で設計しています。",
    webToolService: { icon: "screen" as IconKey, title: "Webサービス・業務ツール開発", body: "情報整理や反復作業を減らす実用的なWebツールから、顧客が直接利用する小規模デジタルサービスまで企画・構築します。", tags: ["Webアプリ", "業務自動化", "サービス運営"] },
    projects: [
      { title: "LavaLabs Space", type: "360°バーチャルツアー・デジタル空間構築", body: "店舗、スタジオ、宿泊施設、展示空間をオンラインで自由に見学でき、来店・お問い合わせ・予約へつなげる空間体験サービスです。", tags: ["360°ツアー", "空間撮影", "カスタムWeb", "予約・問い合わせ導線"], href: "https://space.lavalabs.co.kr/", cta: "Spaceサービスを見る", status: "運営中", statusDetail: "360°デモ・料金・相談受付中", notice: "空間撮影、インタラクティブツアー、ブランドUI、行動導線を一つのプロジェクトとして構築します。", preview: "space", group: "operating" },
      { title: "365 Daily Snap", type: "人物スナップ・ポートフォリオ", body: "撮影の雰囲気、制作事例、撮影ガイド、お問い合わせ導線をまとめた多言語レスポンシブサイトです。", tags: ["企画", "コピー", "レスポンシブ", "KR·EN·JP"], href: "https://snap.lavalabs.co.kr/", cta: "撮影サイトを見る", status: "運営中", preview: "snap", group: "operating" },
      { title: "フォローチェッカー", type: "Instagramフォロー関係分析ツール", body: "InstagramからダウンロードしたデータZIPをブラウザ内で分析し、相互フォロー、フォローのみ、フォロワーのみを分類します。", tags: ["ローカル分析", "ログイン不要", "プライバシー", "Webアプリ"], href: "https://unfollow.lavalabs.co.kr/", cta: "分析を始める", status: "Public Beta", statusDetail: "主要機能は利用可能・改善中", notice: "ログイン不要、サーバーへのファイル送信なし、自動アンフォロー機能なし。ZIPはブラウザ内でのみ分析します。", detailHref: "/jp/projects/follow-checker/", detailCta: "仕組みを見る", preview: "follow", group: "operating" },
      { title: "EmoSeed", type: "感情と植物をテーマにしたインタラクティブWebサービス", body: "植物性格テスト、今日の植物占い、植物名ジェネレーター、相性体験を通じて今の気持ちをやさしく見つめるデジタルガーデンです。", tags: ["インタラクティブ", "モバイルWeb", "ブラウザ処理", "結果画像"], href: "https://emoseed.lavalabs.co.kr/", cta: "EmoSeedを見る", status: "運営中", notice: "会員登録なしでスマートフォンから利用でき、テストはブラウザ内で処理されます。", detailHref: "/jp/projects/emoseed/", detailCta: "制作事例を見る", preview: "emoseed", group: "operating" },
      { title: "Shape of Heart", type: "成人愛着の情報・自己振り返りWebサービス", body: "愛着不安と回避の二軸、4つの原型、16通りの関係パターン、12問・36問の自己振り返りテスト、用語と研究情報をまとめたモバイル優先の情報サイトです。", tags: ["情報設計", "自己振り返りテスト", "モバイルWeb", "コンテンツ調査"], href: "https://shape-of-heart.lavalabs.co.kr/", cta: "Shape of Heartを見る", status: "運営中", notice: "テストは標準化心理検査や臨床診断の代わりではなく、教育目的の自己振り返りツールです。", preview: "heart", group: "operating" },
      { title: "SoftMoon", type: "自社グッズブランド研究", body: "宇宙と自然をモチーフに、ポストカード、ステッカー、キット、パッケージ、デジタルコンテンツを研究しています。", tags: ["ブランド企画", "グッズ", "パッケージ", "コンテンツ"], href: "/jp/soft_moon/", cta: "ブランド研究を見る", status: "自社ブランド研究", preview: "softmoon", group: "research" }
    ] as readonly ProjectCard[]
  }
} as const satisfies Record<Locale, unknown>;
