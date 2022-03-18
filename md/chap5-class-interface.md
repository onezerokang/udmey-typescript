# Class and Interface

## What's Object-oriented Programming?

객체 지향 프로그래밍과 클래스의 개념은 코드에서 실제 개체(entity)로 작업한다는 점에서 중요. 객체를 실제 객체와 최대한 비슷하게 작업. 개발자로서 코드를 더 쉽게 추론하기 위함

Objects: 동작해야 할 코드
Classes: Blueprints for objects

클래스는 객체의 형태, 포함해야 할 속성과 메서드를 정의하는데 도움이 된다.
따라서 클래스는 객체의 생성 속도를 높여주며, 객체 리터럴 표기법을 사용하는 것에 대한 대안이다.

클래스로 객체를 만들면 구조는 같고, 세부적인 내용만 달라진다.

## 퍼스트 클래스 만들기

클래스는 생성자 함수의 문법적 설탕.
class의 constructor는 클래스와 연결되며 객체가 생성되면서 실행되는 클래스에 기반하여
만드는 모든 객체에도 연결되는 함수로 이를 활용하여 구축하는 객체애 대한 초기화 작업을 진행할 수 있다.

```ts
class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

const accounting = new Department("Accounting");
```

## 자바스크립트로 컴파일 하기

tsconfig.json의 target을 es5로 변경하면 위 코드는 이렇게 컴파일된다.

```js
"use strict";
var Department = (function () {
  function Department(n) {
    this.name = n;
  }
  return Department;
})();
var accounting = new Department("Accounting");
console.log(accounting);
```

이를 통해 과거에 객체의 청사진을 만들 때 생성자 함수를 사용했음을 알 수 있다.
다만 이 개념이 다른 프로그래밍 언어를 사용하는 개발자에게 익숙하지 않기 때문에 클래스 개념을 도입한 것이다.

## 생성자 함수 및 "this" 키워드

Class, 생성자 함수에서 this는 만들어질 instance를 가르킨다.
이를 통해 describe 메서드를 추가하고 사용하는 예제를 만들어보자.

```ts
class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log(`Department ${this.name}`);
  }
}

const accounting = new Department("Accounting");
accounting.describe();
```

만약 describe안에 this.name을 name으로 했다면 TS는 전역에 선언된 name를 참조했을 것이다.

JS에서 this는 꽤 까다롭다.

```ts
class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log(`Department ${this.name}`);
  }
}

const accounting = new Department("Accounting");
accounting.describe();

const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); //Department undefined
```

accountingCopy.describe()의 this는 accountingCopy를 가르킨다.
메서드에서 this는 메서드를 호출하는 객체를 가르키기 때문이다.

```ts
class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }

  //   이 경우 Department class에 기반한 인스턴스를 참조해야한다.
  describe(this: Department) {
    console.log(`Department ${this.name}`);
  }
}

const accounting = new Department("Accounting");
accounting.describe();

// name을 추가하면 에러가 발생되지 않는다.
const accountingCopy = { name: "s", describe: accounting.describe };
// 그래서 에러 발생. accountingCopy에서 describe를 호출하면 Department 인스턴스에서 호출한 것이 아니기 때문이다.
accountingCopy.describe();
```

## "private" and "public" Access Modifiers

Access Modifier

```ts
// 이 클래스의 문제는 employees를 외부에서 변경할 수 있다는 것.

class Department {
  name: string;
  employees: string[] = [];
  constructor(n: string) {
    this.name = n;
  }

  //   이 경우 Department class에 기반한 인스턴스를 참조해야한다.
  describe(this: Department) {
    console.log(`Department ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("Accounting");
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
accounting.employees[2] = "Anna";

accounting.describe();
accounting.printEmployeeInformation();
```

프로젝트 규모가 커질 수록 위 같은 프로그래밍 방법은 ㄴㄴ
어떤 동료는 employee를 사용하기 위해서 이 방법을 사용하는데
다른 동료는 메서드 사용하 수 있다.

한가지의 통일된 방법을 사용해야 함.
addEmployee에 유효성 검사 코드를 넣었는데, 그냥 값을 쑤셔버리면 버그가 발생할 수 있음

class 외부에서 employees에 접근하지 못하게 해야함.
private: 클래스, 즉 생성된 객체 내부에서만 접근할 수 있는 속성이 되었다는 것.

public: 기본값이라 굳이 이름을 붙일 필요없다. 외부에서 접근 가능

JS는 최근까지 private, public modifier 개념이 없었기 때문에 컴파일된 파일에는 없음.

## Shorthand Initalization

아래처럼 작성하면 constructor 내부에서 this.id = id; this.name = name을 생략해도 된다. 그리고 따로 modifier를 사용할 필요도 없음.

```ts
class Department {
  private employees: string[] = [];
  constructor(public id: string, private name: string) {}

  describe(this: Department) {
    console.log(`Department (${this.id}: ${this.name})`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
```

## readonly properties

readonly modifier
초기화 후에도 변경 되어서는 안되는 속성.
TS에만 있는 기능.
readonly는 특정 속성이 초기화되고 나면 이후에는 변경되어서는 안 된다는 점을
명확히 하기 위해 추가적인 안정성, 의도 명확.

> Modifier를 '한정자'라고 번역하는 것 같음.
> Access Modifier: 접근 한정자

## Quiz: Basic Class
