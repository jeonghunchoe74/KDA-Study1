wish_list = list()
wish_list.append("가방")
wish_list.insert(1, "시계")
wish_list.append("신발")
print(wish_list)

wish_list[1] = "자동차"

print(wish_list)

sorted_list = sorted(wish_list)
print("정렬전:", wish_list)
print("정렬후:", sorted_list)