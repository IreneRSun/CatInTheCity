class Clock{

    // constructor, initializes Date object
    constructor() {
        // month, day, and hour elements of clock
        this.months = document.querySelectorAll("#clock #inner #months li");
        this.days = document.querySelectorAll("#clock #inner #days li");
        this.hours = document.querySelectorAll("#clock #inner #hours li");

        // initial month, day, and hour
        this.head = [
            this.months[0], 
            this.days[0], 
            this.hours[0]
        ];

        // set clock to current date
        this.date = new Date();
        this.date.setHours(0);
        this.setDate(this.date.getMonth(), this.date.getDate(), 0);
    }

    // increments elements of the clock (either months, days, or hours)
    increment(elements, head) {
        // increment each of the elements by one
        elements.forEach(function(element, index) {
            // get tranform property of next sibling
            var next;
            if (index != elements.length - 1) {
                next = elements[index + 1];
            } else {
                next = elements[0];
            }
            const transform = getComputedStyle(next).getPropertyValue("transform");
            // adjust element's transform property
            const new_style = `transform: ${transform};`
            element.style.cssText = new_style;
            // adjust active state of elements as necessary
            if (next.classList.contains("active")) {
                next.classList.remove("active");
                element.classList.add("active");
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
        if (month_increment > 0) {
            this.increment(this.months, this.head[0]);
            this.date.setMonth(month);
        }

        if (day_increment > 0) {
            this.increment(this.days, this.head[1]);
            this.date.setDate(day);
        }

        if (hour_increment > 0) {
            this.increment(this.hours, this.head[2]);
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