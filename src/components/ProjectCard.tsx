import { ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import type { Locale } from "../content";
import type { ProjectCard as Project } from "../projectData";
import { trackEvent } from "../analytics";

const previewSource = {
  space: "/assets/project-previews/space.svg",
  snap: "/assets/project-previews/snap.svg",
  follow: "/assets/project-previews/follow.svg",
  emoseed: "/assets/project-previews/emoseed.svg",
  heart: "/assets/project-previews/heart.svg",
  softmoon: "/assets/images/lunar-sample-1-720.webp"
} as const;

const previewLabel = {
  ko: "서비스 화면 열기",
  en: "Open service preview",
  jp: "サービス画面を開く"
} as const;

const followCardCopy = {
  ko: { primary: "맞팔체커 웹 페이지 보기", secondary: "웹에서 분석 시작하기" },
  en: { primary: "View Follow Checker page", secondary: "Analyze on the web" },
  jp: { primary: "フォローチェッカー紹介を見る", secondary: "Webで分析を始める" }
} as const;

export default function ProjectCard({ project, locale, priority = false }: { project: Project; locale: Locale; priority?: boolean }) {
  const isFollowChecker = project.preview === "follow";
  const followDetailHref = locale === "ko" ? "/projects/follow-checker/" : `/${locale}/projects/follow-checker/`;
  const followAnalyzerHref = locale === "ko" ? "/projects/follow-checker/analyzer/" : `/${locale}/projects/follow-checker/analyzer/`;
  const primaryHref = isFollowChecker ? followDetailHref : project.href;
  const primaryExternal = primaryHref.startsWith("http");
  const primaryCta = isFollowChecker ? followCardCopy[locale].primary : project.cta;
  const secondaryHref = isFollowChecker ? followAnalyzerHref : project.detailHref;
  const secondaryCta = isFollowChecker ? followCardCopy[locale].secondary : project.detailCta;
  const secondaryExternal = secondaryHref?.startsWith("http") ?? false;
  const hasSecondary = Boolean(secondaryHref && secondaryCta);
  const track = (action: string) => trackEvent("project_click", { locale, project: project.title, action });
  const previewAlt = locale === "ko" ? `${project.title} 실제 서비스 화면 미리보기` : locale === "en" ? `${project.title} live service preview` : `${project.title} 実際のサービス画面`;
  const domain = primaryExternal
    ? primaryHref.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `lavalabs.co.kr${primaryHref}`;
  const visibleTags = project.tags.slice(0, 3);
  const hiddenTagCount = Math.max(0, project.tags.length - visibleTags.length);

  return (
    <article className={`case-card project-card-v2 project-${project.preview}`}>
      <a
        className="project-preview-link"
        href={primaryHref}
        target={primaryExternal ? "_blank" : undefined}
        rel={primaryExternal ? "noreferrer" : undefined}
        aria-label={`${project.title} ${previewLabel[locale]}`}
        onClick={() => track(isFollowChecker ? "open_project_page" : "open_preview")}
      >
        <div className={`project-preview-frame project-${project.preview}-preview`}>
          <img src={previewSource[project.preview]} alt={previewAlt} loading={priority ? "eager" : "lazy"} width="1280" height="800" />
          <span className="project-domain-chip">{domain}</span>
          <span className="project-preview-icon" aria-hidden="true">{primaryExternal ? <ExternalLink /> : <ChevronRight />}</span>
        </div>
      </a>

      <div className="case-content project-card-content">
        <div className="project-card-meta">
          <span className={`case-status ${project.preview === "follow" ? "beta-status" : ""}`}>{project.status}</span>
          <span className="project-type-label">{project.type}</span>
        </div>

        <div className="project-card-heading">
          <h3>{project.title}</h3>
          {project.statusDetail && <small>{project.statusDetail}</small>}
        </div>

        <p className="project-card-description">{project.body}</p>

        {project.notice && (
          <p className="case-notice project-card-notice">
            <ShieldCheck aria-hidden="true" />
            <span>{project.notice}</span>
          </p>
        )}

        <div className="tag-row project-card-tags">
          {visibleTags.map((tag) => <span key={tag}>{tag}</span>)}
          {hiddenTagCount > 0 && <span className="tag-more">+{hiddenTagCount}</span>}
        </div>

        <div className={`case-actions project-card-actions ${hasSecondary ? "has-secondary" : "single-action"}`}>
          <a
            className="project-primary-action"
            href={primaryHref}
            target={primaryExternal ? "_blank" : undefined}
            rel={primaryExternal ? "noreferrer" : undefined}
            onClick={() => track(isFollowChecker ? "open_project_page" : "open_service")}
          >
            <span>{primaryCta}</span>{primaryExternal ? <ExternalLink aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
          </a>
          {hasSecondary && secondaryHref && secondaryCta && (
            <a
              className="project-secondary-action"
              href={secondaryHref}
              target={secondaryExternal ? "_blank" : undefined}
              rel={secondaryExternal ? "noreferrer" : undefined}
              onClick={() => track(isFollowChecker ? "open_web_analyzer" : "open_case_study")}
            >
              <span>{secondaryCta}</span>{secondaryExternal ? <ExternalLink aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
