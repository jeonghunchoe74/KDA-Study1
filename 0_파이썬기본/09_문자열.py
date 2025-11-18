# name = input("이름을 입력하세요 : ")
# print("-" * 30)
# print(name, "님 안녕하세요", sep="")
# print(f"{name}님의 나이는 {25}살이고 강남구에 삽니다")

# age = int(input("나이를 입력하세요"))
# message = f"{name}님 안녕하세요. 나이가 {age}살이시군요, 내년이면 {age + 1} 살이 되시겠네요"
# print(message)

message = "나는 초코우유 좋아, 초코우유 맛있어!"

message = message.replace("초코우유", "딸기우유")

print(message)

email = "abc@naver.com"

email_split = email.split("@")
print(email_split[1])