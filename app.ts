// 유니언 타입
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === "number" && input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine("Wonyoung", "Kang");
console.log(combinedNames);

// Union type(조합 타입)을 사용할 때 종종 추가적인 런타임 타입검사를 요구한다.
// 유니언 타입을 사용하면 매개변수를 보다 유연하게 사용할 수 있다.
// 다만 타입에 따라 함수의 동작방식이 달라지기 때문에 종종 런타입 검사가 필요하다.
