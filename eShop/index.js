const placeHolderImage = "img/placeholder.png";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


function makeGETRequest(url) {
    var xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    };

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;

            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        };

        xhr.ontimeout = function () {
            reject("Request timeout");
        };

        xhr.open('GET', url);
        xhr.send();
    });
}


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
    constructor() {
        this.goods = [];
    }

    //Асинхронный запрос на удаленный сервер
    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`);
    }

    parseGoods(goods) {
        const lst = JSON.parse(goods)
        this.goods = lst.map(good => {
            return new GoodsItem(good.product_name, good.price);
        })
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
    constructor(item, quantity = 1) {
        this.item = item;
        this.quantity = quantity;
    }

    /**
     * Увеличивает количество товара на указанное число штук
     * @param {Integer} quantity добавляемое количество товара
     * @returns {Boolean} true - если успешно добавлено, иначе false
     */
    add(quantity = 1) {
        this.quantity += quantity;
    }

    /**
     * Уменьшает количество товара на указанное число штук. 
     * При этом количество не может быть меньше нуля.
     * @param {Integer} quantity уменьшаемое количество товара
     * @returns {Boolean} true - если успешно удалено, иначе false
     */
    remove(quantity) {
        this.quantity -= quantity;
        if (this.quantity < 0) this.quantity = 0;
    }
}

class Cart {
    constructor() {
        this.cart = new Map();
        this.total = 0;
    }

    /**
     * Добавляет товар в корзину. Если товар уже существует - добавляет 
     * соответствующее количество.
     * @param  {GoodsItem} cartItem добавляемый товар
     * @returns {Boolean} true - если успешно добавлено, иначе false
     */
    add(goodsItem, quantity = 1) {
        let cartItem;
        if (this.cart.has(goodsItem)) {
            cartItem = this.cart.get(goodsItem);
            cartItem.add(quantity);
        } else {
            cartItem = new CartItem(goodsItem, quantity);
            this.cart.set(goodsItem, cartItem);
        }
        this.recalcTotal();
    }

    remove(goodsItem, quantity = 1) {
        if (this.cart.has(goodsItem)) {
            const cartItem = this.cart.get(goodsItem);
            cartItem.remove(quantity);
            this.recalcTotal();
        }
    }

    /**
     * Удаляет заданный тип товара из корзины
     * @param  {GoodsItem} goodsItem удаляемый товар
     * @returns {Boolean} true - если успешно удалено, иначе false
     */
    // (в данном случае мы в качестве аргумента принимаем GoodsItem, так как
    // нам не важно количество товара в корзине - мы удаляем всю позицию)
    delete(goodsItem) {
        const result = this.cart.delete(goodsItem);
        if (result) this.recalcTotal();
        return result;
    }

    /**
     * Вычисляет суммарную стомость товаров в корзине
     * @returns {Number}
     */
    recalcTotal() {
        const cartItems = this.getItems();
        this.total = cartItems.reduce((total, cartItem) => {
            return total + cartItem.item.price * cartItem.quantity;
        }, 0);
    }

    /**
     * Ищет позицию в корзине
     * @param  {GoodsItem} goodsItem искомый тип товара
     * @returns {CartItem} возвращает найденный CartItem, если данная позиция 
     * есть в корзине, иначе возвращает undefined
     */
    find(goodsItem) {
        return this.cart.get(goodsItem);
    }
    /**
     * @returns { Array {CartItem} } список об
     */
    getItems() {
        return Array.from(this.cart.values())
    }
}

const list = new GoodsList();
list.fetchGoods()
    .then(goods => list.parseGoods(goods))
    .then(() => list.render())
    .then(() => testCart())
    .catch(error => console.error(error))

function testCart() {
    const item1 = list.goods[0];
    const item2 = list.goods[1];

    const cart = new Cart();
    cart.add(item1);
    console.log(`Check add one: ${cart.total == item1.price}`);
    cart.add(item1, 2);
    console.log(`Check add two: ${cart.total == item1.price * 3}`);
    cart.remove(item1);
    console.log(`Check remove one: ${cart.total == item1.price * 2}`);
    cart.remove(item1, 2);
    console.log(`Check remove two: ${cart.total == 0}`);
    cart.add(item1, 2);
    cart.add(item2, 2);
    console.log(`Check add different: ${cart.total == item1.price * 2 + item2.price * 2}`);
    cart.remove(item1, 10);
    console.log(`Check remove more: ${cart.total == item2.price * 2}`);
    cart.delete(item2);
    console.log(`Check delete: ${cart.total == 0}`);    
}