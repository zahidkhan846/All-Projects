Vue.createApp({
  data() {
    return {
      user: {
        name: "Zahid",
        age: 28,
        imageUrl: "https://picsum.photos/200",
      },
    };
  },
  methods: {
    newAge(arg) {
      return this.user.age + arg;
    },
    fevNumber() {
      return Math.random();
    },
  },
}).mount("#assignment");
