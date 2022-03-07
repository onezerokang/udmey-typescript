// 유니언 타입
function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: "as-number" | "as-text"
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
  //   if (resultConversion === "as-number") {
  //     return +result;
  //   } else {
  //     return result.toString();
  //   }
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Wonyoung", "Kang", "as-text");
console.log(combinedNames);

// 리터럴 타입은 정확한 값을 가지는 타입이다.
// 리터럴 타입을 유니언 타입과 조합해서 쓰면 파라미터에 들어와야 하는 정확한 값을 정할 수 있다.
