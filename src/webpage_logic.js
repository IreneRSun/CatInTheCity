var active_root = true;
const root = document.getElementById("root");
var timer = null;
const time = new TimeEvents();

// check if geolocation is supported
if (!navigator.geolocation) {
    root.classList.add("inactive");
    alert("This browser does not support Geolocation");
}

// get user location and do setup
function getLoc() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function setStart(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    time.createReport(lat, long);
}

getLoc()
.then(position => setStart(position))
.catch((err) => alert(`Error: ${err}`));

// handle right key press
const cat = document.getElementById("cat");
const newspaper = document.getElementById("newspaper");
const city = document.getElementById("weather_effect");

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight" && active_root) {
        cat.style.animationPlayState = "running";
        city.style.animationPlayState = "running";
        if (time.endReached()) {
            cat.style.animationIterationCount = 1;
            city.style.animationPlayState = "paused";
        } else if (timer == null || ( new Date().getTime() - timer.getTime()) >= 500) {
            time.incrementTime();
            timer = new Date();
        }
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key == "ArrowRight" && active_root) {
        cat.style.animationPlayState = "paused";
        city.style.animationPlayState = "paused";
    }
});

// handle changing cat animation once end is reached
cat.addEventListener("animationend", function() {
    if (!cat.classList.contains("atEnd")) {
        cat.classList.add("atEnd");
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
const err_lbl = document.querySelector("#timesetter.popup #setter #invalid_input");
set_btn.addEventListener("click", function() {
    // play switch sound
    const sound = new Audio("assets/switch.mp3");
    sound.play();
    // get input
    const month_set = document.querySelector("#timesetter.popup #setter #month").value;
    const day_set = document.querySelector("#timesetter.popup #setter #day").value;
    // check inputs
    if (time.getIndex(month_set - 1, day_set) == null) {
        err_lbl.style.display = "block";
    } else {
        err_lbl.style.display = "none";
        // set date
        time.setDate(month_set - 1, day_set, 0);
    }
    // reset cat and city animations as necessary
    if (cat.classList.contains("atEnd")) {
        cat.classList.remove("atEnd");
        cat.style.animationIterationCount = "infinite";
    }
});