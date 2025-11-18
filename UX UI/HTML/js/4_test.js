class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    hello(){
        console.log(this.name + "님 안녕하세요");
    }
}

let person1 = new Person('최정훈', 26);
let person2 = new Person("이지민", 25);
console.log(person1, person2);

person1.hello();

class Student extends Person {
    constructor (name, age, grade){
        super(name, age);
        this.grade = grade;
    }

    study() {
        console.log(this.name + "는 " + this.grade + '학년 입니다')
    }
}

let student1 = new Student("김철수", 15, 6);

student1.study();
student1.hello();

// 몬스터 클래스

// name : 오크 , 오거, 트롤
// hp ;
// mp

// attck
// defense

class Monster {
    constructor (name, hp, mp){
        this.name = name;
        this.hp = hp;
        this.mp = mp;
    }

    headbutting (attack_power) {
        console.log(this.name + "이 몸통박치기를 시전했습니다!" + attack_power + "의 데미지가 들어갔습니다.");
    }

    ultimate (attack_power) {
        console.log(this.name + "이 필살기를 시전했습니다!" + attack_power + "의 데미지가 들어갔습니다. 효과는 굉장했다 ☠️");
    }

    condition () {
        console.log(this.hp + "의 체력이 남았습니다" + this.mp + "의 마나가 남았습니다!");
    }

    defense (){
        console.log(this.name + "이 방어기술을 시전했다!");
    }
}

let ork = new Monster("오크", 150, 100);
let oger = new Monster("오우거", 300, 100);
let troll = new Monster("트롤", 1000, 50);

ork.headbutting(10);
ork.ultimate(100);
ork.condition();
ork.defense();