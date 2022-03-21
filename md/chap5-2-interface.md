# Interface

인터페이스는 객체의 구조를 설명한다.
클래스와 다르게 객체의 청사진으로 사용하는 것이 아닌
사용자 정의 타입으로 사용한다.

인터페이스는 객체의 타입을 확인하는데 사용할 수 있다.

```ts
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: "Max",
  age: 21,
  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  },
};

user1.greet("Hi there - I am");
```

## Class와 Interface 사용하기

Interface를 왜 사용하는 것일까? `type`을 사용하면 안될까?

```ts
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

type Person = {
  name: string;
  age: number;

  greet(phrase: string): void;
};
```

`Interface`와 `type`은 몇가지 차이가 있다.

1. 인터페이스는 객체의 구조를 설명하기 위해서만 사용한다.
2. Type은 Union Type을 사용할 수 있지만, Interface는 사용할 수 없다.
3. 클래스가 인터페이스를 이행하고 준수해야 하는 약속처럼 사용할 수 있다.

```ts
interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string): void {
    console.log(`${phrase} ${this.name}`);
  }
}

let user1: Greetable;

user1 = new Person("Max");

user1.greet("Hi there - I am");
```

**인터페이스는 주로 구체적인 구현이 아닌 서로 다른 클래스 간의 기능을 공유하기 위해 사용됩니다** 인터페이스는 한개의 class만 상속하는 클래스와 다르게 여러개의 인터페이스를 OO 할 수 있습니다.

Type vs Interface
abstract vs Interface

## 왜 인터페이스인가

1. Class에 필수로 들어가야 하는 프로퍼티, 메서드를 정의 할 수 있다.
2. 객체나 클래스에 대한 모든 것을 알 필요가 없는 강력하고 유연한 코드를 짤 수 있다.
   (클래스에 무엇이 있는지 다 알필요 없이 무조건 있는 것을 빠르게 알 수 있다.)

## Readonly Interface

인터페이스는 Access Modifier는 설정할 수 없지만 readonly Modifier는 설정할 수 있다.
readonly를 설정할 경우 해당 인터페이스가 지정된 객체나 함수는 해당 프로퍼티의 값을 바꿀 수 없다.

```ts
interface Greetable {
  readonly name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string): void {
    console.log(`${phrase} ${this.name}`);
  }
}

let user1: Greetable;

user1 = new Person("Max");
user1.name = "Hi"; //error

user1.greet("Hi there - I am");
```

## 인터페이스 상속하기

`extends`키워드로 인터페이스룰 상속할 수 있다.

```ts
interface Name {
  readonly name: string;
}

interface Greetable extends Name {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string): void {
    console.log(`${phrase} ${this.name}`);
  }
}

let user1: Greetable;

user1 = new Person("Max");

user1.greet("Hi there - I am");
```

인터페이스를 나누는 것에 장점: 보다 유연하게 인터페이스를 만들 수 있다.

## 함수 타입으로서의 인터페이스

인터페이스는 객체의 구조 외에도 함수의 구조를 정의할 수 있다.
이는 함수 타입을 정의하는 것과 비슷하다.

```ts
type AddFn = (a: number, b: number) => number;

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
```

```ts
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
```

## 선택적 매개변수 & 프로퍼티

매개변수와 속성에 인터페이스를 지정할 때, `?`키워드를 사용하여 해당 데이터를 선택적으로 구현하도록 할 수 있다.

```ts
interface Name {
  name: string;
  age?: number;
}

class Person implements Name {
  constructor(public name: string, public age?: number) {}

  greet(phrase: string) {
    if (this.age) {
      console.log(`${phrase} ${this.name} ${this.age}`);
    } else {
      console.log(`${phrase} ${this.name}`);
    }
  }
}

const youngmi = new Person("youngmi");
```

## Compiling Interfaces to JavaScript

TS를 컴파일 하면 Class는 생성자 함수로 변환된다(es5기준). 허나 interface의 흔적은 JS에 존재하지 않는다. 자바스크립트에는 인터페이스가 없기 때문이다.

## Wrap up

인터페이스는 TS만 있는 전용 기능. 명시적인 코드를 작성하는데 도움을 주어
클래스가 특정 기능이나 객체를 갖게 하고 특정 구조를 갖게 된다.
함수타이으로 설정할 수 있고
선택성 속성, readonly등을 줄 수 있다.

객체의 형태에 대한 개념을 명확하게 설명하는 강력한 기능.
사실 custom type으로 대체가능하지만 interface를 사용하는 것이 정석.
TS 초기버전에는 custom type을 인터페이스처럼 사용할 수 없었음.
