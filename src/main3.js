var OutClass = /** @class */ (function () {
    function OutClass() {
        var _this = this;
        this.num = 1;
        this.InClass = {
            num: 2,
            parameter: this.fun
        };
        this.fun = function () {
            console.log(_this.num);
        };
        this.InClass.parameter();
    }
    return OutClass;
}());
new OutClass();
