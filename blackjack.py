import tkinter as tk
from random import shuffle

class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        self.cards = []
        self.suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        self.values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

        for suit in self.suits:
            for value in self.values:
                self.cards.append(Card(suit, value))

    def shuffle(self):
        shuffle(self.cards)

    def deal(self):
        return self.cards.pop()

class Hand:
    def __init__(self):
        self.cards = []

    def add_card(self, card):
        self.cards.append(card)

    def get_value(self):
        value = 0
        aces = 0
        for card in self.cards:
            if card.value.isnumeric():
                value += int(card.value)
            else:
                if card.value == "A":
                    aces += 1
                    value += 11
                else:
                    value += 10

        # Adjust for aces
        while value > 21 and aces:
            value -= 10
            aces -= 1

        return value

    def __repr__(self):
        return f"Hand value: {self.get_value()} with cards {self.cards}"

class BlackJack:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("BlackJack")
        self.deck = Deck()
        self.deck.shuffle()
        self.player_hand = Hand()
        self.dealer_hand = Hand()
        self.player_balance = 100
        self.bet = 0

        self.balance_label = tk.Label(self.root, text=f"Balance: ${self.player_balance}")
        self.balance_label.pack()

        self.bet_label = tk.Label(self.root, text="Bet: $0")
        self.bet_label.pack()

        self.bet_entry = tk.Entry(self.root)
        self.bet_entry.pack()

        self.place_bet_button = tk.Button(self.root, text="Place Bet", command=self.place_bet)
        self.place_bet_button.pack()

        self.deal_button = tk.Button(self.root, text="Deal", command=self.deal, state=tk.DISABLED)
        self.deal_button.pack()

        self.hit_button = tk.Button(self.root, text="Hit", command=self.hit, state=tk.DISABLED)
        self.hit_button.pack()

        self.stand_button = tk.Button(self.root, text="Stand", command=self.stand, state=tk.DISABLED)
        self.stand_button.pack()

        self.result_label = tk.Label(self.root, text="")
        self.result_label.pack()

    def place_bet(self):
        try:
            self.bet = int(self.bet_entry.get())
            if self.bet > self.player_balance:
                self.result_label['text'] = "Insufficient balance"
            else:
                self.player_balance -= self.bet
                self.balance_label['text'] = f"Balance: ${self.player_balance}"
                self.bet_label['text'] = f"Bet: ${self.bet}"
                self.place_bet_button['state'] = tk.DISABLED
                self.deal_button['state'] = tk.NORMAL
        except ValueError:
            self.result_label['text'] = "Invalid bet amount"

    def deal(self):
        self.player_hand = Hand()
        self.dealer_hand = Hand()

        for _ in range(2):
            self.player_hand.add_card(self.deck.deal())
            self.dealer_hand.add_card(self.deck.deal())

        self.result_label['text'] = f"Player hand: {self.player_hand}\nDealer up card: {self.dealer_hand.cards[0]}"
        self.deal_button['state'] = tk.DISABLED
        self.hit_button['state'] = tk.NORMAL
        self.stand_button['state'] = tk.NORMAL

    def hit(self):
        self.player_hand.add_card(self.deck.deal())
        self.result_label['text'] = f"Player hand: {self.player_hand}\nDealer up card: {self.dealer_hand.cards[0]}"
        if self.player_hand.get_value() > 21:
            self.result_label['text'] = f"Player hand: {self.player_hand}\nDealer up card: {self.dealer_hand.cards[0]}\nPlayer busts! Dealer wins!"
            self.hit_button['state'] = tk.DISABLED
            self.stand_button['state'] = tk.DISABLED
            self.place_bet_button['state'] = tk.NORMAL
            self.bet_entry['state'] = tk.NORMAL

    def stand(self):
        while self.dealer_hand.get_value() < 17:
            self.dealer_hand.add_card(self.deck.deal())

        self.result_label['text'] = f"Player hand: {self.player_hand}\nDealer hand: {self.dealer_hand}"
        if self.dealer_hand.get_value() > 21:
            self.result_label['text'] = f"Player hand: {self.player_hand}\nDealer hand: {self.dealer_hand}\nDealer busts! Player wins!"
            self.player_balance += self.bet * 2
            self.balance_label['text'] = f"Balance: ${self.player_balance}"
        elif self.dealer_hand.get_value() < self.player_hand.get_value():
            self.result_label['text'] = f"Player hand: {self.player_hand}\nDealer hand: {self.dealer_hand}\nPlayer wins!"
            self.player_balance += self.bet * 2
            self.balance_label['text'] = f"Balance: ${self.player_balance}"
        elif self.dealer_hand.get_value() > self.player_hand.get_value():
            self.result_label['text'] = f"Player hand: {self.player_hand}\nDealer hand: {self.dealer_hand}\nDealer wins!"
        else:
            self.result_label['text'] = f"Player hand: {self.player_hand}\nDealer hand: {self.dealer_hand}\nPush!"
            self.player_balance += self.bet
            self.balance_label['text'] = f"Balance: ${self.player_balance}"

        self.hit_button['state'] = tk.DISABLED
        self.stand_button['state'] = tk.DISABLED
        self.place_bet_button['state'] = tk.NORMAL
        self.bet_entry['state'] = tk.NORMAL

    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    game = BlackJack()
    game.run()
