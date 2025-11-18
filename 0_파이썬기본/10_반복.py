# for s in "python":
#     print(s)

# 1부터 5까지 더하기
# total = 0
# for i in [1,2,3,4,5]:
#     total = total + i
# print(f"1부터 5까지 더한 결과는 {total}입니다.")

# sum = 0
# for i in range(1,11):
#     sum = sum + i
# print(sum)

# 1부터 100까지 더하기

sum = 0
for i in range(101):
    sum += i
print(sum)

# 1부터 100까지 홀수만 더한 결과 출력하기
total = 0
for i in range(1, 101):
    if i % 2 == 0:
        continue
    total += i
print(total)