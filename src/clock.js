class Clock{

    // constructor, initializes Date object
    constructor() {
        // month, day, and hour elements of clock
        this.months = document.querySelectorAll("#clock #inner #months li");
        this.days = document.querySelectorAll("#clock #inner #days li");
        this.hours = document.querySelectorAll("#clock #inner #hours li");

        // set clock to current date
        this.date = new Date();
        this.date.setMonth(0);
        this.date.setDate(1);
        this.date.setHours(0);
        this.setDate(new Date().getMonth(), new Date().getDate(), 0);
    }

    // increments elements of the clock (either months, days, or hours)
    increment(elements, incrementation) {
        var active_shift = false;
        // increment each of the elements by one
        elements.forEach(function(element, index) {
            // get tranform property of next sibling
            var next;
            if (index < elements.length - incrementation) {
                next = elements[index + incrementation];
            } else {
                next = elements[incrementation + index - elements.length];
            }
            const transform = getComputedStyle(next).getPropertyValue("transform");
            // adjust element's transform property
            const new_style = `transform: ${transform};`
            element.style.cssText = new_style;
            // adjust active state of elements as necessary
            if (next.classList.contains("active") && !active_shift) {
                next.classList.remove("active");
                element.classList.add("active");
                active_shift = true;
            }
        });
    }

    // sets the current date
    setDate(month, day, hour) {
        // determine how much incrementation is necessary
        var month_increment = month - this.date.getMonth();
        var day_increment = day - this.date.getDate();
        var hour_increment = hour - this.date.getHours();

        // change the current date of the clock
        if (month_increment != 0) {
            if (month_increment < 0) {
                month_increment += 12;
            }
            this.increment(this.months, month_increment);
            this.date.setMonth(month);
        }

        if (day_increment != 0) {
            if (day_increment < 0) {
                day_increment += 31;
            }
            this.increment(this.days, day_increment);
            this.date.setDate(day);
        }

        if (hour_increment != 0) {
            if (hour_increment < 0) {
                hour_increment += 24;
            }
            this.increment(this.hours, hour_increment);
            this.date.setHours(hour);
        }
        
    }
    
    // increments the time of the clock by one hour
    incrementTime() {
        // get new date
        const new_date = new Date(this.date.getTime());
        new_date.setHours(this.date.getHours() + 1);

        // get new date
        const new_month = new_date.getMonth();
        const new_day = new_date.getDate();
        const new_hour = new_date.getHours();

        // set clock to new date
        this.setDate(new_month, new_day, new_hour);
    }

}