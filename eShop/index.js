const placeHolderImage = "img/placeholder.png";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


function makeGETRequest(url) {
    var xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            }
          }

          xhr.ontimeout =function() {
              reject("Request timeout");
          }
      
          xhr.open('GET', url);
          xhr.send();
    })


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
    constructor () {
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
list.fetchGoods()
        .then( goods => list.parseGoods(goods) )
        .then( () => list.render() )
        .catch( error => window.alert(error) );