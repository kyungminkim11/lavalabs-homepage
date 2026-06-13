export type Locale = "ko" | "en" | "jp";

export type IconKey =
  | "sparkles"
  | "map"
  | "package"
  | "screen"
  | "handshake"
  | "clipboard"
  | "camera"
  | "pen"
  | "leaf"
  | "store";

export const locales: Locale[] = ["ko", "en", "jp"];

export const localeLabels: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  jp: "日本語"
};

export const localePaths: Record<Locale, string> = {
  ko: "/",
  en: "/en/",
  jp: "/jp/"
};

export const content = {
  ko: {
    seoTitle: "Lava Labs | 브랜드 웹·콘텐츠·사진을 연결하는 크리에이티브 스튜디오",
    seoDescription:
      "Lava Labs는 브랜드 랜딩페이지, 사진·영상 콘텐츠, 굿즈, 체험 프로그램을 하나의 흐름으로 설계해 작은 브랜드의 실행력을 높이는 크리에이티브 스튜디오입니다.",
    nav: [
      ["#about", "소개"],
      ["#services", "서비스"],
      ["#projects", "진행 방식"],
      ["#softmoon", "SoftMoon"],
      ["#contact", "문의"]
    ],
    hero: {
      eyebrow: "Creative Studio for Small Brands",
      title: "Lava Labs",
      statement: "브랜드의 첫인상을 웹, 사진, 콘텐츠로 빠르게 만듭니다.",
      body:
        "랜딩페이지 제작, 브랜드 소개서, 사진·영상, 굿즈와 체험 기획까지. 작은 브랜드가 바로 보여주고, 팔고, 공유할 수 있는 결과물을 설계합니다.",
      primary: "프로젝트 문의하기",
      secondary: "서비스 확인하기",
      proof: [
        ["1", "기획부터 제작까지 원스톱 진행"],
        ["2주~", "작은 프로젝트도 빠르게 착수"],
        ["KR·EN·JP", "한국어·영어·일본어 페이지 대응"]
      ]
    },
    about: {
      kicker: "About",
      title: "아이디어를 ‘보이는 결과물’로 바꾸는 실행형 크리에이티브 스튜디오",
      body:
        "Lava Labs는 감성적인 콘셉트를 실제 고객 접점으로 구현합니다. 막연한 브랜드 방향을 정리하고, 웹사이트·콘텐츠·촬영·굿즈·체험 프로그램까지 하나의 흐름으로 묶어 바로 활용 가능한 결과물로 만듭니다.",
      highlights: [
        "브랜드 메시지, 고객 타깃, 판매 포인트를 먼저 정리",
        "랜딩페이지, 소개서, SNS 콘텐츠, 촬영물을 한 방향으로 제작",
        "한국 시장은 물론 일본 활동까지 고려한 다국어 구조 설계"
      ]
    },
    servicesTitle: "바로 의뢰 가능한 서비스",
    servicesIntro:
      "처음부터 크게 만들 필요 없습니다. 지금 필요한 결과물부터 작게 만들고, 반응을 보면서 확장하는 방식으로 진행합니다.",
    services: [
      {
        icon: "screen" as IconKey,
        title: "브랜드 랜딩페이지 제작",
        body: "회사 소개, 포트폴리오, 예약·문의형 페이지, QR 연결 페이지처럼 고객이 바로 이해하고 행동할 수 있는 웹 접점을 만듭니다.",
        tags: ["반응형 웹", "문의 전환", "다국어 페이지"]
      },
      {
        icon: "camera" as IconKey,
        title: "사진·영상 콘텐츠 패키지",
        body: "브랜드와 제품의 분위기를 살리는 촬영 방향, 이미지 구성, SNS 업로드용 콘텐츠를 함께 설계합니다.",
        tags: ["프로필·제품 촬영", "SNS 콘텐츠", "브랜드 무드"]
      },
      {
        icon: "package" as IconKey,
        title: "SoftMoon 굿즈·패키징",
        body: "일러스트와 감성 스토리를 기반으로 엽서, 스티커, 키트, 패키징 등 작게 시작할 수 있는 굿즈를 제작합니다.",
        tags: ["일러스트", "샘플 제작", "패키징"]
      },
      {
        icon: "sparkles" as IconKey,
        title: "인터랙티브 콘텐츠 기획",
        body: "MBTI형 테스트, 취향 진단, 이벤트 페이지처럼 사용자가 참여하고 공유하기 쉬운 콘텐츠를 기획합니다.",
        tags: ["콘셉트 설계", "UX 라이팅", "공유형 콘텐츠"]
      }
    ],
    processTitle: "작업 흐름",
    process: [
      ["진단", "현재 브랜드 상태, 목표 고객, 필요한 결과물을 빠르게 정리합니다."],
      ["설계", "페이지 구조, 콘텐츠 방향, 촬영·디자인 톤을 하나의 기획안으로 묶습니다."],
      ["제작", "디자인, 개발, 문구, 이미지 작업을 단계별로 진행합니다."],
      ["검수", "모바일 화면, 문구, 문의 흐름, 다국어 노출을 확인합니다."],
      ["오픈", "배포 후 운영 방법과 다음 개선 포인트를 함께 정리합니다."]
    ],
    expertiseTitle: "제작 가능 영역",
    expertise: [
      ["screen" as IconKey, "브랜드 웹사이트·랜딩페이지"],
      ["camera" as IconKey, "사진·영상·SNS 이미지"],
      ["pen" as IconKey, "브랜드 문구와 소개서 구성"],
      ["package" as IconKey, "굿즈·패키징·키트 기획"],
      ["map" as IconKey, "체험 프로그램·팝업 동선"],
      ["handshake" as IconKey, "협업 프로젝트 운영"]
    ],
    projectsTitle: "현재 집중하고 있는 프로젝트",
    projects: [
      "개인 브랜드와 소규모 매장을 위한 빠른 랜딩페이지 템플릿",
      "일본 활동을 고려한 한국어·영어·일본어 포트폴리오 구조",
      "SoftMoon 감성 굿즈와 오프라인 체험 키트 고도화",
      "사진 촬영 결과물을 웹 포트폴리오와 자동 연계하는 관리자 흐름",
      "블로그·SNS 콘텐츠 제작을 돕는 로컬 AI 업무 도구",
      "갤럭시 워치 테마와 감성 테스트형 미니 서비스"
    ],
    softMoon: {
      kicker: "In-house Brand",
      title: "SoftMoon",
      body:
        "SoftMoon은 우주와 자연에서 받은 영감을 바탕으로 일상 속 감정과 기억을 따뜻하게 담아내는 Lava Labs의 자체 굿즈 브랜드입니다. 엽서, 스티커, 키트, 디지털 굿즈를 통해 브랜드 스토리를 작고 선명한 제품 경험으로 확장합니다.",
      view: "SoftMoon 둘러보기",
      download: "브랜드 소개서 다운로드"
    },
    audienceTitle: "이런 분들에게 적합합니다",
    audience: [
      "브랜드 소개 페이지나 포트폴리오가 필요하지만 어디서부터 시작할지 막막한 분",
      "사진, 문구, 웹사이트를 따로 만들다 보니 전체 톤이 흔들리는 소규모 브랜드",
      "일본어·영어 페이지까지 고려해 해외 활동 기반을 만들고 싶은 크리에이터",
      "굿즈, 체험, 콘텐츠를 작게 테스트하고 반응을 보며 확장하고 싶은 팀"
    ],
    contact: {
      kicker: "Contact",
      title: "지금 필요한 결과물부터 작게 시작해볼까요?",
      body:
        "브랜드 웹사이트, 포트폴리오, 촬영, 굿즈, 체험 프로그램 중 필요한 내용을 남겨주세요. 목표와 예산 범위에 맞춰 현실적인 진행 방식을 제안드립니다.",
      name: "이름",
      email: "이메일",
      message: "문의 내용",
      consent: "개인정보 수집 및 답변 목적 이용에 동의합니다.",
      submit: "문의 보내기",
      sending: "전송 중",
      success: "문의가 접수되었습니다. 빠르게 확인하겠습니다.",
      error: "전송이 원활하지 않습니다. info@lavalabs.co.kr 로 직접 보내주세요.",
      tel: "010-7914-3970",
      emailText: "info@lavalabs.co.kr",
      address: "경기도 고양시 일산서구 일현로 47, 2층 Lava Labs"
    },
    footer: "Lava Labs는 웹, 콘텐츠, 촬영, 굿즈를 연결해 작은 브랜드의 실행력을 높입니다."
  },
  en: {
    seoTitle: "Lava Labs | Brand Websites, Content and Visual Production Studio",
    seoDescription:
      "Lava Labs builds brand landing pages, visual content, goods, and experience programs for small brands that need clear, usable launch assets.",
    nav: [
      ["#about", "About"],
      ["#services", "Services"],
      ["#projects", "Process"],
      ["#softmoon", "SoftMoon"],
      ["#contact", "Contact"]
    ],
    hero: {
      eyebrow: "Creative Studio for Small Brands",
      title: "Lava Labs",
      statement: "We turn a brand’s first impression into websites, visuals, and content.",
      body:
        "From landing pages and brand decks to photography, goods, and experience planning, we create launch-ready assets that help small brands show, sell, and share faster.",
      primary: "Start a project",
      secondary: "View services",
      proof: [
        ["1", "One flow from planning to production"],
        ["2w+", "Fast starts for compact projects"],
        ["KR·EN·JP", "Korean, English, and Japanese pages"]
      ]
    },
    about: {
      kicker: "About",
      title: "A hands-on creative studio that turns ideas into visible brand assets",
      body:
        "Lava Labs shapes emotional concepts into practical customer touchpoints. We clarify the brand direction, then connect websites, content, photography, goods, and experience programs into one coherent execution flow.",
      highlights: [
        "Clarify the brand message, target customer, and selling points first",
        "Align landing pages, decks, social content, and visuals around one direction",
        "Design multilingual structures for Korean and Japan-facing activity"
      ]
    },
    servicesTitle: "Services You Can Start With",
    servicesIntro:
      "You do not need a huge launch. Start with the asset you need now, test the response, and expand the system step by step.",
    services: [
      {
        icon: "screen" as IconKey,
        title: "Brand landing pages",
        body: "Company profiles, portfolios, inquiry pages, and QR-linked microsites that help visitors understand and act quickly.",
        tags: ["Responsive web", "Lead conversion", "Multilingual"]
      },
      {
        icon: "camera" as IconKey,
        title: "Photo and content package",
        body: "Visual direction, image sets, and social-ready content that communicate the mood of a brand or product.",
        tags: ["Portrait/product", "Social content", "Brand mood"]
      },
      {
        icon: "package" as IconKey,
        title: "SoftMoon goods and packaging",
        body: "Illustration-led postcards, stickers, kits, and packaging that turn a warm story into small physical products.",
        tags: ["Illustration", "Sampling", "Packaging"]
      },
      {
        icon: "sparkles" as IconKey,
        title: "Interactive content planning",
        body: "Shareable quizzes, preference tests, and campaign pages designed around user choices and emotional results.",
        tags: ["Concept", "UX writing", "Shareable"]
      }
    ],
    processTitle: "Workflow",
    process: [
      ["Diagnose", "Clarify the current brand state, customer, and required asset."],
      ["Design", "Map the page structure, content direction, and visual tone."],
      ["Produce", "Move through copy, design, development, and visual production."],
      ["Review", "Check mobile screens, copy, inquiry flow, and multilingual exposure."],
      ["Launch", "Ship the asset and define the next improvement points."]
    ],
    expertiseTitle: "What We Can Produce",
    expertise: [
      ["screen" as IconKey, "Brand websites and landing pages"],
      ["camera" as IconKey, "Photography, video, and social visuals"],
      ["pen" as IconKey, "Brand copy and deck structure"],
      ["package" as IconKey, "Goods, packaging, and kits"],
      ["map" as IconKey, "Experience programs and pop-up flows"],
      ["handshake" as IconKey, "Collaborative project operation"]
    ],
    projectsTitle: "Current Focus Areas",
    projects: [
      "Fast landing page templates for personal brands and small shops",
      "Korean, English, and Japanese portfolio structures for Japan-facing activity",
      "SoftMoon emotional goods and offline kit development",
      "A portfolio admin flow that connects photography output to the web",
      "Local AI work tools for blog and social content production",
      "Galaxy Watch themes and emotional mini-test services"
    ],
    softMoon: {
      kicker: "In-house Brand",
      title: "SoftMoon",
      body:
        "SoftMoon is Lava Labs’ in-house goods brand inspired by space and nature. Through postcards, stickers, kits, and digital goods, it turns warm memories into small, clear product experiences.",
      view: "Explore SoftMoon",
      download: "Download brand intro"
    },
    audienceTitle: "Who This Is For",
    audience: [
      "Founders who need a brand page or portfolio but do not know where to start",
      "Small brands whose photos, copy, and website feel disconnected",
      "Creators who want a multilingual base for Korea and Japan-facing work",
      "Teams that want to test goods, experiences, and content before scaling"
    ],
    contact: {
      kicker: "Contact",
      title: "Shall we start with the asset you need right now?",
      body:
        "Tell us whether you need a website, portfolio, photography, goods, or an experience program. We will suggest a practical plan that fits your goal and budget range.",
      name: "Name",
      email: "Email",
      message: "Message",
      consent: "I agree to the use of my contact details for reply purposes.",
      submit: "Send inquiry",
      sending: "Sending",
      success: "Your inquiry has been received. We will review it soon.",
      error: "Something went wrong. Please email info@lavalabs.co.kr directly.",
      tel: "010-7914-3970",
      emailText: "info@lavalabs.co.kr",
      address: "2F, 47 Ilhyeon-ro, Ilsanseo-gu, Goyang-si, Gyeonggi-do, Korea"
    },
    footer: "Lava Labs connects websites, content, photography, and goods to help small brands execute faster."
  },
  jp: {
    seoTitle: "Lava Labs | ブランドWeb・コンテンツ・ビジュアル制作スタジオ",
    seoDescription:
      "Lava LabsはブランドLP、写真・映像コンテンツ、グッズ、体験プログラムをつなぎ、小さなブランドの実行力を高めるクリエイティブスタジオです。",
    nav: [
      ["#about", "紹介"],
      ["#services", "サービス"],
      ["#projects", "進行"],
      ["#softmoon", "SoftMoon"],
      ["#contact", "お問い合わせ"]
    ],
    hero: {
      eyebrow: "Creative Studio for Small Brands",
      title: "Lava Labs",
      statement: "ブランドの第一印象をWeb、写真、コンテンツで形にします。",
      body:
        "ランディングページ、ブランド資料、写真・映像、グッズ、体験企画まで。小さなブランドがすぐに見せて、売って、共有できる成果物を制作します。",
      primary: "プロジェクト相談",
      secondary: "サービスを見る",
      proof: [
        ["1", "企画から制作まで一貫対応"],
        ["2週~", "小さな案件もすばやく開始"],
        ["KR·EN·JP", "韓国語・英語・日本語ページ対応"]
      ]
    },
    about: {
      kicker: "About",
      title: "アイデアを見える成果物に変える実行型クリエイティブスタジオ",
      body:
        "Lava Labsは感性的なコンセプトを実際の顧客接点として実装します。ブランドの方向性を整理し、Webサイト、コンテンツ、撮影、グッズ、体験プログラムまで一つの流れで制作します。",
      highlights: [
        "ブランドメッセージ、顧客像、訴求ポイントを先に整理",
        "LP、紹介資料、SNSコンテンツ、撮影素材を同じ方向で制作",
        "韓国市場と日本での活動を考慮した多言語構成"
      ]
    },
    servicesTitle: "すぐに依頼できるサービス",
    servicesIntro:
      "最初から大きく作る必要はありません。今必要な成果物から小さく作り、反応を見ながら拡張します。",
    services: [
      {
        icon: "screen" as IconKey,
        title: "ブランドLP制作",
        body: "会社紹介、ポートフォリオ、予約・問い合わせページ、QR連動ページなど、訪問者が理解して行動しやすいWeb接点を作ります。",
        tags: ["レスポンシブ", "問い合わせ導線", "多言語"]
      },
      {
        icon: "camera" as IconKey,
        title: "写真・コンテンツ制作",
        body: "ブランドや商品の雰囲気を伝える撮影方向、画像構成、SNS向けコンテンツを設計します。",
        tags: ["人物・商品撮影", "SNS素材", "ブランドムード"]
      },
      {
        icon: "package" as IconKey,
        title: "SoftMoonグッズ・パッケージ",
        body: "イラストとストーリーをもとに、ポストカード、ステッカー、キット、パッケージなど小さく始められるグッズを制作します。",
        tags: ["イラスト", "サンプル", "パッケージ"]
      },
      {
        icon: "sparkles" as IconKey,
        title: "参加型コンテンツ企画",
        body: "診断テスト、好み分析、キャンペーンページなど、ユーザーが参加して共有しやすいコンテンツを企画します。",
        tags: ["コンセプト", "UXライティング", "共有型"]
      }
    ],
    processTitle: "制作の流れ",
    process: [
      ["診断", "現在のブランド状態、顧客像、必要な成果物を整理します。"],
      ["設計", "ページ構成、コンテンツ方針、撮影・デザインのトーンを設計します。"],
      ["制作", "コピー、デザイン、開発、ビジュアル制作を段階的に進めます。"],
      ["確認", "モバイル画面、文章、問い合わせ導線、多言語表示を確認します。"],
      ["公開", "公開後の運用方法と次の改善ポイントを整理します。"]
    ],
    expertiseTitle: "制作対応領域",
    expertise: [
      ["screen" as IconKey, "ブランドWeb・LP"],
      ["camera" as IconKey, "写真・映像・SNS画像"],
      ["pen" as IconKey, "ブランドコピーと資料構成"],
      ["package" as IconKey, "グッズ・パッケージ・キット"],
      ["map" as IconKey, "体験プログラム・ポップアップ動線"],
      ["handshake" as IconKey, "協業プロジェクト運営"]
    ],
    projectsTitle: "現在注力しているプロジェクト",
    projects: [
      "個人ブランドと小規模店舗向けの高速LPテンプレート",
      "日本での活動を考慮した韓国語・英語・日本語ポートフォリオ構成",
      "SoftMoon感性グッズとオフライン体験キットの改善",
      "撮影成果物をWebポートフォリオへつなぐ管理フロー",
      "ブログ・SNS制作を支援するローカルAI業務ツール",
      "Galaxy Watchテーマと感性診断型ミニサービス"
    ],
    softMoon: {
      kicker: "In-house Brand",
      title: "SoftMoon",
      body:
        "SoftMoonは宇宙と自然からインスピレーションを受け、日常の感情と記憶をあたたかく表現するLava Labsの自社グッズブランドです。ポストカード、ステッカー、キット、デジタルグッズを通じて、小さく明確な商品体験を作ります。",
      view: "SoftMoonを見る",
      download: "ブランド紹介書をダウンロード"
    },
    audienceTitle: "このような方に向いています",
    audience: [
      "ブランド紹介ページやポートフォリオが必要だが、始め方に迷っている方",
      "写真、文章、Webサイトのトーンがばらばらになっている小規模ブランド",
      "日本語・英語ページも含めて海外活動の基盤を作りたいクリエイター",
      "グッズ、体験、コンテンツを小さく試しながら拡張したいチーム"
    ],
    contact: {
      kicker: "Contact",
      title: "今必要な成果物から小さく始めませんか。",
      body:
        "Webサイト、ポートフォリオ、撮影、グッズ、体験プログラムのうち必要な内容をお知らせください。目標と予算感に合わせて現実的な進行方法をご提案します。",
      name: "お名前",
      email: "メール",
      message: "お問い合わせ内容",
      consent: "返信のための個人情報利用に同意します。",
      submit: "送信する",
      sending: "送信中",
      success: "お問い合わせを受け付けました。確認後ご連絡します。",
      error: "送信できませんでした。info@lavalabs.co.kr へ直接お送りください。",
      tel: "010-7914-3970",
      emailText: "info@lavalabs.co.kr",
      address: "韓国 京畿道 高陽市 一山西区 一現路47 2F Lava Labs"
    },
    footer: "Lava LabsはWeb、コンテンツ、撮影、グッズをつなぎ、小さなブランドの実行力を高めます。"
  }
} as const;
