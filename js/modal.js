const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeModalButton = document.querySelector('.modal_close')

const openModal = () => {
	modal.style.display = 'block'
	document.body.style.overflow = 'hidden'
}

const closeModal = () => {
	modal.style.display = 'none'
	document.body.style.overflow = ''
}

const scrollOpenModal = () => {
	const windowBottomPos = window.innerHeight + window.scrollY
	const bodyHeight = document.body.offsetHeight
    if (windowBottomPos === bodyHeight) {
		openModal()
		document.removeEventListener('scroll', scrollOpenModal)
    }
}

document.addEventListener('scroll', scrollOpenModal)
setTimeout(() => openModal(), 60000)
modalTrigger.onclick = () => openModal()
closeModalButton.onclick = () => closeModal()
modal.onclick = (event) => {
	event.target === modal && closeModal() 
}


const response = fetch(url, {
	method: 'POST',
	headers: {},
	body: ''
})