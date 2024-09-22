"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Problem = void 0;
class Problem {
    constructor() {
        // write the part where problem are initialized
        this.number1 = "";
        this.number2 = "";
        this.operation = "";
        this.correct_answer = "";
    }
    check_correct_ans(proposed_answer) {
        return proposed_answer == this.correct_answer;
    }
}
exports.Problem = Problem;
