const goods = [
    {title: "Shirt", price: 150, image: "img/placeholder.png" },
    {title: "Socks", price: 50, image: "img/placeholder.png" },
    {title: "Jacket", price: 350, image: "img/placeholder.png" },
    {title: "Shoes", price: 250, image: "img/placeholder.png" },
];

const renderGoodsItem = (title, price, image) =>
    `<div class="goods-item"><img src='${image}' alt='${title}'/><h3>${title}</h3><p>${price}</p></div>`

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.image));
    document.querySelector('.goods-list').innerHTML = goodsList.join();
}

renderGoodsList(goods);
