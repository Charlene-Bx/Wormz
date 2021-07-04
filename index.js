const buton = document.querySelector("#starter-buton")
const canvas = document.querySelector("#game-zone")
const context = canvas.getContext("2d")

// DEFINE THE STARTING PARAMETERS
const params = {
  start: false,
  speed: 500,
  grid: 20,
}

// DEFINE THE WORM AS AN OBJECT
const worm = {
  //datas:
  head: {
    width: params.grid,
    height: params.grid,
  },

  body: [],

  length: 4,

  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },

  deplacement: {
    x: 0,
    y: 0,
  },

  // ADD FUNCTION TO THE OBJECT WORM
  display: function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = "#678a00"

    for (let index of this.body) {
      context.fillRect(
        index.x,
        index.y,
        this.head.width - 2,
        this.head.height - 2
      )
    }
  },

  move: function () {
    this.position.x += this.deplacement.x * this.head.width
    this.position.y += this.deplacement.y * this.head.height

    const coordinates = {
      x: this.position.x,
      y: this.position.y,
    }

    this.body.push(coordinates)

    while (this.body.length > this.length) {
      this.body.shift()
    }
  },

  grow: function () {
    this.length++
  },
}

// DEFINE THE APPLE AS AN OBJECT
const apple = {
  ray: params.grid / 2,

  position: {
    x: Math.floor(Math.random() * (canvas.width / params.grid)) * params.grid,
    y: Math.floor(Math.random() * (canvas.height / params.grid)) * params.grid,
  },

  // ADD FUNCTIONS TO THIS OBJECT
  display: function () {
    context.beginPath()
    context.arc(
      this.position.x + this.ray,
      this.position.y + this.ray,
      this.ray,
      0,
      Math.PI * 2
    )
    context.fillStyle = "#e6241c"
    context.fill()
    context.closePath()
  },

  initialise: function () {
    this.position.x =
      Math.floor(Math.random() * (canvas.width / params.grid)) * params.grid
    this.position.y =
      Math.floor(Math.random() * (canvas.height / params.grid)) * params.grid
  },
}

const rules = {
  if_eat_apple: () => {
    if (
      worm.position.x === apple.position.x &&
      worm.position.y === apple.position.y
    ) {
      apple.initialise()
      worm.grow()

      params.speed >= 100 && (params.speed -= 5)
    }
  },

  if_touch_border: () => {
    if (
      worm.position.x + worm.head.width === canvas.width &&
      worm.deplacement.x === 1
    ) {
      return (worm.position.x = 0 - worm.head.width)
    }

    if (
      worm.position.y + worm.head.height === canvas.height &&
      worm.deplacement.y === 1
    ) {
      return (worm.position.y = 0 - worm.head.height)
    }

    if (worm.position.x === 0 && worm.deplacement.x === -1) {
      return (worm.position.x = canvas.width)
    }

    if (worm.position.y === 0 && worm.deplacement.y === -1) {
      return (worm.position.y = canvas.height)
    }
  },

  if_touch_himself: () => {},
}

//CREATE THE FUNCTION FOR RUN THE GAME
function play() {
  //HIDE THE STARTER BUTTON
  buton.classList.add("main__button--hide")
  //MAKE THE WORM
  worm.display()
  worm.move()
  //DISPLAY APPLE
  apple.display()
  //ADD RULES TO THE GAME
  rules.if_eat_apple()
  rules.if_touch_border()
  rules.if_touch_himself()
  //ANIME ALL THIS SHIT
  setTimeout(play, params.speed)
}

//CREATE A FUNCTION FOR RESTART THE GAME AT THE INITIAL STATE
function replay() {
  worm.length = 4
  worm.position.x = canvas.width / 2
  worm.position.y = canvas.height / 2
  worm.deplacement.x = 0
  worm.deplacement.y = 0
  worm.body = []
  apple.initialise()
  params.speed = 200
  !params.start && game()
}

//CREATE A FUNCTION FOR CONTROLLING
function control(keyboard) {
  switch (keyboard.key) {
    case "ArrowRight":
      if (worm.deplacement.x === -1) {
        break
      }
      worm.deplacement.x = 1
      worm.deplacement.y = 0
      break

    case "ArrowLeft":
      if (worm.deplacement.x === 1) {
        break
      }
      worm.deplacement.x = -1
      worm.deplacement.y = 0
      break

    case "ArrowUp":
      if (worm.deplacement.y === 1) {
        break
      }
      worm.deplacement.x = 0
      worm.deplacement.y = -1
      break

    case "ArrowDown":
      if (worm.deplacement.y === -1) {
        break
      }
      worm.deplacement.x = 0
      worm.deplacement.y = 1
      break

    case "Enter":
      replay()
      break

    case " ":
      worm.deplacement.x = 0
      worm.deplacement.y = 0
      break
  }
}

window.addEventListener("keydown", control)
