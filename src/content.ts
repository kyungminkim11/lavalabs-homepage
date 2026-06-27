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
    seoTitle: "Lava Labs | 작은 브랜드의 홈페이지와 콘텐츠를 만드는 크리에이티브 스튜디오",
    seoDescription:
      "Lava Labs는 작은 브랜드와 크리에이터에게 필요한 반응형 홈페이지, 포트폴리오, 사진과 콘텐츠를 함께 설계하고 제작합니다.",
    nav: [
      ["#about", "소개"],
      ["#services", "서비스"],
      ["#projects", "작업 사례"],
      ["#softmoon", "SoftMoon"],
      ["#contact", "문의"]
    ],
    hero: {
      eyebrow: "Creative Studio for Small Brands",
      title: "Lava Labs",
      statement: "작은 브랜드의 첫 홈페이지와 콘텐츠를 함께 만듭니다.",
      body:
        "복잡하고 큰 프로젝트보다 지금 필요한 소개 페이지, 포트폴리오, 사진과 문구부터 작게 시작합니다. 브랜드의 방향을 정리하고 실제로 운영할 수 있는 결과물로 연결합니다.",
      primary: "프로젝트 문의하기",
      secondary: "서비스 확인하기",
      proof: [
        ["WEB", "반응형 홈페이지와 포트폴리오"],
        ["PHOTO", "사진과 시각 콘텐츠 구성"],
        ["KR·EN·JP", "다국어 페이지 구조 대응"]
      ]
    },
    about: {
      kicker: "About",
      title: "필요한 것부터 작게 만들고, 실제 운영까지 이어갑니다",
      body:
        "Lava Labs는 아직 방향이 완전히 정리되지 않은 작은 브랜드와 크리에이터의 이야기를 듣고, 고객이 이해하기 쉬운 구조로 정리합니다. 홈페이지, 사진, 문구를 따로 만들기보다 하나의 인상으로 연결하는 것을 중요하게 생각합니다.",
      highlights: [
        "브랜드의 목적과 방문자가 해야 할 행동부터 정리",
        "모바일에서 보기 편한 홈페이지와 문의 흐름 제작",
        "사진, 문구, 웹 화면의 분위기를 한 방향으로 구성"
      ]
    },
    servicesTitle: "지금 시작할 수 있는 서비스",
    servicesIntro:
      "완성된 브랜드가 아니어도 괜찮습니다. 현재 필요한 범위를 함께 정하고, 실제로 사용할 수 있는 작은 결과물부터 제작합니다.",
    services: [
      {
        icon: "screen" as IconKey,
        title: "홈페이지·포트폴리오 제작",
        body: "회사 소개, 개인 포트폴리오, 촬영 문의 페이지처럼 정보를 명확하게 보여주고 다음 행동으로 연결되는 반응형 웹페이지를 제작합니다.",
        tags: ["반응형 웹", "정보 구조", "문의 흐름"]
      },
      {
        icon: "camera" as IconKey,
        title: "사진·시각 콘텐츠",
        body: "인물, 공간, 제품의 분위기를 담는 사진과 홈페이지·SNS에서 함께 활용할 수 있는 이미지 구성을 준비합니다.",
        tags: ["인물 촬영", "브랜드 이미지", "SNS 콘텐츠"]
      },
      {
        icon: "pen" as IconKey,
        title: "브랜드 문구·콘텐츠 구성",
        body: "막연하게 흩어진 소개 내용을 방문자가 빠르게 이해할 수 있도록 제목, 설명, 메뉴와 콘텐츠 순서로 정리합니다.",
        tags: ["소개 문구", "콘텐츠 구조", "UX 라이팅"]
      },
      {
        icon: "sparkles" as IconKey,
        title: "다국어·운영 구조 개선",
        body: "한국어를 기준으로 영어·일본어 페이지를 구성하고, 이후 직접 내용을 관리하기 쉬운 운영 방식을 함께 고민합니다.",
        tags: ["KR·EN·JP", "운영 개선", "확장 구조"]
      }
    ],
    processTitle: "작업 흐름",
    process: [
      ["대화", "필요한 페이지와 현재 가지고 있는 자료를 확인합니다."],
      ["정리", "방문자, 목적, 메뉴와 콘텐츠 우선순위를 정합니다."],
      ["제작", "화면, 문구, 이미지와 모바일 구조를 단계별로 만듭니다."],
      ["검수", "실제 휴대전화와 PC에서 링크, 문구, 문의 흐름을 확인합니다."],
      ["오픈", "도메인을 연결하고 이후 수정·운영 방법을 정리합니다."]
    ],
    expertiseTitle: "제작 가능 영역",
    expertise: [
      ["screen" as IconKey, "브랜드 홈페이지·랜딩페이지"],
      ["camera" as IconKey, "인물·공간·콘텐츠 촬영"],
      ["pen" as IconKey, "소개 문구와 콘텐츠 순서"],
      ["package" as IconKey, "SoftMoon 굿즈·패키징 연구"],
      ["map" as IconKey, "촬영·체험 안내 페이지"],
      ["handshake" as IconKey, "작은 협업 프로젝트 운영"]
    ],
    projectsTitle: "Featured Project · 365 Daily Snap",
    projects: [
      "인물 스냅 브랜드의 촬영 분위기와 작업 방식을 한 페이지에 정리",
      "포트폴리오, 촬영 전 가이드, 후기와 문의 흐름을 하나로 연결",
      "한국어·영어·일본어 페이지와 모바일 반응형 구조 적용",
      "기획, 문구, 디자인, 개발과 운영 구조를 직접 제작",
      "사이트 보기 · snap.lavalabs.co.kr"
    ],
    softMoon: {
      kicker: "In-house Brand",
      title: "SoftMoon",
      body:
        "SoftMoon은 Lava Labs가 직접 기획하며 발전시키고 있는 자체 굿즈 브랜드입니다. 우주와 자연에서 받은 영감을 엽서, 스티커, 키트와 디지털 콘텐츠로 옮기며 작은 브랜드를 실제로 운영하는 과정을 경험하고 있습니다.",
      view: "SoftMoon 둘러보기",
      download: "브랜드 소개서 다운로드"
    },
    audienceTitle: "이런 분들과 잘 맞습니다",
    audience: [
      "처음으로 브랜드 홈페이지나 개인 포트폴리오를 만들려는 분",
      "인스타그램 밖에서도 작업과 문의 정보를 정리해 보여주고 싶은 크리에이터",
      "사진, 문구, 홈페이지의 분위기를 한 방향으로 맞추고 싶은 작은 브랜드",
      "한국어 페이지를 바탕으로 영어·일본어 확장을 준비하는 분"
    ],
    contact: {
      kicker: "Contact",
      title: "지금 필요한 한 페이지부터 이야기해볼까요?",
      body:
        "홈페이지, 포트폴리오, 사진 또는 콘텐츠 구성 중 필요한 내용을 남겨주세요. 현재 상황과 준비된 자료를 확인한 뒤 가능한 범위와 진행 방법을 솔직하게 안내드립니다.",
      name: "이름",
      email: "이메일",
      message: "문의 내용",
      consent: "개인정보 수집 및 답변 목적 이용에 동의합니다.",
      submit: "문의 보내기",
      sending: "전송 중",
      success: "문의가 접수되었습니다. 확인 후 답변드리겠습니다.",
      error: "전송이 원활하지 않습니다. info@lavalabs.co.kr 로 직접 보내주세요.",
      tel: "010-7914-3970",
      emailText: "info@lavalabs.co.kr",
      address: "경기도 고양시 일산서구 일현로 47, 2층 Lava Labs"
    },
    footer: "Lava Labs는 작은 브랜드의 홈페이지, 사진과 콘텐츠를 함께 만듭니다."
  },
  en: {
    seoTitle: "Lava Labs | Websites and Content for Small Brands",
    seoDescription:
      "Lava Labs designs responsive websites, portfolios, photography, and content for small brands and independent creators.",
    nav: [
      ["#about", "About"],
      ["#services", "Services"],
      ["#projects", "Featured Work"],
      ["#softmoon", "SoftMoon"],
      ["#contact", "Contact"]
    ],
    hero: {
      eyebrow: "Creative Studio for Small Brands",
      title: "Lava Labs",
      statement: "We build the first website and content a small brand needs.",
      body:
        "Rather than starting with a large, complicated project, we begin with a clear introduction page, portfolio, photography, and copy that can be used in real operation.",
      primary: "Start a conversation",
      secondary: "View services",
      proof: [
        ["WEB", "Responsive websites and portfolios"],
        ["PHOTO", "Photography and visual content"],
        ["KR·EN·JP", "Multilingual page structures"]
      ]
    },
    about: {
      kicker: "About",
      title: "Start with what is needed now, then build toward real operation",
      body:
        "Lava Labs listens to small brands and creators whose direction is still taking shape. We organize their story into a structure visitors can understand and connect websites, photography, and copy into one coherent impression.",
      highlights: [
        "Clarify the purpose and the visitor's next action first",
        "Build mobile-friendly pages and inquiry flows",
        "Align photography, copy, and interface around one direction"
      ]
    },
    servicesTitle: "Services You Can Start With",
    servicesIntro:
      "Your brand does not need to be fully finished. We define a realistic scope together and begin with something you can actually use.",
    services: [
      {
        icon: "screen" as IconKey,
        title: "Websites and portfolios",
        body: "Responsive company pages, personal portfolios, and inquiry pages that present information clearly and guide visitors to the next step.",
        tags: ["Responsive web", "Information design", "Inquiry flow"]
      },
      {
        icon: "camera" as IconKey,
        title: "Photography and visual content",
        body: "Portrait, space, and product photography prepared for use across websites and social media.",
        tags: ["Portraits", "Brand visuals", "Social content"]
      },
      {
        icon: "pen" as IconKey,
        title: "Brand copy and content structure",
        body: "Titles, descriptions, menus, and page order that turn scattered ideas into an introduction visitors can understand quickly.",
        tags: ["Brand copy", "Content structure", "UX writing"]
      },
      {
        icon: "sparkles" as IconKey,
        title: "Multilingual and operational structure",
        body: "English and Japanese page structures based on the Korean site, with an approach that is easier to maintain and expand.",
        tags: ["KR·EN·JP", "Operations", "Scalable structure"]
      }
    ],
    processTitle: "How We Work",
    process: [
      ["Discuss", "Review the pages you need and the materials you already have."],
      ["Organize", "Define the audience, purpose, menu, and content priorities."],
      ["Create", "Build the interface, copy, imagery, and mobile layout step by step."],
      ["Review", "Check links, wording, and inquiry flows on phones and computers."],
      ["Launch", "Connect the domain and document how to update and operate the site."]
    ],
    expertiseTitle: "Areas We Can Build",
    expertise: [
      ["screen" as IconKey, "Brand websites and landing pages"],
      ["camera" as IconKey, "Portrait, space, and content photography"],
      ["pen" as IconKey, "Introduction copy and content order"],
      ["package" as IconKey, "SoftMoon goods and packaging studies"],
      ["map" as IconKey, "Photo and experience guide pages"],
      ["handshake" as IconKey, "Small collaborative projects"]
    ],
    projectsTitle: "Featured Project · 365 Daily Snap",
    projects: [
      "Organized the visual style and working process of a portrait photography brand",
      "Connected the portfolio, preparation guide, reviews, and inquiry journey",
      "Built responsive Korean, English, and Japanese pages",
      "Handled planning, copy, design, development, and the operating structure",
      "Visit · snap.lavalabs.co.kr"
    ],
    softMoon: {
      kicker: "In-house Brand",
      title: "SoftMoon",
      body:
        "SoftMoon is an in-house goods brand that Lava Labs is developing directly. It translates inspiration from space and nature into postcards, stickers, kits, and digital content while giving us practical experience in running a small brand.",
      view: "Explore SoftMoon",
      download: "Download brand introduction"
    },
    audienceTitle: "A Good Fit For",
    audience: [
      "People creating their first brand website or personal portfolio",
      "Creators who want to present work and inquiry information beyond Instagram",
      "Small brands that want photography, copy, and web design to feel consistent",
      "People preparing English or Japanese pages based on a Korean website"
    ],
    contact: {
      kicker: "Contact",
      title: "Let’s start with the one page you need now",
      body:
        "Tell us what you need across a website, portfolio, photography, or content structure. We will review your current situation and materials, then explain a realistic scope and process.",
      name: "Name",
      email: "Email",
      message: "Project details",
      consent: "I agree to the collection and use of my information for a response.",
      submit: "Send inquiry",
      sending: "Sending",
      success: "Your inquiry has been received. We will reply after reviewing it.",
      error: "The form could not be sent. Please email info@lavalabs.co.kr directly.",
      tel: "+82-10-7914-3970",
      emailText: "info@lavalabs.co.kr",
      address: "2F, 47 Ilhyeon-ro, Ilsanseo-gu, Goyang-si, Gyeonggi-do, Korea"
    },
    footer: "Lava Labs builds websites, photography, and content for small brands."
  },
  jp: {
    seoTitle: "Lava Labs | 小さなブランドのためのWebサイトとコンテンツ制作",
    seoDescription:
      "Lava Labsは、小さなブランドやクリエイターに必要なレスポンシブWebサイト、ポートフォリオ、写真、コンテンツを制作します。",
    nav: [
      ["#about", "紹介"],
      ["#services", "サービス"],
      ["#projects", "制作事例"],
      ["#softmoon", "SoftMoon"],
      ["#contact", "お問い合わせ"]
    ],
    hero: {
      eyebrow: "Creative Studio for Small Brands",
      title: "Lava Labs",
      statement: "小さなブランドに必要な最初のWebサイトとコンテンツをつくります。",
      body:
        "大きく複雑なプロジェクトからではなく、今必要な紹介ページ、ポートフォリオ、写真、文章から小さく始め、実際に運用できる形へつなげます。",
      primary: "相談する",
      secondary: "サービスを見る",
      proof: [
        ["WEB", "レスポンシブWebとポートフォリオ"],
        ["PHOTO", "写真とビジュアルコンテンツ"],
        ["KR·EN·JP", "多言語ページ構成"]
      ]
    },
    about: {
      kicker: "About",
      title: "今必要なものから小さくつくり、実際の運用へつなげます",
      body:
        "Lava Labsは、方向性を整理している途中の小さなブランドやクリエイターの話を聞き、訪問者に伝わりやすい構成へ整えます。Webサイト、写真、文章を別々ではなく一つの印象としてつなげます。",
      highlights: [
        "目的と訪問者にしてほしい行動を最初に整理",
        "スマートフォンで見やすいページと問い合わせ導線を制作",
        "写真、文章、Web画面の雰囲気を一つの方向へ統一"
      ]
    },
    servicesTitle: "今から始められるサービス",
    servicesIntro:
      "ブランドが完成していなくても大丈夫です。現実的な範囲を一緒に決め、すぐに使える小さな成果物から制作します。",
    services: [
      {
        icon: "screen" as IconKey,
        title: "Webサイト・ポートフォリオ制作",
        body: "会社紹介、個人ポートフォリオ、撮影問い合わせページなど、情報を明確に伝えて次の行動へつなげるレスポンシブページを制作します。",
        tags: ["レスポンシブ", "情報設計", "問い合わせ導線"]
      },
      {
        icon: "camera" as IconKey,
        title: "写真・ビジュアルコンテンツ",
        body: "人物、空間、商品の雰囲気を伝える写真と、WebサイトやSNSで活用できる画像構成を準備します。",
        tags: ["人物撮影", "ブランドビジュアル", "SNS"]
      },
      {
        icon: "pen" as IconKey,
        title: "ブランド文章・コンテンツ構成",
        body: "散らばった紹介内容を、タイトル、説明、メニュー、ページ順として整理し、訪問者が短時間で理解できる形にします。",
        tags: ["紹介文章", "コンテンツ設計", "UXライティング"]
      },
      {
        icon: "sparkles" as IconKey,
        title: "多言語・運用構造の改善",
        body: "韓国語サイトを基準に英語・日本語ページを構成し、後から管理・拡張しやすい運用方法を検討します。",
        tags: ["KR·EN·JP", "運用改善", "拡張設計"]
      }
    ],
    processTitle: "制作の流れ",
    process: [
      ["相談", "必要なページと現在用意されている資料を確認します。"],
      ["整理", "対象、目的、メニュー、コンテンツの優先順位を決めます。"],
      ["制作", "画面、文章、画像、モバイル構成を段階的につくります。"],
      ["確認", "スマートフォンとPCでリンク、文章、問い合わせ導線を確認します。"],
      ["公開", "ドメインを接続し、更新と運用の方法を整理します。"]
    ],
    expertiseTitle: "制作できる領域",
    expertise: [
      ["screen" as IconKey, "ブランドWebサイト・ランディングページ"],
      ["camera" as IconKey, "人物・空間・コンテンツ撮影"],
      ["pen" as IconKey, "紹介文章とコンテンツ順序"],
      ["package" as IconKey, "SoftMoonグッズ・パッケージ研究"],
      ["map" as IconKey, "撮影・体験案内ページ"],
      ["handshake" as IconKey, "小規模な協業プロジェクト"]
    ],
    projectsTitle: "Featured Project · 365 Daily Snap",
    projects: [
      "人物スナップブランドの撮影イメージと進行方法を一つのページに整理",
      "ポートフォリオ、撮影前ガイド、レビュー、問い合わせ導線を接続",
      "韓国語・英語・日本語ページとモバイル対応を制作",
      "企画、文章、デザイン、開発、運用構造を直接担当",
      "サイトを見る · snap.lavalabs.co.kr"
    ],
    softMoon: {
      kicker: "In-house Brand",
      title: "SoftMoon",
      body:
        "SoftMoonはLava Labsが直接企画し、育てているオリジナルグッズブランドです。宇宙と自然から受けたインスピレーションをポストカード、ステッカー、キット、デジタルコンテンツへ展開し、小さなブランドを実際に運営する過程を経験しています。",
      view: "SoftMoonを見る",
      download: "ブランド資料をダウンロード"
    },
    audienceTitle: "このような方に適しています",
    audience: [
      "初めてブランドサイトや個人ポートフォリオをつくる方",
      "Instagram以外でも作品と問い合わせ情報を整理して見せたいクリエイター",
      "写真、文章、Webサイトの雰囲気を統一したい小さなブランド",
      "韓国語ページを基準に英語・日本語展開を準備する方"
    ],
    contact: {
      kicker: "Contact",
      title: "今必要な一つのページから相談しませんか？",
      body:
        "Webサイト、ポートフォリオ、写真、コンテンツ構成について必要な内容をお送りください。現在の状況と資料を確認し、対応できる範囲と進め方を率直にご案内します。",
      name: "お名前",
      email: "メール",
      message: "ご相談内容",
      consent: "回答のための個人情報の収集・利用に同意します。",
      submit: "送信する",
      sending: "送信中",
      success: "お問い合わせを受け付けました。確認後にご連絡します。",
      error: "送信できませんでした。info@lavalabs.co.kr へ直接ご連絡ください。",
      tel: "+82-10-7914-3970",
      emailText: "info@lavalabs.co.kr",
      address: "韓国 京畿道 高陽市 一山西区 一現路47 2階 Lava Labs"
    },
    footer: "Lava Labsは、小さなブランドのWebサイト、写真、コンテンツを制作します。"
  }
} as const;
