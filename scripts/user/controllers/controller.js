import User from "../models/model.js";
import { login } from "../services/service.js";

window.addEventListener("load",Event);

function Event() {
    document.querySelector(".btn").addEventListener("click",userinfo)
}

function userinfo() {
    let email = document.querySelector('.email').value; 
    let password = document.querySelector(".pwd").value;

    let user = new User(email,password);
    login(user);
    location.href = 'index.html';
}