function speak(text) {
    alert(text);
    let utter = new SpeechSynthesisUtterance (text);
    window.speechSynthesis.speak(utter);
}



function SpawnMoose () {
    class Moose {
        constructor () {
            let Screen = document.querySelector("#Screen");
            this.ele = document.createElement("img");
            this.ele.src = "Moose.png";
            this.ele.className = "Moose";
            Screen.append(this.ele);
            this.x = Math.random() * 100;
            this.y = Math.random() * 100; 
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

    let MooseArray = [new Moose()];
    //MooseArray.push(new Moose());
}

function appear (index) {
    let mains = document.querySelectorAll("main");
    mains[0].classList.remove("appear");
    mains[1].classList.remove("appear");
    mains[index].classList.add("appear");
}