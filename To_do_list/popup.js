
/* =================================
	Name Settings
================================= */

var userName = localStorage.getItem('receivedName');

if (localStorage.getItem('receivedName') == null){
    userName= "friend";
}

function saveName(){
    localStorage.setItem('receivedName',userName);
}

function changeName(){
    var inputName = document.getElementById("name-input").value;

    if(inputName === "" ){
        alert("이름을 입력하여주세요!");
    }else{
        userName=inputName;
        document.getElementById('name').innerHTML=userName;
    }
    saveName();

    document.getElementById("name-input").value="";
}

document.getElementById('name-input-form').addEventListener('submit',function (e){
    e.preventDefault()
    changeName();
})

function getName(){ //다시시작했어도 로컬에 있는 이름을 바로 가져와서 창에 띄울 수 있게끔!
    console.log(userName);
    userName = localStorage.getItem('receivedName');
}
getName();



/* =================================
	Theme Settings
================================= */

var userTheme = localStorage.getItem('receivedTheme');

if (localStorage.getItem('receivedTheme') == null) {
    userTheme = "yellowTheme";
}

function saveTheme() {
    localStorage.setItem('receivedTheme', userTheme);
}

function changeTheme() {
    var formElement = document.getElementById("select-theme");
    let data = new FormData(formElement);

    let newTheme = data.get("theme");

    if (newTheme != null) {
        userTheme = newTheme;
        saveTheme();
    }

    document.body.className = userTheme;
    setBackground();
}

let selectedThemeInput = document.querySelector(`[value='${userTheme}']`);
if (selectedThemeInput) {
    selectedThemeInput.checked = true;
}

changeTheme()

document.getElementById("select-theme").addEventListener('change', function() {
    changeTheme();
});

/* =================================
	Custom URL Background
================================= */

var customURL = localStorage.getItem('receivedURL');

document.getElementById("url-input").value = customURL;

function setBackground() {
    if (customURL == "" || customURL == null) {
        document.getElementById("html").style.backgroundImage = "url(img/" + userTheme + ".jpg)";
        document.getElementById("resetBtn").className = "nameBtn resetBtn";
    } else {
        document.getElementById("html").style.backgroundImage = "url(" + customURL + ")";
        document.getElementById("resetBtn").className += " visible";
    }
}

setBackground();

function saveBackground() {
    localStorage.setItem('receivedURL', customURL);
}

function customBackground() {
    customURL = document.getElementById("url-input").value;

    setBackground();

    saveBackground();
}

document.getElementById("background-image-url").addEventListener('submit', function() {
    customBackground();
});

/* =================================
	Reset Button Settings
================================= */

document.getElementById("resetBtn").addEventListener('click', function() {
    document.getElementById("url-input").value = "";
    customBackground();
});


/* =================================
	Open Settings Menu
================================= */

function openSettings() {
    document.getElementById("settings-wheel").classList.toggle("settings-open");
    document.getElementById("settings").classList.toggle("settings-open");
}

document.getElementById("settings-wheel").addEventListener('click', function() {
    openSettings();
})

/* =================================
	Time
================================= */

function getTime() {
    var date = new Date();

    var hour = date.getHours();

    var amPM

    if (hour < 12) {
        amPM = "AM"
    } else if (hour >= 12) {
        amPM = "PM"
    }

    if (hour > 12) {
        hour = hour - 12;
    } else if (hour === 0) {
        hour = 12;
    }

    var minutes  = date.getMinutes();

    if (minutes < 10) {
        document.getElementById("time").innerHTML = hour + ":0" + minutes + " " + amPM;
    } else {
        document.getElementById("time").innerHTML = hour + ":" + minutes + " " + amPM;
    }
}

setInterval(getTime, 1000);
getTime();
/* =================================
	Greeting
================================= */

function getGreeting(){
    var date= new Date();
    var hour = date.getHours();

    if(hour>=0 && hour<12){
        document.getElementById("greeting").innerHTML='Good morning';
    } else if(hour>=12 && hour <18){
        document.getElementById("greeting").innerHTML='Good afternoon';
    } else if (hour>=18 && hour <=23){
        document.getElementById("greeting").innerHTML='Good evening';
    }
}

getGreeting();

function getName(){
    document.getElementById("name").innerHTML=userName;
}
getName();

/* =================================
	To Do List
================================= */

function saveState(){
    localStorage.setItem('toDoState', document.getElementById("ul-task-list").innerHTML);
}

document.getElementById("ul-task-list").addEventListener('click',function (e){
    if(e.target.className = "close"){
        var listItem = e.target.parentElement;
        document.getElementById("ul-task-list").removeChild(listItem);
        saveState();
    }else if (e.target.tagName ==='LI'){
        e.target.classList.toggle('checked');
    }
},false);

// Add New List Item

function newElement(){
    var inputValue = document.getElementById("myInput").value;

    if(inputValue===""){
        alert("오늘의 할일을 적어주세요!!");
    }else{
        document.getElementById("ul-task-list").innerHTML += '<li>' + inputValue
            +'<span class="close">×</span></li>';
    }

    document.getElementById("myInput").value="";

    saveState();
}

document.getElementById("input-and-add-form").addEventListener('submit',function (){
    newElement();
});

/* =================================
	Retrieve Saved Items in the To Do List
================================= */

let savedToDoList = localStorage.getItem('toDoState');
if (savedToDoList != null) {
    document.getElementById("ul-task-list").innerHTML = localStorage.getItem('toDoState');
}

