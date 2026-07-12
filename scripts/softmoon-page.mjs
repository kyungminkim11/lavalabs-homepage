const formEndpoint = "https://formspree.io/f/mpwdpqzk";

const brandLogo = `<a class="softmoon-brand" href="/soft_moon/" aria-label="SoftMoon home"><img src="/assets/images/softmoon-logo.svg" alt="SoftMoon" width="248" height="56"></a>`;
const lavaLogo = `<picture class="lava-brand-mark"><source srcset="/assets/images/lava-logo-transparent-160.webp" type="image/webp"><img src="/assets/images/lava-logo-transparent.png" alt="" width="36" height="36"></picture>`;

const copy = {
  ko: {
    home: "/",
    path: "/soft_moon/",
    langLabel: "언어 선택",
    skip: "본문으로 이동",
    navLabel: "SoftMoon 페이지 메뉴",
    nav: [["preview", "제품 미리보기"], ["principles", "브랜드 기준"], ["lab", "SoftMoon Lab"], ["roadmap", "로드맵"], ["updates", "출시 알림"], ["collaboration", "협업"]],
    eyebrow: "SoftMoon by Lava Labs",
    status: "첫 번째 컬렉션 준비 중",
    title: "SoftMoon",
    statement: "우주와 자연의 분위기를 오래 곁에 두는 작은 물건으로 만듭니다.",
    body: "SoftMoon은 종이, 작은 오브제, 패키징과 디지털 콘텐츠를 하나의 경험으로 연결하는 Lava Labs의 자체 브랜드입니다. 지금은 첫 번째 결과물을 서두르지 않고, 실제로 쓰고 간직할 이유가 있는지 확인하며 준비하고 있습니다.",
    primary: "제품 미리보기",
    secondary: "출시 소식 받기",
    intro: "브랜드 소개서 PDF",
    meta: ["Paper & Object", "Physical × Digital", "Small-batch Study"],
    phaseLabel: "Current Phase",
    phaseTitle: "Prototype & Brand System",
    phaseBody: "브랜드 시각 언어와 페이퍼 굿즈 시제품을 함께 다듬는 단계입니다.",
    gallery: ["종이와 인쇄 질감 연구", "제품과 패키지가 이어지는 경험"],
    previewLabel: "First Collection Preview",
    previewTitle: "아직 판매 전이지만, 지금 만들고 있는 방향을 먼저 공개합니다.",
    previewLead: "완제품처럼 포장하기보다 현재 상태를 정확히 표시합니다. 아래 이미지는 디자인과 사용성을 확인하기 위한 콘셉트·시제품 연구입니다.",
    previewItems: [
      { number: "01", status: "Prototype", type: "Paper Study", title: "Paper Study 01", desc: "짧은 문장과 여백, 인쇄 질감이 한 장 안에서 어떻게 오래 남는지 확인하는 페이퍼 굿즈 연구입니다.", meta: ["Card format", "Print test", "In review"], image: 1 },
      { number: "02", status: "Concept", type: "Object & Package", title: "Object Study 02", desc: "작은 제품을 받는 순간부터 보관하는 시간까지 자연스럽게 이어지는 패키지 구조를 연구합니다.", meta: ["Small object", "Packaging", "Material study"], image: 2 },
      { number: "03", status: "Testing", type: "Digital Layer", title: "Digital Extension 03", desc: "QR과 웹 콘텐츠를 활용해 실물 제품의 기록, 이야기와 다음 경험이 화면에서 이어지도록 실험합니다.", meta: ["QR", "Mobile web", "Story archive"], image: 0 }
    ],
    principlesLabel: "Design Principles",
    principlesTitle: "SoftMoon이 지키는 세 가지 기준",
    principles: [
      ["분위기", "우주와 자연에서 가져온 색, 빛과 여백을 일관된 시각 언어로 다룹니다."],
      ["쓰임", "보기 좋은 것에서 멈추지 않고 기록하고 나누고 간직할 이유가 있는지 확인합니다."],
      ["연결", "종이, 패키지, 사진과 웹 콘텐츠가 따로 놀지 않고 하나의 이야기로 이어지게 설계합니다."]
    ],
    labLabel: "SoftMoon Lab",
    labTitle: "연구 분야와 제작 과정을 하나의 흐름으로 운영합니다.",
    labLead: "상품 수를 빠르게 늘리는 대신, 작은 단위로 만들고 직접 사용해 본 결과를 다음 시제품에 반영합니다.",
    areas: [
      ["01", "페이퍼 굿즈", "엽서, 스티커, 카드와 소형 인쇄물의 색·문장·재질 조합을 연구합니다.", ["Postcard", "Sticker", "Print"]],
      ["02", "소형 키트", "기록, 수집과 참여를 자연스럽게 유도하는 작고 명확한 키트 구조를 개발합니다.", ["Record", "Collect", "Participate"]],
      ["03", "패키징", "받는 순간부터 보관하는 시간까지 브랜드 경험이 이어지는 포장을 설계합니다.", ["Unboxing", "Texture", "Reuse"]],
      ["04", "디지털 콘텐츠", "QR, 웹 페이지와 이미지 콘텐츠로 실물 제품의 이야기를 화면까지 확장합니다.", ["QR", "Web", "Archive"]]
    ],
    processLabel: "How We Build",
    process: [
      ["01", "관찰", "일상에서 오래 남는 색, 문장, 행동과 불편을 수집합니다."],
      ["02", "시제품", "종이와 화면 위에서 빠르게 조합하고 작은 샘플로 만듭니다."],
      ["03", "사용 테스트", "직접 쓰고 보여주며 크기, 재질, 흐름과 문장을 조정합니다."],
      ["04", "소규모 공개", "준비된 결과부터 제한된 범위에서 소개하고 다음 개선으로 연결합니다."]
    ],
    roadmapLabel: "Now & Next",
    roadmapTitle: "준비 상태를 숨기지 않고 공개합니다.",
    roadmapLead: "일정은 품질과 테스트 결과에 따라 조정될 수 있습니다. 변경이 생기면 이 페이지와 Lava Labs 채널에 업데이트합니다.",
    roadmap: [
      ["2026 Q3", "진행 중", "브랜드 시스템 정리", "로고, 색, 문장과 제품에 적용할 시각 기준을 확정합니다.", "current"],
      ["2026 Q3", "다음 단계", "페이퍼 굿즈 시제품", "첫 번째 인쇄 샘플과 패키지 구조를 제작하고 사용성을 확인합니다.", "next"],
      ["2026 Q4", "예정", "소규모 사용 테스트", "한정된 인원과 함께 사용 경험, 보관성과 디지털 연결 흐름을 검토합니다.", "planned"],
      ["준비 완료 후", "공개", "첫 번째 소규모 릴리스", "충분히 준비된 결과물부터 수량과 기간을 정해 공개합니다.", "planned"]
    ],
    updatesLabel: "Launch Updates",
    updatesTitle: "첫 번째 공개 소식을 가장 먼저 받아보세요.",
    updatesBody: "제품 공개, 테스트 참여와 소규모 판매 일정이 확정되었을 때만 안내합니다. 광고 폭탄은 없습니다. 달도 매일 뜨는데 메일은 그렇게 자주 안 갑니다.",
    name: "이름",
    email: "이메일",
    updateConsent: "출시 알림을 받기 위한 개인정보 수집 및 이용에 동의합니다.",
    privacy: "개인정보처리방침",
    updateSubmit: "출시 알림 신청",
    collaborationLabel: "Collaboration",
    collaborationTitle: "작은 물건과 콘텐츠를 함께 설계할 파트너를 기다립니다.",
    collaborationBody: "굿즈 기획, 소량 제작, 패키징, 촬영과 디지털 콘텐츠가 함께 필요한 프로젝트를 구체적으로 검토합니다.",
    company: "브랜드·회사명",
    inquiryType: "문의 유형",
    inquiryOptions: [["goods", "굿즈 기획·제작"], ["package", "패키징"], ["content", "촬영·콘텐츠"], ["digital", "QR·웹 연결"], ["other", "기타"]],
    timeline: "희망 일정",
    timelineOptions: [["flexible", "일정 협의"], ["1-2m", "1~2개월 이내"], ["3-4m", "3~4개월 이내"], ["later", "장기 검토"]],
    message: "프로젝트 내용",
    collabConsent: "프로젝트 상담을 위한 개인정보 수집 및 이용에 동의합니다.",
    collabSubmit: "협업 문의 보내기",
    back: "Lava Labs로 돌아가기",
    footer: "SoftMoon은 Lava Labs가 기획하고 운영하는 자체 브랜드입니다.",
    sending: "전송 중입니다…",
    success: "접수되었습니다. 확인 후 안내드리겠습니다.",
    error: "전송하지 못했습니다. 잠시 후 다시 시도하거나 info@lavalabs.co.kr로 보내주세요."
  },
  en: {
    home: "/en/",
    path: "/en/soft_moon/",
    langLabel: "Choose language",
    skip: "Skip to content",
    navLabel: "SoftMoon page menu",
    nav: [["preview", "Preview"], ["principles", "Principles"], ["lab", "SoftMoon Lab"], ["roadmap", "Roadmap"], ["updates", "Updates"], ["collaboration", "Collaboration"]],
    eyebrow: "SoftMoon by Lava Labs",
    status: "Preparing the first collection",
    title: "SoftMoon",
    statement: "Small objects that keep the atmosphere of space and nature close.",
    body: "SoftMoon is an in-house brand by Lava Labs connecting paper, small objects, packaging, and digital content into one experience. We are preparing our first outcomes carefully, testing whether each object has a real reason to be used and kept.",
    primary: "Preview the collection",
    secondary: "Get launch updates",
    intro: "Brand introduction PDF",
    meta: ["Paper & Object", "Physical × Digital", "Small-batch Study"],
    phaseLabel: "Current Phase",
    phaseTitle: "Prototype & Brand System",
    phaseBody: "We are refining the visual system and early paper-goods prototypes together.",
    gallery: ["Paper and print texture study", "A connected product and packaging experience"],
    previewLabel: "First Collection Preview",
    previewTitle: "Not for sale yet. Here is what we are building.",
    previewLead: "We label the current stage honestly rather than presenting unfinished work as a final product. These are concept and prototype studies for design and usability.",
    previewItems: [
      { number: "01", status: "Prototype", type: "Paper Study", title: "Paper Study 01", desc: "A paper-goods study exploring how short phrases, space, and print texture can stay with the user.", meta: ["Card format", "Print test", "In review"], image: 1 },
      { number: "02", status: "Concept", type: "Object & Package", title: "Object Study 02", desc: "A packaging study connecting the moment an object is received with how it is kept over time.", meta: ["Small object", "Packaging", "Material study"], image: 2 },
      { number: "03", status: "Testing", type: "Digital Layer", title: "Digital Extension 03", desc: "An experiment using QR and web content to continue the record, story, and next experience on screen.", meta: ["QR", "Mobile web", "Story archive"], image: 0 }
    ],
    principlesLabel: "Design Principles",
    principlesTitle: "Three standards SoftMoon follows",
    principles: [
      ["Atmosphere", "We shape colors, light, and space inspired by nature and the cosmos into one visual language."],
      ["Purpose", "We ask whether an object deserves to be used, shared, recorded, and kept—not merely admired."],
      ["Continuity", "Paper, packaging, photography, and web content are designed as connected parts of one story."]
    ],
    labLabel: "SoftMoon Lab",
    labTitle: "Research and production operate as one continuous flow.",
    labLead: "Instead of rapidly expanding the catalogue, we build in small units, use them directly, and carry the findings into the next prototype.",
    areas: [
      ["01", "Paper Goods", "We study combinations of color, language, and material through postcards, stickers, cards, and small prints.", ["Postcard", "Sticker", "Print"]],
      ["02", "Small Kits", "We develop compact kit formats that encourage recording, collecting, and participation.", ["Record", "Collect", "Participate"]],
      ["03", "Packaging", "We design packaging that carries the experience from receiving an object to keeping it.", ["Unboxing", "Texture", "Reuse"]],
      ["04", "Digital Content", "QR, web pages, and visual content extend the story of a physical product onto the screen.", ["QR", "Web", "Archive"]]
    ],
    processLabel: "How We Build",
    process: [
      ["01", "Observe", "Collect colors, phrases, behaviors, and frictions that linger in everyday life."],
      ["02", "Prototype", "Combine ideas quickly on paper and screen, then make small samples."],
      ["03", "Use Test", "Use and share samples, adjusting size, material, flow, and language."],
      ["04", "Small Release", "Introduce ready outcomes on a limited scale and carry feedback forward."]
    ],
    roadmapLabel: "Now & Next",
    roadmapTitle: "We make the preparation stage visible.",
    roadmapLead: "Timing may change based on quality and test results. Updates will be posted here and through Lava Labs channels.",
    roadmap: [
      ["2026 Q3", "In progress", "Brand system", "Finalize the logo, color, language, and visual standards for products.", "current"],
      ["2026 Q3", "Next", "Paper prototypes", "Produce initial print samples and packaging structures for usability review.", "next"],
      ["2026 Q4", "Planned", "Small user test", "Review use, storage, and digital connection flows with a limited group.", "planned"],
      ["When ready", "Release", "First small release", "Introduce the first fully prepared outcomes with a defined quantity and period.", "planned"]
    ],
    updatesLabel: "Launch Updates",
    updatesTitle: "Hear about the first release before anyone else.",
    updatesBody: "We will only write when a product release, test participation, or small-batch sale is confirmed.",
    name: "Name",
    email: "Email",
    updateConsent: "I agree to the collection and use of my information for launch updates.",
    privacy: "Privacy policy",
    updateSubmit: "Subscribe to launch updates",
    collaborationLabel: "Collaboration",
    collaborationTitle: "We welcome partners who need objects and content designed together.",
    collaborationBody: "We review projects involving goods planning, small-batch production, packaging, photography, and connected digital content.",
    company: "Brand or company",
    inquiryType: "Inquiry type",
    inquiryOptions: [["goods", "Goods planning & production"], ["package", "Packaging"], ["content", "Photography & content"], ["digital", "QR & web connection"], ["other", "Other"]],
    timeline: "Preferred timeline",
    timelineOptions: [["flexible", "Flexible"], ["1-2m", "Within 1–2 months"], ["3-4m", "Within 3–4 months"], ["later", "Long-term planning"]],
    message: "Project details",
    collabConsent: "I agree to the collection and use of my information for project consultation.",
    collabSubmit: "Send collaboration inquiry",
    back: "Back to Lava Labs",
    footer: "SoftMoon is an in-house brand planned and operated by Lava Labs.",
    sending: "Sending…",
    success: "Received. We will follow up after review.",
    error: "We could not send the form. Please try again or email info@lavalabs.co.kr."
  },
  jp: {
    home: "/jp/",
    path: "/jp/soft_moon/",
    langLabel: "言語を選択",
    skip: "本文へ移動",
    navLabel: "SoftMoonページメニュー",
    nav: [["preview", "プレビュー"], ["principles", "基準"], ["lab", "SoftMoon Lab"], ["roadmap", "ロードマップ"], ["updates", "お知らせ"], ["collaboration", "コラボレーション"]],
    eyebrow: "SoftMoon by Lava Labs",
    status: "最初のコレクションを準備中",
    title: "SoftMoon",
    statement: "宇宙と自然の空気感を、長くそばに置ける小さなものへ。",
    body: "SoftMoonは、紙、小さなオブジェ、パッケージ、デジタルコンテンツを一つの体験としてつなぐLava Labsの自社ブランドです。実際に使い、残しておく理由があるかを確かめながら、最初の成果物を丁寧に準備しています。",
    primary: "コレクションを見る",
    secondary: "公開情報を受け取る",
    intro: "ブランド紹介PDF",
    meta: ["Paper & Object", "Physical × Digital", "Small-batch Study"],
    phaseLabel: "Current Phase",
    phaseTitle: "Prototype & Brand System",
    phaseBody: "ブランドのビジュアルシステムとペーパーグッズの試作品を同時に磨いています。",
    gallery: ["紙と印刷の質感研究", "商品とパッケージが続く体験"],
    previewLabel: "First Collection Preview",
    previewTitle: "販売前の段階から、今作っている方向を公開します。",
    previewLead: "未完成のものを完成品のように見せず、現在の段階を正確に表示します。以下はデザインと使いやすさを確認するためのコンセプト・試作品です。",
    previewItems: [
      { number: "01", status: "Prototype", type: "Paper Study", title: "Paper Study 01", desc: "短い言葉、余白、印刷の質感が一枚の中でどう残るかを確かめる研究です。", meta: ["Card format", "Print test", "In review"], image: 1 },
      { number: "02", status: "Concept", type: "Object & Package", title: "Object Study 02", desc: "小さな商品を受け取る瞬間から保管する時間まで続くパッケージ構造を研究します。", meta: ["Small object", "Packaging", "Material study"], image: 2 },
      { number: "03", status: "Testing", type: "Digital Layer", title: "Digital Extension 03", desc: "QRとWebコンテンツで、実物商品の記録や物語を画面上の次の体験へつなげます。", meta: ["QR", "Mobile web", "Story archive"], image: 0 }
    ],
    principlesLabel: "Design Principles",
    principlesTitle: "SoftMoonが大切にする三つの基準",
    principles: [
      ["雰囲気", "宇宙と自然から得た色、光、余白を一貫したビジュアル言語として扱います。"],
      ["使い方", "見た目だけで終わらず、使い、分かち合い、記録し、残す理由があるかを確かめます。"],
      ["つながり", "紙、パッケージ、写真、Webコンテンツを一つの物語として設計します。"]
    ],
    labLabel: "SoftMoon Lab",
    labTitle: "研究領域と制作過程を一つの流れとして運営します。",
    labLead: "商品数を急いで増やすのではなく、小さく作って直接使い、その結果を次の試作品へ反映します。",
    areas: [
      ["01", "ペーパーグッズ", "ポストカード、ステッカー、カード、小型印刷物で色・言葉・素材の組み合わせを研究します。", ["Postcard", "Sticker", "Print"]],
      ["02", "スモールキット", "記録、収集、参加を自然に促す、小さく明確なキット構造を開発します。", ["Record", "Collect", "Participate"]],
      ["03", "パッケージ", "受け取る瞬間から保管する時間までブランド体験が続く包装を設計します。", ["Unboxing", "Texture", "Reuse"]],
      ["04", "デジタルコンテンツ", "QR、Webページ、画像コンテンツで実物商品の物語を画面まで広げます。", ["QR", "Web", "Archive"]]
    ],
    processLabel: "How We Build",
    process: [
      ["01", "観察", "日常に残る色、言葉、行動、不便さを集めます。"],
      ["02", "試作", "紙と画面で素早く組み合わせ、小さなサンプルにします。"],
      ["03", "使用テスト", "実際に使い、見せながら、サイズ、素材、流れ、言葉を調整します。"],
      ["04", "小規模公開", "準備が整ったものから限定的に紹介し、次の改善につなげます。"]
    ],
    roadmapLabel: "Now & Next",
    roadmapTitle: "準備の状態も隠さず公開します。",
    roadmapLead: "品質とテスト結果によって日程は調整される場合があります。変更内容はこのページとLava Labsのチャンネルで案内します。",
    roadmap: [
      ["2026 Q3", "進行中", "ブランドシステム", "ロゴ、色、言葉、商品に適用するビジュアル基準を確定します。", "current"],
      ["2026 Q3", "次の段階", "ペーパー試作品", "最初の印刷サンプルとパッケージ構造を作り、使いやすさを確認します。", "next"],
      ["2026 Q4", "予定", "小規模使用テスト", "限定された参加者と使用感、保管性、デジタル連携を確認します。", "planned"],
      ["準備完了後", "公開", "最初の小規模リリース", "十分に準備できた成果物から数量と期間を定めて公開します。", "planned"]
    ],
    updatesLabel: "Launch Updates",
    updatesTitle: "最初の公開情報をいち早くお届けします。",
    updatesBody: "商品公開、テスト参加、小規模販売の日程が決まった時だけお知らせします。",
    name: "お名前",
    email: "メール",
    updateConsent: "公開情報を受け取るための個人情報の収集・利用に同意します。",
    privacy: "プライバシーポリシー",
    updateSubmit: "公開情報を申し込む",
    collaborationLabel: "Collaboration",
    collaborationTitle: "小さなものとコンテンツを一緒に設計するパートナーを募集しています。",
    collaborationBody: "グッズ企画、小ロット制作、パッケージ、撮影、デジタルコンテンツが必要なプロジェクトを具体的に検討します。",
    company: "ブランド・会社名",
    inquiryType: "お問い合わせ種類",
    inquiryOptions: [["goods", "グッズ企画・制作"], ["package", "パッケージ"], ["content", "撮影・コンテンツ"], ["digital", "QR・Web連携"], ["other", "その他"]],
    timeline: "希望時期",
    timelineOptions: [["flexible", "相談可能"], ["1-2m", "1〜2か月以内"], ["3-4m", "3〜4か月以内"], ["later", "長期検討"]],
    message: "プロジェクト内容",
    collabConsent: "プロジェクト相談のための個人情報の収集・利用に同意します。",
    collabSubmit: "相談内容を送信",
    back: "Lava Labsへ戻る",
    footer: "SoftMoonはLava Labsが企画・運営する自社ブランドです。",
    sending: "送信中です…",
    success: "受け付けました。確認後ご案内します。",
    error: "送信できませんでした。再度お試しいただくか、info@lavalabs.co.krへご連絡ください。"
  }
};

