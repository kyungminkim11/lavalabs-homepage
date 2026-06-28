import { useEffect } from "react";
import { CheckCircle2, ExternalLink, Heart, ImageDown, Leaf, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import type { Locale } from "../content";
import BrandMark from "../components/BrandMark";
import { trackEvent } from "../analytics";

const copy = {
  ko: {
    home: "/", title: "EmoSeed", lead: "식물 성향 테스트, 오늘의 식물 운세, 식물 이름 만들기와 궁합을 통해 지금의 마음을 가볍게 들여다보는 모바일 중심 디지털 정원입니다.",
    start: "EmoSeed 시작하기", concept: "감정을 설명하기보다 다정하게 바라보는 경험", conceptBody: "정답을 맞히는 테스트보다 잠깐 멈춰 지금의 마음을 돌아보는 경험을 목표로 기획했습니다.",
    features: "하나의 정원 안에 담긴 네 가지 경험", featuresIntro: "짧게 즐기고 결과를 저장하거나 공유할 수 있도록 각 프로그램의 진입 장벽을 낮췄습니다.",
    cards: [["나와 닮은 식물", "8개의 질문으로 성향을 살펴보고 닮은 식물과 마음 관리 팁을 확인합니다."], ["오늘의 식물 운세", "하루에 한 번 달라지는 식물과 작은 행동 제안을 만납니다."], ["나만의 식물 이름", "감정과 분위기를 조합해 오늘의 나를 위한 이름을 만듭니다."], ["식물 궁합", "두 사람의 선택을 바탕으로 감성 궁합과 어울리는 식물을 확인합니다."]],
    decisions: "모바일에서 가볍게 시작하도록 설계", decisionsItems: ["회원가입 없이 바로 시작", "짧은 질문과 큰 터치 영역", "결과 이미지 저장과 공유", "브라우저 기반 처리", "PWA 형태의 홈 화면 추가"],
    privacy: "개인정보를 적게 다루는 구조", privacyBody: "테스트 과정은 현재 브라우저에서 처리하며 계정 비밀번호나 불필요한 개인정보를 요구하지 않습니다.",
    outcome: "콘텐츠 기획과 웹 개발을 하나의 서비스로", outcomeBody: "브랜드 언어, 테스트 문항, 결과 유형, 모바일 화면, 저장 이미지와 배포 구조까지 Lava Labs가 직접 설계하고 운영합니다."
  },
  en: {
    home: "/en/", title: "EmoSeed", lead: "A mobile-first digital garden that helps people reflect on their current mood through a plant personality test, daily fortune, name generator, and compatibility experience.",
    start: "Open EmoSeed", concept: "A gentle experience for noticing emotions", conceptBody: "The service was designed less as a test with correct answers and more as a short pause to reflect on how you feel today.",
    features: "Four experiences inside one small garden", featuresIntro: "Each program is quick to enter and designed around results that can be saved or shared.",
    cards: [["Plant personality", "Eight questions connect personal tendencies with a plant and a small care suggestion."], ["Daily plant fortune", "A daily plant and a small action suggestion that changes each day."], ["Plant name generator", "Mood and atmosphere words are combined into a personal plant name."], ["Plant compatibility", "Two selections create a light compatibility result and a matching plant."]],
    decisions: "Designed to feel effortless on mobile", decisionsItems: ["No account required", "Short questions and large touch targets", "Saveable and shareable result images", "Browser-based processing", "Installable PWA experience"],
    privacy: "A low-data approach", privacyBody: "The experience is processed in the current browser and does not request account passwords or unnecessary personal information.",
    outcome: "Content planning and web development in one product", outcomeBody: "Lava Labs designed the language, questions, result types, mobile interface, result images, and deployment structure in-house."
  },
  jp: {
    home: "/jp/", title: "EmoSeed", lead: "植物性格テスト、今日の植物占い、植物名ジェネレーター、相性体験を通じて今の気持ちをやさしく見つめるモバイル中心のデジタルガーデンです。",
    start: "EmoSeedを開く", concept: "感情を決めつけず、やさしく見つめる体験", conceptBody: "正解を当てるテストではなく、少し立ち止まって今日の気持ちを振り返る体験を目指しました。",
    features: "一つの庭にある四つの体験", featuresIntro: "短時間で楽しめ、結果を保存・共有しやすい構成にしています。",
    cards: [["自分に似た植物", "8つの質問から性格傾向と似ている植物、心のケア提案を確認します。"], ["今日の植物占い", "毎日変わる植物と小さな行動提案を受け取ります。"], ["植物名ジェネレーター", "感情と雰囲気を組み合わせ、今日の自分の名前を作ります。"], ["植物相性", "二人の選択から感性相性と似合う植物を確認します。"]],
    decisions: "モバイルですぐ始められる設計", decisionsItems: ["会員登録なし", "短い質問と大きなタッチ領域", "結果画像の保存・共有", "ブラウザ内処理", "ホーム画面に追加できるPWA"],
    privacy: "扱う個人情報を抑えた構成", privacyBody: "テストは現在のブラウザ内で処理し、アカウントのパスワードや不要な個人情報を求めません。",
    outcome: "コンテンツ企画とWeb開発を一つのサービスへ", outcomeBody: "ブランド文章、質問、結果タイプ、モバイル画面、保存画像、公開構成までLava Labsが直接設計・運営しています。"
  }
} as const;

const localeFromPath = (): Locale => location.pathname.startsWith("/en") ? "en" : location.pathname.startsWith("/jp") ? "jp" : "ko";

export default function EmoSeedPage() {
  const locale = localeFromPath();
  const text = copy[locale];
  const featureIcons = [Leaf, Heart, Sparkles, Smartphone];

  useEffect(() => {
    document.title = locale === "ko" ? "EmoSeed 서비스 사례 | Lava Labs" : locale === "en" ? "EmoSeed Case Study | Lava Labs" : "EmoSeed サービス事例 | Lava Labs";
    document.querySelector('meta[name="description"]')?.setAttribute("content", text.lead);
  }, [locale, text.lead]);

  return (
    <div className="app-shell emoseed-case-shell">
      <header className="site-header"><div className="nav-shell"><BrandMark href={text.home} /><div className="language-switcher"><a href="/projects/emoseed/" aria-current={locale === "ko" ? "page" : undefined}>KO</a><a href="/en/projects/emoseed/" aria-current={locale === "en" ? "page" : undefined}>EN</a><a href="/jp/projects/emoseed/" aria-current={locale === "jp" ? "page" : undefined}>JP</a></div></div></header>
      <main id="main-content">
        <section className="section emoseed-case-hero"><div className="section-inner emoseed-case-hero-grid"><div><p className="eyebrow">Lava Labs Interactive Service</p><h1>{text.title}</h1><p className="emoseed-case-lead">{text.lead}</p><div className="button-row"><a className="button primary" href="https://emoseed.lavalabs.co.kr/" target="_blank" rel="noreferrer" onClick={() => trackEvent("case_study_cta", { locale, project: "EmoSeed" })}>{text.start}<ExternalLink aria-hidden="true" /></a><a className="button secondary" href={text.home}>Lava Labs</a></div></div><div className="emoseed-case-visual"><img src="/assets/project-previews/emoseed.svg" alt="EmoSeed 실제 서비스 화면" width="1280" height="800" /></div></div></section>
        <section className="section"><div className="section-inner emoseed-concept-grid"><div className="section-heading"><p className="eyebrow">Concept</p><h2>{text.concept}</h2><p>{text.conceptBody}</p></div><div className="emoseed-concept-card"><Leaf aria-hidden="true" /><strong>Emotion × Plant × Daily Care</strong><p>{text.outcomeBody}</p></div></div></section>
        <section className="section emoseed-feature-section"><div className="section-inner"><div className="section-heading compact"><p className="eyebrow">Experience Design</p><h2>{text.features}</h2><p>{text.featuresIntro}</p></div><div className="emoseed-case-features">{text.cards.map(([title, body], index) => { const Icon = featureIcons[index]; return <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{body}</p></article>; })}</div></div></section>
        <section className="section emoseed-decision-section"><div className="section-inner emoseed-decision-grid"><div><div className="section-heading"><p className="eyebrow">Mobile UX</p><h2>{text.decisions}</h2></div><ul className="emoseed-decision-list">{text.decisionsItems.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" /><span>{item}</span></li>)}</ul></div><div className="emoseed-device-card"><Smartphone aria-hidden="true" /><p>{text.privacy}</p><strong>{text.privacyBody}</strong><div className="emoseed-privacy-icons"><ShieldCheck aria-hidden="true" /><ImageDown aria-hidden="true" /></div></div></div></section>
        <section className="section emoseed-outcome-section"><div className="section-inner"><div className="section-heading compact"><p className="eyebrow">Lava Labs Process</p><h2>{text.outcome}</h2><p>{text.outcomeBody}</p></div><a className="button primary" href="https://emoseed.lavalabs.co.kr/" target="_blank" rel="noreferrer">{text.start}<ExternalLink aria-hidden="true" /></a></div></section>
      </main>
      <footer className="site-footer"><div className="section-inner footer-layout"><BrandMark href={text.home} /><small>(c) 2026 Lava Labs. All rights reserved.</small></div></footer>
    </div>
  );
}
