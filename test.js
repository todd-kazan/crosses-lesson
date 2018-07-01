jasmine.getEnv().randomizeTests(false)

describe("Vue корректно инициализирован", function() {
  it("есть переменная app", function() {
    expect(app).toBeDefined()
  })

  it("переменная app - это приложение Vue", function() {
    expect(app instanceof Vue).toBeTruthy()
  })

  it("на странице есть элемент #app", function() {
    expect(document.body.children).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({
          id: 'app'
        })
      ])
    )
  })

  it("приложение смонтировано на элемент #app", function() {
    expect(app.$options).toEqual(jasmine.objectContaining({
      el: '#app'
    }))
  })
})

xdescribe("крестики нолики имеют корректную физику", function() {
  it("есть поле winner (победитель) и метод start (начать) его сбрасывает", function() {
    expect(app.$options.methods.start).toBeDefined()
    expect(app.winner).toBeDefined()
  })

  it("метод start корректно сбрасывает поле", function() {
    app.start()
    expect(app.crosses).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
    expect(app.player).toEqual(1)
    expect(app.turn).toEqual(0)
  })

  it("есть свойства player (игрок), turn (ход)", function() {
    expect(app.player).toBeDefined()
    expect(app.turn).toBeDefined()
  })

  it("метод start корректно сбрасывает игрока и время (ход)", function() {
    app.start()
    expect(app.player).toEqual(1)
    expect(app.turn).toEqual(0)
  })

  it("есть метод clk (нажатие на клетку поля)", function() {
    expect(app.$options.methods.clk).toBeDefined()
  })

  it("при нажатии на пустую клетку там проставляется крестик, увеличивается ход", function() {
    app.start()
    app.clk(1, 1)
    expect(app.crosses[1][1]).toEqual(1)
    expect(app.turn).toEqual(1)
  })

  it("при нажатии на непустую клетку ничего не происходит, ход не увеличивается", function() {
    app.start()
    app.clk(1, 1)
    app.clk(1, 1)
    expect(app.crosses[1][1]).toEqual(1)
    expect(app.turn).toEqual(1)
  })

  it("после крестика ставится нолик, ход увеличивается", function() {
    app.start()
    app.clk(1, 1)
    app.clk(0, 2)
    expect(app.crosses[0][2]).toEqual(-1)
    expect(app.turn).toEqual(2)
  })

  it("игра завершается после 10-го хода", function() {
    app.start()
    app.clk(1, 1)
    app.clk(0, 2)
    app.clk(2, 2)
    app.clk(0, 0)
    app.clk(0, 1)
    app.clk(2, 1)
    app.clk(1, 2)
    app.clk(1, 0)
    app.clk(2, 0)
    app.clk(1, 1)
    expect(app.crosses).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
    expect(app.player).toEqual(1)
    expect(app.turn).toEqual(0)
  })
})

xdescribe("крестики нолики имеют правила и они соблюдаются", function() {
  it("есть поле winner (победитель) и метод start (начать) его сбрасывает", function() {
    expect(app.winner).toBeDefined()
    app.winner = 1
    app.start()
    expect(app.winner).toEqual(0)
  })

  it("можно победить по диагонали", function() {
    app.start()
    app.clk(1, 1)
    app.clk(0, 1)
    app.clk(0, 2)
    app.clk(1, 0)
    app.clk(2, 0)
    expect(app.winner).toEqual(1)
  })

  it("можно победить по горизонтали", function() {
    app.start()
    app.clk(1, 1)
    app.clk(0, 1)
    app.clk(1, 0)
    app.clk(0, 2)
    app.clk(1, 2)
    expect(app.winner).toEqual(1)
  })

  it("можно победить по вертикали", function() {
    app.start()
    app.clk(1, 1)
    app.clk(0, 2)
    app.clk(0, 1)
    app.clk(1, 2)
    app.clk(2, 1)
    expect(app.winner).toEqual(1)
  })

  it("могут победить нолики", function() {
    app.start()
    app.clk(0, 1)
    app.clk(1, 1)
    app.clk(0, 2)
    app.clk(0, 0)
    app.clk(1, 2)
    app.clk(2, 2)
    expect(app.winner).toEqual(-1)
  })

  it("игра завершается после победы", function() {
    app.start()
    app.clk(0, 1)
    app.clk(1, 1)
    app.clk(0, 2)
    app.clk(0, 0)
    app.clk(1, 2)
    app.clk(2, 2)
    app.clk(1, 1)
    expect(app.crosses).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
    expect(app.player).toEqual(1)
    expect(app.turn).toEqual(0)
  })
})
