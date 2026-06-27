import type { Locale } from "./content";

export type CompanyData = {
  name: string;
  legalName: string;
  representative: string;
  businessNumber: string;
  mailOrderNumber: string;
  email: string;
  phone: string;
  phoneHref: string;
  instagram: string;
  kakao: string;
  businessType: Record<Locale, string>;
  address: Record<Locale, string>;
};

declare global {
  interface Window {
    __LAVALABS_COMPANY__?: CompanyData;
  }
}

const fallback: CompanyData = {
  name: "Lava Labs",
  legalName: "Lava Labs",
  representative: "",
  businessNumber: "",
  mailOrderNumber: "",
  email: "info@lavalabs.co.kr",
  phone: "",
  phoneHref: "",
  instagram: "https://www.instagram.com/lavalabs_official/",
  kakao: "https://pf.kakao.com/_xnSxefxj",
  businessType: { ko: "", en: "", jp: "" },
  address: { ko: "", en: "", jp: "" }
};

export function getCompany(): CompanyData {
  return window.__LAVALABS_COMPANY__ ?? fallback;
}
