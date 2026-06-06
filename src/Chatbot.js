import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, ClipboardCheck, MessageCircle, Send, Sparkles, X } from "lucide-react";
const serviceRoutes = [
    {
        id: "web",
        title: "브랜드 웹 구축",
        keywords: ["웹", "홈페이지", "사이트", "랜딩", "페이지", "반응형", "3d", "챗봇", "ai", "개발", "qr"],
        summary: "브랜드 웹 구축 문의로 분류됩니다. 목적, 페이지 범위, 필요한 기능, 보유 자료가 견적의 핵심입니다.",
        nextSteps: ["목표와 타깃", "필요한 페이지 수", "폼, 챗봇, 3D 같은 기능", "희망 일정"]
    },
    {
        id: "content",
        title: "감성 콘텐츠 기획",
        keywords: ["콘텐츠", "테스트", "mbti", "운세", "궁합", "결과", "심리", "감성", "인터랙티브"],
        summary: "감성 콘텐츠 기획 문의로 보입니다. 결과 구조와 공유 경험을 먼저 설계하는 것이 중요합니다.",
        nextSteps: ["콘텐츠 주제", "사용자 선택지", "결과 유형", "공유 또는 이벤트 연동 여부"]
    },
    {
        id: "experience",
        title: "오프라인 체험 프로그램",
        keywords: ["체험", "오프라인", "클래스", "워크숍", "팝업", "공간", "행사", "운영"],
        summary: "오프라인 체험 프로그램 문의로 보입니다. 공간, 참여 인원, 운영 시간이 먼저 정리되어야 합니다.",
        nextSteps: ["장소와 날짜", "예상 참여 인원", "진행 시간", "필요한 운영 인력"]
    },
    {
        id: "goods",
        title: "SoftMoon 굿즈 제작",
        keywords: ["굿즈", "스티커", "엽서", "키트", "패키지", "일러스트", "소프트문", "softmoon"],
        summary: "굿즈 또는 SoftMoon 관련 문의로 보입니다. 품목, 수량, 제작 방식, 납품 일정이 필요합니다.",
        nextSteps: ["품목과 수량", "디자인 보유 여부", "패키징 필요 여부", "희망 납품일"]
    },
    {
        id: "partnership",
        title: "협업 및 파트너십",
        keywords: ["협업", "파트너", "제휴", "제안", "외주", "프리랜서", "브랜드", "콜라보"],
        summary: "협업 또는 파트너십 문의로 보입니다. 서로의 역할과 기대 산출물을 먼저 맞추면 빠르게 판단할 수 있습니다.",
        nextSteps: ["협업 목적", "각자 맡을 역할", "희망 산출물", "진행 일정"]
    }
];
const quickPrompts = [
    "홈페이지 제작 문의",
    "감성 테스트 만들고 싶어",
    "굿즈 제작 상담",
    "예상 일정 알려줘"
];
const openingMessages = {
    ko: "안녕하세요. Lava Labs 프로젝트 상담을 도와드릴게요. 만들고 싶은 것, 일정, 예산감 중 아는 만큼만 적어주세요.",
    en: "Hello. I can help triage Lava Labs project inquiries. Tell me what you want to build, your timing, and any constraints.",
    jp: "こんにちは。Lava Labsのプロジェクト相談を整理します。作りたいもの、日程、条件をわかる範囲で入力してください。"
};
function normalize(value) {
    return value.trim().toLowerCase();
}
function pickRoute(input) {
    const normalized = normalize(input);
    const scored = serviceRoutes
        .map((route) => ({
        route,
        score: route.keywords.reduce((total, keyword) => total + (normalized.includes(keyword) ? 1 : 0), 0)
    }))
        .sort((a, b) => b.score - a.score);
    return scored[0].score > 0 ? scored[0].route : undefined;
}
function hasAny(input, keywords) {
    const normalized = normalize(input);
    return keywords.some((keyword) => normalized.includes(keyword));
}
function buildDraft(input, route) {
    const title = route?.title ?? "프로젝트 상담";
    return [
        `[${title} 문의]`,
        "",
        `문의 내용: ${input}`,
        "",
        "확인하고 싶은 내용:",
        "- 프로젝트 목표:",
        "- 필요한 산출물:",
        "- 희망 일정:",
        "- 예산 범위:",
        "- 참고 자료 또는 링크:"
    ].join("\n");
}
function buildReply(input, route) {
    const normalized = normalize(input);
    if (hasAny(normalized, ["가격", "비용", "견적", "얼마", "예산"])) {
        const routeLabel = route?.title ?? "프로젝트";
        return [
            `${routeLabel} 견적은 범위에 따라 달라집니다.`,
            "",
            "빠르게 판단하려면 아래 4가지를 알려주세요.",
            "1. 만들고 싶은 결과물",
            "2. 페이지 수 또는 콘텐츠 개수",
            "3. 필요한 기능",
            "4. 희망 일정",
            "",
            route ? `${route.summary}` : "지금 내용만으로는 범위를 조금 더 좁혀야 합니다."
        ].join("\n");
    }
    if (hasAny(normalized, ["일정", "기간", "언제", "소요"])) {
        return [
            "일정은 산출물 범위에 따라 나뉩니다.",
            "",
            "단순 랜딩/소개 페이지는 비교적 짧게 잡을 수 있고, 챗봇, 3D, 다국어, 결과 알고리즘처럼 기능이 들어가면 기획과 QA 시간이 필요합니다.",
            "",
            "정확히 보려면 필요한 기능과 희망 오픈일을 같이 알려주세요."
        ].join("\n");
    }
    if (hasAny(normalized, ["안녕", "hello", "처음", "뭐", "도와"])) {
        return [
            "Lava Labs는 크게 네 가지를 도와드릴 수 있습니다.",
            "",
            "1. 감성 콘텐츠 기획",
            "2. 오프라인 체험 프로그램",
            "3. SoftMoon 굿즈 제작",
            "4. 브랜드 웹 구축",
            "",
            "만들고 싶은 결과물을 한 문장으로 적어주시면 제가 방향을 분류해드릴게요."
        ].join("\n");
    }
    if (!route) {
        return [
            "내용을 조금 더 구체화하면 더 정확히 안내할 수 있습니다.",
            "",
            "예를 들면 이렇게 적어주세요.",
            "“브랜드 소개용 반응형 홈페이지가 필요하고, 문의 폼과 챗봇이 있었으면 해요.”",
            "",
            "원하는 결과물, 일정, 참고 사이트가 있으면 함께 보내주세요."
        ].join("\n");
    }
    return [
        route.summary,
        "",
        "다음 정보가 있으면 바로 상담 가능한 형태로 정리할 수 있습니다.",
        ...route.nextSteps.map((step, index) => `${index + 1}. ${step}`),
        "",
        "원하시면 지금 입력한 내용을 문의 폼에 넣을 수 있는 초안으로 정리해드릴게요."
    ].join("\n");
}
export function Chatbot({ locale }) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: "opening",
            role: "assistant",
            text: openingMessages[locale]
        }
    ]);
    const scrollRef = useRef(null);
    const panelTitle = useMemo(() => {
        if (locale === "en")
            return "Lava Guide";
        if (locale === "jp")
            return "Lava Guide";
        return "Lava Guide";
    }, [locale]);
    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth"
        });
    }, [messages, typing, open]);
    useEffect(() => {
        setMessages((current) => {
            if (current.length > 1)
                return current;
            return [{ id: "opening", role: "assistant", text: openingMessages[locale] }];
        });
    }, [locale]);
    const send = (value) => {
        const trimmed = value.trim();
        if (!trimmed || typing)
            return;
        const route = pickRoute(trimmed);
        const shouldDraft = Boolean(route) ||
            hasAny(trimmed, ["문의", "상담", "견적", "제작", "만들", "필요", "협업", "홈페이지"]);
        const userMessage = {
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
                    text: buildReply(trimmed, route),
                    draft: shouldDraft ? buildDraft(trimmed, route) : undefined
                }
            ]);
            setTyping(false);
        }, 360);
    };
    const submit = (event) => {
        event.preventDefault();
        send(input);
    };
    const prefillContact = (draft) => {
        window.dispatchEvent(new CustomEvent("lavalabs:prefill-contact", {
            detail: { message: draft }
        }));
        setOpen(false);
    };
    return (_jsxs("div", { className: "chatbot", "data-open": open, children: [_jsxs("button", { className: "chatbot-launcher", type: "button", onClick: () => setOpen(true), "aria-label": "Open Lava Guide", children: [_jsx(MessageCircle, { "aria-hidden": "true" }), _jsx("span", { children: "\uC0C1\uB2F4" })] }), open && (_jsxs("section", { className: "chatbot-panel", role: "dialog", "aria-modal": "false", "aria-label": panelTitle, children: [_jsxs("header", { className: "chatbot-header", children: [_jsxs("div", { children: [_jsx("span", { className: "chatbot-avatar", children: _jsx(Bot, { "aria-hidden": "true" }) }), _jsxs("div", { children: [_jsx("strong", { children: panelTitle }), _jsx("small", { children: "\uD504\uB85C\uC81D\uD2B8 \uC0C1\uB2F4 \uB3C4\uC6B0\uBBF8" })] })] }), _jsx("button", { type: "button", className: "icon-button chatbot-close", onClick: () => setOpen(false), "aria-label": "Close Lava Guide", children: _jsx(X, { "aria-hidden": "true" }) })] }), _jsxs("div", { className: "chatbot-messages", ref: scrollRef, children: [messages.map((message) => (_jsxs("article", { className: `chat-message ${message.role}`, children: [_jsx("p", { children: message.text }), message.draft && (_jsxs("button", { type: "button", className: "chatbot-draft-button", onClick: () => prefillContact(message.draft), children: [_jsx(ClipboardCheck, { "aria-hidden": "true" }), "\uBB38\uC758 \uD3FC\uC5D0 \uB123\uAE30"] }))] }, message.id))), typing && (_jsxs("article", { className: "chat-message assistant typing", children: [_jsx(Sparkles, { "aria-hidden": "true" }), _jsx("span", { children: "\uC815\uB9AC \uC911" })] }))] }), _jsx("div", { className: "chatbot-prompts", "aria-label": "Quick prompts", children: quickPrompts.map((prompt) => (_jsx("button", { type: "button", onClick: () => send(prompt), children: prompt }, prompt))) }), _jsxs("form", { className: "chatbot-input", onSubmit: submit, children: [_jsx("input", { value: input, onChange: (event) => setInput(event.target.value), placeholder: "\uBB34\uC5C7\uC744 \uB9CC\uB4E4\uACE0 \uC2F6\uB098\uC694?", "aria-label": "Chat message" }), _jsx("button", { type: "submit", "aria-label": "Send message", children: _jsx(Send, { "aria-hidden": "true" }) })] })] }))] }));
}
