from random import choice
class Player:
    max_health = 10
    health = 10

    def power(self):
        return self.health/self.max_health
    def dead(self):
        return self.health == 0

    def hit(self, other):
        other.health -= self.power()
        if other.health < 0:
            other.health = 0



players = []

for i in range(0, 5):
    players.append(Player())

while [p.dead() for p in players].count(False) > 1:
    while True:
        a = choice([i for i,p in enumerate(players) if not p.dead()])
        b = choice([i for i,p in enumerate(players) if not p.dead()])
        if a != b:
            break

    print("Player {:d} hit player {:d}".format(a,b));
    players[a].hit(players[b])
    if players[b].dead():
        print("Player {:d} is dead".format(b));
        


print("");
print("{:d} is the last player standing.".format([i for i, p in enumerate(players) if not p.dead()][0]))
