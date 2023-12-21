const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');

const reqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (reqExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = 'Phone number is correct';
        phoneSpan.style.color = 'green';
    } else {
        phoneSpan.innerHTML = 'Phone number is incorrect';
        phoneSpan.style.color = 'red';
    }
})


const tabContentCards = document.querySelectorAll('.tab_content_block'),
    tabItems = document.querySelectorAll('.tab_content_item'),
    tabItemsParents = document.querySelector('.tab_content_items')

const hightTabsContentCards = () => {
    tabContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none';
    })
}

const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let nextTab = 0

const hideTabContent = () => {
	tabContent.forEach(item => item.style.display = 'none')
	tabs.forEach(item => item.classList.remove('tab_content_item_active'))
}

const showTabContent = (index = 0) => {
	tabContent[index].style.display = 'block'
	tabs[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabsParent.onclick = event => {
	const targetElement = event.target
	if(!targetElement.classList.contains('.tab_content_item')){
		tabs.forEach((tab, tabIndex) => {
			if(targetElement === tab){
				nextTab = tabIndex
				hideTabContent()
				showTabContent(tabIndex)
			}
		})
	}
}

const tabInterval = setInterval(() => {
	hideTabContent()
	showTabContent(nextTab)
	nextTab >= tabs.length - 1 ?  nextTab = 0 : nextTab++ 
}, 3000)



// JavaScript
const currencies = ['usd', 'eur', 'som', 'tng', 'rub', 'won'];
const elements = currencies.map(currency => document.querySelector(`#${currency}`));

const fetchData = async () => {
    try {
        const response = await fetch('../data/converter.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

const converter = async (element, target1, target2, isTrue) => {
    element.addEventListener('input', async () => {
        const data = await fetchData();
        if (!data) return;

        const sourceCurrency = element.id;
        const sourceValue = element.value;

        currencies.forEach(targetCurrency => {
            if (targetCurrency !== sourceCurrency) {
                const conversionRate = data[targetCurrency] / data[sourceCurrency];
                const convertedValue = (sourceValue * conversionRate).toFixed(2);
                document.querySelector(`#${targetCurrency}`).value = convertedValue;
            }
        });
    });
};

elements.forEach((element, index) => {
    const target1 = elements[(index + 1) % elements.length];
    const target2 = elements[(index + 2) % elements.length];
    converter(element, target1, target2);
});


//weather
const searchCity = document.querySelector('.searchCity')
const cityTemp = document.querySelector('.cityTemp')
const cityName = document.querySelector('.cityName')

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const apiKey = 'e417df62e04d3b1b111abeab19cea714'


searchCity.oninput = async() => {
    const response = await fetch(`${BASE_URL}?q=${searchCity.value}&appid=${apiKey}`)
    const data = await response.json()
    cityName.innerHTML = data?.name || '...'
	cityTemp.innerHTML = data?.main?.temp ? `${Math.round(data?.main?.temp - 274)}&deg;C` : '...'
}

async function test(){
	const response = await fetch('https://ipinfo.io?token=d4f19f73332858')
	const data = await response.json()
	const response2 = await fetch(`${BASE_URL}?q=${data.city}&appid=${apiKey}`)
    const data2 = await response2.json()
    cityName.innerHTML = data2?.name || '...'
	cityTemp.innerHTML = data2?.main?.temp ? `${Math.round(data2?.main?.temp - 274)}&deg;C` : '...'
}
test()
