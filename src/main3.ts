class OutClass {
    num = 1;
    constructor() {
        this.InClass.parameter();
    }
    InClass = {
        num : 2,
        parameter: this.fun
    }
    fun = () => {
        console.log(this.num);
    }
}
new OutClass();