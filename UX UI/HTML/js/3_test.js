let age1 = 67;
let fee = 3000;

let age = Number(age1);

if (isNaN(age) || age < 0) {
    fee = "나이가 올바르지 않습니다";
} else if ( age >= 8 && age <= 18) {
    fee = "1,000원";
} else if (age >= 65 || age <= 7){
    fee = "무료";
}
console.log(`입장료는 ${fee} 입니다!`);

// for each
const fruits = ['사과', '바나나', '오렌지', '포도', '복숭아'];

// for (let i = 0; i <fruits.length; i++){
//     console.log(fruits[i]);
// }

// fruits.forEach(function(fruit, index){
//     console.log(fruit, index);
// });

console.log('-'.repeat(20));

// fruits.forEach((fruit, index) => {
//     console.log(index, fruit);
// });

fruits.forEach(fruit => {
    console.log(fruit);
});


// 함수 

// 함수 호출
hello("최정훈");

// 함수 선언
function hello(name) {   // 함수 선언식
    console.log(name + "님 안녕하세요");
}

let add = function (a,b) {  // 함수 표현식
    return a + b;
}

console.log(add(2,3));

let sub = function(a, b){
    return console.log(a - b);
}

sub(5, 3);

const fruits1 = ['사과', '바나나', '오렌지', '포도', '복숭아'];
fruits1.forEach((fruit,index)=>{
    console.log(index, fruit);
});

// 함수선언식에 의한 함수
function func_a (a, b){
    return a + b;
}

let ret = func_a(2, 3);
console.log(ret);
console.log('-'.repeat(20));

// 함수 표현식에 의한 함수
let ret1 = function (a,b) {
    return a + b;
}

console.log(ret1(2,3));
console.log('-'.repeat(20));

// 화살표 함수 (=>)
let ret2 = (a,b) => {
    return a + b;
}
console.log(ret2(2,3));

let ret3 = (a,b) => { a + b };
console.log(ret3(2,3));

let ret4 = (a,b) => a + b;
console.log(ret4(2,3));

// 화살표 함수에서 매개변수가 1개일 때, 괄호 생략 가능
let ret5 = (a) => a * a;
console.log(ret5(5));

let ret6 = a => a * a;
console.log(ret6(5));

// 화살표 함수 , 매개변수 없을 때
let ret7 = () => 'hello';
console.log(ret7());

// 매개변수 1개인 함수 (매개변수 ** 2)
let ret8 = a => a **2;
console.log(ret8(3));
// 매개변수 2개인 함수 (매개변수1 + 매개변수2)
let ret9 = (a, b) => console.log(a + b);
ret9(1,3)
// 매개변수 없는 함수 ('hello'  문자열 반환)
let ret10 = () => console.log("hello");
ret10();
// 매개변수 2개인 함수 (매개변수1 * 매개변수2, 매개변수1 + 매개변수2, 매개변수1 - 매개변수2)
let ret11 = (a,b) => {
    let mul = a * b;
    let add = a + b;
    return console.log(mul + add);
}
ret11(4,5);

function hello(name="손님") {
    console.log(name + "님 안녕하세요");
}

hello();
hello("홍길동")

//함수 선언식, 가변 매개변수 (매개변수의 갯수가 정해지지 않을 때)
function sum(...numbers){
    let total = 0;
    for (let i = 0; i < numbers.length; i++){
        total += numbers[i];
    }
    return total;
}

let arr = [1,2,3,4,5,6]

let ret20 = sum(...arr);
console.log(ret20);

//scope
//전역변수
let gVar = 'green';
//지역변수
function f1() {
    let lVar = 'local';
    if (lVar === 'local'){
        let aaa = 'block';
        console.log(aaa);
    }
    console.log(aaa);
    console.log(gVar);
    console.log(lVar);
}
f1();
console.log(gVar);
console.log(lVar);

// 객체 만들기
let name = '최길동'

const person = {
  name: "철수",           // 속성 (키: 값 쌍)
  age: 25,                // 속성
  hello: function() {     // 메서드 (객체의 기능)
    console.log("안녕하세요, 저는 " + this.name + "입니다.");
 }
};

console.log(person.name);
person.hello();

// 빈 개체 만들기
const obj1 = {};
const obj2 = new Object();

person.telno = '010-1234-5678';
console.log(person);

delete(person.age);
console.log(person);

// 객체안에 특정 키가 존재하니?
console.log('age' in person)

// 객체의 키과 값을 배열형태로 반환하는 방법
// 객체의 키값만 가지고 옴

console.log(Object.keys(person));
console.log(Object.values(person));
console.log(Object.entries(person));
