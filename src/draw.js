// draw clock

// add numbers to the clock
function addClockElements(container, end) {
    for (i = 1; i < end; ++i) {
        var element;
        if (i < 10) { element = "0" + i; } else { element = i; }
        container.innerHTML += `<li>${element}</li>`;
    }
}

// position the clock elements
function placeClockElements(elements, degree, radius) {
    elements.forEach(function(element, index) {
        const style = `
        transform: rotateZ(${index * degree}deg) translateX(${radius}px);
        `
        element.style.cssText = style;
    });
}

// set the clock time
function setTime() {
    const date = new Date();
    const month = curr_date.getMonth();
    const day = curr_date.getDate();
    const hour = curr_date.getHours();
}

// draw the clock
function drawClock() {
    // add month elements to clock
    const month_container = document.querySelector("#clock #inner #months");
    addClockElements(month_container, 13);
    const months = document.querySelectorAll("#clock #inner #months li");
    placeClockElements(months, 360/12, 90);
    // add day elements to clock
    const day_container = document.querySelector("#clock #inner #days");
    addClockElements(day_container, 32);
    const days = document.querySelectorAll("#clock #inner #days li");
    placeClockElements(days, 360/31, 120);
    // add hour elements to clock
    const hour_container = document.querySelector("#clock #inner #hours");
    addClockElements(hour_container, 25);
    const hours = document.querySelectorAll("#clock #inner #hours li");
    placeClockElements(hours, 360/24, 150);

}

// add elements to the date setter datalist
function drawResetElements() {
    // get current date and date of next 6 days
    const date = new Date().getDate();
    const curr = new Date();
    // add options to date setter datalist
    const datalist = document.getElementById("set");
    for (i = 0; i < 7; ++i) {
        curr.setDate(date + i);
        var element = `${curr.getFullYear()}/${curr.getMonth()}/${curr.getDate()}`;
        datalist.innerHTML.append(`<option value = ${element}>`);
    }
}

drawClock();