
let deckId
const newDeck = document.getElementById("new-deck")
const cardsContainer = document.getElementById("cards")
const drawCards = document.getElementById("draw-cards")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

newDeck.addEventListener("click", handleClick)

drawCards.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class = "card"/>
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class = "card"/>
            `
        })
})

function determineWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
        "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        return "Card 1 wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        return "Card 2 wins!"
    } else {
        return "It's a tie!"
    }
}

