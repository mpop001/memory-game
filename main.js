const localnames= localStorage.getItem('Names');
const localtimes=localStorage.getItem('Times');
const localtries=localStorage.getItem('Tries');
const arrayname = JSON.parse(localnames),
        arraytime = JSON.parse(localtimes),
        arraytries = JSON.parse(localtries);
var names,times,tries;
if(arrayname !==null ){
for(var i=1; i<=arrayname.length ; i++){
    var myliPlayer=document.createElement("li")
    document.querySelector(".scoure-container ul#Players").appendChild(myliPlayer);
    myliPlayer.textContent = i;
   
}
for(var i=0; i<arrayname.length ; i++){

    var myliname=document.createElement("li");
    document.querySelector(".scoure-container ul#Names").appendChild(myliname);
    myliname.textContent = arrayname[i];
   
}
for(var i=0; i<arraytime.length ; i++){

    var mylitime=document.createElement("li");
    document.querySelector(".scoure-container ul#Times").appendChild(mylitime);
    mylitime.textContent = arraytime[i];
   
}
for(var i=0; i<arraytries.length ; i++){

    var mylitrie=document.createElement("li");
    document.querySelector(".scoure-container ul#Tries").appendChild(mylitrie);
    mylitrie.textContent = arraytries[i];
   
}
}

var thetime = document.querySelector(".info-container .time span");

     
document.querySelector(".first-page .content span").onclick = function(){
    var yourname = prompt('what is your name ?');
    thetime.textContent = document.getElementById('level').value;
   
    if(yourname == null || yourname ==""){
        document.querySelector('.info-container .name span').textContent = "Unknown";
       

    }
    else{
        document.querySelector('.info-container .name span').textContent = yourname;
    }
   
    
    myCount = setInterval(function(){
        mytime();
    },1000);
    document.querySelector('.first-page').remove();

    

}
var duration = 500;
var containerGame = document.querySelector(".memory-game-container");
var cardgame = Array.from(containerGame.children);
var orderRange = Array.from(cardgame.keys());
shuffle(orderRange);



cardgame.forEach((card,index)=>{
    card.style.order = orderRange[index];

    card.addEventListener('click',function(){
        rotate(card);
    })
    
})

function rotate(selected){
    selected.classList.add('is-rotate');
    var selectedcard = cardgame.filter(selected => selected.classList.contains('is-rotate'));
    
   
    if( selectedcard.length == 2){
       noClick();
       check(selectedcard[0],selectedcard[1]);
    }
    
}
   

//function shuffle
function shuffle(arry){
    var arrSize = arry.length,
    temp,
    random;
    while(arrSize > 0){
        random = Math.floor(Math.random()*arrSize);
        arrSize--;
        temp = arry[arrSize];
        arry[arrSize]=arry[random];
        arry[random]=temp;

    }
    return arry
}

function noClick(){
    containerGame.classList.add("no-clicking");
    setTimeout(()=>{
        containerGame.classList.remove("no-clicking");

    },duration)
}
function check(card1,card2){
    var treis = document.querySelector(".info-container .tries span");
    if(card1.dataset.thing== card2.dataset.thing){
        card1.classList.remove("is-rotate");
        card2.classList.remove("is-rotate");
        card1.classList.add("has-match");
        card2.classList.add('has-match');
        document.getElementById('success').play();
        done();
    
       

    }else{
        treis.textContent = parseInt(treis.textContent ) + 1;
        document.getElementById('wrong').play();
        setTimeout(()=>{

        card1.classList.remove("is-rotate");
        card2.classList.remove("is-rotate");
        
        },duration)
        
    }
}

function mytime(){
   if(thetime.textContent >0){
    thetime.textContent--;
   }else{
       clearInterval(myCount);
       document.querySelector(".lose").style.display = "block";
       document.getElementById("gameover").play()
       document.getElementById("button").onclick = function(){
        document.querySelector(".lose").style.display = "none";
           location.reload();
       }
    
   }
}
function done(){
    var allcard = cardgame.filter(allselected=> allselected.classList.contains("has-match"));
        if(allcard.length == 20){
            clearInterval(myCount);
            document.getElementById('win-name').textContent = document.querySelector('.info-container .name span').textContent ;
            document.getElementById('win-time').textContent = document.querySelector('.info-container .time span').textContent;
            document.getElementById('win-tries').textContent =  document.querySelector('.info-container .tries span').textContent;
            document.querySelector(".win").style.display = "block";
            document.getElementById("youwin").play()
            if(localnames === null){
                names=[];
            }else{
                names=JSON.parse(localnames);
            }
            names.push(document.getElementById('win-name').textContent)
            localStorage.setItem('Names',JSON.stringify(names));

            if(localtimes=== null){
                times=[];
            }else{
                times=JSON.parse(localtimes);
            }
            times.push(document.getElementById('win-time').textContent)
            localStorage.setItem('Times',JSON.stringify(times));

            if(localtries === null){
                tries=[];
            }else{
                tries=JSON.parse(localtries);
            }
            tries.push(document.getElementById('win-tries').textContent)
            localStorage.setItem('Tries',JSON.stringify(tries));

            document.getElementById("button-new").onclick = function(){
                document.querySelector(".win").style.display = "none";
                location.reload();
            }

        }
}



