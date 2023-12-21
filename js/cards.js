const cardsList = document.querySelector('.cards_list');
const bgColor = '0ff';
const textColor = '000';  
  
async function cardsRequest() {
    try{
        const response = await fetch(BASE_URL)  
        const data = await response.json()
        data.forEach(card => {
            let cardBlock = document.createElement('div')
            cardBlock.innerHTML = `
                <img src="${IMG_URL}/${500}x${100}/${bgColor}/${textColor}/?text=ID:%20${String(card.id).padStart(3, '0')}&font=museo" alt="">
                <h3>${card.title}</h3>
                <p>${card.body}</p>
            `
            cardsList.append(cardBlock)
            
        })
        cardsList.style.marginBottom = '0px'
    } catch(errorName) {
        console.warn('ERROR:' + errorName);
    }
    
}
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.cards_list div');

    cards.forEach(card => {
        const customTitle = card.getAttribute('data-custom-title');
        const customText = card.getAttribute('data-custom-text');
        const titleElement = card.querySelector('h3');
        const textElement = card.querySelector('p');

        titleElement.textContent = customTitle;
        textElement.textContent = customText;
    });
});

cardsRequest()