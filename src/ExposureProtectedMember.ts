class SuperClass {
    protected m = 1;
}
class SubClass extends SuperClass {
    // No modifier, so default is 'public'
    public print = () => {
        console.log(super.m);
        console.log(this.m);
    }
    // public m = 2;
}
const subClass = new SubClass();
subClass.print();