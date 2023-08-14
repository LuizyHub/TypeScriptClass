class Base {
    m = 1;
    method() {
        console.log(`I'm super`);
    }
}
class Derived extends Base {
    // No modifier, so default is 'public'
    print = () => {
        console.log(super.m);
        console.log(this.m);
        super.method();
        this.method();
    };
    m = 2;
    method() {
        console.log(`I'm sub`);
    }
}
const d = new Derived();
d.print();
export {};
//# sourceMappingURL=index.js.map