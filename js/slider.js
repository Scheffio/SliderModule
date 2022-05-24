//Учитывая, что нам всё равно как то нужно присоединять модуль
//к html, я создаю ключевой класс 'slider-module'
//в дальнейшем, если в html создать блок с этим классом, то модуль
//будет создаваться на его месте
const blockToConnect = document.querySelector('.slider-module')
const slider = {
    position: 0,
    max: 380 * 11,
    //Для собственного удобства, создаю функцию, которая будет
    //генерировать нужный мне элемент с нужными свойствами
    generateElement(element, elementClass, elementContent) {
        let create = document.createElement(`${element}`)
        if(elementClass != '') {
            create.classList.add(`${elementClass}`)
        }
        if(elementContent != '') {
            create.innerHTML = elementContent
        }

        return create
    },
    //Так как нужно сделать модуль - значит он должен быть автономным
    //Поэтому вся html структура будет рендериться здесь
    render() {
        // Здесь генерируется весь текстовый блок
        let textBlock = blockToConnect.appendChild(this.generateElement('div', 'text-block', ''))
        textBlock.appendChild(this.generateElement('h1', '', 'проекты'))

        let desc = textBlock.appendChild(this.generateElement('div', 'description', ''))
        desc.appendChild(this.generateElement('p', '', 'Наши дома - это возмoжнoсть жить в 20 минутaх oт центра Калининграда, в cобcтвeнном дoме на пpиpoде, рядом с лесным массивом, парковкой и зеленой лужайкой.'))
        desc.appendChild(this.generateElement('p', '', 'Предоставляем таунхаус в двух секционном доме с отдельными документами на жилой дом и земельным участком площадью 5 соток.'))
        desc.appendChild(this.generateElement('p', '', 'В трех километрах находится огромный развивающийся массив многоквартирных домов с детскими садами, школой и супермаркетами.')) 
        // ---------------------------

        // Здесь уже генерируем блок слайдера
        // Сначала структуру
        let slider = blockToConnect.appendChild(this.generateElement('div','slider','')).appendChild(this.generateElement('div','slider-container','')).appendChild(this.generateElement('div','slider-track',''))
        
        // Потом элементы, пока два, для теста, потом будет 12 как и просили
        for(let i = 0; i < 12; i ++) {slider.appendChild(this.generateElement('div','slider-item',''))}
        
        // Здесь уже карточки делаем
        document.querySelectorAll('.slider-item').forEach((element, index) => element.appendChild(this.generateElement('div','item-about',`<p>${index% 9 + 1}</p>`)))
        document.querySelectorAll('.item-about').forEach((element, index) => element.appendChild(this.generateElement('div','item-name',`<p>таунхаус</p><p>ул. свободы</p><p>дом № ${index + 1}А</p><p>5 100 00 руб.</p>`)))
        
        document.querySelectorAll('.slider-item').forEach((element) => element.appendChild(this.generateElement('img', '', '')).setAttribute('src', '/imgs/img.png'))
        document.querySelectorAll('.slider-item').forEach((element) => element.appendChild(this.generateElement('a', 'link', '<img src="/imgs/linkArrow.svg" alt="arrow">')).setAttribute('href', '#'))

        document.querySelector('.slider').appendChild(this.generateElement('div','slider-btns','')).appendChild(this.generateElement('div','btn-prev',''))
        document.querySelector('.slider-btns').appendChild(this.generateElement('div', 'btn-next',''))
    },
    nextBtn() {
        this.position += 380
        if(this.position >= this.max) {
            this.position = 0
        }
        document.querySelector('.slider-track').style.right = `${this.position}px`
    },
    prevBtn() {
        this.position -= 380
        if(this.position < 0) {
            this.position = this.max - 380
        }
        document.querySelector('.slider-track').style.right = `${this.position}px`
    }
}

slider.render()


document.querySelector('.btn-next').addEventListener('click', () => slider.nextBtn())
document.querySelector('.btn-prev').addEventListener('click', () => slider.prevBtn())