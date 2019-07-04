Vue.component('v-hobbit', {
  props: ['name'],
  template: `<p>Hello, I'm a hobbit! My name is {{ name }}`
})

const app = new Vue({
  el: '#app',
  data: {
      mainHero: "Frodo Baggins",
      supportHero: "Sam Gamgee",
  }
})