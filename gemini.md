## GitHub Pages (evil_hunter_tycoon) 업데이트 절차

이 문서는 evil_hunter_tycoon 프로젝트를 GitHub Pages (ggobemiya.github.io/evil_hunter_tycoon/)에 업데이트하는 절차를 설명합니다.

### 0. 수정할 파일 확인 (가장 중요)

모든 작업에 앞서, **가장 먼저 수정해야 할 핵심 파일을 확인**해야 합니다. 이 프로젝트의 경우, 모든 주요 로직과 UI는 `src/App.vue` 파일에 포함되어 있습니다.

-   **핵심 파일**: `src/App.vue`

직업, 계산식, UI 요소 등을 수정하려면 항상 이 파일을 먼저 열어서 내용을 파악하고 수정해야 합니다.

### 1. 프로젝트 설정 확인

-   **`package.json`**: 프로젝트의 빌드 스크립트를 확인합니다. `npm run build` 명령어가 빌드를 담당합니다.
-   **`vue.config.js`**: 빌드 출력 디렉터리(`outputDir`) 및 GitHub Pages의 `publicPath` 설정을 확인합니다.
    ```javascript
    module.exports = defineConfig({
        transpileDependencies: true,
        publicPath: '/evil_hunter_tycoon', // GitHub Pages URL 경로
        outputDir: 'docs' // 빌드된 파일이 저장될 디렉터리
    });
    ```
    이 설정은 빌드된 정적 파일이 `docs` 폴더에 생성되며, `/evil_hunter_tycoon` 경로로 서빙될 것임을 의미합니다.

### 2. 프로젝트 빌드

최신 변경사항을 GitHub Pages에 반영하기 위해 프로젝트를 빌드합니다. 이 과정에서 Vue.js 코드가 정적 파일(HTML, CSS, JavaScript)로 컴파일됩니다.

```bash
npm run build
```

-   **설명**: 이 명령어는 `vue-cli-service build`를 실행하여 `docs` 디렉터리에 배포 가능한 최신 파일을 생성합니다.
-   **주의**: `yarn build` 명령어가 시스템에 설치되어 있지 않아 실패할 경우, `npm run build`를 사용합니다.

### 3. 변경사항 커밋

빌드된 파일과 소스 코드 변경사항(`src/App.vue` 등)을 Git 저장소에 커밋합니다.

```bash
git add -A
```

-   **설명**: 이 명령어는 수정된 파일, 새로 추가된 파일, 삭제된 파일 등 모든 변경사항을 스테이징 영역에 추가합니다.

```bash
git commit -m "feat: <변경 내용 요약>"
```

-   **설명**: 스테이징된 변경사항을 커밋합니다. `<변경 내용 요약>` 부분에는 변경된 내용을 명확하게 설명하는 메시지를 작성합니다. (예: `feat: Add Dark Knight job and update deployment artifacts`)

### 4. GitHub에 푸시

커밋된 변경사항을 원격 GitHub 저장소에 푸시하여 GitHub Pages가 업데이트되도록 합니다.

```bash
git push
```

-   **설명**: 로컬 저장소의 커밋된 변경사항을 `origin/master` (또는 기본 브랜치)에 업로드합니다. 푸시가 완료되면 GitHub Pages는 자동으로 `docs` 폴더의 내용을 사용하여 웹사이트를 업데이트합니다. 이 과정은 GitHub 측에서 처리되므로 반영되기까지 몇 분 정도 소요될 수 있습니다.