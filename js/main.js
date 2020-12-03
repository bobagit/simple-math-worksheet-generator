const cardContainer = document.getElementById('card-container')
const operator = document.createElement('div')
const answer = document.createElement('div')
let form = document.getElementById('customize')
let digitsTop = document.querySelector('.digits-top')
digitsTop.value = localStorage.getItem('digitsTop') || 1
let digitsBottom = document.querySelector('.digits-bottom')
digitsBottom.value = localStorage.getItem('digitsBottom') || 1
let operatorType = document.querySelector('.operator-type')
operatorType.value = localStorage.getItem('operator') || '+'

// create random number generator
let randomGen = (digits) => {
  let number = '';
  let num = 0;
  for (let i = 0; i < digits; i++) {
    if (i == 0 && (digits > 1)) { // first number not zero if > 9
      num = Math.floor(Math.random() * 9 + 1)
    } else {
      num = Math.floor(Math.random() * 10)
    }
    number += num
  }
  return number
} 

// create ability to add multiple lists
function generateNumber(digits) {
 let randNum = document.createElement('li')
 randNum.innerText = randomGen(digits);
 return randNum
}
// TODO make ability to generate specifed range of numbers
// TODO create grade levels, which increases complexity

function buildCard(numCards=9, whichOperator=operatorType.value, topVal=digitsTop.value, bottomVal=digitsBottom.value) {
  for (let index = 0; index < numCards; index++) {
    // a card
    let card = document.createElement('div')
    card.classList = 'card'
    
    // top half of math
    let top = document.createElement('div')
    top.classList = "top"
    card.appendChild(top)
    let ul = document.createElement('ul')
    ul.classList = 'numbers'
    let operator = document.createElement('div')
    operator.classList = 'operator'
    operator.textContent = whichOperator
    top.appendChild(operator)
    top.appendChild(ul)
    ul.appendChild(generateNumber(topVal))
    ul.appendChild(generateNumber(bottomVal))
    
    // bottom half
    let answer = document.createElement('div')
    answer.classList = 'answer'
    card.appendChild(answer)

    cardContainer.appendChild(card)     
  }  
}
buildCard()

// buildCard(number of problems (9 is default), type of operator[+, -, etc])

form.addEventListener('change', e => {
    e.stopPropagation()
    document.querySelectorAll('.card').forEach(x => x.remove())
    localStorage.setItem('digitsTop', digitsTop.value)
    localStorage.setItem('digitsBottom', digitsBottom.value)
    localStorage.setItem('operator', operatorType.value)
    buildCard(undefined, undefined, digitsTop.value, digitsBottom.value) 
})

// 9 to a page
