names = ["Zahid", "Rashid", "Zake"]

for name in names:
    if name.startswith("z"):
        print("Name found 👍")
        break
else:
    print("Not found 👎")


guess = 0
number = 6
while guess < number:
    guess = int(input("Guess: "))
    print("Please try again 😁")
else:
    print("You found it ❤️")
