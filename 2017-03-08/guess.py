from random import random


def main():
    max_number = 20

    number = round(random()*max_number+1)

    tries = 5

    print("Guess the number from 1 to {0}. You can try {1} times.".format(max_number, tries))

    while True:
        guess = int(input("? "))
        if guess > number:
            print("No. It's less than {0}".format(guess))
        elif guess < number:
            print("No. It's more than {0}".format(guess))
        else:
            print("That's right.")
            break
        tries -= 1
        if tries < 1:
            print("Sorry, you ran out of tries.")
            break



    print("The number was {0}".format(number))

if __name__ == "__main__":
    main()