import { useEffect } from "react";
import { CheckCircle2, ExternalLink, FileArchive, ShieldCheck } from "lucide-react";
import type { Locale } from "../content";
import BrandMark from "../components/BrandMark";
import { trackEvent } from "../analytics";

const copy = {
  ko: {
    home: "/",
    title: "맞팔체커",
    lead: "내보낸 데이터 파일을 현재 브라우저에서 분석해 팔로우 관계를 구분하는 Lava Labs의 자체 웹 도구입니다.",
    start: "웹 분석 도구 열기",
    toolNote: "분석 도구는 새 탭에서 열리며, 선택한 파일은 현재 브라우저 안에서만 처리됩니다.",
    flow: "작동 방식",
    trust: "데이터 처리 원칙",
    previewAlt: "맞팔체커 웹 분석 화면 미리보기",
    steps: [["1. 데이터 준비", "계정 설정에서 팔로우 관계 데이터 파일을 내려받습니다."], ["2. 브라우저 분석", "선택한 파일은 현재 브라우저에서 처리됩니다."], ["3. 결과 확인", "관계 유형별 결과를 검색하고 확인합니다."]],
    yes: ["브라우저 기반 파일 분석", "관계 유형 분류", "검색과 결과 확인", "PC·모바일 지원"],
    no: ["외부 파일 보관", "자동 계정 작업", "사용자 대신 수행하는 기능"],
    notice: "이 도구는 관련 플랫폼이 제공하거나 보증하는 공식 서비스가 아닙니다."
  },
  en: {
    home: "/en/",
    title: "Follow Checker",
    lead: "A Lava Labs web tool that reviews follow relationships by processing an exported data file in the current browser.",
    start: "Open web analyzer",
    toolNote: "The analyzer opens in a new tab and processes the selected file only inside your current browser.",
    flow: "How it works",
    trust: "Data handling principles",
    previewAlt: "Follow Checker web analyzer preview",
    steps: [["1. Prepare data", "Download the relationship data file from account settings."], ["2. Browser analysis", "The selected file is processed in the current browser."], ["3. Review results", "Search and review each relationship category."]],
    yes: ["Browser-based file analysis", "Relationship categories", "Search and review", "Desktop and mobile support"],
    no: ["External file storage", "Automatic account actions", "Actions performed for the user"],
    notice: "This tool is not an official product provided or endorsed by the related platform."
  },
  jp: {
    home: "/jp/",
    title: "フォローチェッカー",
    lead: "エクスポートしたデータファイルを現在のブラウザ内で処理し、フォロー関係を分類するLava LabsのWebツールです。",
    start: "Web分析ツールを開く",
    toolNote: "分析ツールは新しいタブで開き、選択したファイルは現在のブラウザ内だけで処理されます。",
    flow: "仕組み",
    trust: "データ処理方針",
    previewAlt: "フォローチェッカーWeb分析画面のプレビュー",
    steps: [["1. データを準備", "アカウント設定から関係データをダウンロードします。"], ["2. ブラウザで分析", "選択したファイルは現在のブラウザ内で処理されます。"], ["3. 結果を確認", "関係タイプ別に検索・確認します。"]],
    yes: ["ブラウザ内ファイル分析", "関係タイプの分類", "検索と結果確認", "PC・モバイル対応"],
    no: ["外部ファイル保存", "自動アカウント操作", "ユーザーに代わる操作"],
    notice: "本ツールは関連プラットフォームが提供・保証する公式サービスではありません。"
  }
} as const;

const localeFromPath = (): Locale => location.pathname.startsWith("/en") ? "en" : location.pathname.startsWith("/jp") ? "jp" : "ko";

export default function FollowCheckerPage() {
  const locale = localeFromPath();
  const text = copy[locale];

  useEffect(() => {
    document.title = locale === "ko" ? "맞팔체커 작동 방식과 개인정보 보호 | Lava Labs" : locale === "en" ? "How Follow Checker Works | Lava Labs" : "フォローチェッカーの仕組み | Lava Labs";
  }, [locale]);

  return (
    <div className="app-shell follow-case-shell">
      <header className="site-header">
        <div className="nav-shell">
          <BrandMark href={text.home} />
          <div className="language-switcher">
            <a href="/projects/follow-checker/" aria-current={locale === "ko" ? "page" : undefined}>KO</a>
            <a href="/en/projects/follow-checker/" aria-current={locale === "en" ? "page" : undefined}>EN</a>
            <a href="/jp/projects/follow-checker/" aria-current={locale === "jp" ? "page" : undefined}>JP</a>
          </div>
        </div>
      </header>
      <main id="main-content">
        <section className="section follow-case-hero">
          <div className="section-inner follow-case-grid">
            <div>
              <p className="eyebrow">Lava Labs Web Tool</p>
              <h1>{text.title}</h1>
              <p className="follow-case-lead">{text.lead}</p>
              <div className="button-row">
                <a className="button primary" href="https://unfollow.lavalabs.co.kr/" target="_blank" rel="noreferrer" onClick={() => trackEvent("case_study_cta", { locale, project: "Follow Checker" })}>{text.start}<ExternalLink aria-hidden="true" /></a>
                <a className="button secondary" href={text.home}>Lava Labs</a>
              </div>
              <p className="follow-case-tool-note"><ShieldCheck aria-hidden="true" />{text.toolNote}</p>
            </div>
            <aside className="follow-case-panel">
              <div className="follow-case-browser">
                <div className="follow-case-browser-bar" aria-hidden="true">
                  <span className="follow-case-browser-dots"><i /><i /><i /></span>
                  <small>unfollow.lavalabs.co.kr</small>
                </div>
                <img className="case-study-preview" src="/assets/project-previews/follow.svg" alt={text.previewAlt} width="1280" height="800" />
              </div>
              <span className="follow-case-badge">Public Beta</span>
              <ul className="follow-case-points">
                <li><CheckCircle2 aria-hidden="true" /><span>Local browser analysis</span></li>
                <li><ShieldCheck aria-hidden="true" /><span>Privacy-first workflow</span></li>
                <li><FileArchive aria-hidden="true" /><span>Exported data file</span></li>
              </ul>
            </aside>
          </div>
        </section>
        <section className="section">
          <div className="section-inner">
            <div className="section-heading compact"><p className="eyebrow">Process</p><h2>{text.flow}</h2></div>
            <div className="follow-case-grid-cards">{text.steps.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
          </div>
        </section>
        <section className="section follow-case-trust">
          <div className="section-inner">
            <div className="section-heading compact"><p className="eyebrow">Privacy & Boundaries</p><h2>{text.trust}</h2></div>
            <div className="follow-case-boundaries">
              <article><h3>{locale === "ko" ? "제공하는 기능" : locale === "en" ? "Available" : "提供する機能"}</h3><ul>{text.yes.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><h3>{locale === "ko" ? "제공하지 않는 기능" : locale === "en" ? "Not provided" : "提供しない機能"}</h3><ul>{text.no.map((item) => <li key={item}>{item}</li>)}</ul></article>
            </div>
            <p className="follow-case-disclaimer">{text.notice}</p>
          </div>
        </section>
      </main>
      <footer className="site-footer"><div className="section-inner footer-layout"><BrandMark href={text.home} /><small>(c) 2026 Lava Labs. All rights reserved.</small></div></footer>
    </div>
  );
}
