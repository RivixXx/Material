// бургер меню =================================================================

const burgerMenu = document.querySelector('.burger__menu');
const menuBody = document.querySelector('.header__nav');
if (burgerMenu) {
    burgerMenu.addEventListener('click', function(e) {
        document.body.classList.toggle('_lock');
        burgerMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
};

// скролл до якоря ==================================================================

const menuLimks = document.querySelectorAll('.navigation__link[data-goto]');
if(menuLimks.length > 0) {
    menuLimks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick); 
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

            if(burgerMenu.classList.contains('_active')) {
                document.body.classList.toggle('_lock');
                burgerMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
    };
};

// pop up ================================================

const openPopUp = document.getElementById('open__popup');
const closePopUp = document.getElementById('close__popup');
const popUp = document.getElementById('full__popup');
const bodyPopUp = document.getElementById('body__popup');

openPopUp.addEventListener('click', function(e) {
    e.preventDefault();
    popUp.classList.add('openPopUp');
        if (popUp.classList.contains('openPopUp')) {
            bodyPopUp.classList.add('ToScale')
        }
})

closePopUp.addEventListener('click', () => {
    popUp.classList.remove('openPopUp');
    bodyPopUp.classList.remove('ToScale')
});

// Конвертор байты в нормальный размер ================================================

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) {
        return '0 Byte';
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

// Плагин загрузки изображений ============================================================

const elementBox = (tag, classes = [], content) => {
    const node = document.createElement(tag);

    if (classes.length) {
        node.classList.add(...classes)
    }

    if (content) {
        node.textContent = content;
    }

    return node
}

function upload(selector, options = {}) {
    let files = [];
    const input = document.querySelector(selector);

    const preview = elementBox('div', ['preview']);
    const open = elementBox('button', ['download__btn'], 'открыть изображение');
    const upload = elementBox('button', ['download__btn', 'primary'], 'загрузить изображение');
    upload.style.display = 'none';

        if (options.multi) {
            input.setAttribute('multiple', true);
        };
        if (options.accept && Array.isArray(options.accept)) {
            input.setAttribute('accept', options.accept.join(','))
        };

    input.insertAdjacentElement('afterend', preview);
    input.insertAdjacentElement('afterend', upload);
    input.insertAdjacentElement('afterend', open);

    const trigerInput = () => input.click();
    const changeHandler = event => {
        if (!event.target.files.length) {
            return;
        };

    files = Array.from(event.target.files);
        preview.innerHTML = '';
        upload.style.display = 'inline';

        files.forEach(file => {
            if (!file.type.match('image')) {
                return;
            }
            const reader = new FileReader();

            reader.onload = ev => {
                const src = ev.target.result;
                preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-image">
                    <div class="preview-remove" data-name="${file.name}">&times</div>
                        <img src="${src}" alt="${file.name}"/>
                        <div class="preview-info">
                            <span>${file.name}</span>
                            ${bytesToSize(file.size)}
                        </div>
                    </div>
                `)
            }
            reader.readAsDataURL(file)
        });
    } 

    const removeHandler = event => {
        if (!event.target.dataset.name) {
            return;
        }
        const {name} = event.target.dataset;
        files = files.filter(file => file.name !== name);

        if (!files.length) {
            upload.style.display = 'none'
        }
        const block = preview.querySelector(`[data-name="${name}"]`).closest('.preview-image');

        block.classList.add('removing');
        setTimeout(() => block.remove(), 300);
    }
    const uploadHandler = () => {
    }

    open.addEventListener('click', trigerInput);
    input.addEventListener('change', changeHandler);
    preview.addEventListener('click', removeHandler);
    upload.addEventListener('click', uploadHandler)
}
upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif']
});

// textarea auto resize====================================================================

const textarea = document.querySelector('textarea');
textarea.addEventListener('keyup', function() {
    if(this.scrollTop > 0){
        this.style.height = this.scrollHeight + "px";
    }
});

// Получение данных из API ===========================================================

const ApiUrl = "https://reqres.in/api/users?per_page=12";

async function getUsersData() {
    let response = await fetch(ApiUrl);
    let content = await response.json();
    content = content.data;

    let contentBox = document.querySelector('.feedback__card');

    let key;

    // for in
    for (key in content) {
        contentBox.innerHTML += `
            <div class="feedback__card-content">
                <h3 class="feedback__card-name">${content[key].first_name}</h3>
                <p class="feedback__card-email">${content[key].email}</p>
                <div class="feedback__card-img">
                    <img src="${content[key].avatar}" alt="Фото активного покупателя" title="Фото активного пользователя" class="member-photo">
                </div>
            </div>
        `
    }
}

getUsersData();

// дан целочисленный отсортированный по возрастанию массив, и некое целое число - задача найти ближайший к этому числу элемент массива js

const sortedArray = [0, 2, 5, 15, 40, 55, 70, 89, 125];
const randomNumber = 11;

let result = null;
for (let i = 1; i < randomNumber.lenght; i++) {
    const currentNumber = randomNumber[i];
    previosNumber = randomNumber[i - 1];


    if (currentNumber > randomNumber) {
        const difference1 = Math.abs(currentNumber - randomNumber);
        const difference2 = Math.abs(previosNumber - randomNumber);

        result = difference1 > difference2 ? previosNumber : currentNumber;
        break;
    }

    if (randomNumber > currentNumber && i === randomNumber.lenght - 1) {
        result = currentNumber;
    }
}

console.log(result);

//  хранение данных из формы в local storege

const form = JSON.parse(localStorage.getItem('form')) || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    massage: ''
};

const inputs = document.querySelectorAll('input, textarea');
inputs.forEach((input) => {
    const inputName = input.getAttribute('name');
    input.value = form[inputName];

    input.addEventListener('input', (event) => {
        const key = inputName;
        form[key] = event.target.value;
    });
});

const formEl = document.querySelector('form');
formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(form);
    localStorage.setItem('form', JSON.stringify(form))
})

// Задание
// Получить данные всех пользователей из https://reqres.in/api/users
// Вывести в консоль фамилии всех пользователей в цикле
// Вывести все данные всех пользователей, фамилия которых начинается на F
// Вывести следующее предложение: Наша база содержит данные следующих пользователей: и далее в этой же строке через запятую имена и фамилии всех пользователей. Использовать метод reduce
// Вывести названия всех ключей в объекте пользователя.
// Дополнительно:

// Вывести данные пользователей (либо товаров, если найдёте другую API) в вашем интернет-магазине - отрисовать карточки с нужными данными. 

fetch('https://reqres.in/api/users?per_page=12')
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((body) => {
        console.log('Получил данные всех пользователей:');
            console.log(body.data);
        
        console.log('Вывел в консоль фамилии всех пользователей в цикле:');
        body.data.forEach(element => {
            console.log(element.last_name);
        });
        console.log('Вывел все данные всех пользователей, фамилия которых начинается на F');
        body.data.filter(item => item.last_name.startsWith('F')).forEach(element => {
            console.log(element);
        });
        console.log('Вывел следующее предложение:');
        const mainBase = body.data.reduce((acc, item) => 
            acc + item.first_name + " " + item.last_name +', ', "Наша база содержит данные следующих пользователей:"
        );
            console.log(mainBase);
    
        console.log('Вывел названия всех ключей в объекте пользователя');
        Object.keys(body.data[0]).forEach(element =>
            console.log(element)
        );  
    });

// Нужна функция, которая будет принимать числа и замыкать их. По идеи функцию можно разделить на две. Но имея под рукой IIFE можно использовать сразу вызываемое выражение:
 
 const fibonacci = ((prev = 0, next = 1) => () => {
    const result = prev + next;
    prev = next;
    next = result;
    return result;
  })();
  
  
  fibonacci (); // 1
  fibonacci (); // 2
  fibonacci (); // 3
  fibonacci (); // 5
  fibonacci (); // 8