const languageSwitcher = (locale, t) => `<div class="softmoon-language" aria-label="${t.langLabel}">
  <a href="/soft_moon/"${locale === "ko" ? ' aria-current="page"' : ""}>한국어</a>
  <a href="/en/soft_moon/"${locale === "en" ? ' aria-current="page"' : ""}>English</a>
  <a href="/jp/soft_moon/"${locale === "jp" ? ' aria-current="page"' : ""}>日本語</a>
</div>`;

const sectionNav = (t, className = "") => `<nav class="softmoon-section-nav ${className}" aria-label="${t.navLabel}">
  ${t.nav.map(([id, label]) => `<a href="#${id}" data-section-link="${id}">${label}</a>`).join("")}
</nav>`;

const previewCard = (item) => {
  const visual = item.image
    ? `<picture><source srcset="/assets/images/lunar-sample-${item.image}-720.webp" type="image/webp"><img src="/assets/images/lunar-sample-${item.image}.jpg" alt="${item.title}" width="720" height="900" loading="lazy" decoding="async"></picture>`
    : `<div class="softmoon-digital-visual" aria-label="${item.title}">
        <div class="softmoon-phone">
          <span class="softmoon-phone-orbit"></span>
          <strong>SoftMoon Archive</strong>
          <small>Scan · Record · Continue</small>
          <div class="softmoon-qr" aria-hidden="true"></div>
        </div>
      </div>`;
  return `<article class="softmoon-preview-card">
    <div class="softmoon-preview-visual">${visual}<span class="softmoon-stage">${item.status}</span></div>
    <div class="softmoon-preview-copy">
      <div class="softmoon-preview-kicker"><span>${item.number}</span><span>${item.type}</span></div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <ul>${item.meta.map((value) => `<li>${value}</li>`).join("")}</ul>
    </div>
  </article>`;
};

