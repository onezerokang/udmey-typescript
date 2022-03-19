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

## 내용 보강(필독)

> https://poiemaweb.com/typescript-class

ES6의 클래스는 클래스의 속성을 반드시 생성자 내부에서 선언하고 초기화 해야 한다.

```ts
class Department {
  constructor(name) {
    this.name = name;
  }
}
```

하지만 TS에서는 위 처럼 하면 에러가 발생한다.
Class 몸체에 클래스 프로퍼티를 사전 선언해야 한다.

```ts
class Department {
  name: string;
  constructor(name) {
    this.name = name;
  }
}
```

접근 제한자(Access Modifier)
TS는 접근제한자, 즉 public, private, protected를 지원한다.
단 접근 제한자를 명시하지 않았을 때 타 클래스 기반 언어는 protected로 지정되는데
TS는 public으로 선언된다.

private과 protected를 사용하면 class 인스턴스를 통해 클래스 외부에서 참조를 못한다(수정뿐만 아님)

3. 생성자 파라미터(constructor) 접근 제한자 선언
   이때 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언되고
   생성자 내부에서 별도의 초기화가 없어도 암묵적으로 초기화가 수행된다.

만일 생성자 파라미터에 접근 제한자를 선언하지 않으면 생성자 파라미터는 생성자 내부에서만 유효한 지역 변수가 되어 생성자 외부에서 참조가 불가능하게 된다.

```ts
class Foo {
  // x는 생성자 내부에서만 유효한 지역 변수이다.
  constructor(x: string) {
    console.log(x);
  }
}

const foo = new Foo("Hello");
console.log(foo); // Foo {}
```

4. readonly

## inheritance

```ts
// 이 클래스의 문제는 employees를 외부에서 변경할 수 있다는 것.

class Department {
  private employees: string[] = [];
  constructor(public readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

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

// 따로 constructor를 설정하지 않는 이상 상속한 Class의 constructor를 사용한다.
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    // 다른 클래스로부터 상속받는 클래스에 고유 생성자(constructor)를 추가할 때 마다
    // 상속하는 클래스로 super를 추가하고 이를 함수처럼 실행해야 한다.
    // 여기서 super는 기본 클래스의 생성자를 호출한다.
    // 상속받은 속성 외의 속성을 할당하려면 super부터 호출해야 한다.
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("0", ["Max"]);
const accounting = new AccountingDepartment("0", []);

accounting.addReport("Something went wrong...");
accounting.printReports();

it.describe();
console.log(it);
```

## Overriding Properties & The "protected" Modifier

기본 클래스의 메서드나 속성도 재정의(Override) 할 수 있다.
고유의 구현을 추가하여 기본 클래스 구현 대신 추가한 구현을 적용할 수 있다.
중요한 점은 속성에 대한 접근을 protected로 지정해야 한다는 것이다.
private으로 지정하면 상속받은 클래스에서 해당 속성에 접근, 수정할 수 없다.

## Getter & Setter

getter와 setter는 JS에서도 지원하는 문법이다.
이들은 로직을 캡슐화 하고 속성을 읽거나 설정하려 할 때 실행되어야 하는 추가적인 로직을 추가하는데 유용하다(validation)

getter는 값을 가지고 올 때 함수나 메서드를 실행하는 속성으로
개발자가 더 복잡한 로직을 추가할 수 있게 해준다.
getter를 사용할 때는 속성처럼 접근해야 하여 `()`를 붙이지 않는다.

setter도 마찬가지로 속성에 접근하듯이 사용해야 하는데 괄호가 아닌 등호(=)를 사용해야 한다.

## Static Methods & Properties

Static properties와 methods(정적 속성, 정적 메서드)를 사용하여 클래스의 인스턴스에서 접근할 수 없는 속성과 메서드를 클래스에 추가할 수 있다.
이는 주로 논리적으로 그룹화하거나 클래스에 매핑하려는 유틸리티 함수나
클래스에 저장하고자 하는 전역 상수에 사용된다.

예시

```js
Math.random();
Math.PI;
```

위 예시는 Math의 인스턴스에서 접근할 수 없는 메서드와 속성이므로 new Math를 호출할 필요 없다. 이처럼 Math는 그룹화 매커니즘의 네임스페이스와 같은 역할을 한다.

**클래스를 그룹화 매커니즘으로 사용하는 것**

정적 메서드와 속성을 선언하기 위해서는 속성 혹은 메서드 앞에 `static`키워드를 붙여주면 된다. 단 정적으로 선언할 경우, class 내부(constructor, getter, setter)등에서도 사용할 수 없다(this를 사용해서.. 왜냐면 this는 인스턴스를 참조하기 때문에).

정적 속성과 메서드는 인스턴스와 분리되어있다. 여기 접근하려면
`ClassName.staticProperties`로 사용해야 한다.

## Abstract Classes(추상 클래스)_æbstrækt_

인스턴스화 될 수 없고 확장되어야 하는 클래스

## Singletons & Private Constructors

객체 지향 프로그래밍에는 싱글턴 패턴이라는 것이 있다.
싱글턴 패턴: 특정 클래스의 인스턴스를 정확히 하나만 갖게 한다.
이 패턴은 정적 메서드나 속성을 사용할 수 없거나 사용하지 않고자 하는 동시에
클래스를 기반으로 여러 객체를 만들 수 없지만 항상 클래스를 기반으로 정확히 하나의 객체만 가질 수 있도록 하고자 하는 경우에 유용한다.

```ts
class AccountingDepartment extends Department {
  private static instance: AccountingDepartment;
  private constructor(id: string, private reports: string[]) {
    super(id);
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d1", []);
    return this.instance;
  }
}

const accounting = AccountingDepartment.getInstance();
```

private constructor를 사용하면 new 키워드로 인스턴스를 생성할 수 없다.
따라서 클래스 내에서만 정적 메서드를 사용해서만 접근이 가능하다.

getIntance는 클래스의 인스턴스가 이미 있는지 확인하고 없다면 새 인스턴스를 반환한다.

## Class 요약
