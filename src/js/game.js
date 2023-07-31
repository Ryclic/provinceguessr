import {data as provinceList} from "./dishes.js";

function getRandom(obj) {
    let keys = Object.keys(obj);
    let randomIndex = Math.floor(Math.random() * keys.length);
    let province = keys[randomIndex];
    let dish = obj[province][Math.floor(Math.random() * Object.keys(obj[province]).length)];
    return { province, dish };
}

export function newRound() {    
    console.log(getRandom(provinceList));
}

export function evaluateAnswer(answer) {
    console.log(answer);
}