const formStatus = () => `<p class="softmoon-form-status" data-form-status role="status" aria-live="polite"></p>`;

const launchForm = (t, locale) => `<form class="softmoon-form softmoon-launch-form" action="${formEndpoint}" method="POST" data-softmoon-form>
  <input type="hidden" name="source" value="softmoon launch updates">
  <input type="hidden" name="locale" value="${locale}">
  <input type="hidden" name="_subject" value="SoftMoon launch update subscription">
  <div class="softmoon-form-grid">
    <label><span>${t.name}</span><input name="name" autocomplete="name"></label>
    <label><span>${t.email}</span><input name="email" type="email" autocomplete="email" inputmode="email" required></label>
  </div>
  <label class="softmoon-honeypot" aria-hidden="true"><span>Website</span><input name="website" tabindex="-1" autocomplete="off"></label>
  <label class="softmoon-consent"><input type="checkbox" name="consent" required><span>${t.updateConsent} <a href="/privacy/">${t.privacy}</a></span></label>
  <button class="softmoon-button softmoon-button-primary" type="submit">${t.updateSubmit}</button>
  ${formStatus()}
</form>`;

const collaborationForm = (t, locale) => `<form class="softmoon-form softmoon-collaboration-form" action="${formEndpoint}" method="POST" data-softmoon-form>
  <input type="hidden" name="source" value="softmoon collaboration">
  <input type="hidden" name="locale" value="${locale}">
  <input type="hidden" name="_subject" value="SoftMoon collaboration inquiry">
  <div class="softmoon-form-grid">
    <label><span>${t.name}</span><input name="name" autocomplete="name" required></label>
    <label><span>${t.email}</span><input name="email" type="email" autocomplete="email" inputmode="email" required></label>
    <label><span>${t.company}</span><input name="company" autocomplete="organization"></label>
    <label><span>${t.inquiryType}</span><select name="inquiryType" required><option value="">-</option>${t.inquiryOptions.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select></label>
    <label><span>${t.timeline}</span><select name="timeline" required><option value="">-</option>${t.timelineOptions.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select></label>
  </div>
  <label><span>${t.message}</span><textarea name="message" rows="6" required></textarea></label>
  <label class="softmoon-honeypot" aria-hidden="true"><span>Website</span><input name="website" tabindex="-1" autocomplete="off"></label>
  <label class="softmoon-consent"><input type="checkbox" name="consent" required><span>${t.collabConsent} <a href="/privacy/">${t.privacy}</a></span></label>
  <button class="softmoon-button softmoon-button-primary" type="submit">${t.collabSubmit}</button>
  ${formStatus()}
</form>`;

