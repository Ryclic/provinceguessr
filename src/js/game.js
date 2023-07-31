import {data as provinceList} from "./dishes.js";

let currentDish;

function getRandomDish(obj) {
    let keys = Object.keys(obj);
    let randomIndex = Math.floor(Math.random() * keys.length);
    let province = keys[randomIndex];
    let dish = obj[province][Math.floor(Math.random() * Object.keys(obj[province]).length)];
    return { province, dish };
}

export function newRound() {    
    currentDish = getRandomDish(provinceList);
    console.log(currentDish);
}

export function evaluateAnswer(answer) {
    if(answer == currentDish.province) {
        console.log("correct");
    }
    else{
        console.log("incorrect");
    }
}