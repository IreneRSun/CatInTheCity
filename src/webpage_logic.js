const real_date = new Date();
var latitude = null;
var longitude = null;
var active_root = true;
var timer = null;

// get user location
function getLoc(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLoc);
} else {
    alert("Please allow geolocation on this browser");
}

//var WR = new WeatherReport(latitude, longitude);
//WR.fetch_weather();


// handle right key press
const time = new TimeEvents();
const cat_animation = document.getElementById("cat");
const newspaper = document.getElementById("newspaper");

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight" && active_root) {
        cat_animation.style.animationPlayState = "running";
        if (timer == null || ( new Date().getTime() - timer.getTime()) >= 500) {
            time.incrementTime();
            timer = new Date();
        }
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key == "ArrowRight" && active_root) {
        cat_animation.style.animationPlayState = "paused";
    }
});

// handle popups
const root = document.getElementById("root");

function openPopup(popup) {
    // blur root
    root.classList.add("inactive");
    active_root = false;
    // show popup
    popup.classList.add("active");
}

function closePopup(popup) {
    // unblur root
    root.classList.remove("inactive");
    active_root = true;
    // hide popup 
    popup.classList.remove("active");
}

function implementPopup(btn, popup, close, audio) {
    // add event listeners for opening and closing the popup
    btn.addEventListener("click", function() {
        const sound = new Audio(audio);
        sound.play();
        openPopup(popup);
    });

    close.addEventListener("click", function() {
        closePopup(popup);
    });
}

// handle instructions popup
const instructions_btn = document.getElementById("instructions_btn");
const instructions_popup = document.querySelector("#instructions.popup");
const instructions_close = document.querySelector("#instructions.popup .exit_btn");
implementPopup(instructions_btn, instructions_popup, instructions_close, "assets/page_flip.mp3");

// handle news popup
const news_btn = document.getElementById("news_btn");
const news_popup = document.querySelector("#news.popup");
const news_close = document.querySelector("#news.popup .exit_btn");
implementPopup(news_btn, news_popup, news_close, "assets/page_flip.mp3");

// handle time-setter popup
const ts_btn = document.getElementById("timesetter_btn");
const ts_popup = document.querySelector("#timesetter.popup");
const ts_close = document.querySelector("#timesetter.popup .exit_btn");
implementPopup(ts_btn, ts_popup, ts_close, "assets/pick_up.mp3");

// handle time-setting
const set_btn = document.querySelector("#timesetter.popup #setter #set_btn");
set_btn.addEventListener("click", function() {
    const month_set = document.querySelector("#timesetter.popup #setter #month").value;
    const day_set = document.querySelector("#timesetter.popup #setter #day").value;
    time.setDate(month_set - 1, day_set, 0);
});