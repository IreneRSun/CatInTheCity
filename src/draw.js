// draws elements of the webpage

// adds numbers to the clock
function addClockElements(container, end) {
    for (i = end; i > 0; --i) {
        var element;
        if (i < 10) { element = "0" + i; } else { element = i; }
        container.innerHTML += `<li>${element}</li>`;
    }
}

// positions the clock elements
function placeClockElements(elements, degree, radius) {
    elements.forEach(function(element, index) {
        // place element
        const style = `
        transform: rotateZ(${(elements.length - 1 - index) * degree}deg) translateX(${radius}px);
        `
        element.style.cssText = style;
        // activate if first element
        if (index == elements.length - 1) {
            element.classList.add("active");
        }
    });
}

// draws the clock
function drawClock() {
    // add month elements to clock
    const month_container = document.querySelector("#clock #inner #months");
    addClockElements(month_container, 12);
    const months = document.querySelectorAll("#clock #inner #months li");
    placeClockElements(months, 360/12, 120);
    // add day elements to clock
    const day_container = document.querySelector("#clock #inner #days");
    addClockElements(day_container, 31);
    const days = document.querySelectorAll("#clock #inner #days li");
    placeClockElements(days, 360/31, 150);
    // add hour elements to clock
    const hour_container = document.querySelector("#clock #inner #hours");
    addClockElements(hour_container, 24);
    const hours = document.querySelectorAll("#clock #inner #hours li");
    placeClockElements(hours, 360/24, 180);
}

drawClock();