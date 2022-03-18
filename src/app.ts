const add = (...numbers: number[]) => {
  return numbers.reduce((result, num) => {
    return result + num;
  }, 0);
};

const addNumbers = add(4, 1, 2, 19, 2);
console.log(addNumbers);
