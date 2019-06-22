const placeHolderImage = "img/placeholder.png";

class GoodsItem {
    constructor(title = None, price, image = placeHolderImage) {
        this.title = title;
        this.price = price;
        this.image = image;
    }

    render() {
        return `
            <div class="goods-item">
                <img src='${this.image}' alt='${this.title}'/>
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="button-item-add">Добавить</button>
            </div>`
    }
}

class GoodsList {
    constructor () {
        this.goods = [];
    }

    fetchGoods() {
        //В последующем - асинхронный запрос на удаленный сервер
        const rawGoods = [
            { title: "Shirt", price: 150 },
            { title: "Socks", price: 50 },
            { title: "Jacket", price: 350 },
            { title: "Shoes", price: 250 },
        ]
        this.goods = rawGoods.map(item => 
                new GoodsItem(item.title, item.price, item.image));
    }

    render() {
        const listHtml = this.goods.reduce((acc, good) => {
            return acc += good.render();
        }, '')        
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    totalCost() {
        return this.goods.reduce((total, good) => {
            return total += good.price;
        }, 0);
    }
}

class CartItem {
    /**
     * @param  {GoodItem} item покупаемый товар
     * @param  {} quantity=1 количество единиц товара (по умолчанию - 1)
     */
    constructor(item, quantity=1) {

    }
    
    /**
     * Увеличивает количество товара на указанное число штук
     * @param {Integer} quantity добавляемое количество товара
     * @returns {Boolean} true - если успешно добавлено, иначе false
     */
    add(quantity=1) {
        
    }

    /**
     * Уменьшает количество товара на указанное число штук. 
     * При этом количество не может быть меньше нуля.
     * @returns {Boolean} true - если успешно удалено, иначе false
     */
    remove() {
        
    }
}

class Cart {
    constructor() {
        
    }
    
    /**
     * Добавляет товар в корзину. Если товар уже существует - добавляет 
     * соответствующее количество.
     * @param  {CartItem} cartItem добавляемый товар
     * @returns {Boolean} true - если успешно добавлено, иначе false
     */
    add(cartItem) {
        
    }

    /**
     * Удаляет заданный тип товара из корзины
     * @param  {GoodsItem} goodsItem удаляемый товар
     * @returns {Boolean} true - если успешно удалено, иначе false
     */
    // (в данном случае мы в качестве аргумента принимаем GoodsItem, так как
    // нам не важно количество товара в корзине - мы удаляем всю позицию)
    remove(goodsItem) {
        
    }

    /**
     * Вычисляет суммарную стомость товаров в корзине
     * @returns {Number}
     */
    recalcTotal() {
       
    }

    /**
     * Ищет позицию в корзине
     * @param  {GoodsItem} goodsItem искомый тип товара
     * @returns {CartItem} возвращает найденный CartItem, если данная позиция 
     * есть в корзине, иначе возвращает null
     */
    find(goodsItem) {
        
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();