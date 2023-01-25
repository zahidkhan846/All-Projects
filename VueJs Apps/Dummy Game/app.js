const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      opponentHealth: 100,
      currRound: 0,
      winner: null,
      logs: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.opponentHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "oppo";
      }
    },

    opponentHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    oppoHealthBar() {
      if (this.opponentHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.opponentHealth + "%" };
    },

    playerHealthBar() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },

    specialAtackCounter() {
      return this.currRound % 3 !== 0;
    },

    healCounter() {
      return this.playerHealth === 100;
    },

    healthCheck() {
      if (
        this.playerHealth <= 0 ||
        this.opponentHealth <= 0 ||
        this.winner === "oppo"
      ) {
        return true;
      }
    },
  },
  methods: {
    attackOppo() {
      this.currRound++;
      const attackValue = getRandomNumber(12, 5);
      this.opponentHealth = this.opponentHealth - attackValue;
      this.addLogger("player", "attack", attackValue);
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomNumber(15, 8);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLogger("oppo", "attack", attackValue);
    },

    attackSpecial() {
      this.currRound++;

      const attackValue = getRandomNumber(25, 10);
      this.opponentHealth = this.opponentHealth - attackValue;
      this.addLogger("player", "attack", attackValue);

      this.attackPlayer();
    },

    healing() {
      this.currRound++;

      const healValue = getRandomNumber(20, 8);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.addLogger("player", "heal", healValue);

      this.attackPlayer();
    },

    startGame() {
      this.playerHealth = 100;
      this.opponentHealth = 100;
      this.currRound = 0;
      this.winner = null;
      this.logs = [];
    },

    surrender() {
      this.winner = "oppo";
    },

    addLogger(arg1, arg2, arg3) {
      this.logs.unshift({
        actionBy: arg1,
        actionType: arg2,
        actionValue: arg3,
      });
    },
  },
});

app.mount("#game");
