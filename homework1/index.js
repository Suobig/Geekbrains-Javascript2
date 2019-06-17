const placeHolderImage = "img/placeholder.png";

const goods = [
    { title: "Shirt", price: 150 },
    { title: "Socks", price: 50 },
    { title: "Jacket", price: 350 },
    { title: "Shoes", price: 250 },
];

const renderGoodsItem = (title= "<No Title>", price = 0, image = placeHolderImage) =>
    `<div class="goods-item">
        <img src='${image}' alt='${title}'/>
        <h3>${title}</h3>
        <p>${price}</p>
        <button class="button-item-add">Добавить</button>
    </div>`

const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.image));
    document.querySelector('.goods-list').innerHTML = goodsList.join();
}

renderGoodsList(goods);
