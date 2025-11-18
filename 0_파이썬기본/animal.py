class Animal:
    gender = "male"

    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def bark(self):
        if self.name == "dog":
            print("멍멍")
        elif self.name == "cat":
            print("야옹")
        else:
            print("히잉")
    
    def behavior(self):
        print(f"{self.name}가 꼬리 흔들기!!")

    
a1 = Animal("dog", 3)
a2 = Animal("cat", 4)

a1.bark()
a2.bark()
a1.behavior()
print(a1.gender)
Animal.gender = "female"
print(a1.gender)