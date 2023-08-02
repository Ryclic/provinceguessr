import {data as provinceList} from "./dishes.js";

let currentDish = "";
const dishImg = document.getElementById("dish");
const nextRound = document.getElementById("nextRound");
const prompt = document.querySelector(".gameScreen > #left > #prompt");
const submitButton = document.getElementById("submitButton");
const resultScreen = document.getElementById("resultScreen");
const dishDetails = document.getElementById("dishDetails")
// Next round button
nextRound.addEventListener("click", () => {
    // Reset everything
    resultScreen.style.visibility = "hidden";
    prompt.style = "";
    prompt.classList.remove("fade");
    prompt.classList.remove("reveal");
    prompt.innerHTML = "Where is this dish from?";
    submitButton.removeAttribute("disabled");
    // Trigger a new round
    newRound();
})

function getRandomDish(obj) {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const province = keys[randomIndex];
    const dish = obj[province][Math.floor(Math.random() * Object.keys(obj[province]).length)];
    return { province, dish };
}

export function newRound() {
    // Make sure next round isn't a repeat
    currentDish = getRandomDish(provinceList);
    while(dishImg.src.includes(window.location.href + "/assets/game/" + currentDish.dish.image)){
        currentDish = getRandomDish(provinceList);
    }
    dishImg.src = window.location.href + "/assets/game/" + currentDish.dish.image;
    console.log(currentDish);
}

export function evaluateAnswer(answer) {
    // Logic to evaluate and show result
    if(answer == currentDish.province) {
        prompt.classList.add("fade");
        setTimeout(function(){
            prompt.classList.add("reveal");
        }, 250)
        prompt.innerHTML = "Correct!";
        prompt.style.color = "#32CD32"
    }
    else {
        prompt.innerHTML = "Not quite..."
        prompt.style.color = "#FF4040";
    }
    // Disable submitting again
    submitButton.setAttribute("disabled", true);
    // Show explanation and info about dish
    dishDetails.innerHTML = currentDish.dish.description;
    resultScreen.style.visibility = "visible";
    // Show next round button
    nextRound.style.visibility = "visible";
}