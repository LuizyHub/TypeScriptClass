class Base {
    protected m = 1;
    protected method() {
        console.log(`I'm super`);
    }
}
class Derived extends Base {
    // No modifier, so default is 'public'
    public print = () => {
        console.log(super.m);
        console.log(this.m);
        super.method();
        this.method();
    }
    public m = 2;

    public method() {
        console.log(`I'm sub`);
    }
}
const d = new Derived();
d.print();