function runtime(t) {
  return `<script>
  (() => {
    const messages = ${JSON.stringify({ sending: t.sending, success: t.success, error: t.error })};
    document.querySelectorAll("[data-softmoon-form]").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const status = form.querySelector("[data-form-status]");
        const submit = form.querySelector('button[type="submit"]');
        const data = new FormData(form);
        if (data.get("website")) return;
        submit.disabled = true;
        status.className = "softmoon-form-status is-sending";
        status.textContent = messages.sending;
        try {
          const response = await fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
          if (!response.ok) throw new Error("submit failed");
          form.reset();
          status.className = "softmoon-form-status is-success";
          status.textContent = messages.success;
        } catch (error) {
          status.className = "softmoon-form-status is-error";
          status.textContent = messages.error;
        } finally {
          submit.disabled = false;
        }
      });
    });

    const links = [...document.querySelectorAll("[data-section-link]")];
    const sections = links.map((link) => document.getElementById(link.dataset.sectionLink)).filter(Boolean);
    if ("IntersectionObserver" in window && sections.length) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        links.forEach((link) => {
          if (link.dataset.sectionLink === visible.target.id) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }, { rootMargin: "-20% 0px -68% 0px", threshold: [0.01, 0.2, 0.5] });
      sections.forEach((section) => observer.observe(section));
    }
  })();
  </script>`;
}

