const real_date = new Date();
var active_root = true;
var timer = null;
const root = document.getElementById("root");
const time = new TimeEvents();

// check if geolocation is supported
if (!navigator.geolocation) {
    root.classList.add("inactive");
    alert("This browser does not support Geolocation");
}

// get user location
window.onload = async () => {
    const getLoc = async () => {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }
    };
    const loc = await getLoc();
    time.setLoc(loc);
};

// handle right key press
const cat_animation = document.getElementById("cat");
const newspaper = document.getElementById("newspaper");
const city_animation = document.getElementById("weather_effect");

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight" && active_root && time.locSet()) {
        cat_animation.style.animationPlayState = "running";
        city_animation.style.animationPlayState = "running";
        if (false) {  // time.getEndReached()
            //  ...   implement  ... //
        } else if (timer == null || ( new Date().getTime() - timer.getTime()) >= 500) {
            time.incrementTime();
            timer = new Date();
        }
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key == "ArrowRight" && active_root) {
        cat_animation.style.animationPlayState = "paused";
        city_animation.style.animationPlayState = "paused";
    }
});

// handle popups
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