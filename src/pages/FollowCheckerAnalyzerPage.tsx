import { useEffect } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import type { Locale } from "../content";
import BrandMark from "../components/BrandMark";

const copy = {
  ko: {
    home: "/",
    detail: "/projects/follow-checker/",
    title: "맞팔체커 웹 분석",
    description: "별도 앱으로 전환하지 않고 현재 웹페이지 안에서 분석 도구를 이용합니다.",
    back: "소개 페이지로 돌아가기",
    note: "선택한 데이터 파일은 분석 화면이 열린 브라우저 안에서 처리됩니다.",
    frameTitle: "맞팔체커 웹 분석 도구"
  },
  en: {
    home: "/en/",
    detail: "/en/projects/follow-checker/",
    title: "Follow Checker web analyzer",
    description: "Use the analyzer inside this webpage without switching to a standalone app.",
    back: "Back to overview",
    note: "The selected data file is processed inside the browser showing this analyzer.",
    frameTitle: "Follow Checker web analyzer"
  },
  jp: {
    home: "/jp/",
    detail: "/jp/projects/follow-checker/",
    title: "フォローチェッカー Web分析",
    description: "別のアプリへ切り替えず、このWebページ内で分析ツールを利用できます。",
    back: "紹介ページに戻る",
    note: "選択したデータファイルは、この分析画面を表示しているブラウザ内で処理されます。",
    frameTitle: "フォローチェッカー Web分析ツール"
  }
} as const;

const localeFromPath = (): Locale => location.pathname.startsWith("/en") ? "en" : location.pathname.startsWith("/jp") ? "jp" : "ko";

export default function FollowCheckerAnalyzerPage() {
  const locale = localeFromPath();
  const text = copy[locale];

  useEffect(() => {
    document.title = locale === "ko" ? "맞팔체커 웹 분석 | Lava Labs" : locale === "en" ? "Follow Checker Web Analyzer | Lava Labs" : "フォローチェッカー Web分析 | Lava Labs";
  }, [locale]);

  return (
    <div className="app-shell follow-analyzer-shell">
      <header className="site-header">
        <div className="nav-shell follow-analyzer-nav">
          <BrandMark href={text.home} />
          <a className="follow-analyzer-back" href={text.detail}><ArrowLeft aria-hidden="true" />{text.back}</a>
        </div>
      </header>
      <main className="follow-analyzer-main" id="main-content">
        <section className="follow-analyzer-intro">
          <div className="section-inner">
            <p className="eyebrow">Lava Labs Web Tool</p>
            <h1>{text.title}</h1>
            <p>{text.description}</p>
            <div className="follow-analyzer-note"><ShieldCheck aria-hidden="true" /><span>{text.note}</span></div>
          </div>
        </section>
        <section className="follow-analyzer-frame-section" aria-label={text.frameTitle}>
          <div className="follow-analyzer-frame-wrap">
            <iframe
              src="https://unfollow.lavalabs.co.kr/?embed=1"
              title={text.frameTitle}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="clipboard-read; clipboard-write"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
