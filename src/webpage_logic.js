var active_root = true;

const test = document.querySelector("#clock #inner #months li.active");
console.log(test.style.cssText);

// handle clock time
function setClock(new_month, new_day, new_hour) {
    const months = document.querySelectorAll("#clock #inner #months li");
    const days = document.querySelectorAll("#clock #inner #days li");
    const hours = document.querySelectorAll("#clock #inner #hours li");

    const month = Number(document.querySelector("#clock #inner #months li.active"));
    const day = Number(document.querySelector("#clock #inner #days li.active"));
    const hour = Number(document.querySelector("#clock #inner #hours li.active"));

}

function incrementClock() {
    const months = document.querySelectorAll("#clock #inner #months li");
    const days = document.querySelectorAll("#clock #inner #days li");
    const hours = document.querySelectorAll("#clock #inner #hours li");

    const month = document.querySelector("#clock #inner #months li.active");
    const day = document.querySelector("#clock #inner #days li.active");
    const hour = document.querySelector("#clock #inner #hours li.active");



    // increment hour
    const style = ``;
    // increment day
    if (hour == 24) {

    }
    // increment month

}

// set clock to current date


// handle right key press
const cat_animation = document.getElementById("cat");
const newspaper = document.getElementById("newspaper");

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight" && active_root) {
        cat_animation.style.animationPlayState = "running";
        newspaper.style.visibility = "hidden";
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
