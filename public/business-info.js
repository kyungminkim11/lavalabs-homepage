(() => {
  const read = (key) => document.querySelector(`[data-business-value="${key}"]`)?.textContent?.trim() ?? "";
  const legalName = read("legalName");
  const representative = read("representative");
  const businessNumber = read("businessNumber");
  const mailOrderNumber = read("mailOrderNumber");
  const businessTypeKo = read("businessType");
  const addressKo = read("address");
  const email = read("email") || "info@lavalabs.co.kr";

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
    businessType: {
      ko: businessTypeKo,
      en: "Wholesale and retail · E-commerce retail",
      jp: "卸売・小売業 · 電子商取引小売業"
    },
    address: {
      ko: addressKo,
      en: addressKo,
      jp: addressKo
    }
  };
})();
