def sayhello(name, message="반갑습니다."):
    message = f"""
    {name}님, 안녕하세요!
    파이썬의 세계에 오신 것을 환영합니다!!!
    {message}
    """
    print(message)

sayhello("최정훈", "즐거운 시간 되세요!!")
sayhello("이강현")