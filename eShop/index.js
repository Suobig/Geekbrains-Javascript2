const placeHolderImage = "img/placeholder.png";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: "#app",
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isCartShown: false,
    },
    methods: {
        makeGETRequest(url) {
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
                        resolve(JSON.parse(xhr.responseText));
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
        },
        filter() {        
            const regex = new RegExp(this.searchLine, 'gmi');            
            this.filteredGoods = this.goods.filter(good => {
                return regex.test(good.product_name);
            });
        },
        prepareGoods() {
            this.goods.forEach(item => {
                if (!item.image) {
                    item.image = placeHolderImage;
                }
            })
        },
        toggleCart() {
            this.isCartShown = !this.isCartShown;
        }
    }, 
    async mounted() {
        const goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
        this.goods = goods;
        this.prepareGoods();
        this.filteredGoods = goods;
    }
})
