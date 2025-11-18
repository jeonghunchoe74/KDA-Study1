class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        print(f"{owner}님의 계좌가 개설되었습니다. 초기 잔액은 {balance}입니다.")
    
    def deposit(self, amount):
        self.balance += amount
        return {"입금금액":amount, "현재잔액":self.balance}
    
    def withdraw(self, amount):
        if self.balance < amount:
            print("잔액부족으로 출금실패하였습니다.") 
        else:
            self.balance -= amount
            return {"출금금액":amount, "현재잔액":self.balance}
    
    # 잔액조회
    def get_balance(self):
        print(f"{self.owner}님의 현재 잔액은 {self.balance}원입니다.")

