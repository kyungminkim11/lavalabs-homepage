(() => {
  const locale = location.pathname.startsWith("/en") ? "en" : location.pathname.startsWith("/jp") ? "jp" : "ko";
  const read = (key) => document.querySelector(`[data-business-value="${key}"]`)?.textContent?.trim() ?? "";
  const set = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && value) element.textContent = value;
  };

  const legalName = read("legalName");
  const representative = read("representative");
  const businessNumber = read("businessNumber");
  const mailOrderNumber = read("mailOrderNumber");
  const businessTypeKo = read("businessType");
  const addressKo = read("address");
  const email = read("email") || "info@lavalabs.co.kr";

  const copy = {
    ko: {
      title: "사업자 정보",
      note: "본 정보는 사업자등록 및 통신판매업 신고 내용을 기준으로 표시합니다.",
      labels: { legalName: "상호", representative: "대표자", businessNumber: "사업자등록번호", mailOrderNumber: "통신판매업 신고번호", businessType: "업태·종목", email: "이메일", address: "사업장 소재지" },
      businessType: businessTypeKo
    },
    en: {
      title: "Business Information",
      note: "The registered Korean address is displayed in its official form.",
      labels: { legalName: "Business name", representative: "Representative", businessNumber: "Business registration no.", mailOrderNumber: "Mail-order registration no.", businessType: "Business type", email: "Email", address: "Registered address" },
      businessType: "Wholesale and retail · E-commerce retail"
    },
    jp: {
      title: "事業者情報",
      note: "登録所在地は韓国で届け出た正式表記を掲載しています。",
      labels: { legalName: "商号", representative: "代表者", businessNumber: "事業者登録番号", mailOrderNumber: "通信販売業届出番号", businessType: "業種", email: "メール", address: "登録所在地" },
      businessType: "卸売・小売業 · 電子商取引小売業"
    }
  }[locale];

  set("[data-business-title]", copy.title);
  set("[data-business-note]", copy.note);
  Object.entries(copy.labels).forEach(([key, value]) => set(`[data-business-label="${key}"]`, value));
  set("[data-business-value=\"businessType\"]", copy.businessType);

  window.__LAVALABS_COMPANY__ = {
    name: "Lava Labs",
    legalName,
    representative,
    businessNumber,
    mailOrderNumber,
    email,
    phone: "",
    phoneHref: "",
    instagram: "https://www.instagram.com/lavalabs_official/",
    kakao: "https://pf.kakao.com/_xnSxefxj",
    businessType: { ko: businessTypeKo, en: "Wholesale and retail · E-commerce retail", jp: "卸売・小売業 · 電子商取引小売業" },
    address: { ko: addressKo, en: addressKo, jp: addressKo }
  };
})();
