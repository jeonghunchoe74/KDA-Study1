# list = [1,2,3, "apple", "lemon"]
# tuple = (3, 4, 5, 6, 7)


# list.append(5)
# list.extend(tuple)
# list.insert(1, 19)
# del list[1]
# x = list.pop(2)
# print(list)
# print(x)

# fruit_list = ['banana', 'apple', 'kiwi']
# fruit_list.sort(reverse= True)  #원본 정렬, 복구 불가
# print(fruit_list)

# fruit_list = ['banana', 'apple', 'kiwi']
# sorted_list = sorted(fruit_list, reverse=True)
# print(fruit_list)
# print(sorted_list)

todo_list = ['운동', '독서', '청소', '공부', '저녁약속']
# print(todo_list)
# print("첫번째 할 일 : ", todo_list[1:3]) #인덱스는 0부터 시작
# print("세번째 할 일 : ", todo_list[2]) #인덱스는 0부터 시작
# print("마지막 할 일 : ", todo_list[-1]) #인덱스는 0부터 시작

print("두번째부터 네번째 : ", todo_list[1:4])
print("처음 할 일 2가지", todo_list[:2])
print("세번째 이후로 할일 모두 : ", todo_list[2:])
print("띄어서 나오게 하기 :", todo_list[1:4:2])
print("음수로 하기 : ",  todo_list[-4:-1])
print("할 일 모두 ", todo_list[:])