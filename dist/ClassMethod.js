class SuperClass {
    methodFunction() {
        console.log(`super method`);
    }
    arrowFunction = () => {
        console.log(`super arrow`);
    };
}
class SubClass extends SuperClass {
    methodFunction() {
        console.log(`sub method`);
    }
    arrowFunction = () => {
        console.log(`sub arrow`);
    };
    print() {
        super.methodFunction();
        super.arrowFunction();
        this.methodFunction();
        this.arrowFunction();
    }
}
const sub = new SubClass();
sub.print();
export {};
//# sourceMappingURL=ClassMethod.js.map