
let qustions =[] ; 

let answerchild =[];

let answercoorect = [] ; 


const TheTime = 5 ; 

tootalsuccsses1 = 0 ; 
tootalsuccsses2 = 0 ;

var state =1 ; 
usernames= [] ;


quiz= document.getElementById('quiz') ; 
quiz1= document.getElementById('quiz1') ;

btnstart = document.getElementById('btnstart') ;

overlaycontiner = document.getElementById('overlaycontainer'); 

//console.log(overlaycontiner.children[0]);

//console.log(overlaycontiner.children[1].children[3]);

qustion = [] ; 

paragraphs = [] ; 

spans = [] ; 

textqustions =[] ; 

overlays= [];

textoverlay=[];

answer = [];

randomNumber= [];


function GetQustions_FromAjax(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       xrxr = JSON.parse (this.responseText);
      // console.log(xrxr);
       xrxr.forEach(element =>{
        qustions.push([element.qustions ,element.true_answer]) ; 
        let temparr = [element.answer_1 ,element.answer_2,element.answer_3,element.answer_4]
        answerchild.push(temparr);
        //console.log("The Answer" + answerchild);
        answercoorect.push(element.true_answer) ;
       })
      }
    };
    xhttp.open("GET", "qf.json", true);
    xhttp.send(); 
}



function createQuestions(){

for( i= 0 ; i< qustions.length ; i++ ){
 
qustion [i] = document.createElement('div') ; 

paragraphs[i] =document.createElement('p') ;

spans[i] =document.createElement('span') ;

spans[i].appendChild(document.createTextNode('#' + (i+1)));

textqustions[i]=document.createTextNode(qustions[i][0] + '?');
console.log(qustions[i][0]);

paragraphs [i].appendChild(textqustions[i]);

qustion [i].setAttribute('class' ,'qustion');

qustion [i].appendChild(spans[i]);

qustion [i].appendChild(paragraphs [i]);

answer [i] = document.createElement('div') ; 

answer [i].setAttribute('class' ,'answer');

for( j= 0 ;j<4 ; j++){
   xxx = document.createElement('div') ; 
   yyy = document.createElement('input') ; 
   zzz = document.createElement('span') ; 
   yyy.setAttribute('type' , 'radio') ;
   yyy.setAttribute('name' , ('q'+i)) ;
   zzz.appendChild(document.createTextNode(answerchild[i][j]));
   xxx.appendChild(yyy) ; 
   xxx.appendChild(zzz); 
   answer[i].appendChild(xxx) ;
}

overlays[i] = document.createElement('div') ; 

answer[i].appendChild(overlays[i]) ;

}
}
//console.log(qustions.length) ; 
GetQustions_FromAjax();

setTimeout(() => {  
    createQuestions() ; 
    console.log(qustions.length); 
}, 2000);


function createRandomNumber(){
    x=Math.floor((Math.random()*qustions.length)); 
    return x; 
}



function showQustions() {

num = createRandomNumber(); 

while( randomNumber.includes(num)){
    num = createRandomNumber();    
}

console.log(num);
    randomNumber.push(num) ; 
    if(state === 1 )
    {
    quiz.appendChild(qustion [num]);
    quiz.appendChild(answer [num]);
    }
    else if(state === 2 ){
     quiz1.appendChild(qustion [num]);
     quiz1.appendChild(answer [num]);     
    }
    return num ; 
}


parentThisInput =[] ;

textoverlay= [];   

divoverlay =[] ; 


 spantime=document.getElementById('spantime');

 spanscor=document.getElementById('spanscor');

 mynamespan =document.getElementById('mynamespan');

 
 var m=0;

 function Timer(numberqustion ){
     
    r = m ;  //// because the setinterval not know 'm' ; 

    parentThisInput[m] = answer[numberqustion];

    textoverlay[m] = document.createTextNode('ok');

    divoverlay[m] =parentThisInput[m].lastChild;
   
       r=r-1;


        divoverlay[m].appendChild(textoverlay[m]); 
        
        divoverlay[m].setAttribute('class','overlay');


    ++m ;
 }


function choosethetrueanswer(numberqustion){


     allradio = document.querySelectorAll(".quiz .answer > div > input[type='radio']") ;    

     allradio.forEach((element ) => {

     element.onclick = function(){

        clikedanswer = element.nextSibling.textContent;

        if(String(answercoorect[numberqustion]).trim()=== String(clikedanswer).trim()){
           setTimeout(() => {

            if(state === 1 ) {
                tootalsuccsses1++
            } 
            else if(state === 2){
                tootalsuccsses2++ ;
            }   

           },  TheTime*1000);


        }

    }
   
});

}

///// start point ////////

btnstart.onclick=function(){

    user1 = document.getElementById('user1').value ;
    user2 = document.getElementById('user2').value ;  
    
    if(user1.trim() !== '' || user2.trim() !== ''){
    usernames.push(user1) ; 
    usernames.push(user2) ; 
    overlaycontiner.style.display = "none"; 
    run();
    }
    else{
        alert('لو سمحت قم بادخال اسماء المتسابقين ') ;
    }
};

numberToEnd = 1 ; 


time = TheTime ;

///// to start from 3 not 20 

if(numberToEnd===1){
    
    time=3;
}

////// base of the  app //// 

function run (){

if((time=== TheTime) || numberToEnd === 1){

yyyy = setInterval(()=> {

    if(Number(time) < 0){

        mynamespan.innerHTML = usernames[state-1] ;

        if(state === 1){

          spanscor.innerHTML=tootalsuccsses1 ;

        }
        else if(state === 2){
          spanscor.innerHTML=tootalsuccsses2 ;
        }

        ttt = showQustions() ;

        setTimeout(() => {
            Timer(ttt ) ; 
            numberToEnd++;   
        }, (TheTime *1000 ));
        
        

        eee = choosethetrueanswer(ttt);

        (state===1) ? state = 2 : state = 1 ;

        time=TheTime ; 

    }

    if(numberToEnd === qustions.length){
        
        setTimeout(() => {
           if(tootalsuccsses1 > tootalsuccsses2){
            winuser = usernames[0]  ;
            wintotal = tootalsuccsses1 ;
           }
           else if (tootalsuccsses1 < tootalsuccsses2){
            winuser=usernames[1] ; 
            wintotal =tootalsuccsses2;
           }
           else if(tootalsuccsses1 === tootalsuccsses2) {
            winuser= usernames[0] +' , '+usernames[1] ;
            wintotal =tootalsuccsses2;  
           }
          state = 3 ;

           clearInterval(yyyy);

        },TheTime*1000);
      //  clearInterval(yyyy);
    }

    spantime.innerHTML=time;

    time -- ; 

    

    },(1000));
}
}
/// use to show the final screen that content the userwin and the total 
finshed = setInterval(() => {

    if(state === 3 ){
        overlaycontiner.children[1].children[1].innerHTML =winuser; 
    
        overlaycontiner.children[1].children[3].innerHTML =wintotal;
        
        overlaycontiner.style.display = "block";
    
        overlaycontiner.children[0].setAttribute('class' , 'nactive') ; 
    
        overlaycontiner.children[1].setAttribute('class' , 'active') ;
        clearInterval(finshed);
    }    
}, 1000);


    
 


 