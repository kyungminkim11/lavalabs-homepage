(() => {
  const registeredAddress =
    "경기도 고양시 일산서구 일현로 47, 2층 204호 1308호실 (탄현동, 예일 큰프라자)";

  const copy = {
    ko: {
      eyebrow: "Legal Information",
      title: "사업자 정보",
      labels: {
        legalName: "상호",
        representative: "대표자",
        businessNumber: "사업자등록번호",
        mailOrderNumber: "통신판매업 신고번호",
        businessType: "업태·종목",
        address: "사업장 소재지",
        email: "이메일"
      },
      values: {
        legalName: "라바랩스(LavaLabs)",
        representative: "김경민",
        businessNumber: "455-23-01867",
        mailOrderNumber: "2025-고양일산서-1352",
        businessType: "도매 및 소매업 · 전자상거래 소매업",
        address: registeredAddress,
        email: "info@lavalabs.co.kr"
      },
      note: "본 정보는 사업자등록 및 통신판매업 신고 내용을 기준으로 표시합니다.",
      contactAddress: registeredAddress
    },
    en: {
      eyebrow: "Legal Information",
      title: "Business Information",
      labels: {
        legalName: "Business name",
        representative: "Representative",
        businessNumber: "Business registration no.",
        mailOrderNumber: "Mail-order business registration no.",
        businessType: "Business type",
        address: "Registered address",
        email: "Email"
      },
      values: {
        legalName: "라바랩스(LavaLabs)",
        representative: "김경민 (Kim Kyungmin)",
        businessNumber: "455-23-01867",
        mailOrderNumber: "2025-고양일산서-1352",
        businessType: "Wholesale and retail · E-commerce retail",
        address: registeredAddress,
        email: "info@lavalabs.co.kr"
      },
      note: "The registered Korean address is displayed in its official form.",
      contactAddress:
        "Room 1308, Office 204, 2F, 47 Ilhyeon-ro, Ilsanseo-gu, Goyang-si, Gyeonggi-do 10343, Republic of Korea"
    },
    jp: {
      eyebrow: "Legal Information",
      title: "事業者情報",
      labels: {
        legalName: "商号",
        representative: "代表者",
        businessNumber: "事業者登録番号",
        mailOrderNumber: "通信販売業届出番号",
        businessType: "業種",
        address: "登録所在地",
        email: "メール"
      },
      values: {
        legalName: "라바랩스(LavaLabs)",
        representative: "김경민（キム・ギョンミン）",
        businessNumber: "455-23-01867",
        mailOrderNumber: "2025-고양일산서-1352",
        businessType: "卸売・小売業 · 電子商取引小売業",
        address: registeredAddress,
        email: "info@lavalabs.co.kr"
      },
      note: "登録所在地は韓国で届け出た正式表記を掲載しています。",
      contactAddress:
        "大韓民国 京畿道 高陽市 一山西区 一現路47、2階204号室・1308号室（炭峴洞、イェイル・クンプラザ）"
    }
  };

  const getLocale = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith("/en")) return "en";
    if (path.startsWith("/jp")) return "jp";
    return "ko";
  };

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && element.textContent !== value) {
      element.textContent = value;
    }
  };

  const updateContactAddress = (value) => {
    const addressElement = document.querySelector(".contact-methods span");
    if (!addressElement || addressElement.textContent?.trim() === value) return;

    const icon = addressElement.querySelector("svg");
    Array.from(addressElement.childNodes).forEach((node) => {
      if (node !== icon) node.remove();
    });
    addressElement.append(document.createTextNode(value));
  };

  const applyBusinessInformation = () => {
    const data = copy[getLocale()];
    setText("[data-business-eyebrow]", data.eyebrow);
    setText("[data-business-title]", data.title);
    setText("[data-business-note]", data.note);

    Object.entries(data.labels).forEach(([key, value]) => {
      setText(`[data-business-label=\"${key}\"]`, value);
    });

    Object.entries(data.values).forEach(([key, value]) => {
      setText(`[data-business-value=\"${key}\"]`, value);
    });

    updateContactAddress(data.contactAddress);
  };

  let scheduled = false;
  const scheduleApply = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      applyBusinessInformation();
    });
  };

  document.addEventListener("DOMContentLoaded", scheduleApply, { once: true });
  window.addEventListener("popstate", scheduleApply);

  const root = document.getElementById("root");
  if (root) {
    new MutationObserver(scheduleApply).observe(root, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
})();
