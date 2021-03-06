class CalcController {

    constructor() {
        this._locale = "pt-BR";
        this._currentDate;

        this._displayEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._timeEl = document.querySelector("#time");

        this._operations = []; ""
        this._lastOperator = "";
        this._lastNumber = "";


        this.initialize();

        this.initButtons();
    }

    addEventListenerAll(btn, events, fn) {

        events.split(" ").forEach(event => {
            btn.addEventListener(event, fn, false);
        });
    }

    initButtons() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach(btn => {
            btn.addEventListener("click", e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
                console.log(this._operations);
            })
        });

        buttons.forEach(btn => {
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    }

    execBtn(value) {
        switch (value) {
            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;

            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value));
                break;
            case "porcento":
                this.addOperation("%");
                break;
            case "divisao":
                this.addOperation("/");
                break;
            case "multiplicacao":
                this.addOperation("*");
                break;

            case "subtracao":
                this.addOperation("-");
                break;
            case "soma":
                this.addOperation("+");
                break;
            case "igual":
                this.calc();
                break;
            case "ponto":
                console.log(value);
                break;
            default:
                this.setError();
        }
    }

    displayLastNumber(){
        this._displayEl.innerHTML = this.lastNumber();
    }

    lastNumber(){
        let last = '';

        for (let i = this._operations.length; i >= 0; i--){
            if (!isNaN(this._operations[i])){
                last = this._operations[i];
                break;
            }
        }
        return last;
    }

    calc() {
        if (this._operations.length < 3) {
            this.setError();
        } else {
            let result = eval(this._operations.join(""));
            this._operations = [];
            this._operations.push(result);
            this.displayResult = result;
        }

    }

    addOperation(value) {

        //Not number
        if (isNaN(value)) {

            if (this._operations.length >= 3){
                this.calc();
                this._operations.push(value)
            }
            //Change operator
            else if (this.isOperation(this.getLastOperation())) {
                this.setLastOperation(value);
            } else {
                //Add operator in Array
                this._operations.push(value);
            }

            //Number
        } else {

            //Last operation
            if (this.getLastOperation() && !this.isOperation(this.getLastOperation())) {
                let lastNumber = this.getLastOperation().toString();
                let currentNumber = value.toString();
                let newNumber = parseInt(lastNumber + currentNumber);
                this.setLastOperation(newNumber);
                this.displayLastNumber();

                //Not last operation
            } else {
                this._operations.push(value);
                this.displayLastNumber();
            }
        }
    }
    


    // if (!this.isOperation(value)) {
    //     if (!isNaN(this.getLastOperation())) {            
    //         let lastNumber = this._operations.pop(); 
    //         let currentNumber = parseInt(lastNumber+value);               
    //         this._operations.push(currentNumber);
    //         this.displayResult = currentNumber;
    //     } else {
    //         let currentNumber = parseInt(value);
    //         this._operations.push(currentNumber);
    //         this.displayResult = currentNumber;
    //     }     
    // } else {
    //     if (this._operations.length >= 3){
    //         this.calc();
    //     } else if(this.isOperation(this.getLastOperation())) {
    //         this.setOperator(value);
    //     } else {
    //         this._operations.push(value); 
    //     }                                             
    // }

    setLastOperation(value) {
        this._operations[this._operations.length - 1] = value;
    }

    setOperator(value) {
        this._operations[1] = value;
    }

    isOperation(value) {
        return (["%", "/", "*", "-", "+"].indexOf(value) > -1);
    }

    getLastOperation() {

        return this._operations[this._operations.length - 1];

    }

    clearAll() {
        this._operations = [];
        this.displayResult = 0;
    }

    clearEntry() {
        this._operations.pop();
        this.displayResult = this._operations[0];
    }

    setError() {
        this.displayResult = "Error";
    }

    initialize() {
        this.getDisplayDateTime();

        setInterval(() => {
            this.getDisplayDateTime();
        }, 1000);
    }

    getDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate.innerHTML = value;
    }

    get displayResult() {
        return this._displayEl.innerHTML;
    }

    set displayResult(value) {
        this._displayEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }
}