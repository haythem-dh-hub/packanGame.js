const canvas = document.querySelector('canvas');
const score = document.querySelector('#Score');

console.log(score)

const c = canvas.getContext('2d');

canvas.width = innerWidth ;
canvas.height = innerHeight;
// creat walls

let lastKey = '';
let vScore = 0 ; 


const Boundaries = [];
const pellets = [];

class Boundry {
    static width = 40
    static height = 40
    constructor({ position }) {
        this.position = position;
        this.width = 40;
        this.height = 40;

    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y,
            this.width, this.height)
    }
};

class Player {
    constructor ({position,velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, 
            Math.PI * 2 )
            c.fillStyle = 'yellow'
            c.fill()
            c.closePath() 
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pellet {
    constructor ({position,}){
        this.position = position
        this.radius = 3
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, 
            Math.PI * 2 )
            c.fillStyle = 'white'
            c.fill()
            c.closePath() 
    }
}
// create ghost class
class Ghost {
    constructor ({position,velocity, color = 'red'}){
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.color = color
        this.prevCollisions = []
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, 
            Math.PI * 2 )
            c.fillStyle = this.color
            c.fill()
            c.closePath() 
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
const ghosts = [
    new Ghost(
        {
            position:{
                x:Boundry.width * 6 + Boundry.width / 2,
                y:Boundry.height + Boundry.height / 2
            },
            velocity:{
                x:6,
                y:0
            }

            
        }
    )
];

// create pacman
const player = new Player({
    position : {
        x:Boundry.width + Boundry.width / 2,
        y:Boundry.height + Boundry.height / 2 
    },
    velocity : {
        x:0,
        y:0
    }

})

const keys = {
    z:{
        pressed: false
    }, 
    q:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    }
}


const map = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-','.','.','.','.','.','.','.','.','.','.','.','-'],
    ['-','.','-','-','.','-','-','-','.','-','-','.','-'],
    ['-','.','.','.','.','.','.','.','.','.','.','.','-'],
    ['-','.','-','-','.','-','-','.','-','-','-','.','-'],
    ['-','.','-','-','.','.','.','.','.','.','-','.','-'],
    ['-','.','-','-','.','-','-','.','-','-','-','.','-'],
    ['-','.','.','.','.','.','.','.','.','.','.','.','-'],
    ['-','.','-','-','.','-','-','.','-','-','-','.','-'],
    ['-','.','.','.','.','.','-','.','.','.','-','.','-'],
    ['-','.','-','-','.','.','-','.','-','.','-','.','-'],
    ['-','.','-','.','.','.','-','.','-','.','-','.','-'],
    ['-','.','-','.','.','.','-','.','-','.','-','.','-'],
    ['-','.','-','.','.','.','-','.','-','.','-','.','-'],
    ['-','.','-','-','.','-','-','.','-','.','-','.','-'],
    ['-','.','.','.','.','.','.','.','.','.','.','.','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-'],
]
map.forEach((row,i) =>{
    row.forEach((symbol,j) => {
        switch(symbol){
            case '-' :
            Boundaries.push(new Boundry({
                position:{ 
                x: Boundry.width * j,
                y: Boundry.height * i,
                }
                })
            )
                break
                case '.' :
                    pellets.push(new Pellet({
                        position:{ 
                        x: Boundry.width * j + Boundry.width / 2,
                        y: Boundry.height * i + Boundry.height / 2
                        }
                        })
                    )
                        break
        }

    })
})

