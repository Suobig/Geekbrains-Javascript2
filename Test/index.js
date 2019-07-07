
Vue.component("log-button", {
    data: () => ({
      message: "I was clicked",
      timesClicked: 0
    }),
    computed: {
      returnMessage() {
        return `${this.message} ${this.timesClicked} times`;
      }
    },
    template: `
      <button @click="timesClicked+=1; $emit('clickevent', {'message': message, 'number': timesClicked})">Click Me</button>
    `
})


app = new Vue({
  el: "#app",
  methods: {
    logMessage(result) {
      console.log(`${result.message} ${result.number} times`);
      
    }
  },
  computed: {
    logWrapper() {
      // return this.logMessage;
      setTimeout(function() {
        return this.logMessage;
      }, 1000);
    }
  }
})