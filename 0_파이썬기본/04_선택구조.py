# 60점 이상이면 합격

# score = int(input("점수:"))
# if score >= 60:
#     print("합격입니다!")
# elif score >= 50:
#     print("예비합격자입니다!")
# else:
#     print("불합격입니다!")
# print("수고하셨습니다")

score = int(input("점수:"))

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

if grade == "F":
    print("You need to work harder!")

print("Your grade is", grade)