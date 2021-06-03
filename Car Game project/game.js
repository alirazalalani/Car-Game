const score=document.querySelector('.score');
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');
// console.log(startScreen);

startScreen.addEventListener('click',start);

let keys={

    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,

}

const player={
    speed:5,
    score:0,

}
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    // console.log(e.key);
    keys[e.key]=true;
    // console.log(keys);
    
}
function keyUp(e)
{
    e.preventDefault();
    keys[e.key]=false;
    // console.log(keys);

}

function isCollide(a,b)
{
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();
    return !(aRect.bottom < bRect.top || (aRect.top > bRect.bottom)||
    (aRect.right < bRect.left)||(aRect.left > bRect.right));
}
function moveLines(){
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y>=770){
            item.y -=780; 
        }
item.y+=player.speed;
item.style.top=item.y+"px";

    }) ;  
}
function endGame(){
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML="GAME OVER <br> YOUR SCORE IS  "+player.score+" <br> PRESS HERE TO RESTART THE GAME";
}

    function moveEnemy(car){
        let enemy=document.querySelectorAll('.enemy');
        enemy.forEach(function(item){

            if(isCollide(car,item)){
                endGame();
            }
            if(item.y>=770){
                item.y =-300; 
                item.style.left=Math.floor(Math.random()*330)+ "px";
            }
    item.y+=player.speed;
    item.style.top=item.y+"px";
    
        })  ;  
    }

    

function gamePlay()
{
    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();
    // console.log(road);
    if(player.start)
    {
        moveLines();
        moveEnemy(car);
    if(keys.ArrowUp && player.y >(road.top +200))
    {
        player.y-=player.speed;
    } 
    if(keys.ArrowDown && player.y <(road.bottom-80))
    {
        player.y+=player.speed;
    }
    if(keys.ArrowRight && player.x< (road.width-95))
    {
        player.x+=player.speed;
    }
    if(keys.ArrowLeft && player.x>0)
    {
        player.x-=player.speed;
    }
    car.style.top=player.y + "px";
    car.style.left=player.x + "px";
    window.requestAnimationFrame(gamePlay);
    // console.log(player.score++);
    player.score++;
    let ps=player.score-1;
    score.innerHTML="Score is: "+ps;
}
}
function start(){
    score.classList.remove('hide');
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML="";
    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);
    
    for(x=0;x<5;x++)
    {
    let roadLine=document.createElement('div');
    roadLine.setAttribute('class','lines');
    roadLine.y=(x*150);
    roadLine.style.top=roadLine.y+"px";
    gameArea.append(roadLine);
    }

    let car=document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText="hey i am ur car";
    gameArea.appendChild(car);

    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    for(x=0;x<3;x++)
    {
    let enemyCar=document.createElement('div');
    enemyCar.setAttribute('class','enemy');
    enemyCar.y=((x+1)*350)*-1;
    enemyCar.style.backgroundColor=randomColor();
    enemyCar.style.left=Math.floor(Math.random()*350)+"px";
    enemyCar.style.top=enemyCar.y+"px";
    gameArea.append(enemyCar);
    }
}


function randomColor()
{
    function c(){
        let hex=Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();

}
