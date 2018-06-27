"use strict";

var app = new Vue({
  el: '#app',
  data: {
    crosses: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    out: ['○', ' ', '×'],
    player: 1,
    winner: 0,
    turn: 0,

  },
  methods: {
    start: function start() {
      this.crosses = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
      this.player = 1
      this.winner = 0
      this.turn = 0
    },
    clk: function clk(i, j) {
      if(!this.winner && this.turn < 9) {
        if(!this.crosses[i][j]) {
          this.$set(this.crosses[i], j, this.player)
          this.winner = this.check(this.crosses)

          if(this.winner) {
            this.turn = 0
          } else {
            this.player = 0 - this.player
            this.turn = this.turn + 1
          }
        }
      } else {
        this.start()
      }
    },
    check: function check(c) {
      var winner = 0

      if(c[1][1] !== 0 && c[1][1] === c[1][0] && c[1][0] === c[1][2]
         || c[1][1] !== 0 && c[1][1] === c[0][1] && c[0][1] === c[2][1]
         || c[1][1] !== 0 && c[1][1] === c[0][0] && c[0][0] === c[2][2]
         || c[1][1] !== 0 && c[1][1] === c[0][2] && c[0][2] === c[2][0]) {
        winner = c[1][1]
      }

      if(c[0][0] !== 0 && c[0][0] === c[0][1] && c[0][1] === c[0][2]
         || c[0][0] !== 0 && c[0][0] === c[1][0] && c[1][0] === c[2][0]) {
        winner = c[0][0]
      }

      if(c[2][2] !== 0 && c[2][2] === c[2][0] && c[2][0] === c[2][1]
         || c[2][2] !== 0 && c[2][2] === c[0][2] && c[0][2] === c[1][2]) {
        winner = c[2][2]
      }

      return winner
    }
  }
})
