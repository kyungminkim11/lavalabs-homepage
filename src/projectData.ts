import type { IconKey, Locale } from "./content";

export type ProjectPreviewKind = "snap" | "follow" | "emoseed" | "softmoon";
export type ProjectCard = {
  title: string; type: string; body: string; tags: readonly string[]; href: string; cta: string; status: string;
  preview: ProjectPreviewKind; group: "operating" | "research"; statusDetail?: string; notice?: string; detailHref?: string; detailCta?: string;
};

export const projectData = {
  ko: {
    heroAddon: "작은 브랜드의 홈페이지와 콘텐츠뿐 아니라, 일상에서 필요한 가벼운 웹 도구도 직접 기획하고 만듭니다.",
    seoTitle: "Lava Labs | 작은 브랜드의 홈페이지·콘텐츠·웹 도구 제작",
    seoDescription: "Lava Labs는 작은 브랜드와 크리에이터를 위한 반응형 홈페이지, 포트폴리오, 사진, 콘텐츠와 가벼운 웹 도구를 직접 기획하고 제작합니다.",
    title: "직접 운영하며 검증하는 프로젝트", intro: "자체 브랜드와 웹 서비스를 실제로 운영하며 기획, 제작, 배포, 개선 과정을 직접 검증합니다.",
    operatingTitle: "운영 중인 서비스", operatingIntro: "현재 공개되어 실제 사용·운영 중인 Lava Labs 프로젝트입니다.",
    researchTitle: "자체 브랜드·연구", researchIntro: "제품과 콘텐츠를 실험하며 작은 브랜드의 운영 과정을 축적합니다.",
    siteNote: "지금 보고 있는 Lava Labs 홈페이지 역시 기획, 문구, 디자인, 개발과 배포 구조를 직접 설계하고 운영합니다.",
    webToolService: { icon: "screen" as IconKey, title: "웹 도구·작은 서비스 개발", body: "정보를 정리하거나 반복 작업을 줄이는 가벼운 웹 도구를 기획하고, 모바일에서도 바로 사용할 수 있는 형태로 제작합니다.", tags: ["웹 앱", "업무 자동화", "로컬 데이터 처리"] },
    projects: [
      { title: "365 Daily Snap", type: "인물 스냅 포트폴리오", body: "촬영 분위기, 작업 사례, 촬영 가이드와 문의 흐름을 연결한 다국어 반응형 사이트입니다.", tags: ["기획", "문구", "반응형 웹", "KR·EN·JP"], href: "https://snap.lavalabs.co.kr/", cta: "촬영 홈페이지 보기", status: "운영 중", preview: "snap", group: "operating" },
      { title: "맞팔체커", type: "Instagram 팔로우 관계 분석 도구", body: "Instagram에서 내려받은 데이터 ZIP을 브라우저에서 분석해 맞팔, 팔로잉만 하는 계정, 팔로워만 있는 계정을 구분합니다.", tags: ["브라우저 로컬 분석", "로그인 불필요", "개인정보 보호", "웹 앱"], href: "https://unfollow.lavalabs.co.kr/", cta: "맞팔 분석 시작하기", status: "Public Beta", statusDetail: "주요 기능 사용 가능 · 기능 개선 중", notice: "로그인 없이 파일을 서버에 올리지 않고 브라우저에서만 분석합니다. 자동 언팔 기능은 제공하지 않습니다.", detailHref: "/projects/follow-checker/", detailCta: "작동 방식 보기", preview: "follow", group: "operating" },
      { title: "EmoSeed", type: "감정·식물 기반 인터랙티브 웹 서비스", body: "나와 닮은 식물 테스트, 오늘의 식물 운세, 식물 이름 만들기와 궁합을 통해 지금의 마음을 가볍게 들여다보는 디지털 정원입니다.", tags: ["인터랙티브 콘텐츠", "모바일 웹", "브라우저 처리", "결과 이미지"], href: "https://emoseed.lavalabs.co.kr/", cta: "EmoSeed 둘러보기", status: "운영 중", notice: "회원가입 없이 휴대폰에서 바로 사용할 수 있으며, 테스트는 브라우저에서 처리됩니다.", preview: "emoseed", group: "operating" },
      { title: "SoftMoon", type: "자체 굿즈 브랜드 연구", body: "우주와 자연을 모티프로 엽서, 스티커, 키트와 디지털 콘텐츠를 연구합니다.", tags: ["브랜드 기획", "굿즈", "패키징", "콘텐츠"], href: "/soft_moon/", cta: "브랜드 연구 보기", status: "자체 브랜드 연구", preview: "softmoon", group: "research" }
    ] as readonly ProjectCard[]
  },
  en: {
    heroAddon: "Alongside websites and content for small brands, we design lightweight web tools for practical everyday needs.",
    seoTitle: "Lava Labs | Websites, Content, and Lightweight Web Tools", seoDescription: "Lava Labs plans and builds responsive websites, portfolios, photography, content, and lightweight web tools for small brands and independent creators.",
    title: "Projects we operate and validate", intro: "We run our own brands and web services to test planning, production, deployment, and continuous improvement.", operatingTitle: "Operating services", operatingIntro: "Public Lava Labs projects that are currently available and actively maintained.", researchTitle: "In-house brand and research", researchIntro: "Experiments in products and content that build practical small-brand operating experience.", siteNote: "This Lava Labs website is also planned, written, designed, developed, deployed, and maintained in-house.",
    webToolService: { icon: "screen" as IconKey, title: "Web tools and small services", body: "We plan lightweight web tools that organize information or reduce repetitive work, then make them usable across desktop and mobile.", tags: ["Web apps", "Workflow tools", "Local data processing"] },
    projects: [
      { title: "365 Daily Snap", type: "Portrait photography portfolio", body: "A multilingual responsive site connecting visual mood, selected work, shoot guidance, and inquiries.", tags: ["Planning", "Copy", "Responsive web", "KR·EN·JP"], href: "https://snap.lavalabs.co.kr/", cta: "View photography site", status: "Live", preview: "snap", group: "operating" },
      { title: "Follow Checker", type: "Instagram follow relationship analyzer", body: "Analyzes an Instagram data ZIP in the browser and separates mutual follows, following-only accounts, and follower-only accounts.", tags: ["Local analysis", "No login", "Privacy-first", "Web app"], href: "https://unfollow.lavalabs.co.kr/", cta: "Start analysis", status: "Public Beta", statusDetail: "Core features available · actively improving", notice: "No login, no server upload, and no automatic unfollowing. The ZIP is analyzed only in your browser.", detailHref: "/en/projects/follow-checker/", detailCta: "How it works", preview: "follow", group: "operating" },
      { title: "EmoSeed", type: "Interactive emotion and plant web experience", body: "A small digital garden featuring a plant personality test, daily plant fortune, plant name generator, and compatibility experience.", tags: ["Interactive content", "Mobile web", "Browser processing", "Shareable results"], href: "https://emoseed.lavalabs.co.kr/", cta: "Explore EmoSeed", status: "Live", notice: "It works without account registration and processes the test experience in the browser.", preview: "emoseed", group: "operating" },
      { title: "SoftMoon", type: "In-house goods brand research", body: "An in-house project exploring postcards, stickers, kits, packaging, and digital content inspired by space and nature.", tags: ["Brand planning", "Goods", "Packaging", "Content"], href: "/en/soft_moon/", cta: "View brand research", status: "In-house research", preview: "softmoon", group: "research" }
    ] as readonly ProjectCard[]
  },
  jp: {
    heroAddon: "小さなブランドのWebサイトやコンテンツに加え、日常で役立つ軽量なWebツールも企画・開発しています。",
    seoTitle: "Lava Labs | 小さなブランドのWeb・コンテンツ・Webツール制作", seoDescription: "Lava Labsは、小さなブランドやクリエイター向けにレスポンシブWebサイト、ポートフォリオ、写真、コンテンツ、軽量なWebツールを企画・制作します。",
    title: "実際に運営しながら検証するプロジェクト", intro: "自社ブランドとWebサービスを運営し、企画・制作・公開・改善の流れを直接検証しています。", operatingTitle: "運営中のサービス", operatingIntro: "現在公開され、実際に利用・運営されているLava Labsのプロジェクトです。", researchTitle: "自社ブランド・研究", researchIntro: "商品とコンテンツを試しながら、小さなブランドの運営経験を蓄積します。", siteNote: "現在ご覧のLava Labs公式サイトも、企画・文章・デザイン・開発・公開構成を自社で設計し運営しています。",
    webToolService: { icon: "screen" as IconKey, title: "Webツール・小規模サービス開発", body: "情報整理や繰り返し作業を軽減するWebツールを企画し、PCとスマートフォンで使える形にします。", tags: ["Webアプリ", "業務ツール", "ローカルデータ処理"] },
    projects: [
      { title: "365 Daily Snap", type: "人物スナップ・ポートフォリオ", body: "撮影の雰囲気、制作事例、撮影ガイド、お問い合わせ導線をまとめた多言語レスポンシブサイトです。", tags: ["企画", "コピー", "レスポンシブ", "KR·EN·JP"], href: "https://snap.lavalabs.co.kr/", cta: "撮影サイトを見る", status: "運営中", preview: "snap", group: "operating" },
      { title: "フォローチェッカー", type: "Instagramフォロー関係分析ツール", body: "InstagramからダウンロードしたデータZIPをブラウザ内で分析し、相互フォロー、フォローのみ、フォロワーのみを分類します。", tags: ["ローカル分析", "ログイン不要", "プライバシー", "Webアプリ"], href: "https://unfollow.lavalabs.co.kr/", cta: "分析を始める", status: "Public Beta", statusDetail: "主要機能は利用可能・改善中", notice: "ログイン不要、サーバーへのファイル送信なし、自動アンフォロー機能なし。ZIPはブラウザ内でのみ分析します。", detailHref: "/jp/projects/follow-checker/", detailCta: "仕組みを見る", preview: "follow", group: "operating" },
      { title: "EmoSeed", type: "感情と植物をテーマにしたインタラクティブWebサービス", body: "植物性格テスト、今日の植物占い、植物名ジェネレーター、相性体験を通じて今の気持ちをやさしく見つめるデジタルガーデンです。", tags: ["インタラクティブ", "モバイルWeb", "ブラウザ処理", "結果画像"], href: "https://emoseed.lavalabs.co.kr/", cta: "EmoSeedを見る", status: "運営中", notice: "会員登録なしでスマートフォンから利用でき、テストはブラウザ内で処理されます。", preview: "emoseed", group: "operating" },
      { title: "SoftMoon", type: "自社グッズブランド研究", body: "宇宙と自然をモチーフに、ポストカード、ステッカー、キット、パッケージ、デジタルコンテンツを研究しています。", tags: ["ブランド企画", "グッズ", "パッケージ", "コンテンツ"], href: "/jp/soft_moon/", cta: "ブランド研究を見る", status: "自社ブランド研究", preview: "softmoon", group: "research" }
    ] as readonly ProjectCard[]
  }
} as const satisfies Record<Locale, unknown>;
