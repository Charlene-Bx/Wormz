const canva = document.querySelector("#game-zone")
const context = canvas.getContext('2d')

let params = {
  start : 'false',
  delay : 200,
  grid : 20,
}

const worm = {
  //datas:
  head : {
    width : params.grid,
    height : params.grid,
  },

  body: [],

  lenght: 4,

  position : {
    x: canva.width/2,
    y: canva.height/2,
  },

  deplacement: {
    x: 0,
    Y: 0,
  },

  // functions:
  display: function() {
    context.clearRect( 0, 0, canva.width, canva.height )
    context.fillStyle="red"

    for( let index of this.body ) {
      context.fillRect(index.x, index.y, this.head.width - 2, this.head.height - 2)
    }
  },

  move: function() {
    this.position.x += this.deplacement.x * this.head.width
    this.position.y += this.deplacement.y * this.head.height

    const coordinates = {
      x : this.position.x,
      y : this.position.y,
    }

    this.body.push( coordinates )

    while ( this.body.lenght > this.lenght ){
      this.body.shift()
    }
  },

  grow: function() {
    this.lenght++
  }
}

const apple = {
  ray: grid/2,

  position : {
    x: ( Math.floor( Math.random() * (canvas.width/grid) ) * grid ),
    y: ( Math.floor( Math.random() * (canvas.height/grid) ) * grid ),
  },

  display: function() {
    context.beginPath()
    context.arc( this.position.x + this.ray, this.position.y + this.ray, this.ray, 0, Math.PI * 2 )
    context.fillStyle = "green"
    context.fill()
    context.closePath()
  }

  initialise: function() {
    this.position.x
  }
}