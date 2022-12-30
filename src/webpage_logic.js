var active_root = true;
var curr_date = new Date();

// handle right key press
const cat_animation = document.getElementById("cat");

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight" && active_root) {
        cat_animation.style.animationPlayState = "running";
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

// handle news popup
const news_btn = document.getElementById("news_btn");
const news_popup = document.querySelector("#news.popup");
const news_close = document.querySelector("#news.popup .exit_btn");

news_btn.addEventListener("click", function() {
    const pg_sound = new Audio("assets/page_flip.mp3");
    pg_sound.play();
    openPopup(news_popup);
});

news_close.addEventListener("click", function() {
    closePopup(news_popup);
});
