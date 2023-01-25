from audioop import reverse


def sayHello(name="John"):
    print(f"Hello {name}")


sayHello("Zahid")


# def addMe(num1, num2):
#     total = num1 + num2
#     return total

addMe = lambda num1, num2: num1 + num2

print(addMe(4, 2))

print(hex(261894))


unorderd_list = [2, 1, 6, 4, 0, 6, 4, 6]


def sortList(list):
    sorted_list = sorted(list, reverse=True)
    print(sorted_list)


sortList(unorderd_list)


print(10 % 3)
