import * as readline from "readline";

interface CalculatorOperation {
  operator: string;
  performOperation: (num1: number, num2: number) => number;
}

const operations: CalculatorOperation[] = [
  {
    operator: "+",
    performOperation: (num1, num2) => num1 + num2,
  },
  {
    operator: "-",
    performOperation: (num1, num2) => num1 - num2,
  },
  {
    operator: "*",
    performOperation: (num1, num2) => num1 * num2,
  },
  {
    operator: "/",
    performOperation: (num1, num2) => num1 / num2,
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculate(num1: number, operator: string, num2: number): number {
  const operation = operations.find((op) => op.operator === operator);
  if (operation) {
    return operation.performOperation(num1, num2);
  } else {
    throw new Error("Invalid operator");
  }
}

function main() {
  rl.question("Enter the first number: ", (firstNum) => {
    const num1 = parseFloat(firstNum);
    rl.question("Enter the operator (+, -, *, /): ", (operator) => {
      rl.question("Enter the second number: ", (secondNum) => {
        const num2 = parseFloat(secondNum);
        try {
          const result = calculate(num1, operator, num2);
          console.log(`Result: ${result}`);
        } catch (error: any) {
          console.log(error.message);
        } finally {
          rl.close();
        }
      });
    });
  });
}

main();
