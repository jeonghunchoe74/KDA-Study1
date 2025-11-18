friends = ["muzi", "ryan", "frodo", "neo"]
gifts = ["muzi frodo", "muzi frodo", "ryan muzi", "ryan muzi", "ryan muzi", "frodo muzi", "frodo ryan", "neo muzi"]

def solution(friends, gifts):
    dic, index, get = {},{},{}
    for friend in friends:
        dic[friend] = []
        index[friend],get[friend] =0, 0
    print(dic)
    print(index)
    print(get)

solution(friends, gifts)
