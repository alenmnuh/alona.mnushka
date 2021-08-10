const addBtn = document.querySelectorAll('.product-box__btn');
const products = document.querySelectorAll('.product-box__item');
const cartQuantity = document.querySelector('.top-cart-info__quantity');
const fullPrice = document.querySelector('.top-cart-info__sum');
const filters = document.querySelector('.filter-box');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const form = document.getElementById('form');
let price = 0;
let quantity = 0;
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.btn-check');
const modalCloseBtn = document.querySelector('.modal__close');
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';

const plusFullPrice = (el, curPrice) => {
    if (el.closest('.product-box__item').querySelector('.qty__item').value < 0) {
        return false;
    } else if (!el.closest('.product-box__item').querySelector('.qty__item').value) {
        return price += +curPrice;
    } else {
        return price = price + ( +el.closest('.product-box__item').querySelector('.qty__item').value * +curPrice);
    }
}

const plusQuantity = (el) => {
    if (el.closest('.product-box__item').querySelector('.qty__item').value < 0) {
        return false;
    } else if (!el.closest('.product-box__item').querySelector('.qty__item').value) {
        return quantity += 1;
    } else {
        return quantity += +el.closest('.product-box__item').querySelector('.qty__item').value
    }
}

const displayFullPrice = (curPrice) => {
    fullPrice.textContent = price;
}

const displayQuantity = () => {
    cartQuantity.textContent = quantity;
}

addBtn.forEach((el, i) => {
    el.i = i + 1;
    el.closest('.product-box__item').setAttribute('data-id', el.i);
    el.addEventListener('click', e => {
        let self = e.currentTarget;
        let product = self.closest('.product-box__item');
        let priceContent = product.querySelector('.product-box__price').textContent;
        let price = priceContent.replace(/\D/g, '');

        plusFullPrice(el, price);
        displayFullPrice(price);
        plusQuantity(el);
        displayQuantity();
    })
})

const filterProducts = () => {
    const category = filters.querySelector('.select-box .select-control').value;
    const price = filters.querySelector('.price-select-box .select-control').value;
    products.forEach((product) => {
        let priceContent = product.querySelector('.product-box__price').textContent;
        let productPrice = priceContent.replace(/\D/g, '');
        product.setAttribute('data-price', productPrice);
        if ((product.dataset.cat === category || category === 'all') && (+product.dataset.price < price || price === 'all')) {
            product.style.display = 'block'
        } else {
            product.style.display = 'none'
        }
    })
}

const openModal = (e) => {
    e.preventDefault();
    modalOverlay.classList.add('is-open');
    modal.classList.add('is-open');
    document.body.appendChild(modalOverlay);
}

const closeModal = () => {
    modalOverlay.classList.remove('is-open');
    modal.classList.remove('is-open');
    document.body.removeChild(modalOverlay);
}

const validate = (e) => {
    e.preventDefault();

    if (!userName.value || !userName.value.replace(/\s/g, '').length) {
        userName.style.border = '2px solid red';
        alert('Введите имя');
        return false;
    } else {
        userName.style.border = 'none';
    }

    if (!userEmail.value || !userEmail.value.replace(/\s/g, '').length) {
        userEmail.style.border = '2px solid red';
        alert('Введите Email');
        return false;
    } else {
        userEmail.style.border = 'none';
    }

    alert('Спасибо за покупки');
    cartQuantity.textContent = 'XXX'
    fullPrice.textContent = 'XXX'
    price = 0; quantity = 0;
    closeModal()
}

filters.addEventListener('change', filterProducts);
form.addEventListener('submit', validate);
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
modalBtn.addEventListener('click', openModal);
