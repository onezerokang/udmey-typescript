# Core Types

JS의 기본 타입

- number
- string
- boolean

assignment type
TypeError가 있어도 컴파일을 하기는 한다.
JS에서는 runtime에서 type을 검사해야 하기 때문에 다음과 같이 typeof를 써야 한다. 다만 타입스크립트를 사용하면 개발 도중에 이를 발견할 수 있다.

```js
function add(n1, n2) {
  if (typeof n1 !== "number" || typeof n2 !== "number") {
    throw new Error("Incorrect Input!");
  }
  return n1 + n2;
}

const number1 = "5";
const number2 = 2.8;

const result = add(number1, number2);
console.log(result);
```

JS는 동적타입(dynamic type)이다. 나중에 문자열을 할당할 때 처음에 숫자형을 잡아둘 수 있는 변수가 있더라도 문제가 없다. 특정 타입에 의존하는 코드가 있을 때, 런타임환경에서 typeof를 사용해야 함.

TS는 정적타입(static type)이다. 개발도중에 매개변수의 타입을 정의한다.
런타임중에 갑자기 변경되지 않는다.

타입스크립트의 타입은 컴파일 중에 확인되고, JS는 런타임중 확인된다(할당된다)

TS에서 :number, :string같은 특수 키워드는 타입스크립트에만 존재한다.
ts compiler와 IDE는 이를 이해할 수 있지만 JS는 이런 키워드가 존재하지 않는다.

# 타입 할당 및 타입 추론

```js
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  const result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return n1 + n2;
  }
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result is: ";

add(number1, number2, printResult, resultPhrase);
```

위 코드에서 `const number1 =5` 같은 변수부분에는 타입을 할당하지 않았다. 이는 타입추론(Type Inference)때문이다. 타입추론은 타입스크립트가 코드를 해석해나가는 동작이다.

`let number1 = 5`라고 했을 때 typescript는 number1에 number type data가 할당 되어있기 때문에 number로 간주한다. 이후 `number1 = "5"`로 수정하였을 때 에러를 발생시킨다. 타입추론은 변수를 선언하거나 초기화할 때 타입이 추론된다. 이외에도 변수, 속성, 인자의 기본 값, 함수의 반환 값등을 설정할 때 타입추론이 일어난다.

> 출처: https://joshua1988.github.io/ts/guide/type-inference.html#%EB%AC%B8%EB%A7%A5%EC%83%81%EC%9D%98-%ED%83%80%EC%9D%B4%ED%95%91-contextual-typing

`const name: string = "chulsu"`라고 했을 때 타입이 명시적으로 할당되어있는 것이고 :string이 빠지면 타입추론에 의존한다고 할 수 있다.

# 객체, 배열, 튜플

객체타입은 어딘가에 사용되는 객체 타입을 설명하기 위해 작성된다. key value 아닌 key type으로 저장.
타입스크립트를 명시적으로 지정하는 것은 좋은 작업방식이 아니다.
객체 타입은 작업중인 객체를 TS가 이해할 수 있도록 해주는 객체 타입의 타입스크립트 표현일 뿐.

튜플은 길이와 타입이 고정된 배열이다. JS에서는 일반 배열로 인식하지만 TS로 개발 도중 튜플의 규칙에 벗어나는 코드를 짜면 에러를 발생시킨다. 단 push는 예외적으로 typescript가 잘못된 것을 인지하지 못한다. 배열보다는 튜플을 사용하여 예상되는 데이터 타입을 보다 명확히 파악할 수 있다.

# enum

# Any

any를 할당하면 어떤 타입의 데이터를 할당해도 문제가 발생하지 않는다.
any는 유연한 타입같지만 이는 일반 바닐라 JS를 쓰는 것과 다를 것이 없다.

# Union type

Union type(조합 타입)을 사용할 때 종종 추가적인 런타임 타입검사를 요구한다.
유니언 타입을 사용하면 매개변수를 보다 유연하게 사용할 수 있다.
다만 타입에 따라 함수의 동작방식이 달라지기 때문에 종종 런타입 검사가 필요하다.
