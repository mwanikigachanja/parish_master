import tkinter as tk
from random import shuffle
import time

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
        self.root.config(bg="#00698f")

        self.deck = Deck()
        self.deck.shuffle()
        self.player_hand = Hand()
        self.dealer_hand = Hand()
        self.player_balance = 100
        self.bet = 0

        self.balance_label = tk.Label(self.root, text=f"Balance: ${self.player_balance}", font=("Arial", 16), bg="#00698f", fg="white")
        self.balance_label.pack(pady=10)

        self.bet_label = tk.Label(self.root, text="Bet: $0", font=("Arial", 16), bg="#00698f", fg="white")
        self.bet_label.pack()

        self.bet_entry = tk.Entry(self.root, font=("Arial", 16), width=10)
        self.bet_entry.pack(pady=10)

        self.place_bet_button = tk.Button(self.root, text="Place Bet", command=self.place_bet, font=("Arial", 16), bg="#007bff", fg="white", relief="flat")
        self.place_bet_button.pack(pady=10)

        self.deal_button = tk.Button(self.root, text="Deal", command=self.deal, font=("Arial", 16), bg="#007bff", fg="white", relief="flat", state=tk.DISABLED)
        self.deal_button.pack()

        self.hit_button = tk.Button(self.root, text="Hit", command=self.hit, font=("Arial", 16), bg="#007bff", fg="white", relief="flat", state=tk.DISABLED)
        self.hit_button.pack(pady=10)

        self.stand_button = tk.Button(self.root, text="Stand", command=self.stand, font=("Arial", 16), bg="#007bff", fg="white", relief="flat", state=tk.DISABLED)
        self.stand_button.pack()

        self.result_label = tk.Label(self.root, text="", font=("Arial", 16), bg="#00698f", fg="white")
        self.result_label.pack(pady=10)

        self.player_hand_label = tk.Label(self.root, text="Player Hand:", font=("Arial", 16), bg="#00698f", fg="white")
        self.player_hand_label.pack()

        self.dealer_hand_label = tk.Label(self.root, text="Dealer Hand:", font=("Arial", 16), bg="#00698f", fg="white")
        self.dealer_hand_label.pack(pady=10)

        self.card_frame = tk.Frame(self.root, bg="#00698f")
        self.card_frame.pack()

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

        self.player_hand_label['text'] = f"Player Hand: {self.player_hand}"
        self.dealer_hand_label['text'] = f"Dealer Hand: {self.dealer_hand.cards[0]}"

        self.deal_button['state'] = tk.DISABLED
        self.hit_button['state'] = tk.NORMAL
        self.stand_button['state'] = tk.NORMAL

        for widget in self.card_frame.winfo_children():
            widget.destroy()

        for card in self.player_hand.cards:
            card_label = tk.Label(self.card_frame, text=f"{card.value} of {card.suit}", font=("Arial", 16), bg="#ffffff", fg="black", relief="raised", borderwidth=1, width=15)
            card_label.pack(side=tk.LEFT, padx=5)

        card_label = tk.Label(self.card_frame, text=f"? of?", font=("Arial", 16), bg="#ffffff", fg="black", relief="raised", borderwidth=1, width=15)
        card_label.pack(side=tk.LEFT, padx=5)

    def hit(self):
        self.player_hand.add_card(self.deck.deal())

        self.player_hand_label['text'] = f"Player Hand: {self.player_hand}"

        for widget in self.card_frame.winfo_children():
            widget.destroy()

        for card in self.player_hand.cards:
            card_label = tk.Label(self.card_frame, text=f"{card.value} of {card.suit}", font=("Arial", 16), bg="#ffffff", fg="black", relief="raised", borderwidth=1, width=15)
            card_label.pack(side=tk.LEFT, padx=5)

        card_label = tk.Label(self.card_frame, text=f"? of?", font=("Arial", 16), bg="#ffffff", fg="black", relief="raised", borderwidth=1, width=15)
        card_label.pack(side=tk.LEFT, padx=5)

        if self.player_hand.get_value() > 21:
            self.result_label['text'] = "Player busts! Dealer wins!"
            self.hit_button['state'] = tk.DISABLED
            self.stand_button['state'] = tk.DISABLED
            self.place_bet_button['state'] = tk.NORMAL
            self.bet_entry['state'] = tk.NORMAL

    def stand(self):
        while self.dealer_hand.get_value() < 17:
            self.dealer_hand.add_card(self.deck.deal())

        self.player_hand_label['text'] = f"Player Hand: {self.player_hand}"
        self.dealer_hand_label['text'] = f"Dealer Hand: {self.dealer_hand}"

        for widget in self.card_frame.winfo_children():
            widget.destroy()

        for card in self.player_hand.cards:
            card_label = tk.Label(self.card_frame, text=f"{card.value} of {card.suit}", font=("Arial", 16), bg="#ffffff", fg="black", relief="raised", borderwidth=1, width=15)
            card_label.pack(side=tk.LEFT, padx=5)

        for card in self.dealer_hand.cards:
            card_label = tk.Label(self.card_frame, text=f"{card.value} of {card.suit}", font=("Arial", 16), bg="#ffffff", fg="black", relief="raised", borderwidth=1, width=15)
            card_label.pack(side=tk.LEFT, padx=5)

        if self.dealer_hand.get_value() > 21:
            self.result_label['text'] = "Dealer busts! Player wins!"
            self.player_balance += self.bet * 2
            self.balance_label['text'] = f"Balance: ${self.player_balance}"
        elif self.dealer_hand.get_value() < self.player_hand.get_value():
            self.result_label['text'] = "Player wins!"
            self.player_balance += self.bet * 2
            self.balance_label['text'] = f"Balance: ${self.player_balance}"
        elif self.dealer_hand.get_value() > self.player_hand.get_value():
            self.result_label['text'] = "Dealer wins!"
        else:
            self.result_label['text'] = "Push!"
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
