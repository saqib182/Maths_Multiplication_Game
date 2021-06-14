// If we click the start/reset button:
var playing= false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = 
function(){
    
    if(playing ==true){
        location.reload();
    }
    else{
        score= 0;
        document.getElementById("scorevalue").innerHTML= score;
        show("timeleft");
        document.getElementById("startreset").innerHTML= "Reset Game";
        playing= true;
        //countdown
        timeremaining=60;
        document.getElementById("timeleftvalue").innerHTML = timeremaining;
        hide("gameover");
        startCountdown();
        generateQA();
    }
}


for (i=1; i<5; i++){
    document.getElementById("box"+ i).onclick= function(){
        if (playing== true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scorevalue").innerHTML = score;
    
                hide("incorrect");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                generateQA();
            }
            else{
                hide("correct");
                show("incorrect");
                setTimeout(function(){
                    hide("incorrect");
                }, 1000);
            }
        }
    }
}


//FUNCTIONS
//Start Counter
function startCountdown(){
    action= setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeleftvalue").innerHTML = timeremaining;
        if (timeremaining== 0){
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is: "+ score +"</p>";
            hide("timeleft");
            hide("correct");
            hide("incorrect");
            playing=false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

//Stop Counter
function stopCountdown(){
    clearInterval(action);
}
//Hide/Show
function hide(Id){
    document.getElementById(Id).style.display= "none";
}

function show(Id){
    document.getElementById(Id).style.display= "block";
}

//Generate Q&A
function generateQA(){
    var x= 1+Math.round(9*Math.random());
    var y= 1+Math.round(9*Math.random());
    correctAnswer= x*y;
    document.getElementById("question").innerHTML= x + " x " + y;
    var correctPosition= 1+Math.round(3*Math.random());
    document.getElementById("box"+ correctPosition).innerHTML= correctAnswer;

    var answers= [correctAnswer];
    
    for(i=1; i<5; i++){
        if (i != correctPosition){
            var wrongAnswer;
            do{
                var wrongAnswer= (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }while (answers.indexOf(wrongAnswer)>-1)
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }

    }
}
