const DOM = (() => {
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
  const allowNegatives = document.querySelector('.allow-negatives')
  const toggleNegative = document.querySelector('.negatives-visible')

  // local storage values
  digitsTop.value = localStorage.getItem('digitsTop') || 1
  digitsBottom.value = localStorage.getItem('digitsBottom') || 1
  operatorType.value = localStorage.getItem('operator') || '+'
  rangeTopMin.value = localStorage.getItem('rangeTopMin') || 0
  rangeTopMax.value = localStorage.getItem('rangeTopMax') || 9
  allowNegatives.value = localStorage.getItem('allowNegatives') || false

  // random number generator
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let isTwoDigits = (num) => num > 1 ? true : false;
  
  let generateNumber = (digits) => {
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
    //randNum.innerText = createNumber(digits, allowNegatives);
    return number
  };

  return {
    cardContainer,
    digitsTop,
    digitsBottom,
    operatorType,
    rangeTopMin,
    rangeTopMax,
    generateNumber,
    date,
    form,
    allowNegatives,
    toggleNegative
  }

})();



// TODO make ability to generate specifed range of numbers
// TODO create grade levels, which increases complexity

function buildCard(numCards = 12, whichOperator = DOM.operatorType.value, numberOfDigitsTop = DOM.digitsTop.value, numberOfDigitsBottom = DOM.digitsBottom.value, allowNegatives = DOM.allowNegatives.value) {
  if (DOM.operatorType.value == '-') {
    DOM.toggleNegative.style.display = 'flex'
  } else {
    DOM.toggleNegative.style.display = 'none'
  }
  
  for (let index = 0; index < numCards; index++) {
    // date
    let dateNow = new Date
    let card = document.createElement('div')
    let top = document.createElement('div')
    let ul = document.createElement('ul')
    let operator = document.createElement('div')
    
    DOM.date.innerText = 'Printed: ' + dateNow.toDateString()
    
    // a card
    card.classList = 'card'
    
    // top half of math
    top.classList = "top"
    card.appendChild(top)
    ul.classList = 'numbers'
    operator.classList = 'operator'
    operator.textContent = whichOperator
    top.appendChild(operator)
    top.appendChild(ul)
    
    let myArr = [];
    // deal with let randNum = document.createElement('li') (need a list item)
    // generator numbers
    myArr.push(DOM.generateNumber(numberOfDigitsTop))
    myArr.push(DOM.generateNumber(numberOfDigitsBottom))
    
    if (allowNegatives == "false" && (numberOfDigitsTop == numberOfDigitsBottom)) {
       myArr = myArr.sort().reverse()
    }
    
    myArr.forEach(function(item) {
      var li = document.createElement('li');
      var text = document.createTextNode(item);
      li.appendChild(text);
      ul.appendChild(li)
    })
    
    // bottom half
    let answer = document.createElement('div')
    answer.classList = 'answer'
    card.appendChild(answer)

    DOM.cardContainer.appendChild(card)     
  }  
}

buildCard()

DOM.form.addEventListener('change', e => {
    e.stopPropagation()
    document.querySelectorAll('.card').forEach(x => x.remove())
    localStorage.setItem('digitsTop', DOM.digitsTop.value)
    localStorage.setItem('digitsBottom', DOM.digitsBottom.value)
    localStorage.setItem('operator', DOM.operatorType.value)
    localStorage.setItem('rangeTopMin', DOM.rangeTopMin.value)
    localStorage.setItem('rangeTopMax', DOM.rangeTopMax.value)
    localStorage.setItem('allowNegatives', DOM.allowNegatives.value)
    buildCard(undefined, undefined, DOM.digitsTop.value, DOM.digitsBottom.value, DOM.allowNegatives.value) 
})
