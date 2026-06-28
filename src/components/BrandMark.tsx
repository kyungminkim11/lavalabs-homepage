export default function BrandMark({ href = "/" }: { href?: string }) {
  return (
    <a className="brand-link" href={href}>
      <picture className="brand-mark">
        <source srcSet="/assets/images/lava-logo-transparent-160.webp" type="image/webp" />
        <img src="/assets/images/lava-logo-transparent.png" alt="Lava Labs" width="40" height="40" />
      </picture>
      <span>Lava Labs</span>
    </a>
  );
}
