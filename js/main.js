const cardContainer = document.getElementById('card-container')
const operator = document.createElement('div')
const answer = document.createElement('div')
const form = document.getElementById('customize')
const digitsTop = document.querySelector('.digits-top')
const digitsBottom = document.querySelector('.digits-bottom')
const operatorType = document.querySelector('.operator-type')
const rangeTopMin = document.querySelector('.range-top-min')
const rangeTopMax = document.querySelector('.range-top-max')
const date = document.querySelector('.date')

// local storage values
digitsTop.value = localStorage.getItem('digitsTop') || 1
digitsBottom.value = localStorage.getItem('digitsBottom') || 1
operatorType.value = localStorage.getItem('operator') || '+'
rangeTopMin.value = localStorage.getItem('rangeTopMin') || 0
rangeTopMax.value = localStorage.getItem('rangeTopMax') || 9

// random number generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let isTwoDigits = (num) => num > 1 ? true : false;

let createNumber = (digits) => {
  let number = '';
  let num = 0;
  for (let i = 0; i < digits; i++) {
    if (i == 0 && isTwoDigits(digits)) {
      num = getRandomInt(1, rangeTopMax.value)
    } else {
      num = getRandomInt(rangeTopMin.value, rangeTopMax.value)
    }
    number += num
  }
  return number
} 

function generateNumber(digits) {
 let randNum = document.createElement('li')
 randNum.innerText = createNumber(digits);
 return randNum
}

// TODO make ability to generate specifed range of numbers
// TODO create grade levels, which increases complexity

function buildCard(numCards=12, whichOperator=operatorType.value, numberOfDigitsTop=digitsTop.value, numberOfDigitsBottom=digitsBottom.value) {
  for (let index = 0; index < numCards; index++) {
    // date
    let dateNow = new Date
    date.innerText = 'Printed: ' + dateNow.toDateString()
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
    ul.appendChild(generateNumber(numberOfDigitsTop))
    ul.appendChild(generateNumber(numberOfDigitsBottom))
    
    // bottom half
    let answer = document.createElement('div')
    answer.classList = 'answer'
    card.appendChild(answer)

    cardContainer.appendChild(card)     
  }  
}
buildCard()

form.addEventListener('change', e => {
    e.stopPropagation()
    document.querySelectorAll('.card').forEach(x => x.remove())
    localStorage.setItem('digitsTop', digitsTop.value)
    localStorage.setItem('digitsBottom', digitsBottom.value)
    localStorage.setItem('operator', operatorType.value)
    localStorage.setItem('rangeTopMin', rangeTopMin.value)
    localStorage.setItem('rangeTopMax', rangeTopMax.value)
    buildCard(undefined, undefined, digitsTop.value, digitsBottom.value) 
})
