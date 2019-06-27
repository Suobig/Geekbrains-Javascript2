const app = new Vue({
  el: "#app",
  data: {
    name: "Geek",
    names: [
      'Frodo',
      'Sam',
      'Meriadoc',
      'Peregrin',
    ]
  }, 
  methods: {
    clickHandler() {
      console.log("click");
      
    }
  }, 
  computed: {
    upperCaseName() {
      return this.name.toUpperCase();
    }
  },
  mounted() {
    console.log('init');
    
  }
});