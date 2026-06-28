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

export default function ProjectCard({ project, locale, priority = false }: { project: Project; locale: Locale; priority?: boolean }) {
  const external = project.href.startsWith("http");
  const track = (action: string) => trackEvent("project_click", { locale, project: project.title, action });

  return (
    <article className={`case-card project-${project.preview}`}>
      <div className={`case-preview project-image-preview project-${project.preview}-preview`}>
        <img
          src={previewSource[project.preview]}
          alt={`${project.title} 실제 서비스 화면 미리보기`}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          width="1280"
          height="800"
        />
        <div className="case-preview-label">
          <strong>{project.title}</strong>
          <small>{project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}</small>
        </div>
      </div>
      <div className="case-content">
        <div className="case-status-row">
          <span className={`case-status ${project.preview === "follow" ? "beta-status" : ""}`}>{project.status}</span>
          {project.statusDetail && <small>{project.statusDetail}</small>}
        </div>
        <h3>{project.title}</h3>
        <p className="case-type">{project.type}</p>
        <p>{project.body}</p>
        {project.notice && (
          <p className="case-notice">
            <ShieldCheck aria-hidden="true" />
            <span>{project.notice}</span>
          </p>
        )}
        <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="case-actions">
          <a href={project.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onClick={() => track("open_service")}>
            {project.cta}<ExternalLink aria-hidden="true" />
          </a>
          {project.detailHref && (
            <a className="case-secondary-link" href={project.detailHref} onClick={() => track("open_case_study")}>
              {project.detailCta}<ChevronRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
