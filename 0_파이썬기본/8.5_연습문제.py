# 학생 이름을 입력 받아 합격 여부를 출력하는 프로그램을 작성하세요

passed_students =['김민준', '이하늘', '박선우', '최유진', '정다희']

def isPassed(n):
    if n in passed_students:
        print(f"{n}님, 합격을 축하합니다")
    else:
        print(f"{n}은 합격자 명단에 없습니다.")

name = input("이름을 입력하세요:")
isPassed(name)

# import math

# def circle_area(radius):
#     area = radius * radius * math.pi
#     return round(area, 2)

# radius = float(input("반지름을 입력하세요 : "))
# area = circle_area(radius)
# print(f'반지름이 {radius}인 원의 면적 : {area}')

# import random as r
# answer = r.randint(1, 100)

# print("=== 숫자 맞추기 게임 ===")
# print("1부터 100 사이의 숫자를 맞춰보세요!\n")

# while True:
#     number = int(input("숫자를 입력하세요: "))
#     if answer > number:
#         print("그보다 큰 숫자입니다!")
#     elif answer < number:
#         print("그보다 작은 숫자입니다!")
#     else:
#         print("정답입니다!")
#         break