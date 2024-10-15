vscode 확장프로그램 PostCSS Language Support설치

## 1. 필요 모듈 라이브러리 설치

<strong>주의</strong> : terminal의 현재 디렉토리가 frontend임을 꼭 확인하세요!!!

안되어있다면!
```bash
# git bash terminal
cd frontend
```
를 실행한 이후에 진행하길 바랍니다.
```bash
# git bash terminal
npm i
```
## 2. 서버 구동
아래 명령어를 실행하면 기본적으로 [http://localhost:3000](http://localhost:3000) 서버포트가 열립니다.

아마 자동으로 마지막 열었던 브라우저창에서 새 탭으로 열릴겁니다.
```bash
# git bash terminal
npm start
```

### IF : 프론트엔드 서버 실행시 빨간색 오류문구가 뜬다면!!
아래의 경로로 들어가줍니다.
```
node_modules
ㄴreact-scripts
  ㄴconfig
    ㄴwebpackDevServer.config.js
```


아래의 내용을 찾아서

```
// `proxy` is run between `before` and `after` `webpack-dev-server` hooks
proxy,
onBeforeSetupMiddleware(devServer) {
    // Keep `evalSourceMapMiddleware`
    // middlewares before `redirectServedPath` otherwise will not have any effect
    // This lets us fetch source contents from webpack for the error overlay
    devServer.app.use(evalSourceMapMiddleware(devServer));

    if (fs.existsSync(paths.proxySetup)) {
    // This registers user provided middleware for proxy reasons
    require(paths.proxySetup)(devServer.app);
    }
},
onAfterSetupMiddleware(devServer) {
    // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
    devServer.app.use(redirectServedPath(paths.publicUrlOrPath));

    // This service worker file is effectively a 'no-op' that will reset any
    // previous service worker registered for the same host:port combination.
    // We do this in development to avoid hitting the production cache if
    // it used the same host and port.
    // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
    devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
},
```

다음과 같이 바꿉니다.

<strong>그냥 해당 부분 전체 바꾸면 됩니다.</strong>
- 드래그해서 복붙 ㄱㄱ
- node_modules는 .gitignore 필수 항목이기 때문에 직접해야합니다.
```
// `proxy` is run between `before` and `after` `webpack-dev-server` hooks
proxy,
setupMiddlewares: (middlewares, devServer) => {
    if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
    }

    if (fs.existsSync(paths.proxySetup)) {
        require(paths.proxySetup)(devServer.app)
    }

    middlewares.push(
        evalSourceMapMiddleware(devServer),
        redirectServedPath(paths.publicUrlOrPath),
        noopServiceWorkerMiddleware(paths.publicUrlOrPath)
    )

    return middlewares;
},
```