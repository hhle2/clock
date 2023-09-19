let break_length = document.getElementById("break-length");
let session_length = document.getElementById("session-length");
let a = Number(break_length.innerHTML);
let b = Number(session_length.innerHTML);

let start_stop = document.getElementById("start_stop");
let displayTime = document.getElementById("time-left");
let session_break = document.getElementById("timer-label");
let beep = document.getElementById("beep");
let countdown;

const countdownInterval = function() {
    let [minutes, seconds] = displayTime.textContent.split(":").map(Number);
    countdown = setInterval(function () {
        
        
        if (minutes === 0 && seconds === 0) {
            
            if (session_break.textContent === "Session") {
                
             
                    
                session_break.textContent = "Break";
                minutes = a;
                seconds = 0;
                displayTime.textContent = padNumber(minutes) + ":" + padNumber(seconds);
                
                beep.play();

                setTimeout(() => {
                    beep.pause();
                    beep.currentTime = 0;
                }, 4000);
                
            } 
            else {
              
                
                   
                session_break.textContent = "Session";
                minutes = b;
                seconds = 0;
                displayTime.textContent = padNumber(minutes) + ":" + padNumber(seconds);
            
                beep.play();
                setTimeout(() => {
                    beep.pause();
                    beep.currentTime = 0;
                }, 4000);
            }
        } 
        else if (seconds === 0) {
          minutes -= 1;
          seconds = 59;
          if(minutes === 0 && seconds === 59) {
            session_break.style.color = "red";
            displayTime.style.color = "red";
          }
          else {
            session_break.style.color = "black";
            displayTime.style.color = "black";
          }
        }
        
        else {
            
          seconds -= 1;
         
        }
    
        displayTime.textContent = padNumber(minutes) + ":" + padNumber(seconds);
    }, 1000);

}

function padNumber(number) {
    return number < 10 ? '0' + number.toString() : number.toString();
}


function pauseCountdown() {
    clearInterval(countdown);
}

function resumeCountdown() {
   
        countdownInterval(); 
    
}

const pause_resume = function () {
    if(start_stop.innerHTML === "Start") {
        start_stop.innerHTML = "Stop";
        document.querySelector("#start > i").className = "fa-solid fa-pause";
        resumeCountdown();

    }
    else if(start_stop.innerHTML === "Stop") {
        start_stop.innerHTML = "Start";
        document.querySelector("#start > i").className = "fa-solid fa-play";
        pauseCountdown();
    }
}

const numberReset = function () {
    a = 5;
    b = 25;
    clearInterval(countdown);
    break_length.innerHTML = a.toString();
    session_length.innerHTML = b.toString();
    displayTime.innerHTML = padNumber(b) + ":" + padNumber(0);
    session_break.innerHTML = "Session";
    start_stop.innerHTML = "Start";
    document.querySelector("#start > i").className = "fa-solid fa-play";
    session_break.style.color = "indigo";
    beep.pause();
    beep.currentTime = 0;
}

const increment = function (number) {
    if(number.toString() === "1" && start_stop.innerHTML === "Start") {
        if (a < 60) {
            a += 1;
            break_length.innerHTML = a.toString();
            if(session_break.innerHTML === "Break") {
                displayTime.innerHTML = padNumber(a) + ":" + padNumber(0);
            }
        }
    }
    else if(number.toString() === "2" && start_stop.innerHTML === "Start") {

        if (b < 60) {
            b += 1;
            session_length.innerHTML = b.toString();
            if(session_break.innerHTML === "Session") {
                displayTime.innerHTML = padNumber(b) + ":" + padNumber(0);
            }
        }
    }
}

const decrement = function (number) {

    if(number.toString() === "1" && start_stop.innerHTML === "Start") {
        if (a > 1) {
            a -= 1;
            break_length.innerHTML = a.toString();
            if(session_break.innerHTML === "Break") {
                displayTime.innerHTML = padNumber(a) + ":" + padNumber(0);
            }

        }
    }
    else if(number.toString() === "2" && start_stop.innerHTML === "Start") {
        if (b > 1) {
            b -= 1;
            session_length.innerHTML = b.toString();
            if(session_break.innerHTML === "Session") {
                displayTime.innerHTML = padNumber(b) + ":" + padNumber(0);
            }
        }
    }
}



