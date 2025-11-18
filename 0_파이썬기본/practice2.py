# 숫자를 입력받아서 짝수, 홀수, 0 판별하기
# n = int(input("숫자를 입력하시오:"))

# if n == 0:
#     print("0입니다")
# elif n % 2 == 0:
#     print("짝수입니다")
# else:
#     print("홀수입니다")

# 나이가 10살 이상이고 키가 120센티미터 이상이면 놀이기구를 탈수 있습니다.
age = int(input("나이를 입력해주세요: "))
height = int(input("키를 입력해주세요: "))

# if (age >= 10) and (height >= 120):
#     print("이용 가능합니다.")
# elif age < 10 and (height >= 120):
#     print("나이 제한으로 이용할 수 없습니다.")
# elif height < 120 and (age >= 10):
#      print("키 제한으로 이용할 수 없습니다.")
# else:
#     print("나이 제한으로 이용할 수 없습니다.")

result_a = 1
result_h = 1
result_a == 1 if age >= 10 else result_a == 0
result_h == 1 if height >= 120 else result_h == 0
if result_a == 0:
    print("나이 제한으로 이용할 수 없습니다.")
elif result_h == 0:
    print("키 제한으로 이용할 수 없습니다.")
else:
    print("이용 가능합니다.")