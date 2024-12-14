const gamebord = document.getElementById("gamebord");
const ctx = gamebord.getContext("2d");
const scoretext = document.getElementById('scoreval')

let Width = gamebord.width;
let Hidth = gamebord.height;
let foodx;
let foody;
const unit = 25
xval =25;
yval =0;
let score = 0;
let snake =[
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0}
]
window.addEventListener('keydown',keypress)
startgame();
function startgame(){
    ctx.fillStyle = "#212121";
    ctx.fillRect(0,0,Width,Hidth);
    snackfood()
    drowsnake()
    nexttick()
}
function clearbord(){
    ctx.fillStyle = "#212121";
    ctx.fillRect(0,0,Width,Hidth);
}

function snackfood(){
      foodx = Math.floor(Math.random()*Width/unit)*unit;
      foody = Math.floor(Math.random()*Width/unit)*unit;     
}

function displayfood(){
    ctx.fillStyle = "red"
    ctx.fillRect(foodx,foody,unit,unit)
}

function drowsnake(){
    ctx.fillStyle = "aqua";
    ctx.strokeStyle = "#212121";
    for(let i=0; i<snake.length; i++){
        ctx.fillRect(snake[i].x,snake[i].y,unit,unit)
        ctx.strokeRect(snake[i].x,snake[i].y,unit,unit)
    }
}
function movesnake(){
    const head = {x:snake[0].x+xval,y:snake[0].y+yval}
    snake.unshift(head)
    if(snake[0].x==foodx && snake[0].y==foody){
        score += 1
        snackfood()
        scoretext.innerHTML = score;
    }else{
        snake.pop()
    }
    
}
function nexttick(){
    setTimeout(()=>{
        clearbord()
        displayfood()
        movesnake()
        drowsnake()
        nexttick()
    },50)
}

function keypress(event){
    const left = 37
    const right = 39
    const up = 38
    const down = 40

    switch(true){
        case(event.keyCode==left && xval!=unit):
            xval=-unit;
            yval=0 
            break;
        case(event.keyCode==right && xval!=-unit):
            xval=unit
            yval=0
            break;
        case(event.keyCode==up && yval!=unit):
            xval=0
            yval=-unit
            break;
        case(event.keyCode==down && yval != -unit):
            xval=0
            yval=unit
            break;

            
    }
    
}