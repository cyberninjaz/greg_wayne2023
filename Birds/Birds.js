let scoreN = 0;

// switch mains
function appear(index) {
    LMusic.pause();
    GameO.pause();
    Scream.pause();
    scoreN = 0;
    console.log("Score: "+scoreN);
    cross.style.top = 50 + "%";
    cross.style.left = 47 + "%";
    go.style.display="none";
    let mains = document.querySelectorAll("main");
    mains[0].classList.remove("appear");
    mains[1].classList.remove("appear");
    mains[2].classList.remove("appear");
    mains[3].classList.remove("appear");
    mains[4].classList.remove("appear");
    mains[index].classList.add("appear");

    let span = document.querySelector('#scoreN');
    scoreN = 0;
    span.innerText = scoreN;
}

// speech synthesis
function speak(text) {
    alert(text);
    let utter = new SpeechSynthesisUtterance (text);
    window.speechSynthesis.speak(utter);
}

// start the game
function startGame () {
    go.style.display="none";
    BDiv.style.display="none";
    moves.style.display="block";
    inst.style.display="none";
    let gameBoard = document.querySelector("#gameBoard");
    let GameO = document.querySelector("#GameO");
    GameO.pause();
    let LMusic = document.querySelector("#LMusic");
    LMusic.play();
    let span = document.querySelector('#scoreN');
    scoreN = 0;
    span.innerText = scoreN;
    let cross = document.querySelector("#cross");
    cross.style.top = 50 + "%";
    cross.style.left = 47 + "%";

    let swanX = 0;
    let swanY = 0;

    class SWAN {
        constructor() {
            this.ele = document.createElement("img");
            let bird = Math.round(Math.random());
            console.log(bird);
            if (bird == 0) {
                this.ele.src = "GSwan.jpg";
            } 
            else {
                this.ele.src = "GGoose.jpg";
            }
            this.ele.className = "swan";
            gameBoard.append(this.ele);
            this.x = Math.random() * 92.5;
            this.y = Math.random() * 87;
            this.hue = 1;
        }

        set x(value) {
            this._x = value;
            this.ele.style.left = value + "%";
        }

        set y(value) {
            this._y = value;
            this.ele.style.top = value + "%";
        }

        get x() {
            return this._x;
        }

        get y() {
            return this._y;
        }
    }

    class EXO {
        constructor() {
            this.ele = document.createElement("img");
            this.time = 0;
            this.ele.src = "GExo.png";
            this.ele.className = "GExo";
            this.ele.style.position = "absolute";
            this.ele.style.left = swanX-18 + '%';
            this.ele.style.top = swanY-28 + '%';
            gameBoard.append(this.ele);

            this._x = swanX;
            this._y = swanY;
        }
        
        set x(value) {
            this._x = value;
            this.ele.style.left = value + "%";
        }

        set y(value) {
            this._y = value;
            this.ele.style.top = value + "%";
        }

        get x() {
            return this._x;
        }

        get y() {
            return this._y;
        }
    }

    let swanArray = [new SWAN()];  // array containing 1 swan
    let stime = 0;
    let exoArray = [new EXO()];   // array containing 1 explosion

    let cx = 47;
    let cy = 50;
    let confirm = 0;

    // cross control
    document.addEventListener("keydown", function(event) {
        event.preventDefault();
        if (event.key === "ArrowUp") {
            cy=cy-6.4;
        }
        else if (event.key === "ArrowDown") {
            cy=cy+6.4;
        }
        else if (event.key === "ArrowLeft") {
            cx=cx-3.6;
        }
        else if (event.key === "ArrowRight") {
            cx=cx+3.6;
        }
        else if (event.key === "a") {
            confirm = 1;
        }

        cross.style.top = cy + "%";
        cross.style.left = cx + "%";

    });

    let Exp = document.querySelector("#Exp");

    // destroy swan 
    // add new explosion
    function destroy(swan) {
        Exp.play ();
        let span = document.querySelector('#scoreN');
        scoreN = scoreN + 1;
        span.innerText = scoreN;
        swan.ele.remove();
        i = swanArray.indexOf(swan);
        swanArray.splice(i,1);
        confirm = 0;
        swanX = swan._x;
        swanY = swan._y;
        exoArray.push(new EXO());
    }

    // remove explosions
    function destroyExo(exo) {
        exo.ele.remove();
        i = exoArray.indexOf(exo);
        exoArray.splice(i,1); 
    }

    // game over warining
    function warnScream () {
        let Scream = document.querySelector("#Scream");
        Scream.play();
    }

    // game over for death by bird
    function gameOver () {
        clearInterval(intId);
        for (swan of swanArray) {
            swan.ele.remove();
        }
        for (exo of exoArray) {
            exo.time = exo.time + 1;
            if (exo.time > 1) {
                console.log("destroy");
                destroyExo(exo);
            }
        }
        let go = document.querySelector("#go");
        go.style.display="block";
        BDiv.style.display="block";
        moves.style.display="none";
        inst.style.display="block";
        LMusic.pause();
        GameO.play ();
        cross.style.top = 50 + "%";
        cross.style.left = 47 + "%";
    }

    // game over for main switch
    gameOver2 = function () {
        clearInterval(intId);
        for (swan of swanArray) {
            swan.ele.remove();
        }
        for (exo of exoArray) {
            exo.time = exo.time + 1;
            if (exo.time > 1) {
                console.log("destroy");
                destroyExo(exo);
            }
        }
        LMusic.pause();
        BDiv.style.display="block";
        moves.style.display="none";
        inst.style.display="block";
        cross.style.top = 50 + "%";
        cross.style.left = 47 + "%";
    };

    let intId = setInterval(function() {
        // loop through each swan, and color them
        // game over warning
        // game over detection
        for (let swan of swanArray) {
            swan.hue = swan.hue + 5;
            swan.ele.style.filter="hue-rotate("+swan.hue+"deg)";
            if (swan.hue > 250) {
                warnScream();
            }
            if (swan.hue > 350) {
                gameOver();
            }
        }
        

        // spawn new swan every 10 ticks
        stime = stime + 1;
        if (stime === 13) {
            swanArray.push(new SWAN());
            stime = 0;
        }

        // collision detection
        for (swan of swanArray) {
            if (cx > swan.x + 8) {

            }
            else if (cy > swan.y + 15) {

            }
            else if (cx + 6 < swan.x) {

            }
            else if (cy + 15 < swan.y) {

            }
            else {
                if (confirm == 1) {
                    destroy(swan);
                }
            }
        }

        for (exo of exoArray) {
            exo.time = exo.time + 1;
            if (exo.time > 1) {
                console.log("destroy");
                destroyExo(exo);
            }
        }

    },100);
}