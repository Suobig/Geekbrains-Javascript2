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

    //В последующем - асинхронный запрос на удаленный сервер
    fetchGoods() {
        this.goods = [
            { title: "Shirt", price: 150 },
            { title: "Socks", price: 50 },
            { title: "Jacket", price: 350 },
            { title: "Shoes", price: 250 },
        ]
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
list.fetchGoods();
list.render();