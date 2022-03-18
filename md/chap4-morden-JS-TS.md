# Next generation JS and TS

## Spread Operation

```js
const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const person = {
  name: "Max",
  age: 30,
};

const copyPerson = { ...person };
```

## Rest parameters

함수가 정해지지 않은 수의 매개변수들을 배열로 받을 수 있다.

```ts
const add = (...numbers: number[]) => {
  return numbers.reduce((result, num) => {
    result += num;
    return result;
  }, 0);
};

const addNumbers = add(4, 1, 2, 19, 2);
console.log(addNumbers);
```

Rest parameters 문법에 tuple을 사용할 수도 있다.

```ts
const add = (...numbers: [number, number, number]) => {
  return numbers.reduce((result, num) => {
    result += num;
    return result;
  }, 0);
};

const addNumbers = add(4, 1, 2);
console.log(addNumbers);
```
