import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, ClipboardCheck, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Locale } from "./content";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  draft?: string;
};

type ServiceRoute = {
  id: string;
  title: string;
  keywords: string[];
  summary: string;
  nextSteps: string[];
};

type ChatCopy = {
  routes: ServiceRoute[];
  quickPrompts: string[];
  opening: string;
  launcher: string;
  subtitle: string;
  draftButton: string;
  typing: string;
  placeholder: string;
  panelTitle: string;
  draftTitleFallback: string;
  draftInquiryLabel: string;
  draftChecklistTitle: string;
  draftChecklist: string[];
  estimateKeywords: string[];
  timelineKeywords: string[];
  greetingKeywords: string[];
  draftKeywords: string[];
  estimateReply: (route?: ServiceRoute) => string;
  timelineReply: string;
  greetingReply: string;
  fallbackReply: string;
  routedIntro: string;
  draftOffer: string;
};

const chatCopy: Record<Locale, ChatCopy> = {
  ko: {
    routes: [
      {
        id: "web",
        title: "브랜드 랜딩페이지 제작",
        keywords: ["웹", "홈페이지", "사이트", "랜딩", "페이지", "반응형", "포트폴리오", "문의폼", "개발", "qr"],
        summary: "브랜드 웹 또는 랜딩페이지 문의로 분류됩니다. 목적, 페이지 범위, 필요한 기능, 보유 자료가 견적의 핵심입니다.",
        nextSteps: ["목표와 타깃", "필요한 페이지 수", "문의 폼·다국어·관리자 같은 기능", "희망 오픈일"]
      },
      {
        id: "visual",
        title: "사진·영상 콘텐츠 패키지",
        keywords: ["사진", "촬영", "영상", "콘텐츠", "sns", "인스타", "프로필", "제품", "이미지"],
        summary: "사진·영상 콘텐츠 문의로 보입니다. 브랜드 무드, 촬영 대상, 사용 채널을 먼저 정리하면 빠르게 방향을 잡을 수 있습니다.",
        nextSteps: ["촬영 대상", "필요한 컷 수 또는 영상 수", "사용 채널", "원하는 분위기와 참고 이미지"]
      },
      {
        id: "interactive",
        title: "인터랙티브 콘텐츠 기획",
        keywords: ["테스트", "mbti", "운세", "궁합", "진단", "결과", "심리", "인터랙티브", "이벤트"],
        summary: "참여형 콘텐츠 문의로 보입니다. 결과 구조와 공유 경험을 먼저 설계하는 것이 중요합니다.",
        nextSteps: ["콘텐츠 주제", "사용자 선택지", "결과 유형", "공유 또는 이벤트 연동 여부"]
      },
      {
        id: "goods",
        title: "SoftMoon 굿즈·패키징",
        keywords: ["굿즈", "스티커", "엽서", "키트", "패키지", "패키징", "일러스트", "소프트문", "softmoon"],
        summary: "굿즈 또는 SoftMoon 관련 문의로 보입니다. 품목, 수량, 제작 방식, 납품 일정이 필요합니다.",
        nextSteps: ["품목과 수량", "디자인 보유 여부", "패키징 필요 여부", "희망 납품일"]
      },
      {
        id: "partnership",
        title: "협업 및 파트너십",
        keywords: ["협업", "파트너", "제휴", "제안", "외주", "프리랜서", "콜라보", "브랜드"],
        summary: "협업 또는 파트너십 문의로 보입니다. 서로의 역할과 기대 산출물을 먼저 맞추면 빠르게 판단할 수 있습니다.",
        nextSteps: ["협업 목적", "각자 맡을 역할", "희망 산출물", "진행 일정"]
      }
    ],
    quickPrompts: ["랜딩페이지 제작 문의", "사진 콘텐츠가 필요해요", "굿즈 제작 상담", "예상 일정 알려줘"],
    opening: "안녕하세요. Lava Labs 프로젝트 상담을 도와드릴게요. 만들고 싶은 결과물, 일정, 예산감 중 아는 만큼만 적어주세요.",
    launcher: "상담",
    subtitle: "프로젝트 상담 도우미",
    draftButton: "문의 폼에 넣기",
    typing: "정리 중",
    placeholder: "무엇을 만들고 싶나요?",
    panelTitle: "Lava Guide",
    draftTitleFallback: "프로젝트 상담",
    draftInquiryLabel: "문의 내용",
    draftChecklistTitle: "확인하고 싶은 내용:",
    draftChecklist: ["프로젝트 목표:", "필요한 산출물:", "희망 일정:", "예산 범위:", "참고 자료 또는 링크:"],
    estimateKeywords: ["가격", "비용", "견적", "얼마", "예산"],
    timelineKeywords: ["일정", "기간", "언제", "소요", "몇일", "몇 주"],
    greetingKeywords: ["안녕", "hello", "처음", "뭐", "도와"],
    draftKeywords: ["문의", "상담", "견적", "제작", "만들", "필요", "협업", "홈페이지", "랜딩"],
    estimateReply: (route) =>
      [
        `${route?.title ?? "프로젝트"} 견적은 범위에 따라 달라집니다.`,
        "",
        "빠르게 판단하려면 아래 4가지를 알려주세요.",
        "1. 만들고 싶은 결과물",
        "2. 페이지 수 또는 콘텐츠 개수",
        "3. 필요한 기능",
        "4. 희망 일정",
        "",
        route ? route.summary : "지금 내용만으로는 범위를 조금 더 좁혀야 합니다."
      ].join("\n"),
    timelineReply: [
      "일정은 산출물 범위에 따라 달라집니다.",
      "",
      "단순 랜딩페이지나 포트폴리오는 비교적 짧게 시작할 수 있고, 다국어·관리자·촬영·콘텐츠 제작이 함께 들어가면 기획과 검수 시간이 더 필요합니다.",
      "",
      "정확히 보려면 필요한 결과물과 희망 오픈일을 같이 알려주세요."
    ].join("\n"),
    greetingReply: [
      "Lava Labs는 크게 네 가지를 도와드릴 수 있습니다.",
      "",
      "1. 브랜드 랜딩페이지 제작",
      "2. 사진·영상 콘텐츠 패키지",
      "3. SoftMoon 굿즈·패키징",
      "4. 인터랙티브 콘텐츠 기획",
      "",
      "만들고 싶은 결과물을 한 문장으로 적어주시면 방향을 분류해드릴게요."
    ].join("\n"),
    fallbackReply: [
      "내용을 조금 더 구체화하면 더 정확히 안내할 수 있습니다.",
      "",
      "예를 들면 이렇게 적어주세요.",
      "“브랜드 소개용 반응형 랜딩페이지가 필요하고, 문의 폼과 일본어 페이지가 있었으면 해요.”",
      "",
      "원하는 결과물, 일정, 참고 사이트가 있으면 함께 보내주세요."
    ].join("\n"),
    routedIntro: "다음 정보가 있으면 바로 상담 가능한 형태로 정리할 수 있습니다.",
    draftOffer: "원하시면 지금 입력한 내용을 문의 폼에 넣을 수 있는 초안으로 정리해드릴게요."
  },
  en: {
    routes: [
      {
        id: "web",
        title: "Brand landing page",
        keywords: ["web", "website", "homepage", "landing", "page", "portfolio", "responsive", "form", "qr"],
        summary: "This looks like a brand website or landing page inquiry. The main estimate drivers are purpose, page scope, functions, and available materials.",
        nextSteps: ["Goal and target audience", "Number of pages", "Needed functions such as form, multilingual pages, or admin", "Preferred launch date"]
      },
      {
        id: "visual",
        title: "Photo and content package",
        keywords: ["photo", "photography", "video", "content", "social", "instagram", "profile", "product", "image"],
        summary: "This looks like a visual content inquiry. Brand mood, subject, and usage channels should be clarified first.",
        nextSteps: ["Subject to shoot", "Needed number of images or videos", "Usage channels", "Desired mood and references"]
      },
      {
        id: "interactive",
        title: "Interactive content planning",
        keywords: ["quiz", "test", "mbti", "diagnosis", "interactive", "campaign", "result", "share"],
        summary: "This looks like an interactive content inquiry. The result structure and sharing experience should be designed first.",
        nextSteps: ["Content theme", "User choices", "Result types", "Sharing or campaign connection"]
      },
      {
        id: "goods",
        title: "SoftMoon goods and packaging",
        keywords: ["goods", "sticker", "postcard", "kit", "package", "packaging", "illustration", "softmoon"],
        summary: "This looks like a goods or SoftMoon inquiry. Item type, quantity, production method, and delivery timing matter most.",
        nextSteps: ["Item and quantity", "Whether design assets are ready", "Packaging needs", "Preferred delivery date"]
      },
      {
        id: "partnership",
        title: "Collaboration and partnership",
        keywords: ["collaboration", "partner", "partnership", "proposal", "outsourcing", "freelance", "brand", "collab"],
        summary: "This looks like a collaboration inquiry. It is best to align roles, goals, and expected deliverables first.",
        nextSteps: ["Purpose of collaboration", "Each side’s role", "Expected deliverables", "Timeline"]
      }
    ],
    quickPrompts: ["Landing page inquiry", "I need photo content", "Goods production", "How long will it take?"],
    opening: "Hello. I can help organize your Lava Labs project inquiry. Tell me what you want to make, your timeline, and any budget range you already have.",
    launcher: "Consult",
    subtitle: "Project inquiry guide",
    draftButton: "Add to inquiry form",
    typing: "Organizing",
    placeholder: "What would you like to make?",
    panelTitle: "Lava Guide",
    draftTitleFallback: "Project inquiry",
    draftInquiryLabel: "Inquiry",
    draftChecklistTitle: "Information to confirm:",
    draftChecklist: ["Project goal:", "Required deliverables:", "Preferred timeline:", "Budget range:", "References or links:"],
    estimateKeywords: ["price", "cost", "estimate", "quote", "budget", "fee"],
    timelineKeywords: ["timeline", "schedule", "when", "duration", "how long", "deadline"],
    greetingKeywords: ["hello", "hi", "help", "start", "first"],
    draftKeywords: ["inquiry", "consult", "estimate", "quote", "make", "need", "collaboration", "website", "landing"],
    estimateReply: (route) =>
      [
        `The estimate for ${route?.title ?? "the project"} depends on scope.`,
        "",
        "To judge quickly, please share these 4 points.",
        "1. Desired deliverable",
        "2. Number of pages or content pieces",
        "3. Required functions",
        "4. Preferred timeline",
        "",
        route ? route.summary : "The scope needs to be narrowed a little more from the current message."
      ].join("\n"),
    timelineReply: [
      "Timeline depends on the deliverables.",
      "",
      "A simple landing page or portfolio can start relatively quickly. If multilingual pages, admin features, photography, or content production are included, planning and review time should be added.",
      "",
      "For a more accurate answer, please share the required deliverables and preferred launch date."
    ].join("\n"),
    greetingReply: [
      "Lava Labs can mainly help with four areas.",
      "",
      "1. Brand landing pages",
      "2. Photo and visual content packages",
      "3. SoftMoon goods and packaging",
      "4. Interactive content planning",
      "",
      "Write the deliverable you want in one sentence, and I will classify the direction."
    ].join("\n"),
    fallbackReply: [
      "A bit more detail will help me guide you more accurately.",
      "",
      "For example, you can write:",
      "“I need a responsive brand landing page with an inquiry form and a Japanese page.”",
      "",
      "Please include the desired deliverable, timeline, and any reference sites."
    ].join("\n"),
    routedIntro: "With the following information, we can turn this into a consultation-ready inquiry.",
    draftOffer: "I can also turn your message into a draft for the inquiry form."
  },
  jp: {
    routes: [
      {
        id: "web",
        title: "ブランドLP制作",
        keywords: ["web", "lp", "サイト", "ホームページ", "ランディング", "ページ", "ポートフォリオ", "問い合わせ", "qr"],
        summary: "ブランドWebまたはLP制作のご相談として整理できます。目的、ページ範囲、必要機能、準備済み素材が見積もりの要点です。",
        nextSteps: ["目的とターゲット", "必要なページ数", "フォーム・多言語・管理画面などの機能", "希望公開日"]
      },
      {
        id: "visual",
        title: "写真・コンテンツ制作",
        keywords: ["写真", "撮影", "映像", "動画", "コンテンツ", "sns", "instagram", "プロフィール", "商品", "画像"],
        summary: "写真・ビジュアルコンテンツのご相談として整理できます。ブランドの雰囲気、撮影対象、使用チャネルを先に決めると進めやすくなります。",
        nextSteps: ["撮影対象", "必要な写真または動画の数", "使用チャネル", "希望する雰囲気と参考資料"]
      },
      {
        id: "interactive",
        title: "参加型コンテンツ企画",
        keywords: ["診断", "テスト", "mbti", "相性", "インタラクティブ", "キャンペーン", "結果", "共有"],
        summary: "参加型コンテンツのご相談として整理できます。結果構成と共有体験を先に設計することが重要です。",
        nextSteps: ["コンテンツのテーマ", "ユーザーの選択肢", "結果タイプ", "共有またはキャンペーン連動"]
      },
      {
        id: "goods",
        title: "SoftMoonグッズ・パッケージ",
        keywords: ["グッズ", "ステッカー", "ポストカード", "キット", "パッケージ", "イラスト", "softmoon"],
        summary: "グッズまたはSoftMoon関連のご相談として整理できます。品目、数量、制作方法、納品日程が必要です。",
        nextSteps: ["品目と数量", "デザインデータの有無", "パッケージの必要性", "希望納品日"]
      },
      {
        id: "partnership",
        title: "協業・パートナーシップ",
        keywords: ["協業", "提携", "パートナー", "提案", "外注", "フリーランス", "ブランド", "コラボ"],
        summary: "協業またはパートナーシップのご相談として整理できます。役割、目的、期待する成果物を先に合わせると判断しやすくなります。",
        nextSteps: ["協業の目的", "それぞれの役割", "期待する成果物", "進行日程"]
      }
    ],
    quickPrompts: ["LP制作を相談したい", "写真コンテンツが必要", "グッズ制作の相談", "制作期間を知りたい"],
    opening: "こんにちは。Lava Labsのプロジェクト相談を整理します。作りたい成果物、日程、予算感をわかる範囲で入力してください。",
    launcher: "相談",
    subtitle: "プロジェクト相談ガイド",
    draftButton: "フォームに入れる",
    typing: "整理中",
    placeholder: "何を作りたいですか？",
    panelTitle: "Lava Guide",
    draftTitleFallback: "プロジェクト相談",
    draftInquiryLabel: "お問い合わせ内容",
    draftChecklistTitle: "確認したい内容:",
    draftChecklist: ["プロジェクトの目的:", "必要な成果物:", "希望日程:", "予算感:", "参考資料またはリンク:"],
    estimateKeywords: ["価格", "費用", "見積", "料金", "予算", "いくら"],
    timelineKeywords: ["日程", "期間", "いつ", "納期", "どのくらい", "制作期間"],
    greetingKeywords: ["こんにちは", "hello", "初めて", "相談", "ヘルプ"],
    draftKeywords: ["問い合わせ", "相談", "見積", "制作", "作り", "必要", "協業", "サイト", "lp"],
    estimateReply: (route) =>
      [
        `${route?.title ?? "プロジェクト"}の見積もりは制作範囲によって変わります。`,
        "",
        "早く判断するために、次の4点を教えてください。",
        "1. 作りたい成果物",
        "2. ページ数またはコンテンツ数",
        "3. 必要な機能",
        "4. 希望日程",
        "",
        route ? route.summary : "現在の内容だけでは、もう少し範囲を絞る必要があります。"
      ].join("\n"),
    timelineReply: [
      "日程は成果物の範囲によって変わります。",
      "",
      "シンプルなLPやポートフォリオは比較的早く開始できます。多言語、管理画面、撮影、コンテンツ制作が入る場合は、企画と確認の時間が追加で必要です。",
      "",
      "正確に見るために、必要な成果物と希望公開日を教えてください。"
    ].join("\n"),
    greetingReply: [
      "Lava Labsは主に4つの領域をサポートできます。",
      "",
      "1. ブランドLP制作",
      "2. 写真・ビジュアルコンテンツ制作",
      "3. SoftMoonグッズ・パッケージ",
      "4. 参加型コンテンツ企画",
      "",
      "作りたい成果物を一文で入力していただければ、方向性を整理します。"
    ].join("\n"),
    fallbackReply: [
      "もう少し具体的にすると、より正確にご案内できます。",
      "",
      "例えば、次のように入力してください。",
      "「問い合わせフォームと日本語ページがあるブランドLPを作りたいです。」",
      "",
      "希望する成果物、日程、参考サイトがあれば一緒に送ってください。"
    ].join("\n"),
    routedIntro: "次の情報があると、すぐに相談できる形に整理できます。",
    draftOffer: "入力内容をお問い合わせフォーム用の下書きに整理できます。"
  }
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function hasAny(input: string, keywords: string[]) {
  const normalized = normalize(input);
  return keywords.some((keyword) => normalized.includes(keyword.toLowerCase()));
}

function pickRoute(input: string, copy: ChatCopy) {
  const normalized = normalize(input);

  const scored = copy.routes
    .map((route) => ({
      route,
      score: route.keywords.reduce((total, keyword) => total + (normalized.includes(keyword.toLowerCase()) ? 1 : 0), 0)
    }))
    .sort((a, b) => b.score - a.score);

  return scored[0].score > 0 ? scored[0].route : undefined;
}

function buildDraft(input: string, copy: ChatCopy, route?: ServiceRoute) {
  const title = route?.title ?? copy.draftTitleFallback;
  return [
    `[${title}]`,
    "",
    `${copy.draftInquiryLabel}: ${input}`,
    "",
    copy.draftChecklistTitle,
    ...copy.draftChecklist.map((item) => `- ${item}`)
  ].join("\n");
}

function buildReply(input: string, copy: ChatCopy, route?: ServiceRoute) {
  const normalized = normalize(input);

  if (hasAny(normalized, copy.estimateKeywords)) {
    return copy.estimateReply(route);
  }

  if (hasAny(normalized, copy.timelineKeywords)) {
    return copy.timelineReply;
  }

  if (hasAny(normalized, copy.greetingKeywords)) {
    return copy.greetingReply;
  }

  if (!route) {
    return copy.fallbackReply;
  }

  return [
    route.summary,
    "",
    copy.routedIntro,
    ...route.nextSteps.map((step, index) => `${index + 1}. ${step}`),
    "",
    copy.draftOffer
  ].join("\n");
}

export function Chatbot({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const copy = chatCopy[locale];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "opening",
      role: "assistant",
      text: copy.opening
    }
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const panelTitle = useMemo(() => copy.panelTitle, [copy.panelTitle]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, typing, open]);

  useEffect(() => {
    setMessages((current) => {
      if (current.length > 1) return current;
      return [{ id: "opening", role: "assistant", text: copy.opening }];
    });
  }, [copy.opening]);

  const send = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || typing) return;

    const route = pickRoute(trimmed, copy);
    const shouldDraft = Boolean(route) || hasAny(trimmed, copy.draftKeywords);
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: buildReply(trimmed, copy, route),
          draft: shouldDraft ? buildDraft(trimmed, copy, route) : undefined
        }
      ]);
      setTyping(false);
    }, 360);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(input);
  };

  const prefillContact = (draft: string) => {
    window.dispatchEvent(
      new CustomEvent("lavalabs:prefill-contact", {
        detail: { message: draft }
      })
    );
    setOpen(false);
  };

  return (
    <div className="chatbot" data-open={open}>
      <button className="chatbot-launcher" type="button" onClick={() => setOpen(true)} aria-label="Open Lava Guide">
        <MessageCircle aria-hidden="true" />
        <span>{copy.launcher}</span>
      </button>

      {open && (
        <section className="chatbot-panel" role="dialog" aria-modal="false" aria-label={panelTitle}>
          <header className="chatbot-header">
            <div>
              <span className="chatbot-avatar">
                <Bot aria-hidden="true" />
              </span>
              <div>
                <strong>{panelTitle}</strong>
                <small>{copy.subtitle}</small>
              </div>
            </div>
            <button type="button" className="icon-button chatbot-close" onClick={() => setOpen(false)} aria-label="Close Lava Guide">
              <X aria-hidden="true" />
            </button>
          </header>

          <div className="chatbot-messages" ref={scrollRef}>
            {messages.map((message) => (
              <article className={`chat-message ${message.role}`} key={message.id}>
                <p>{message.text}</p>
                {message.draft && (
                  <button type="button" className="chatbot-draft-button" onClick={() => prefillContact(message.draft!)}>
                    <ClipboardCheck aria-hidden="true" />
                    {copy.draftButton}
                  </button>
                )}
              </article>
            ))}
            {typing && (
              <article className="chat-message assistant typing">
                <Sparkles aria-hidden="true" />
                <span>{copy.typing}</span>
              </article>
            )}
          </div>

          <div className="chatbot-prompts" aria-label="Quick prompts">
            {copy.quickPrompts.map((prompt) => (
              <button type="button" key={prompt} onClick={() => send(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={submit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={copy.placeholder}
              aria-label="Chat message"
            />
            <button type="submit" aria-label="Send message">
              <Send aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
