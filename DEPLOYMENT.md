# Lava Labs GitHub Pages 배포 및 도메인 전환

이 저장소는 `main` 브랜치에 변경 사항이 올라오면 GitHub Actions로 빌드·검사·배포됩니다.

## 배포 흐름

1. TypeScript와 Vite 빌드
2. 한국어·영어·일본어 및 약관·개인정보·SoftMoon 정적 HTML 생성
3. canonical, hreflang, Open Graph, 구조화 데이터 적용
4. Playwright로 공개 경로와 모바일 레이아웃 검사
5. GitHub Pages 배포
6. `deploy-version.json`으로 커스텀 도메인이 최신 커밋을 제공하는지 확인

## GitHub Pages 설정

저장소의 `Settings → Pages`에서 다음을 확인합니다.

- Source: GitHub Actions
- Custom domain: `lavalabs.co.kr`
- DNS 전환 후 인증서가 준비되면 Enforce HTTPS 활성화

## 루트 도메인 DNS

DNS 관리 서비스에서 `lavalabs.co.kr` 루트(`@`)가 Netlify를 가리키는 기존 A/ALIAS/ANAME 레코드를 제거하고 다음 A 레코드를 등록합니다.

| 유형 | 이름 | 값 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

`www` 주소도 사용할 경우 다음 레코드를 추가합니다.

| 유형 | 이름 | 값 |
|---|---|---|
| CNAME | www | kyungminkim11.github.io |

## 주의

- `snap.lavalabs.co.kr`, `softmoon.lavalabs.co.kr`, `qr.lavalabs.co.kr` 등 기존 서브도메인 레코드는 변경하지 않습니다.
- 와일드카드 `*.lavalabs.co.kr` 레코드는 사용하지 않습니다.
- 현재 `lavalabs.co.kr`이 연결된 기존 Netlify 프로젝트에서는 루트 커스텀 도메인만 분리합니다. 사이트 삭제나 서브도메인 프로젝트 삭제는 하지 않습니다.
- DNS 변경 사항은 즉시 보일 수도 있지만 전 세계에 전파되는 데 시간이 걸릴 수 있습니다.

## 배포 확인

배포 후 아래 주소가 현재 GitHub 커밋 SHA를 포함하는지 확인합니다.

`https://lavalabs.co.kr/deploy-version.json`

GitHub Actions의 `verify-domain` 작업도 같은 검사를 자동 수행합니다. 이 작업만 실패한다면 앱 빌드가 아니라 DNS 또는 GitHub Pages 커스텀 도메인 설정을 확인해야 합니다.
