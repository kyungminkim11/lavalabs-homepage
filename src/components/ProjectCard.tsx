import { ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import type { Locale } from "../content";
import type { ProjectCard as Project } from "../projectData";
import { trackEvent } from "../analytics";

const previewSource = {
  snap: "/assets/project-previews/snap.svg",
  follow: "/assets/project-previews/follow.svg",
  emoseed: "/assets/project-previews/emoseed.svg",
  softmoon: "/assets/images/lunar-sample-1-720.webp"
} as const;

const previewLabel = {
  ko: "서비스 화면 열기",
  en: "Open service preview",
  jp: "サービス画面を開く"
} as const;

export default function ProjectCard({ project, locale, priority = false }: { project: Project; locale: Locale; priority?: boolean }) {
  const external = project.href.startsWith("http");
  const track = (action: string) => trackEvent("project_click", { locale, project: project.title, action });
  const previewAlt = locale === "ko" ? `${project.title} 실제 서비스 화면 미리보기` : locale === "en" ? `${project.title} live service preview` : `${project.title} 実際のサービス画面`;
  const domain = project.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const visibleTags = project.tags.slice(0, 3);
  const hiddenTagCount = Math.max(0, project.tags.length - visibleTags.length);

  return (
    <article className={`case-card project-card-v2 project-${project.preview}`}>
      <a
        className="project-preview-link"
        href={project.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        aria-label={`${project.title} ${previewLabel[locale]}`}
        onClick={() => track("open_preview")}
      >
        <div className={`project-preview-frame project-${project.preview}-preview`}>
          <img src={previewSource[project.preview]} alt={previewAlt} loading={priority ? "eager" : "lazy"} width="1280" height="800" />
          <span className="project-domain-chip">{domain}</span>
          <span className="project-preview-icon" aria-hidden="true"><ExternalLink /></span>
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

        <div className={`case-actions project-card-actions ${project.detailHref ? "has-secondary" : "single-action"}`}>
          <a className="project-primary-action" href={project.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onClick={() => track("open_service")}>
            <span>{project.cta}</span><ExternalLink aria-hidden="true" />
          </a>
          {project.detailHref && (
            <a className="project-secondary-action" href={project.detailHref} onClick={() => track("open_case_study")}>
              <span>{project.detailCta}</span><ChevronRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