function footer(t) {
  return `<footer class="softmoon-footer">
    <div class="softmoon-container softmoon-footer-grid">
      <div>${brandLogo}<p>${t.footer}</p></div>
      <div class="softmoon-footer-links"><a href="mailto:info@lavalabs.co.kr">Email</a><a href="https://www.instagram.com/lavalabs_official/" target="_blank" rel="noreferrer">Instagram</a><a href="${t.home}">${lavaLogo}<span>${t.back}</span></a></div>
      <small>© 2026 Lava Labs. All rights reserved.</small>
    </div>
  </footer>`;
}

export function renderSoftmoonBody(locale) {
  const t = copy[locale] ?? copy.ko;
  const previews = t.previewItems.map((item) => previewCard(item)).join("");
  const principles = t.principles.map(([title, body], index) => `<article><span>0${index + 1}</span><h3>${title}</h3><p>${body}</p></article>`).join("");
  const areas = t.areas.map(([number, title, body, tags]) => `<article><div class="softmoon-lab-card-head"><span>${number}</span><span class="softmoon-orbit" aria-hidden="true"></span></div><h3>${title}</h3><p>${body}</p><ul>${tags.map((tag) => `<li>${tag}</li>`).join("")}</ul></article>`).join("");
  const process = t.process.map(([number, title, body]) => `<article><span>${number}</span><div><h3>${title}</h3><p>${body}</p></div></article>`).join("");
  const roadmap = t.roadmap.map(([date, status, title, body, state]) => `<article class="softmoon-roadmap-item is-${state}"><div class="softmoon-roadmap-marker" aria-hidden="true"></div><div class="softmoon-roadmap-meta"><span>${date}</span><strong>${status}</strong></div><div><h3>${title}</h3><p>${body}</p></div></article>`).join("");

  return `<div class="softmoon-shell">
    <a class="softmoon-skip" href="#main-content">${t.skip}</a>
    <header class="softmoon-header">
      <div class="softmoon-container softmoon-header-inner">
        ${brandLogo}
        ${sectionNav(t)}
        ${languageSwitcher(locale, t)}
      </div>
      <div class="softmoon-mobile-nav-wrap">${sectionNav(t, "softmoon-mobile-nav")}</div>
    </header>

    <main id="main-content">
      <section class="softmoon-hero">
        <div class="softmoon-stars" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="softmoon-container softmoon-hero-grid">
          <div class="softmoon-hero-copy">
            <p class="softmoon-eyebrow">${t.eyebrow}</p>
            <span class="softmoon-status-badge"><i aria-hidden="true"></i>${t.status}</span>
            <h1>${t.title}</h1>
            <p class="softmoon-statement">${t.statement}</p>
            <p class="softmoon-body-copy">${t.body}</p>
            <ul class="softmoon-meta">${t.meta.map((item) => `<li>${item}</li>`).join("")}</ul>
            <div class="softmoon-actions">
              <a class="softmoon-button softmoon-button-primary" href="#preview">${t.primary}</a>
              <a class="softmoon-button softmoon-button-secondary" href="#updates">${t.secondary}</a>
              <a class="softmoon-text-link" href="/assets/files/softmoon-intro.pdf" download>${t.intro}</a>
            </div>
          </div>

          <div class="softmoon-hero-media">
            <div class="softmoon-gallery">
              <figure>
                <picture><source srcset="/assets/images/lunar-sample-1-720.webp" type="image/webp"><img src="/assets/images/lunar-sample-1.jpg" alt="${t.gallery[0]}" width="720" height="900" fetchpriority="high" decoding="async"></picture>
                <figcaption><span>01</span>${t.gallery[0]}</figcaption>
              </figure>
              <figure>
                <picture><source srcset="/assets/images/lunar-sample-2-720.webp" type="image/webp"><img src="/assets/images/lunar-sample-2.jpg" alt="${t.gallery[1]}" width="720" height="900" loading="lazy" decoding="async"></picture>
                <figcaption><span>02</span>${t.gallery[1]}</figcaption>
              </figure>
            </div>
            <aside class="softmoon-phase-card">
              <p>${t.phaseLabel}</p>
              <strong>${t.phaseTitle}</strong>
              <span>${t.phaseBody}</span>
            </aside>
          </div>
        </div>
      </section>

      <section class="softmoon-section softmoon-preview-section" id="preview">
        <div class="softmoon-container">
          <div class="softmoon-section-heading">
            <div><p class="softmoon-eyebrow">${t.previewLabel}</p><h2>${t.previewTitle}</h2></div>
            <p>${t.previewLead}</p>
          </div>
          <div class="softmoon-preview-grid">${previews}</div>
        </div>
      </section>

      <section class="softmoon-section softmoon-principles-section" id="principles">
        <div class="softmoon-container">
          <div class="softmoon-section-heading compact"><div><p class="softmoon-eyebrow">${t.principlesLabel}</p><h2>${t.principlesTitle}</h2></div></div>
          <div class="softmoon-principles-grid">${principles}</div>
        </div>
      </section>

      <section class="softmoon-section softmoon-lab-section" id="lab">
        <div class="softmoon-container">
          <div class="softmoon-section-heading"><div><p class="softmoon-eyebrow">${t.labLabel}</p><h2>${t.labTitle}</h2></div><p>${t.labLead}</p></div>
          <div class="softmoon-lab-grid">${areas}</div>
          <div class="softmoon-process-block">
            <p class="softmoon-eyebrow">${t.processLabel}</p>
            <div class="softmoon-process-grid">${process}</div>
          </div>
        </div>
      </section>

      <section class="softmoon-section softmoon-roadmap-section" id="roadmap">
        <div class="softmoon-container softmoon-roadmap-layout">
          <div class="softmoon-roadmap-intro"><p class="softmoon-eyebrow">${t.roadmapLabel}</p><h2>${t.roadmapTitle}</h2><p>${t.roadmapLead}</p></div>
          <div class="softmoon-roadmap-list">${roadmap}</div>
        </div>
      </section>

      <section class="softmoon-section softmoon-updates-section" id="updates">
        <div class="softmoon-container softmoon-updates-card">
          <div><p class="softmoon-eyebrow">${t.updatesLabel}</p><h2>${t.updatesTitle}</h2><p>${t.updatesBody}</p></div>
          ${launchForm(t, locale)}
        </div>
      </section>

      <section class="softmoon-section softmoon-collaboration-section" id="collaboration">
        <div class="softmoon-container softmoon-collaboration-card">
          <div class="softmoon-collaboration-copy"><p class="softmoon-eyebrow">${t.collaborationLabel}</p><h2>${t.collaborationTitle}</h2><p>${t.collaborationBody}</p></div>
          ${collaborationForm(t, locale)}
        </div>
      </section>
    </main>

    ${footer(t)}
    ${runtime(t)}
  </div>`;
}