function circleCollideWithRectangle (
    {circle, 
        rectangle}){
            return (
                circle.position.y - circle.radius + circle.velocity.y <=

                rectangle.position.y + rectangle.height && 
                circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x && 
                circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&            
                circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + Boundry.width
            )
}
// pacman animation
function animate() {
    requestAnimationFrame(animate)
    // see explain video in 52:30 (https://www.youtube.com/watch?v=5IMXpp3rohQ)
// keys handllink
    if(keys.z.pressed && lastKey === "z"){
        for(let i = 0; i < Boundaries.length; i++){
            const Boundry = Boundaries[i];
        if( circleCollideWithRectangle({
            circle:{...player, velocity:{
                x:0,
                y:-5
            } },
            rectangle:Boundry
        })){
            player.velocity.y = 0
            break;
        }else{
            player.velocity.y = -5
        }
    }
    }else if(keys.q.pressed && lastKey === "q"){
        for(let i = 0; i < Boundaries.length; i++){
            const Boundry = Boundaries[i];
        if( circleCollideWithRectangle({
            circle:{...player, velocity:{
                x: -5,
                y: 0
            } },
            rectangle:Boundry
        })){
            player.velocity.x = 0
            break;
        }else{
            player.velocity.x = -5
        }
    }
    }else if(keys.s.pressed && lastKey === "s"){
        for(let i = 0; i < Boundaries.length; i++){
            const Boundry = Boundaries[i];
        if( circleCollideWithRectangle({
            circle:{...player, velocity:{
                x:0,
                y:5
            } },
            rectangle:Boundry
        })){
            player.velocity.y = 0
            break;
        }else{
            player.velocity.y = 5
        }
    }
    }else if(keys.d.pressed && lastKey === "d"){
        for(let i = 0; i < Boundaries.length; i++){
            const Boundry = Boundaries[i];
        if( circleCollideWithRectangle({
            circle:{...player, velocity:{
                x: 5,
                y: 0
            } },
            rectangle:Boundry
        })){
            player.velocity.x = 0
            break;
        }else{
            player.velocity.x = 5
        }
    }
    }
// clear the movin off pacman
    c.clearRect(0,0,canvas.width,canvas.height )
// drowing caracters

// touch pellets
    pellets.forEach((pellet,i)=>{

        pellet.draw();
// touch pellets here
        if(Math.hypot(
            pellet.position.x - player.position.x,
            pellet.position.y - player.position.y,
        ) < pellet.radius + player.radius
    ){
        pellets.splice(i,1);
        vScore += 10;
        score.innerHTML = vScore
    }
    })
    

    Boundaries.forEach(Boundry =>{
        Boundry.draw()

        if( circleCollideWithRectangle({
            circle:player,
            rectangle:Boundry
        })
        ){
         
            player.velocity.x = 0
            player.velocity.y = 0 
        }
    })

    player.update()
    
    ghosts.forEach((ghost)=>{

        ghost.update();
        const collisions = []
        Boundaries.forEach(Boundry=>{

            if( !collisions.includes('right') && 
                 circleCollideWithRectangle({
                circle:{...ghost, velocity:{
                    x: 5,
                    y: 0
                } },
                rectangle:Boundry
            })){
                collisions.push('right')
            }
            if(!collisions.includes('left') &&
                 circleCollideWithRectangle({
                circle:{...ghost, velocity:{
                    x: -5,
                    y: 0
                } },
                rectangle:Boundry
            })){
                collisions.push('left')
            }
            if( !collisions.includes('up') &&
                 circleCollideWithRectangle({
                circle:{...ghost, velocity:{
                    x: 0,
                    y: -5
                } },
                rectangle:Boundry
            })){
                collisions.push('up')
            }
            if( !collisions.includes('down') &&
                circleCollideWithRectangle({
                circle:{...ghost, velocity:{
                    x: 0,
                    y: 5
                } },
                rectangle:Boundry
            })){
                collisions.push('down')
            }
  })
  if(collisions.length > ghost.prevCollisions.length){
  ghost.prevCollisions = collisions}
if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)){
    if(ghost.velocity.x > 0){
        ghost.prevCollisions.push('right')
    }else if(ghost.velocity.x < 0){
        ghost.prevCollisions.push('left')
    }else if(ghost.velocity.y < 0){
        ghost.prevCollisions.push('up')
    }else if(ghost.velocity.y > 0){
        ghost.prevCollisions.push('down')
    }
    const pathways = ghost.prevCollisions.filter(collision =>{
        return !collisions.includes(collision)
 
    })
    const direction = pathways[Math.floor(Math.random() * pathways.length) ]
    console.log({direction})
    switch(direction){
        case 'down':
            ghost.velocity.y = 5
            ghost.velocity.x = 0
            break
            case 'up':
            ghost.velocity.y = -5
            ghost.velocity.x = 0
            break
            case 'right':
            ghost.velocity.y = 0
            ghost.velocity.x = 5
            break
            case 'left':
            ghost.velocity.y = 0
            ghost.velocity.x = -5
            break
    }
    ghost.prevCollisions = []
}
  
})
   
  
}
animate()

// when you press on th key
addEventListener('keydown', ({key})=>{
    
    switch (key){
            case 'z' :
            keys.z.pressed = true;
            lastKey = 'z' 
            break;
            case 'q' :
            keys.q.pressed = true;
            lastKey = 'q'
            break ;
            case 's' :
            keys.s.pressed = true;
            lastKey = 's' 
            break;
            case 'd' :
            keys.d.pressed = true;
            lastKey = 'd' 
            break;

    }

    
})


// when you u stop pressing on th key
addEventListener('keyup', ({key})=>{
    
    switch (key){
            case 'z' :
            keys.z.pressed = false; 
            break;
            case 'q' :
            keys.q.pressed = false;
            break ;
            case 's' :
            keys.s.pressed = false; 
            break;
            case 'd' :
            keys.d.pressed = false ; 
            break;

    }
   
})