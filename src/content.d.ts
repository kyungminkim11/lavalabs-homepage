export type Locale = "ko" | "en" | "jp";
export type IconKey = "sparkles" | "map" | "package" | "screen" | "handshake" | "clipboard" | "camera" | "pen" | "leaf" | "store";
export declare const locales: Locale[];
export declare const localeLabels: Record<Locale, string>;
export declare const localePaths: Record<Locale, string>;
export declare const content: {
    readonly ko: {
        readonly seoTitle: "Lava Labs | 감성 콘텐츠 & 브랜드 경험 설계";
        readonly seoDescription: "Lava Labs는 감성 콘텐츠, 체험 프로그램, 굿즈, 브랜드 웹 구축을 통해 사람과 브랜드 사이의 깊은 연결을 설계하는 창의 기획 스튜디오입니다.";
        readonly nav: readonly [readonly ["#about", "회사 소개"], readonly ["#services", "서비스"], readonly ["#projects", "프로젝트"], readonly ["#softmoon", "SoftMoon"], readonly ["#contact", "문의"]];
        readonly hero: {
            readonly eyebrow: "Emotional Brand Experience Studio";
            readonly title: "Lava Labs";
            readonly statement: "감정을 설계하고, 브랜드 경험으로 구현합니다.";
            readonly body: "콘텐츠, 체험, 디자인, 디지털 기술을 연결해 브랜드가 사람의 마음에 오래 남는 순간을 만듭니다.";
            readonly primary: "협업 문의";
            readonly secondary: "서비스 보기";
            readonly proof: readonly [readonly ["2022", "설립 이후 감성 콘텐츠 운영"], readonly ["4", "콘텐츠부터 웹 구축까지 핵심 영역"], readonly ["3", "한국어, 영어, 일본어 대응"]];
        };
        readonly about: {
            readonly kicker: "About";
            readonly title: "작은 브랜드의 감정을 경험으로 바꾸는 창의 기획 스튜디오";
            readonly body: "Lava Labs는 감성과 실험정신을 기반으로 브랜드와 사람 사이의 정서적 연결을 설계합니다. 콘텐츠 기획, 체험 프로그램, 굿즈, 웹 구축을 하나의 흐름으로 묶어 브랜드의 서사와 철학이 살아 움직이는 경험을 만듭니다.";
            readonly highlights: readonly ["브랜드의 철학을 콘텐츠와 체험 언어로 번역", "기획, 디자인, 개발, 운영까지 일관된 디렉션", "프리랜서 및 외부 파트너와 유연한 협업 체계"];
        };
        readonly servicesTitle: "핵심 서비스";
        readonly servicesIntro: "필요한 업무만 따로 맡길 수도 있고, 기획부터 납품까지 하나의 프로젝트로 묶어 진행할 수도 있습니다.";
        readonly services: readonly [{
            readonly icon: IconKey;
            readonly title: "감성 콘텐츠 기획";
            readonly body: "식물 MBTI, 감성 테스트, 운세형 콘텐츠처럼 사용자의 감정과 선택을 중심에 둔 인터랙티브 콘텐츠를 기획합니다.";
            readonly tags: readonly ["콘셉트 설계", "UX 라이팅", "결과 알고리즘"];
        }, {
            readonly icon: IconKey;
            readonly title: "오프라인 체험 프로그램";
            readonly body: "브랜드 콘셉트에 맞춘 소규모 클래스, 워크숍, 팝업 체험을 기획하고 현장 운영까지 설계합니다.";
            readonly tags: readonly ["체험 클래스", "공간 동선", "운영 매뉴얼"];
        }, {
            readonly icon: IconKey;
            readonly title: "SoftMoon 굿즈 제작";
            readonly body: "일러스트 기반 엽서, 스티커, 키트, 패키징 등 감성 굿즈를 브랜드 스토리와 함께 제작합니다.";
            readonly tags: readonly ["일러스트", "패키징", "샘플 제작"];
        }, {
            readonly icon: IconKey;
            readonly title: "브랜드 웹 구축";
            readonly body: "마이크로 페이지, 모바일 랜딩페이지, QR 기반 웹앱 등 브랜드 목적에 맞는 디지털 접점을 구축합니다.";
            readonly tags: readonly ["반응형 웹", "랜딩페이지", "QR 웹앱"];
        }];
        readonly processTitle: "프로젝트 진행 방식";
        readonly process: readonly [readonly ["상담", "문의 내용을 바탕으로 목표, 일정, 예산 범위를 정리합니다."], readonly ["제안", "요구사항에 맞춘 기획 방향과 견적을 전달합니다."], readonly ["계약", "범위, 일정, 산출물을 확정하고 제작 자료를 정리합니다."], readonly ["제작", "기획, 디자인, 개발을 단계별로 진행하며 피드백을 반영합니다."], readonly ["납품", "최종 결과물과 운영 가이드를 전달하고 후속 운영을 논의합니다."]];
        readonly expertiseTitle: "전문 대응 영역";
        readonly expertise: readonly [readonly [IconKey, "브랜드 & 콘텐츠 기획"], readonly [IconKey, "공간 연출 및 체험 운영"], readonly [IconKey, "비주얼 디자인 및 스타일 가이드"], readonly [IconKey, "프론트엔드 개발"], readonly [IconKey, "행사 운영 및 팝업 지원"], readonly [IconKey, "촬영 및 미디어 제작"]];
        readonly projectsTitle: "진행 중인 프로젝트";
        readonly projects: readonly ["SoftMoon 오프라인 체험 키트와 굿즈 패키징 테스트", "감성 기반 웹 테스트 시리즈 여름 시즌 론칭", "식물 궁합 테스트 UX 고도화 및 결과 알고리즘 개선", "브랜드 맞춤형 랜딩페이지와 QR 웹앱 템플릿 상용화", "Lava Labs 자체 폰트 제작", "야구 감성 테스트 및 갤럭시 워치 테마 개발"];
        readonly softMoon: {
            readonly kicker: "In-house Brand";
            readonly title: "SoftMoon";
            readonly body: "SoftMoon은 우주와 자연에서 받은 영감을 바탕으로 일상 속 감정과 기억을 따뜻하게 담아내는 감성 굿즈 브랜드입니다. 엽서, 스티커, 키트, 디지털 굿즈를 통해 브랜드 스토리를 확장하고 있습니다.";
            readonly view: "SoftMoon 둘러보기";
            readonly download: "브랜드 소개서 다운로드";
        };
        readonly audienceTitle: "이런 분들과 함께합니다";
        readonly audience: readonly ["브랜드의 감성과 철학을 경험으로 풀어내고 싶은 창업자", "소규모 체험 프로그램과 공간 운영에 관심 있는 기획자", "자신만의 이야기를 굿즈나 콘텐츠로 표현하고 싶은 크리에이터", "감성 중심 프로젝트에 공감하는 프리랜서와 파트너"];
        readonly contact: {
            readonly kicker: "Contact";
            readonly title: "브랜드의 다음 장면을 함께 설계해볼까요?";
            readonly body: "협업, 파트너십, 브랜드 웹 구축, 체험 프로그램 문의를 남겨주시면 프로젝트의 방향과 가능성을 빠르게 검토해 답변드립니다.";
            readonly name: "이름";
            readonly email: "이메일";
            readonly message: "문의 내용";
            readonly consent: "개인정보 수집 및 답변 목적 이용에 동의합니다.";
            readonly submit: "문의 보내기";
            readonly sending: "전송 중";
            readonly success: "문의가 접수되었습니다. 빠르게 확인하겠습니다.";
            readonly error: "전송이 원활하지 않습니다. info@lavalabs.co.kr 로 직접 보내주세요.";
            readonly tel: "010-7914-3970";
            readonly emailText: "info@lavalabs.co.kr";
            readonly address: "경기도 고양시 일산서구 일현로 47, 2층 Lava Labs";
        };
        readonly footer: "Lava Labs는 감성 콘텐츠와 브랜드 경험 설계를 중심으로 다양한 프로젝트를 운영합니다.";
    };
    readonly en: {
        readonly seoTitle: "Lava Labs | Emotional Content & Brand Experience Studio";
        readonly seoDescription: "Lava Labs designs emotional content, brand experiences, goods, and responsive brand websites for memorable customer connections.";
        readonly nav: readonly [readonly ["#about", "About"], readonly ["#services", "Services"], readonly ["#projects", "Projects"], readonly ["#softmoon", "SoftMoon"], readonly ["#contact", "Contact"]];
        readonly hero: {
            readonly eyebrow: "Emotional Brand Experience Studio";
            readonly title: "Lava Labs";
            readonly statement: "We design emotion and turn it into brand experiences.";
            readonly body: "We connect content, experiences, design, and digital technology to create moments that stay with people.";
            readonly primary: "Start a project";
            readonly secondary: "View services";
            readonly proof: readonly [readonly ["2022", "Building emotional content since"], readonly ["4", "Core service areas"], readonly ["3", "Korean, English, and Japanese"]];
        };
        readonly about: {
            readonly kicker: "About";
            readonly title: "A creative studio turning brand emotion into tangible experiences";
            readonly body: "Lava Labs builds emotional connections between brands and people. We combine content planning, workshops, goods, and web production into a coherent brand journey.";
            readonly highlights: readonly ["Translate brand philosophy into content and experience", "Direct planning, design, development, and operations", "Flexible collaboration with trusted freelance partners"];
        };
        readonly servicesTitle: "Core Services";
        readonly servicesIntro: "Work with us on one focused task or connect planning, design, production, and delivery into one project.";
        readonly services: readonly [{
            readonly icon: IconKey;
            readonly title: "Emotional content";
            readonly body: "Interactive tests and story-led content built around user choices, feelings, and shareable results.";
            readonly tags: readonly ["Concept", "UX writing", "Result logic"];
        }, {
            readonly icon: IconKey;
            readonly title: "Offline experiences";
            readonly body: "Small classes, workshops, and pop-up programs designed around the brand concept and on-site flow.";
            readonly tags: readonly ["Workshops", "Spatial flow", "Operations"];
        }, {
            readonly icon: IconKey;
            readonly title: "SoftMoon goods";
            readonly body: "Illustration-led postcards, stickers, kits, and packaging that carry a warm brand story.";
            readonly tags: readonly ["Illustration", "Packaging", "Sampling"];
        }, {
            readonly icon: IconKey;
            readonly title: "Brand web builds";
            readonly body: "Responsive landing pages, micro-sites, and QR-based web apps tailored to each brand goal.";
            readonly tags: readonly ["Responsive web", "Landing pages", "QR apps"];
        }];
        readonly processTitle: "How Projects Move";
        readonly process: readonly [readonly ["Consult", "We clarify goals, scope, schedule, and budget range."], readonly ["Propose", "We share a tailored direction and estimate."], readonly ["Align", "We confirm scope, timeline, deliverables, and materials."], readonly ["Produce", "Planning, design, and development move in clear feedback rounds."], readonly ["Deliver", "We hand over the final work and discuss operation needs."]];
        readonly expertiseTitle: "Specialist Coverage";
        readonly expertise: readonly [readonly [IconKey, "Brand and content planning"], readonly [IconKey, "Experience and space direction"], readonly [IconKey, "Visual design and style guides"], readonly [IconKey, "Frontend development"], readonly [IconKey, "Event and pop-up operation"], readonly [IconKey, "Photo and media production"]];
        readonly projectsTitle: "Current Projects";
        readonly projects: readonly ["SoftMoon offline kit and goods packaging tests", "Seasonal emotional web-test series", "Plant compatibility test UX and result logic upgrades", "Brand landing page and QR web-app templates", "Lava Labs original typeface", "Baseball emotion tests and Galaxy Watch themes"];
        readonly softMoon: {
            readonly kicker: "In-house Brand";
            readonly title: "SoftMoon";
            readonly body: "SoftMoon is a warm goods brand inspired by space and nature. It expands everyday memories through postcards, stickers, kits, and digital goods.";
            readonly view: "Explore SoftMoon";
            readonly download: "Download brand intro";
        };
        readonly audienceTitle: "Who We Work With";
        readonly audience: readonly ["Founders who want to express a brand philosophy as an experience", "Planners interested in small workshops and spaces", "Creators turning their story into goods or content", "Freelancers and partners who care about emotional projects"];
        readonly contact: {
            readonly kicker: "Contact";
            readonly title: "Shall we design the next scene for your brand?";
            readonly body: "Send a note about collaboration, partnership, brand web builds, or experience programs. We will review the direction and reply thoughtfully.";
            readonly name: "Name";
            readonly email: "Email";
            readonly message: "Message";
            readonly consent: "I agree to the use of my contact details for reply purposes.";
            readonly submit: "Send inquiry";
            readonly sending: "Sending";
            readonly success: "Your inquiry has been received. We will review it soon.";
            readonly error: "Something went wrong. Please email info@lavalabs.co.kr directly.";
            readonly tel: "010-7914-3970";
            readonly emailText: "info@lavalabs.co.kr";
            readonly address: "2F, 47 Ilhyeon-ro, Ilsanseo-gu, Goyang-si, Gyeonggi-do, Korea";
        };
        readonly footer: "Lava Labs designs emotional content and brand experiences across digital and physical touchpoints.";
    };
    readonly jp: {
        readonly seoTitle: "Lava Labs | 感性コンテンツ & ブランド体験設計";
        readonly seoDescription: "Lava Labsは感性コンテンツ、体験プログラム、グッズ、ブランドWebを通じて、ブランドと人をつなぐ体験を設計します。";
        readonly nav: readonly [readonly ["#about", "紹介"], readonly ["#services", "サービス"], readonly ["#projects", "プロジェクト"], readonly ["#softmoon", "SoftMoon"], readonly ["#contact", "お問い合わせ"]];
        readonly hero: {
            readonly eyebrow: "Emotional Brand Experience Studio";
            readonly title: "Lava Labs";
            readonly statement: "感情を設計し、ブランド体験として形にします。";
            readonly body: "コンテンツ、体験、デザイン、デジタル技術をつなぎ、人の心に残るブランドの瞬間をつくります。";
            readonly primary: "相談する";
            readonly secondary: "サービスを見る";
            readonly proof: readonly [readonly ["2022", "設立以降、感性コンテンツを運営"], readonly ["4", "主要サービス領域"], readonly ["3", "韓国語、英語、日本語対応"]];
        };
        readonly about: {
            readonly kicker: "About";
            readonly title: "ブランドの感情を体験に変えるクリエイティブスタジオ";
            readonly body: "Lava Labsは感性と実験精神をもとに、ブランドと人の情緒的なつながりを設計します。企画、体験、グッズ、Web制作を一つの流れとして構築します。";
            readonly highlights: readonly ["ブランド哲学をコンテンツと体験に翻訳", "企画、デザイン、開発、運営を一貫してディレクション", "信頼できる外部パートナーとの柔軟な協業"];
        };
        readonly servicesTitle: "主要サービス";
        readonly servicesIntro: "必要な業務のみの依頼から、企画、制作、納品までを一つにまとめた進行まで対応します。";
        readonly services: readonly [{
            readonly icon: IconKey;
            readonly title: "感性コンテンツ企画";
            readonly body: "ユーザーの感情と選択を中心にした診断型、ストーリー型のインタラクティブコンテンツを企画します。";
            readonly tags: readonly ["コンセプト", "UXライティング", "結果ロジック"];
        }, {
            readonly icon: IconKey;
            readonly title: "オフライン体験";
            readonly body: "ブランドコンセプトに合わせた小規模クラス、ワークショップ、ポップアップ体験を設計します。";
            readonly tags: readonly ["ワークショップ", "動線設計", "運営"];
        }, {
            readonly icon: IconKey;
            readonly title: "SoftMoonグッズ";
            readonly body: "イラストを中心に、ポストカード、ステッカー、キット、パッケージを制作します。";
            readonly tags: readonly ["イラスト", "パッケージ", "サンプル"];
        }, {
            readonly icon: IconKey;
            readonly title: "ブランドWeb制作";
            readonly body: "レスポンシブなランディングページ、マイクロサイト、QR連動Webアプリを構築します。";
            readonly tags: readonly ["レスポンシブ", "LP", "QRアプリ"];
        }];
        readonly processTitle: "進行プロセス";
        readonly process: readonly [readonly ["相談", "目標、範囲、日程、予算感を整理します。"], readonly ["提案", "要件に合わせた方向性と見積もりを共有します。"], readonly ["契約", "範囲、日程、成果物、制作資料を確定します。"], readonly ["制作", "企画、デザイン、開発を段階的に進めます。"], readonly ["納品", "最終成果物と運営ガイドをお渡しします。"]];
        readonly expertiseTitle: "対応領域";
        readonly expertise: readonly [readonly [IconKey, "ブランド & コンテンツ企画"], readonly [IconKey, "空間演出と体験運営"], readonly [IconKey, "ビジュアルデザイン"], readonly [IconKey, "フロントエンド開発"], readonly [IconKey, "イベント・ポップアップ支援"], readonly [IconKey, "撮影・メディア制作"]];
        readonly projectsTitle: "進行中のプロジェクト";
        readonly projects: readonly ["SoftMoon体験キットとグッズパッケージテスト", "感性Web診断シリーズのシーズン展開", "植物相性テストのUXと結果ロジック改善", "ブランドLPとQR Webアプリテンプレート", "Lava Labsオリジナルフォント", "野球感性テストとGalaxy Watchテーマ"];
        readonly softMoon: {
            readonly kicker: "In-house Brand";
            readonly title: "SoftMoon";
            readonly body: "SoftMoonは宇宙と自然からインスピレーションを受け、日常の感情と記憶をあたたかく表現する感性グッズブランドです。";
            readonly view: "SoftMoonを見る";
            readonly download: "ブランド紹介書をダウンロード";
        };
        readonly audienceTitle: "一緒に取り組みたい方";
        readonly audience: readonly ["ブランド哲学を体験として表現したい創業者", "小規模体験プログラムや空間運営に関心のある企画者", "自分の物語をグッズやコンテンツで伝えたいクリエイター", "感性中心のプロジェクトに共感するパートナー"];
        readonly contact: {
            readonly kicker: "Contact";
            readonly title: "ブランドの次の場面を一緒に設計しませんか。";
            readonly body: "協業、パートナーシップ、ブランドWeb、体験プログラムについてお気軽にお問い合わせください。";
            readonly name: "お名前";
            readonly email: "メール";
            readonly message: "お問い合わせ内容";
            readonly consent: "返信のための個人情報利用に同意します。";
            readonly submit: "送信する";
            readonly sending: "送信中";
            readonly success: "お問い合わせを受け付けました。確認後ご連絡します。";
            readonly error: "送信できませんでした。info@lavalabs.co.kr へ直接お送りください。";
            readonly tel: "010-7914-3970";
            readonly emailText: "info@lavalabs.co.kr";
            readonly address: "韓国 京畿道 高陽市 一山西区 一現路47 2F Lava Labs";
        };
        readonly footer: "Lava Labsは感性コンテンツとブランド体験設計を中心に多様なプロジェクトを運営しています。";
    };
};
