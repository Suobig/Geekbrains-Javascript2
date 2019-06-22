const placeHolderImage = "img/placeholder.png";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


function makeGETRequest(url, callback) {
    var xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
      }
    }

    xhr.open('GET', url);
    xhr.send();
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

    //В последующем - асинхронный запрос на удаленный сервер
    fetchGoods(callback) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            const lst = JSON.parse(goods)
            this.goods = lst.map(good => {
                return new GoodsItem(good.product_name, good.price);
            })
            callback();
        })
    }

    render() {
        const listHtml = this.goods.reduce((acc, good) => {
            const goodsItem = new GoodsItem(good.title, good.price);
            return acc += goodsItem.render();
        }, '')        
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});