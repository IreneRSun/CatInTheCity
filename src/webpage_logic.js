var active_root = true;
const real_date = new Date();
var timer = null;

// handle right key press
const clock = new Clock();
const cat_animation = document.getElementById("cat");
const newspaper = document.getElementById("newspaper");

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight" && active_root) {
        cat_animation.style.animationPlayState = "running";
        newspaper.style.visibility = "hidden";
        if (timer == null || ( new Date().getTime() - timer.getTime()) >= 500) {
            clock.incrementTime();
            timer = new Date();
        }
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key == "ArrowRight" && active_root) {
        cat_animation.style.animationPlayState = "paused";
        newspaper.style.visibility = "visible";
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

// handle news popup
const news_btn = document.getElementById("news_btn");
const news_popup = document.querySelector("#news.popup");
const news_close = document.querySelector("#news.popup .exit_btn");

news_btn.addEventListener("click", function() {
    const sound = new Audio("assets/page_flip.mp3");
    sound.play();
    openPopup(news_popup);
});

news_close.addEventListener("click", function() {
    closePopup(news_popup);
});
