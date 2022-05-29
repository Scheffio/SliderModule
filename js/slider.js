//Учитывая, что нам всё равно как то нужно присоединять модуль
//к html, я создаю ключевой класс 'slider-module'
//в дальнейшем, если в html создать блок с этим классом, то модуль
//будет создаваться на его месте
const blockToConnect = document.querySelector('.slider-module')

const module = {
    position: 0,
    movePosition: 0,
    toShow: 2,
    toScroll: 1,
    itemsCount: 12,
    itemsWidth: 0,
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
    setItemsWidth() {
        document.querySelectorAll('.slider-item').forEach((items) => {
            items.style.minWidth = `${this.itemsWidth}px`
        })
    },
    renderBlocks() {
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
        this.container = blockToConnect.querySelector('.slider-container')
        // Потом элементы, пока два, для теста, потом будет 12 как и просили
        for(let i = 0; i < 12; i ++) {slider.appendChild(this.generateElement('div','slider-item',''))}
        
        // Здесь уже карточки делаем
        document.querySelectorAll('.slider-item').forEach((element, index) => element.appendChild(this.generateElement('div','item-about',`<p>${index% 9 + 1}</p>`)))
        document.querySelectorAll('.item-about').forEach((element, index) => element.appendChild(this.generateElement('div','item-name',`<p>таунхаус</p><p>ул. свободы</p><p>дом № ${index + 1}А</p><p>5 100 00 руб.</p>`)))
        
        document.querySelectorAll('.slider-item').forEach((element) => element.appendChild(this.generateElement('div','card-image','')).appendChild(this.generateElement('img', '', '')).setAttribute('src', '/imgs/img.png'))
        document.querySelectorAll('.slider-item').forEach((element) => element.appendChild(this.generateElement('a', 'link', '<img src="/imgs/linkArrow.svg" alt="arrow">')).setAttribute('href', '#'))
        
        document.querySelector('.slider').prepend(this.generateElement('div','btn-prev',''))
        document.querySelector('.slider').appendChild(this.generateElement('div','btn-next',''))
        
        document.querySelector('.btn-next').addEventListener('click', () => module.nextBtn())
        document.querySelector('.btn-prev').addEventListener('click', () => module.prevBtn())

        if (this.container.clientWidth < 426) {
            module.itemsWidth = this.container.clientWidth / module.toShow
        }else {
            this.itemsWidth = this.container.clientWidth / this.toShow - 10
        }
        this.movePosition = this.toScroll * this.itemsWidth + 20
    },
    checkContainerSize() {
        return this.container.clientWidth < 426 ? 1 : 2
    },
    nextBtn() {
        this.position += this.movePosition
        if(this.container.clientWidth > 426) {
            if(this.position >= (this.itemsCount - 1) * this.itemsWidth) {
                this.position = 0
            }
        }else {
            if(this.position >= (this.itemsCount + 1) * this.itemsWidth) {
                this.position = 0
            }
        }
        document.querySelector('.slider-track').style.right = `${this.position}px`
    },
    prevBtn() {
        this.position -= this.movePosition
        console.log(`Pos = ${this.position}, MovePos = ${this.movePosition}, Items = ${this.itemsCount}, ItemsWidth = ${this.itemsWidth}`);
        if(this.container.clientWidth > 426) {
            if (this.position < 0) {
                this.position = (this.itemsCount - 2) * (this.itemsWidth + 20)
            }
        }else {   
            if (this.position < 0) {
                this.position = (this.itemsCount - 1) * (this.itemsWidth + 20)
            }
        }
        document.querySelector('.slider-track').style.right = `${this.position}px`
    },
    reset() {
        document.querySelector('.slider-module').innerHTML = ""
        this.position = 0
    }
}

module.renderBlocks()
module.setItemsWidth()


window.addEventListener('resize', () => {
    module.toShow = module.checkContainerSize()
    module.reset()
    module.renderBlocks()
    module.setItemsWidth()
})


window.onload = () => {
        module.toShow = module.checkContainerSize()
        module.reset()
        module.renderBlocks()
        module.setItemsWidth()
}