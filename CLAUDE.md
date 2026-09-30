# SOKO TEA 모바일 앱

Corvallis, OR의 음료 가게 SOKO TEA의 iOS/Android 앱.

- 웹사이트: https://sokotea.com
- 주문/결제: MealKeyway 외부 주문 페이지. 앱에서 주문 기능을 직접 만들지 않고, 이 페이지를 앱 내 브라우저(`expo-web-browser`)로 연다.

## 이름 표기 규칙

- **사람이 보는 이름은 "SOKO TEA"** (모두 대문자, 띄어쓰기 있음): 앱 화면 문구, 앱 이름(`app.json`의 `name`), 문서 제목.
  - 화면에서는 문자열을 직접 쓰지 않고 `store.name`(`src/config/store.ts`)을 쓴다.
- **코드와 ID는 `sokotea`** (소문자, 띄어쓰기 없음): `package.json` name, `app.json`의 `slug`·`scheme`, 번들 ID, 폴더·파일·변수 이름, 저장소 이름.
- "SokoTea", "Soko Tea" 같은 다른 표기는 쓰지 않는다.

## 기술 스택

- Expo (React Native) + TypeScript
- 빌드/배포: EAS Build
- Node는 Expo가 지원하는 LTS 버전을 쓴다 (`.nvmrc` = 22, nvm으로 관리, 아래 작업 환경 참고)
- Expo 작업 지침(패키지 설치, 문서 확인, 라우팅 규칙): @AGENTS.md

## 1차 기능 범위

1. 메뉴 탐색: 카테고리별 목록, 음료 상세
2. 주문하기 버튼 → MealKeyway 페이지를 앱 내 브라우저로 열기
3. 영업 중 표시: 월~토 11:00~21:00, 일요일 휴무
   - 기기 시간대가 아니라 가게 시간대(`America/Los_Angeles`) 기준으로 판단한다
4. 즐겨찾기 음료 (기기 로컬 저장)
5. 길찾기, 전화, 인스타그램 연결

1차 범위에 없는 기능(로그인, 자체 결제, 푸시 알림 등)은 먼저 묻지 않고 추가하지 않는다.

## 데이터 원칙

- 실제 메뉴 데이터(`menu.json`)와 음료 사진은 **맨 마지막 단계**에서 추가한다.
- 그 전까지는 카테고리 2~3개, 음료 몇 개짜리 **가짜 샘플 데이터**와 **사진 자리표시자**로 화면과 구조를 완성한다.
- 메뉴 데이터는 화면 코드와 분리한다. 실제 데이터로 바꿀 때 **데이터 파일 하나만 교체**하면 되도록 한다.
  - 화면은 데이터 파일을 직접 import하지 않고, 타입이 정의된 접근 함수(예: `getCategories()`, `getDrinkById()`)를 거친다.
  - 샘플 데이터와 실제 데이터는 같은 타입(스키마)을 따른다.
  - 교체할 파일은 `src/data/menu.json` 하나다 (타입: `src/types/menu.ts`의 `MenuData`, 접근 함수: `src/data/menu.ts`). 구조가 틀리면 `npx tsc --noEmit`이 실패한다.
- 가게 정보(주소, 전화번호, 영업시간, 인스타그램, MealKeyway URL)는 한 곳의 설정 파일에 모은다.

## 작업 환경

- OSU flip 서버 (Rocky Linux, **sudo 권한 없음**), tmux 세션에서 작업
- 전역 설치가 필요한 도구는 nvm/npx 등 사용자 영역에서만 설치한다. `sudo`를 쓰는 방법은 제안하지 않는다.
- 서버에 시뮬레이터가 없으므로 실기기의 Expo Go로 확인한다. flip은 폰과 같은 네트워크가 아니므로 `npx expo start --tunnel`을 쓴다.
- **flip은 사용자당 프로세스+스레드 수를 200개로 제한한다 (`ulimit -u` = 200).** Metro, ngrok, Claude 세션만으로도 약 150개를 쓴다.
  - 한도를 넘으면 `spawn EAGAIN`, `SIGABRT` 오류가 나거나 명령이 종료 코드 134/137로 끝난다. 프로젝트 문제가 아니다.
  - `npm install`, `npx expo install`, `npx expo-doctor`처럼 무거운 명령은 **동시에 여러 개 돌리지 말고 하나씩 실행한다.** 실패하면 현재 사용량(`ps -L -u $USER | wc -l`)을 확인하고 다시 실행한다.
  - 필요하면 사용자에게 Metro를 잠시 멈춰 달라고 요청한다. 사용자의 다른 프로세스나 tmux 세션은 종료하지 않는다.
  - Metro 작업 프로세스 수는 `metro.config.js`에서 `maxWorkers = 2`로 제한해 두었다.
- GitHub remote: `git@github-personal:Hwan4234/sokotea.git` (SSH 별칭 `github-personal`, 계정 Hwan4234)

### 실행 방법

```
cd ~/sokotea && nvm use && npx expo start --tunnel
```

- **Expo Go 앱과 CLI 모두 같은 Expo 계정으로 로그인해야 한다.** CLI는 `npx expo login`, 확인은 `npx expo whoami`.
- Metro 캐시는 `metro.config.js`에서 프로젝트 안(`node_modules/.cache/metro`)으로 지정해 두었다. flip의 `/tmp/metro-cache`는 다른 사용자 소유라서 기본 위치를 쓰면 EACCES 에러가 난다. 그래서 `TMPDIR`을 따로 지정할 필요가 없다.
- 캐시가 꼬였을 때는 `npx expo start --tunnel --clear`로 비운다.

## 작업 규칙

- **항상 한국어로 답한다.** (코드, 코드 주석, 커밋 메시지, 앱 화면 문구는 영어)
- 작은 단계로 나눠 진행하고, **다음 단계로 넘어가기 전에 확인받는다.**
- 무엇을 하는지와 **왜** 그렇게 하는지를 함께 설명한다.
- API 키와 비밀 값은 `.env`에만 둔다. `.env`는 절대 커밋하지 않는다 (`.gitignore`에 포함되어 있음).
- 커밋 메시지는 명령형 영어 한 줄로 쓴다. 예: `Add menu screen`
