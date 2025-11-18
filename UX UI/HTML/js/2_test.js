
// let var const
let number = 20;  
const str = "A";
const bool = true;

console.log(b);
var b = 20;

let c = 30;
c= 20;
console.log(c);

const d = 50;
d = 60;
console.log(d);

console.log(typeof(123));          // "number"
console.log(typeof(123.56));       // "number"
console.log(typeof("hello"));       // "string"
console.log(typeof(true));          // "boolean"
console.log(typeof(undefined));     // "undefined"
console.log(typeof(Symbol()));      // "symbol"
console.log(typeof(10n));           // "bigint"
console.log(typeof(function(){}));  // "function"
console.log(typeof({}));            // "object"
console.log(typeof([]));            // "object" (배열도 object로 나옴)
console.log(typeof(null));          // "object" (null도 object로 나타나는 특이점)

function getType(value) {
    return Object.prototype.toString.call(value);
}

console.log(getType(null));      // "Null"
console.log(getType([]));        // "Array"
console.log(getType({}));        // "Object"
console.log(getType(123));       // "Number"
console.log(getType("abc"));     // "String"
console.log(getType(() => {}));   // "Function"

// 형변환
console.log(parseInt("123"));
console.log(parseInt("123", 10));
console.log(parseInt("   123 "));
console.log(parseInt("077"));
console.log(parseInt("1.9"));
console.log(parseInt("ff", 16));
console.log(parseInt("0xFF", 16));

console.log('1---', parseFloat(3.14));
console.log('2---', parseFloat("3.14"));
console.log('3---', parseFloat("  3.14  "));
console.log('4---', parseFloat("314e-2"));
console.log('5---', parseFloat("0.0314E+2"));
console.log('6---', parseFloat("3.14와 숫자가 아닌 문자들"));
console.log('7---', parseFloat({
    toString: function () {
        return "3.14";
    },
}));

console.log(Number("3.14abc"))
console.log(parseFloat("3.14abc")) 

console.log(0 / 0);         // NaN
console.log(100 / "hello"); // NaN
console.log(Number("abc")); // NaN

// 원시 타입
let a1 = 10;
let b1 = a1;
console.log(a1, b1);
console.log('-'.repeat(20));

// 참조타입
let ra1 = {x:1, y:2};
let ra2 = ra1;

console.log(ra1, ra2);
console.log('-'.repeat(30));

ra2.x = 10;
console.log(ra1, ra2);

// ==, !=
console.log(1 == 1);  // == 연산자 뒤에 오면 무조건 int로 type casting을 해버림

console.log (1 == "1");
console.log(1==="1");

console.log (1 != "1");
console.log(1 !=="1");

console.log(('b' + 'a' + + 'a' + 'a'))
console.log(+ 'a')

console.log(NaN === NaN);
console.log(Number.isNaN(NaN));

console.log(0 && "hello")  
console.log("apple" && 100) 

let a = true;
let b = true;
console.log(a && b) 

console.log(0 || "hello")   // hello
console.log("apple" || 100)  // apple

a = true;  
b = false;
console.log(a || b)  // true

//스프레드 연산자(...)
// 배열, 복사

let arr1 = [1,2,3];
let arr2 = [...arr1];
console.log(arr1, arr2);

// 배열, 병합
let arr3 = [1,2,3];
let arr4 = [4,5,6];
let arr5 = [...arr3, ...arr4];
console.log(arr5);

// 배열, 추가
let arr6 = [2,3];
let arr7 = [1,...arr6, 4];
console.log(arr7)

// 스프레드 연산자, 객체
// 객체, 복사
let obj1 = {k:1, y:2};
const obj2 = {...obj1};
console.log(obj1, obj2);

console.log('-'.repeat(20));
obj2.k = 10;
console.log(obj1, obj2); // 얕은 복사  (깊은 복사의 python과 다름)

//객체 병합
let obj3 = {k:1, y:2};
let obj4 = {b:3, x:4};
console.log({...obj3, ...obj4})

// 함수의 인수로 사용될 때
function func(...arg11) {
    return arg11[0] + arg11[1] + arg11[2];
}

let arg10 = [10, 20, 30];

let ret = func(...arg10);
console.log(ret)

// 문자열 분해
const chars = [...'abc']; 

console.log(chars);
console.log(typeof chars);

// 조건문
// if
let no1 = 10;
if (true) {console.log("참입니다")};

// 짝수 홀수 판별
let n = 4;
if (n % 2 === 0) {console.log('짝수입니다');}
else {console.log("홀수입니다.");}

// if ~else ~if else ...
let score = 85;
if (score >= 90) {
    console.log("A학점");
}
else if (score >= 80){
    console.log("B학점");
}
else if (score >= 70){
    console.log("C학점");
}
else if (score >= 60){
    console.log("D학점");
}
else {
    console.log("F")
}

score = 95
switch (score / 10) {
    case (10) :
        console.log("만접입니다!");
        break;
    case (9) :
        console.log("A학점입니다!");
        break;
    case (8) :
        console.log("B학점입니다!");
        break;
    case (7) :
        console.log("C입니다!");
        break;
    default :
        console.log("F학점입니다!")
        break;
}


// 삼항연산자

let isMember = true;

if (isMember) {
    console.log ("회원입니다");
} else {
    console.log("비회원입니다");
}

console.log(isMember? "회원입니다" : "비회원입니다");

n = 9
let cond = n % 2 === 0;
console.log(cond? "짝수입니다" : "홀수입니다");

// try ~ catch ~ finally

try {
    let result = Number("123abc");
    if (isNaN(result)) {
        throw new Error("숫자가 아닙니다");
    }
}

catch(err) {
    console.log(err.message);
} finally {
    console.log("무조건 실행");
}

// 반복문 
// for, 횟수가 정해져 있는 반복문
for (let i = 0; i < 5; i++){
    console.log(i);
}

for (let dan = 1; dan < 10; dan++ ){
    for (let i = 1; i < 11; i++){
        console.log(`${dan} X ${i} = ${dan * i}`);
    }
    console.log(" ");
}

//while 횟수가 정해지지 않은 반복문, 조건에 따라서 한 번도 실행되지 않을 수 있음

cond = 0;
while(cond < 5){
    console.log((cond+1) + "번째 while문 실행");
    cond++;
}

console.log("while문 종료");

// do ~while, 조건에 상관없이 무조건 한 번은 실행
cond = false;
do {
    console.log("do~ while문 실행");
}while(cond)

// break, continue

for (i = 0; i < 10; i++){
    console.log(i);
    if (i == 5) break;
}
console.log("반복문 종료");

for (i = 0; i < 10; i++){
    if (i == 5) continue;
    console.log(i);
}
console.log("반복문 종료");

