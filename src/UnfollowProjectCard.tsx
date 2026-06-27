import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, FileArchive, ShieldCheck, UsersRound } from "lucide-react";
import { trackEvent } from "./analytics";

type Locale = "ko" | "en" | "jp";

const copy = {
  ko: {
    status: "베타 개발 중",
    type: "Instagram 팔로우 관계 분석 도구",
    body: "Instagram에서 내려받은 데이터 ZIP을 브라우저에서 분석해 맞팔, 팔로잉만 하는 계정, 나를 팔로우하는 계정을 구분하는 Lava Labs 자체 웹 서비스입니다.",
    tags: ["브라우저 로컬 분석", "로그인 불필요", "개인정보 보호", "웹 앱"],
    visit: "서비스 확인",
    metricA: "맞팔",
    metricB: "정리 검토",
    metricC: "팔로워만",
    label: "맞팔체커"
  },
  en: {
    status: "Beta in development",
    type: "Instagram follow relationship analyzer",
    body: "An in-house Lava Labs web tool that analyzes an Instagram data ZIP in the browser and separates mutual follows, following-only accounts, and follower-only accounts.",
    tags: ["Local analysis", "No login", "Privacy-first", "Web app"],
    visit: "View service",
    metricA: "Mutual",
    metricB: "Review",
    metricC: "Followers",
    label: "Follow Checker"
  },
  jp: {
    status: "ベータ開発中",
    type: "Instagramフォロー関係分析ツール",
    body: "InstagramからダウンロードしたデータZIPをブラウザ内で分析し、相互フォロー、フォローのみ、フォロワーのみのアカウントを整理するLava Labsの自社Webサービスです。",
    tags: ["ローカル分析", "ログイン不要", "プライバシー", "Webアプリ"],
    visit: "サービスを見る",
    metricA: "相互",
    metricB: "確認対象",
    metricC: "フォロワー",
    label: "フォローチェッカー"
  }
} as const;

function getLocale(): Locale {
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith("/en")) return "en";
  if (path.startsWith("/jp")) return "jp";
  return "ko";
}

export default function UnfollowProjectCard() {
  const [target, setTarget] = useState<Element | null>(null);
  const locale = getLocale();
  const t = copy[locale];

  useEffect(() => {
    let timer = 0;

    const attach = () => {
      const grid = document.querySelector(".case-grid");
      if (!grid) return false;
      grid.classList.add("has-four-projects");
      setTarget(grid);
      return true;
    };

    if (!attach()) {
      timer = window.setInterval(() => {
        if (attach()) window.clearInterval(timer);
      }, 100);
    }

    return () => {
      if (timer) window.clearInterval(timer);
      document.querySelector(".case-grid")?.classList.remove("has-four-projects");
    };
  }, []);

  if (!target) return null;

  return createPortal(
    <article className="case-card unfollow-project-card">
      <div className="case-preview project-unfollow-preview" aria-hidden="true">
        <div className="unfollow-preview-header">
          <span><FileArchive /> Instagram ZIP</span>
          <ShieldCheck />
        </div>
        <div className="unfollow-preview-metrics">
          <div><UsersRound /><strong>{t.metricA}</strong></div>
          <div><span>↗</span><strong>{t.metricB}</strong></div>
          <div><span>↙</span><strong>{t.metricC}</strong></div>
        </div>
        <div className="case-preview-label">
          <strong>{t.label}</strong>
          <small>unfollow.lavalabs.co.kr</small>
        </div>
      </div>
      <div className="case-content">
        <span className="case-status beta-status">{t.status}</span>
        <h3>{t.label}</h3>
        <p className="case-type">{t.type}</p>
        <p>{t.body}</p>
        <div className="tag-row">{t.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <a
          href="https://unfollow.lavalabs.co.kr/"
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("portfolio_visit", { locale, project: "Follow Checker" })}
        >
          {t.visit}<ExternalLink aria-hidden="true" />
        </a>
      </div>
    </article>,
    target
  );
}
