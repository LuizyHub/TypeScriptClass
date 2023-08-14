# 접근 제어자

타입스크립트를 통해서 접근 지정자를 제어할 수 있다.

## `public`
클래스 멤버의 기본 접근 제어자는 `public`이다. `public` 멤버는 어디에서나 접근할 수 있다.

```ts
class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();
```
public이 이미 기본 접근 제어자이기 때문에 클래스 멤버에 대해 이를 작성할 필요는 없지만, 
스타일이나 가독성을 위해 선택적으로 작성할 수 있다.

## `protected`
`protected` 멤버는 해당 멤버가 선언된 클래스의 하위 클래스에서만 접근할 수 있다.

```ts
class Greeter {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}
 
class SpecialGreeter extends Greeter {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName();
```
> Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses.

---

### `protected` 멤버의 확장
하위 클래스는 상위 클래스 접근 제어를 따라야하지만, 더 많은 기능을 가진 상위 클래스의 하위 유형을 노출시킬 수도 있습니다. 
이에는 protected 멤버를 public으로 공개하는 것도 포함됩니다.
```ts
class Base {
    protected m = 10;
}
class Derived extends Base {
    // No modifier, so default is 'public'
    m = 15;
}
const d = new Derived();
console.log(d.m); // OK
```

주목해야 할 점은 이미 파생 클래스에서 `m`을 자유롭게 읽고 쓸 수 있었으므로 이로 인해 상황의 "보안"이 의미 있는 변경을 겪지 않는다는 것입니다. 
여기서 주의해야 할 주요한 점은 파생 클래스에서 이러한 노출이 의도적이지 않은 경우 protected 수식어를 다시 사용해야 한다는 것입니다.

### 의문
설명은 마치 접근 제어자를 다시 바꿔준것 처럼 설명하였지만, 사실 같은 이름의 새로운 변수를 만든것이 아닌가?

자바의 경우를 예시로 들어보자.
```java
public class Main {
    public static void main(String[] args) {
        SubClass d = new SubClass();
        d.print();
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

```
```shell
java src/ExposureProtectedMember.java
```
output.txt
```text
1
2
```

하지만, typescript의 경우를 보자.

```ts
class SuperClass {
    protected m = 1;
}
class SubClass extends SuperClass {
    // No modifier, so default is 'public'
    public print = () => {
        console.log(super.m);
        console.log(this.m);
    }
    public m = 2;
}
const subClass = new SubClass();
subClass.print();
```
```shell
node dist/ExposureProtectedMember.js
```
```text
undefined
2
```

undefined가 나오는것을 보니 정말로 접근 제어자를 확장했다.

메서드는 저런식으로 작성하면 오버라이딩이 되는데, 멤버 변수는 왜 이렇게 되는지 알다가도 모르겠다.

## 질문 class 내의 메서드는 arrow function으로 해야할까?

```ts
class SuperClass {
    methodFunction() {
        console.log(`super method`);
    }
    arrowFunction = () => {
        console.log(`super arrow`);
    }
}
class SubClass extends SuperClass {
    methodFunction() {
        console.log(`sub method`);
    }
    arrowFunction = () => {
        console.log(`sub arrow`);
    }

    print() {
        super.methodFunction();
        super.arrowFunction();
        this.methodFunction();
        this.arrowFunction();
    }
}

const sub = new SubClass();
sub.print();
```
단 하나의 줄에서 에러가 발생한다.

```shell
node dist/ClassMethod.js
```
output.txt
```text
super method
file:///Users/bagjeongje/code/TypeScriptClass/dist/ClassMethod.js:18
        super.arrowFunction();
              ^

TypeError: (intermediate value).arrowFunction is not a function
    at SubClass.print (file:///Users/bagjeongje/code/TypeScriptClass/dist/ClassMethod.js:18:15)
    at file:///Users/bagjeongje/code/TypeScriptClass/dist/ClassMethod.js:24:5
    at ModuleJob.run (node:internal/modules/esm/module_job:192:25)
    at async DefaultModuleLoader.import (node:internal/modules/esm/loader:228:24)
    at async loadESM (node:internal/process/esm_loader:40:7)
    at async handleMainPromise (node:internal/modules/run_main:66:12)

Node.js v20.5.0
```

arrow function은 상속도 안된다....?

내가 만들었던 퀴즈의 일부를 보자.
나는 지금까지 arrowfunction의 this는 외부 스코프를 가져서, oop에서의 직관적인 this를 사용하려면 화살표 함수로 해야한다고 생각해왔다.

아니었나보다.

내가 그렇게 생각했던 계기를 보자.


```js
class Parser {
    #orderKeyword = {
        'VAR' : (idx, token) => this.orderVar(idx, token),
        'SET' : (idx, token) => this.orderSet(idx, token),
        'FUNC' : (idx, token) => this.orderFunc(idx, token),
        'ADD' : (idx, token) => this.orderAdd(idx, token),
        'SUB' : (idx, token) => this.orderSub(idx, token)
    };

    parser(node, token) {
        let idx = token.indexOf(' ');
        let order = token.slice(0, idx);
        return this.#orderKeyword[order](idx, token);
    }
    
    orderVar(idx, token) {
        
    }

    orderSet(idx, token) {
        
    }

    orderFunc(idx, token) {
        
    }

    orderAdd(idx, token) {
        
    }

    orderSub(idx, token) {
        
    }
}
```
위에 코드는 `this`가 상위로 잘 바인딩 되어 원하는대로 동작을 수행하며, `this`가 계속 `Parser`를 가리켰다.

```js
#orderKeyword = {
        'VAR' : this.orderVar,
        'SET' : this.orderSet,
        'FUNC' : this.orderFunc,
        'ADD' : this.orderAdd,
        'SUB' : this.orderSub
    };
```

하지만, 이렇게 작성하게 되면 `this`가 `Parser`를 가리키지 않게 되었었다.

이후로, class 내의 함수는 무조건 arrow function으로 만들자 라고 했었는데, 큰 오해였던것 같다.

아래 세 코드의 차이와 결과를 생각해보자.

main1.ts
```ts
class OutClass {
    num = 1;
    constructor() {
        this.InClass.parameter();
    }
    InClass = {
        num : 2,
        parameter : this.fun
    }
    fun() {
        console.log(this.num);
    }
}
new OutClass();
```
```shell
node dist/main1.js
```

output.txt
```text
2
```

main2.ts
```ts
class OutClass {
    num = 1;
    constructor() {
        this.InClass.parameter();
    }
    InClass = {
        num : 2,
        parameter : () => this.fun()
    }
    fun() {
        console.log(this.num);
    }
}
new OutClass();
```
```shell
node dist/main2.js
```

output.txt
```text
1
```

main3.ts
```ts
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
```

```shell
tsc src/main3.ts
```

output.txt
```text
src/main3.ts:8:25 - error TS2729: Property 'fun' is used before its initialization.

8         parameter: this.fun
                          ~~~

  src/main3.ts:10:5
    10     fun = () => {
           ~~~
    'fun' is declared here.


Found 1 error in src/main3.ts:8
```

3번 결과는 아직도 이해가 잘 되지 않는다. 1번과 다른점은 arrow function으로 만들었는지 아닌지의 차이 뿐이다.