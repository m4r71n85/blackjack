var dealer_hand = new Array();
var player_hand = new Array();
var game_over = false;


// Constructor for Card objects
function Card(num, suit) {
    this.num = num;
    this.suit = suit;
    this.fname = fname;
}
function fname() {
    return this.num + this.suit + ".gif";
}
// The function fname() makes a filename for an image.
// The filenames are a concatenation of card number and suit
// Ace = 1 and King = 13


// Constructor for Deck Object
function Deck() {
    this.cards = new Array(52);
    this.next_card = 0;
    // fill the deck (in order, for now)
    for (i = 1; i < 14; i++) {
        this.cards[i - 1] = new Card(i, "c");
        this.cards[i + 12] = new Card(i, "h");
        this.cards[i + 25] = new Card(i, "s");
        this.cards[i + 38] = new Card(i, "d");
    }
    this.shuffle = shuffle;
    this.dealCard = dealCard;
}
function shuffle() {
    for (i = 1; i < 1000; i++) {
        // switch two randomly selected cards
        card1 = Math.floor(52 * Math.random());
        card2 = Math.floor(52 * Math.random());
        temp = this.cards[card2];
        this.cards[card2] = this.cards[card1];
        this.cards[card1] = temp;
    }
    this.next_card = 0;
}
function dealCard() {
    return this.cards[ this.next_card++ ];
}


var deck = new Deck();
deck.shuffle();


function newGame() {

    if (deck.next_card > 39) {  // shuffle the deck if 75% of
        deck.shuffle();            // the cards have been used.
    }
    dealer_hand = new Array();
    player_hand = new Array();

    // Deal and Display cards

    dealer_hand[ 0 ] = deck.dealCard();   // This is the hole card.
    document.images[0].src = "blank.gif"; // The hole card is not shown
    dealer_hand[ 1 ] = deck.dealCard();
    document.images[ 1 ].src = dealer_hand[ 1 ].fname();
    for (i = 2; i < 6; i++) {
        document.images[i].src = "blank.gif";
    }

    player_hand[ 0 ] = deck.dealCard();
    document.images[ 6 ].src = player_hand[ 0 ].fname();
    player_hand[ 1 ] = deck.dealCard();
    document.images[ 7 ].src = player_hand[ 1 ].fname();
    for (i = 8; i < 12; i++) {
        document.images[i].src = "blank.gif";
    }

    // Reset the form fields and the state variables
    window.status = "";
    document.form1.dealer.value = "";
    document.form1.result.value = "";
    document.form1.player.value = score(player_hand);
    game_over = false;

} // end function newGame()


function hit() {
    var total = 0;
    var new_card = 0;  // index for the new card position
    if (game_over) {
        window.status = "Game over.  Click the Deal button to start a new hand."
    } else {
        new_card = player_hand.length;
        player_hand[ new_card ] = deck.dealCard();
        document.images[ new_card + 6 ].src = player_hand[ new_card ].fname();
        total = score(player_hand);
        if (total > 21) {  // Busted, game over.
            document.form1.player.value = total + "  busted";
            document.images[ 0 ].src = dealer_hand[ 0 ].fname(); // reveal the dealer hole card
            document.form1.dealer.value = score(dealer_hand);
            winner();
            game_over = true;
        } else {
            document.form1.player.value = total;
        }
    }
} // end function hit()


function stand() {
    var total = 0;
    var new_card = 0;  // index for the new card position
    if (game_over) {
        window.status = "Game over.  Click the Deal button to start a new hand."
    } else {

        document.images[ 0 ].src = dealer_hand[ 0 ].fname(); // reveal the dealer hole card
        while (score(dealer_hand) < 17) {  // Dealer stands on soft 17
            new_card = dealer_hand.length;
            dealer_hand[ new_card ] = deck.dealCard();
            document.images[ new_card ].src = dealer_hand[ new_card ].fname();
        }

        total = score(dealer_hand);
        if (total > 21) {  // Busted
            document.form1.dealer.value = total + "  busted";
        } else {
            document.form1.dealer.value = total;
        }

    }
    winner();
    game_over = true; // The game ends after the player stands.

} // end function stand()


function score(hand) {
    var total = 0;
    var soft = 0; // This variable counts the number of aces in the hand.
    var pips = 0; // The trump pictures on a card used to be called pips.
    for (i = 0; i < hand.length; i++) {
        pips = hand[i].num;
        if (pips == 1) {
            soft = soft + 1;
            total = total + 11;
        } else {
            if (pips == 11 || pips == 12 || pips == 13) {
                total = total + 10;
            } else {
                total = total + pips;
            }
        }
    }
    while (soft > 0 && total > 21) {  // Count the aces as 1 instead
        total = total - 10;              // of 11 if the total is over 21
        soft = soft - 1;
    }
    return total;
}  // end function score


function winner() {
    var player_total = score(player_hand);
    var dealer_total = score(dealer_hand);
    if (player_total > 21) {  // Busted
        document.form1.result.value = "Dealer wins";
    } else {
        if (dealer_total > 21) { // Busted
            document.form1.result.value = "Player wins";
        } else {
            if (player_total == dealer_total) {
                document.form1.result.value = "Tie game";
            } else {
                if (player_total > dealer_total) {
                    document.form1.result.value = "Player wins";
                } else {
                    document.form1.result.value = "Dealer wins";
                }
            }
        }
    }
}


        