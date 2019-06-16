const goods = [
    {title: "Shirt", price: 150, image: "img/placeholder.png" },
    {title: "Socks", price: 50, image: "img/placeholder.png" },
    {title: "Jacket", price: 350, image: "img/placeholder.png" },
    {title: "Shoes", price: 250, image: "img/placeholder.png" },
];

const renderGoodsItem = (item) => {
    return `<div class="goods-item"><img src='${item.image}' alt='${item.title}'/><h3>${item.title}</h3><p>${item.price}</p></div>`
}

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join(" ");
}

renderGoodsList(goods);
