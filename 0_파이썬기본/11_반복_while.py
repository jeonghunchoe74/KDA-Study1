# count = 5
# while count>0:
#     print(count)
#     count -= 1

# str = ""
# while True:
#     n = input("문자를 입력해주시오:")
#     if n == "q":
#         break
#     str += n
# print(str)

# count = 5
# while True:
#     print(count)
#     count -= 1
#     if (count == 0):
#         break

user_id = "abc"
user_pwd = "1111"

while True:
    id = input("아이디:")
    pwd = input("비밀번호:")
    if (id == user_id and pwd == user_pwd):
        break