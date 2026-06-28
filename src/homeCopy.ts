import type { Locale } from "./content";

export type ProjectType = "" | "web" | "photo" | "content" | "multilingual" | "tools";

export const homeCopy = {
  ko: {
    skip: "본문으로 이동", nav: "주요 메뉴", menu: "메뉴 열기", close: "메뉴 닫기", services: "Services",
    serviceTitle: "지금 시작할 수 있는 서비스", serviceIntro: "현재 필요한 범위를 함께 정하고 실제로 사용할 수 있는 작은 결과물부터 제작합니다.",
    inquiry: "이 서비스로 문의", work: "Selected Work", trust: "작게 시작해도 운영 가능한 형태로",
    trustItems: ["PC와 모바일 실제 화면 검수", "도메인 연결과 배포 구조 정리", "한국어 기준 영어·일본어 확장 대응", "오픈 이후 직접 수정할 수 있는 운영 방식 안내"],
    faq: "자주 묻는 내용",
    faqs: [["자료가 완전히 준비되지 않아도 되나요?", "현재 가지고 있는 로고, 사진, 메모와 참고 사이트부터 확인하고 부족한 내용을 함께 정리합니다."], ["공개 후 직접 수정할 수 있나요?", "자주 바뀌는 내용과 고정 영역을 나누고 관리하기 쉬운 구조를 제안합니다."], ["사진과 홈페이지를 함께 진행할 수 있나요?", "필요한 이미지 비율과 용도를 먼저 정하면 하나의 브랜드 화면으로 자연스럽게 연결할 수 있습니다."]] as const,
    projectType: "문의 유형", projectOptions: { web: "홈페이지·포트폴리오", photo: "사진·시각 콘텐츠", content: "브랜드 문구·콘텐츠", multilingual: "다국어·운영 구조", tools: "웹 도구·작은 서비스" },
    timeline: "희망 일정", timelines: ["가능한 빠르게", "1개월 이내", "2~3개월 이내", "일정 상담 필요"],
    budget: "예상 예산", budgets: ["아직 정해지지 않음", "30만 원 미만", "30만~50만 원", "50만~100만 원", "100만 원 이상", "상담 후 결정"],
    reference: "참고 링크 (선택)", company: "브랜드·회사명 (선택)", submit: "문의 보내기", sending: "전송 중",
    success: "문의가 접수되었습니다. 확인 후 답변드리겠습니다.", error: "전송이 원활하지 않습니다. 이메일로 직접 문의해주세요.",
    consent: "개인정보 수집 및 답변 목적 이용에 동의합니다.", mobile: "프로젝트 문의"
  },
  en: {
    skip: "Skip to content", nav: "Main navigation", menu: "Open menu", close: "Close menu", services: "Services",
    serviceTitle: "Services you can start with", serviceIntro: "We define a realistic scope together and begin with something you can actually use.",
    inquiry: "Ask about this service", work: "Selected Work", trust: "Start small and launch something operational",
    trustItems: ["Real-device checks on desktop and mobile", "Domain connection and deployment setup", "English and Japanese expansion from Korean content", "Guidance for maintaining content after launch"],
    faq: "Frequently asked questions",
    faqs: [["Can we start before all materials are ready?", "Yes. We can begin with your current logo, photos, notes, and reference sites."], ["Can I update the site after launch?", "We separate changing content from fixed areas and suggest a practical maintenance structure."], ["Can photography and website production be combined?", "Yes. Defining image needs before the shoot creates a more coherent brand experience."]] as const,
    projectType: "Inquiry type", projectOptions: { web: "Website or portfolio", photo: "Photography and visuals", content: "Brand copy and content", multilingual: "Multilingual structure", tools: "Web tools and small services" },
    timeline: "Preferred timeline", timelines: ["As soon as possible", "Within one month", "Within two to three months", "Consultation needed"],
    budget: "Estimated budget", budgets: ["Not decided yet", "Under KRW 300,000", "KRW 300,000–500,000", "KRW 500,000–1,000,000", "Over KRW 1,000,000", "Decide after consultation"],
    reference: "Reference link (optional)", company: "Brand or company (optional)", submit: "Send inquiry", sending: "Sending",
    success: "Your inquiry has been received.", error: "The form could not be sent. Please contact us by email.",
    consent: "I agree to the use of my information for a response.", mobile: "Project inquiry"
  },
  jp: {
    skip: "本文へ移動", nav: "メインナビゲーション", menu: "メニューを開く", close: "メニューを閉じる", services: "Services",
    serviceTitle: "今から始められるサービス", serviceIntro: "必要な範囲を一緒に決め、実際に使える小さな成果物から制作します。",
    inquiry: "このサービスを相談", work: "Selected Work", trust: "小さく始めても、実際に運営できる形へ",
    trustItems: ["PC・スマートフォン実機での確認", "ドメイン接続と公開構成の整理", "韓国語を基準に英語・日本語へ拡張", "公開後に更新しやすい運営方法の案内"],
    faq: "よくあるご質問",
    faqs: [["素材が揃っていなくても始められますか？", "現在お持ちのロゴ、写真、メモ、参考サイトから確認できます。"], ["公開後に自分で更新できますか？", "更新内容と固定部分を分け、管理しやすい構成をご提案します。"], ["写真撮影とサイト制作を一緒に依頼できますか？", "必要な画像比率を先に決めることで、一つのブランド体験としてつなげられます。"]] as const,
    projectType: "お問い合わせ種別", projectOptions: { web: "Webサイト・ポートフォリオ", photo: "写真・ビジュアル", content: "ブランド文章・構成", multilingual: "多言語・運営構成", tools: "Webツール・小規模サービス" },
    timeline: "希望日程", timelines: ["できるだけ早く", "1か月以内", "2〜3か月以内", "日程相談が必要"],
    budget: "想定予算", budgets: ["未定", "30万ウォン未満", "30万〜50万ウォン", "50万〜100万ウォン", "100万ウォン以上", "相談後に決定"],
    reference: "参考リンク（任意）", company: "ブランド・会社名（任意）", submit: "送信する", sending: "送信中",
    success: "お問い合わせを受け付けました。", error: "送信できませんでした。メールでご連絡ください。",
    consent: "回答のための個人情報利用に同意します。", mobile: "プロジェクト相談"
  }
} as const satisfies Record<Locale, unknown>;
