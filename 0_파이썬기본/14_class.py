class Car:
    def __init__(self, b, m, c):
        self.brand = b
        self.model = m
        self.color = c
        print(b, m, c, "출고")

    def turn_on(self):
        print(self.model, "시동을 겁니다")
    
    def turn_off(self):
        print(self.model, "시동을 끕니다.")

    def drive(self, speed):
        print(self.model, speed, "속도로 주행합니다.")


from bankaccount import BankAccount as b
p1 = b("peter", 14000)
p1.deposit(3000)
p1.get_balance()
p1.deposit(3000)
p1.get_balance()

p1.withdraw(3000)
p1.get_balance()
