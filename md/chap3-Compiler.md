# 타입스크립트 컴파일러 및 구성

## Watch mode 사용하기

```
tsc app.ts -w
```

혹은

```
tsc app.ts --watch
```

을 사용하면 TS파일이 바뀌고 저장될 때마다 자동으로 컴파일한다.
단점은 파일 하나하나를 구체적으로 지정해줘야 한다는 것이다.
그래서 큰 프로젝트에는 적합하지 않다.

## tsc --init

`tsc --init`커맨드를 사용하면 이 프로젝트에서 타입스크립트 설정을 할 수 있는 tscofing.json 파일이 생성된다. 그리고 디렉터리안에 있는 모든 ts 파일을 알게되어 파일 하나하나 컴파일 할 필요 없이 한번에 컴파일 할 수 있게 된다.

```
tsc -w
```

타입스크립트 파일 하나가 바뀔 때마다 모든 파일을 컴파일 하기 때문에 다소 시간이 소요된다는 것이다.

## 컴파일러로 파일관리하기

tsconfig.json을 보면 대략 다음과 같은 구조로 구성 되어있다.

```json
{
  "compilerOptions": {
    // ...생략
  }
}
```

compilerOptions 말고도 excludes, includes, files라는 옵션을 추가로 줄 수 있는데 이들의 역할은 다음과 같다.

```json
{ "excludes": ["app.ts"] }
```

```json
{ "includes": ["app.ts"] }
```

```json
{ "files": ["app.ts"] }
```

## 컴파일 대상 지정하기

compilerOptions는 어떤 파일이 컴파일 되어야 하는지, 또 어떻게 컴파일 되어야 하는지를 설정한다. 대부분의 옵션은 딱히 건드릴 것이 없어서 몇가지만 살펴보도록 하겠다.

**target**
TS를 어떤 JS버전으로 컴파일 할 것인지 설정한다. 초기 값은 es5이다.
이곳에 어떤 값이 들어갈 수 있는지 알고 싶다면 `ctrl + space`를 누르면 es코드가 보인다. 최신버전의 JS를 쓸 수록 코드와 컴파일 양이 줄어들고, 구버전의 JS를 사용하면 구형 브라우저에서도 잘 동작한다.

## Typescript 핵심 라이브러리 이해하기

lib 옵션은 타입스크립트 노드를 지정하게 해주는 옵션이다.
다음과 같은 상황을 가정해보자.

```html
<button>Click me</button>
```

```ts
const button = document.querySelctor("button")!;
button.addEventListener("click", () => alert("Thanks"));
```

이 코드는 에러 없이 컴파일된다. 그런데 TS는 document.querySelector라는 메서드가 존재한다는 것을 어떻게 안 것일까? 그리고 button이 addEventListener를 사용할 수 있다는 것을 어떻게 안 것일까?

일반 JS 기준으로 보면 당연해보이지만 TS는 nodejs에서 사용될 수도 있다. 그런 경우 위 코드는 정상적으로 컴파일되지 않을 것이다.

이 것이 작동하는 이유는 lib 옵션 때문이다. lib 옵션은 초기에는 주석처리되어있다. 이 경우 기본 설정은 자바스크립트의 target에 따라 달라진다. 이런 기본 설정은 TS가 브라우저에서 작동하는데 필요한 DOM API등을 포함한다.

그래서 주석을 처리하면 에러가 발생하고, 이때는 필요한 값을 설정해줘야 한다.
왜냐하면 TS는 document나 alert이 존재하는지 모르기 때문이다.

`lib: ["dom"]`을 입력해주면 TS에서 domAPI를 사용할 수 있게 해준다. 그 외에 다음과 같은 값을 넣어주면 JS의 핵심기능을 모두 쓸 수 있다(lib을 설정하지 않았을 때와 같음) `lib: ["dom", "es6", "dom.iterable", "scripthost"]`

## 추가 구성 및 컴파일 옵션

allowJs는 컴파일시 checkJS와 함께 JS파일에 포함시킬 수 있다.
allowJS는 타입스크립트가 자바스크립트 파일을 컴파일 할 수 있게 해준다.
파일이 .ts로 끝나지 않더라도 TS는 컴파일 할 수 있다.
checkJS를 사용하면 TS는 컴파일을 수행하지 않더라도 구문을 검사하고 잠재적 에러를 보고한다.

## sourceMap 작업하기

socurceMap은 디버깅과 개발에 유용. sourceMap을 true로 설정하면 컴파일 시 {파일이름}.js.map이라는 파일이 생성되고, 개발자도구 source 탭에서 TS 파일을 확인할 수 있게 해준다.

## rootDir과 outDir

프로젝트를 할 때 root dir에 파일을 넣지 않는다. 보통 dist와 src 폴더를 사용.
dist: 모든 출력값을 보관하는 작업
src: 개발에 필요한 폴더/파일들

rootDir는 TS파일이 저장될 경로를 넣어주고 outDir에는 컴파일된 JS파일이 저장될 경로를 넣어주면 컴파일 할 때마다 rootDir의 구조를 복사해서 outDir에 저장된다.

vs includes

## removeComments

컴파일 할 때 모든 주석 제거

## noEmit

JS파일을 생성하지 않는다

## downlevelIteration

이 옵션을 설정하면 특정 경우에 보다 정확하게 컴파일을 할 수 있다.
루프가 있고 생성된 코드가 해당 루프와 다르게 동작하는 경우에만 켜주면 된다.
(JS코드가 더 늘어날 수 있음)

## 컴파일 오류 시 파일 방출 중지하기

noEmitOnError 기본값은 false이다. 이 값을 true로 하지 않으면 에러가 발생해도 JS 파일을 만든다. 이 값을 true로 해야 에러가 발생했을 때 컴파일되지 않는다.

## Strict 컴파일

strict이 true일 경우 strict 타입 체킹을 한다.
하지만 false를 하고 원하는 모드만 true로 켜도 된다.

(이건 따로 공부하기)
noImplicitAny: 타입 추론이 되지 않는 값은 타입을 지정해주어야 한다.
strictNullChecks:
strictFunctionTypes
strictBindCallApply
strictPropertyInitialization
noImplicitThis
useUnknownInCatchVariables
alwaysStrict

## 코드 품질 옵션

- noUnusedLocals: 사용되지 않는 변수
- noUnusedParameters: 사용되지 않는 인수
- noImplicitReturns: 경우에 따라 함수의 반환 여부가 달라질 때

- noFallthroughCasesInSwitch

## VSCODE로 디버깅하기

ESLint, Prettier, debugger(이건 좀 주말에 공부하자...)
