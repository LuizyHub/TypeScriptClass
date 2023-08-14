public class ExposureProtectedMember {
    public static void main(String[] args) {
        SubClass subClass = new SubClass();
        subClass.print();
    }
}
class SuperClass {
    protected int m = 1;
}

class SubClass extends SuperClass {
    public int m = 2;

    public void print() {
        System.out.println(super.m);
        System.out.println(this.m);
    }
}