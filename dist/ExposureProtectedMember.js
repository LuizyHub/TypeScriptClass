class SuperClass {
    m = 1;
}
class SubClass extends SuperClass {
    // No modifier, so default is 'public'
    print = () => {
        console.log(super.m);
        console.log(this.m);
    };
}
const subClass = new SubClass();
subClass.print();
export {};
//# sourceMappingURL=ExposureProtectedMember.js.map