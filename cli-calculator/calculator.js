"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const operations = [
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
function calculate(num1, operator, num2) {
    const operation = operations.find((op) => op.operator === operator);
    if (operation) {
        return operation.performOperation(num1, num2);
    }
    else {
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
                }
                catch (error) {
                    console.log(error.message);
                }
                finally {
                    rl.close();
                }
            });
        });
    });
}
main();
