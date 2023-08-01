import {data as provinceList} from "./dishes.js";

let currentDish = "";
const dishImg = document.getElementById("dish");
const nextRound = document.getElementById("nextRound");

// Next round button
nextRound.addEventListener("click", () => {
    // Add logic to reset everything here
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
    currentDish = getRandomDish(provinceList);
    dishImg.src = "/src/assets/game/" + currentDish.dish.image;
    console.log(currentDish);
}

export function evaluateAnswer(answer) {
    // Logic to evaluate and show result
    const prompt = document.querySelector(".gameScreen > #left > #prompt");
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
    // Show explanation and info about dish

    // Show next round button
    nextRound.style.visibility = "visible";
}