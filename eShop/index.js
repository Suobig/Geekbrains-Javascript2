const placeHolderImage = "img/placeholder.png";
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: "#app",
    data: {
        goods: [],
        searchLine: '',
        currentSearch: new RegExp('', 'i'),
        isCartShown: false,
        isLoading: true, 
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
        prepareGoods() {
            this.goods.forEach(item => {
                if (!item.image) {
                    item.image = placeHolderImage;
                }
            })
        },
        filterGoods() {
            this.currentSearch = new RegExp(this.searchLine, 'i');

        },
        toggleCart() {
            this.isCartShown = !this.isCartShown;
        },

        finishLoading(timeStart) {
            const minTime = 500;
            const timeLeft = minTime - Date.now() + timeStart;
            
            if (timeLeft > 0) {
                setTimeout(() => {
                    this.isLoading = false;
                }, timeLeft); 
            } else {
                this.isLoading = false;
            }
        }
    }, 
    async mounted() {
        const timeStart = Date.now();

        const goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
        this.goods = goods;
        this.prepareGoods();        
        this.finishLoading(timeStart);
    }, 
    computed: {
        throttleFilter() {
            return _.throttle(this.filterGoods, 300, { 'leading': false });
        },
        filteredGoods() {
            if (!this.goods || !Array.isArray(this.goods)) return [];
            return this.goods.filter(good => {                
                return this.currentSearch.test(good.product_name);
            });
        },
        hasFilteredGoods() {
            return this.filteredGoods.length !== 0;
        }
    }
})
