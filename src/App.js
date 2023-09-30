
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './Components/SingleCard';

const cardImages = [
  { "src": "/img/alien.png", matched: false },
  { "src": "/img/boy.png", matched: false },
  { "src": "/img/earth.png", matched: false },
  { "src": "/img/planet.png", matched: false },
  { "src": "/img/star.png", matched: false },
  { "src": "/img/rocket.png", matched: false },
]



function App() {
const [cards, setCards] = useState([])
const [turns, setTurns] = useState(0)

const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)

const [disabled, setDisabled] = useState(false)



  //shuffle cards - duplicate each card once, randomize order with sort, random id to each card

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //when it's a neg.# items will remain in same order, +# they will shift
      .map((card) => ({ ...card, id: Math.random() })) //this takes the array of cards and assigns a random ID to each

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards) //calling this function shuffles the cards and uses STATE to update the cards
      setTurns(0);
  }

  //handle a choice

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

//compare 2 selected cards

useEffect(() => {
  if (choiceOne && choiceTwo) {
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      console.log("It's a match!")
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else {
      console.log("Bummer, NOT a match!")
      setTimeout(() => resetTurn(), 1000)
    }
  }
}, [choiceOne, choiceTwo])
 console.log(cards)

  //reset choices and increase turn

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automagically!
  useEffect(() => {
    shuffleCards()
  }, [])
  
  return (
    <div className="App">
      <h1>Memory Card Game</h1>  
      <button onClick={shuffleCards}>New Game</button>
        
        <div class="card-grid"> 
          {cards.map(card => (
              <SingleCard 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={ card === choiceOne || card === choiceTwo || card.matched }
              disabled={disabled}
              />
            ))}
          </div>  
          <p>Turns: {turns}</p>   
    </div>
   );
}

export default App;
