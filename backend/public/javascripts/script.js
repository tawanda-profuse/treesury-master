const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav');
var addNew = document.getElementById("#add-new");
var categorySelector = document.getElementById("#category-selector");
var categoryInput = document.querySelector(".form-item select option:last-child");

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});