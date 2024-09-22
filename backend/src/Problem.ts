export class Problem{
    number1:string;
    number2:string;
    operation:string;
    correct_answer:string;

    constructor(){
        // write the part where problem are initialized
        this.number1 = ""
        this.number2 = ""
        this.operation = ""
        this.correct_answer = ""
    }

    check_correct_ans(proposed_answer:String) {
        return proposed_answer == this.correct_answer
    }


}