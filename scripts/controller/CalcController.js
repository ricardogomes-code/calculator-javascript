class CalcController {

    constructor() {
        this._locale = "pt-BR";
        this._currentDate;

        this._displayEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._timeEl = document.querySelector("#time");

        this._operations = [];

        this.initialize();

        this.initButtons();
    }

    addEventListenerAll(btn, events, fn){

        events.split(" ").forEach(event => {
            btn.addEventListener(event, fn, false);
        });
    }

    initButtons(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach(btn=>{
            btn.addEventListener("click", e=>{
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
                console.log(this._operations);
            })
        });

        buttons.forEach(btn => {
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{
                btn.style.cursor = "pointer";
            });
        });
    }

    execBtn(value){
        switch(value){
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
                this.addOperation(value);
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
                console.log(value);
                break;
            case "ponto":
                console.log(value);
                break;
            default:
                this.setError();
        }
    }

    addOperation(value){

        if (this.getLastOperation()) {
            let lastOperation = this.getLastOperation();
            this._operations.pop();
            this._operations.push(parseInt(lastOperation+value));
        } else {
            this._operations.push(parseInt(value));
        }     
    }

    getLastOperation(){

        return this._operations[this._operations.length-1];

    }

    clearAll(){
        this._operations = [];
    }

    clearEntry(){
        this._operations.pop();
    }

    setError(){
        this.displayResult = "Error";
    }
    
    initialize() {
        this.getDisplayDateTime();

        setInterval(() => {
            this.getDisplayDateTime();
        }, 1000);
    }

    getDisplayDateTime(){
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