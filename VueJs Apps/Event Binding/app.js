const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "Vue Js",
    };
  },
  methods: {
    inc() {
      this.counter++;
    },
    dec() {
      this.counter--;
    },
    setName(e) {
      this.name = e.target.value;
    },
  },
});

app.mount("#events");
