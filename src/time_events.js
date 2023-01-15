class TimeEvents{

    // constructor
    // handles webpage's time-related events
    constructor() {
        // month, day, and hour elements of clock
        this.months = document.querySelectorAll("#clock #inner #months li");
        this.days = document.querySelectorAll("#clock #inner #days li");
        this.hours = document.querySelectorAll("#clock #inner #hours li");

        // news report date display
        this.news_date = document.querySelector("#news.popup #date");

        // background weather elements
        this.weather_effects = this.getWeathers();

        // weather report spanning the week
        this.report;

        // date-checking attributes
        this.dateIndexes = this.getDateIndexes();
        this.end = new Date();
        this.end.setDate(new Date().getDate() + 7);
        this.end.setHours(0);
        this.end_reached = false;

        // set clock to current date
        this.date = new Date();
        this.date.setMonth(0);
        this.date.setDate(1);
        this.date.setHours(0);
    }

    // create weather report
    createReport(latitude, longitude) {
        this.report = new WeatherReport(latitude, longitude, 7);
        this.report.fetchWeather();
        this.setDate(new Date().getMonth(), new Date().getDate(), 0);
    }

    // get list of all weather effects
    getWeathers() {
        const weathers = new Map();
        weathers.set("day", document.querySelector("#weather_effect #day"));
        weathers.set("night", document.querySelector("#weather_effect #night"));
        weathers.set("sun", document.querySelector("#weather_effect #sun"));
        weathers.set("moon", document.querySelector("#weather_effect #moon"));
        weathers.set("clouds", document.querySelector("#weather_effect #clouds"));
        weathers.set("snow", document.querySelector("#weather_effect #snow"));
        weathers.set("rain", document.querySelector("#weather_effect #rain"));
        weathers.set("fog", document.querySelector("#weather_effect #fog"));
        return weathers;
    }

    // activate given weather effects and deactivates all others
    activateWeathers(keys) {
        this.weather_effects.forEach(function(element, key) {
            // deactivate all weather effects if it is not in given keys
            if (!keys.includes(key)) {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
            }
            // activate weather effect if it is in given keys
            else {
                if (!element.classList.contains("active")) {
                    element.classList.add("active");
                }
            }
        });
    }

    // adjusts weather effects to fit current date
    adjustWeather() {
        const active = new Array();

        // get indexes of current clock date
        const day_index = this.getIndex(this.date.getMonth(), this.date.getDate());  
        const hour_index = this.date.getHours();

        // add weather effects for current clock date
        if (this.report.isDay(day_index, hour_index)) {
            active.push("day");
            active.push("sun");
        } else {
            active.push("night");
            active.push("moon");
        }
        if (this.report.isCloudy(day_index, hour_index)) {
            active.push("clouds");
        }
        if (this.report.isRainy(day_index, hour_index)) {
            active.push("rain");
        }
        if (this.report.isSnowy(day_index, hour_index)) {
            active.push("snow");
        }
        if (this.report.isFoggy(day_index, hour_index)) {
            active.push("fog");
        }
        console.log(active);
        this.activateWeathers(active);
    }

    // increments elements of the clock (either months, days, or hours)
    incrementClock(elements, incrementation) {
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

    // sets the current date of the clock
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
            this.incrementClock(this.months, month_increment);
            this.date.setMonth(month);
        }

        if (day_increment != 0) {
            if (day_increment < 0) {
                day_increment += 31;
            }
            this.incrementClock(this.days, day_increment);
            this.date.setDate(day);
        }

        if (hour_increment != 0) {
            if (hour_increment < 0) {
                hour_increment += 24;
            }
            this.incrementClock(this.hours, hour_increment);
            this.date.setHours(hour);
        }

        // check if end date reached
        if (this.date.getTime() < this.end.getTime()) {
            this.end_reached = false;

            // update news report date
            this.news_date.innerHTML = `${this.getMonthString()} ${this.date.getDate()}, ${this.date.getFullYear()}`;

            // update weather report display
            this.report.updateDaily(this.getIndex(this.date.getMonth(), this.date.getDate()));
            this.report.updateHourly(this.getIndex(this.date.getMonth(), this.date.getDate()), this.date.getHours());
            // adjust weather effects accordingly
            this.adjustWeather();

        } else {
            this.end_reached = true;
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

    // gets the current month on the clock (as a string)
    getMonthString() {
        switch (this.date.getMonth()) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
        }
    }

    // returns whether the end date has been reached
    endReached() {
        return this.end_reached;
    }

    // gets all valid dates
    getDateIndexes() {
        const dateIndexes = new Map();

        // add valid dates to map
        for (i = 0; i < 7; ++i) {
            const real_date = new Date();
            real_date.setDate(real_date.getDate() + i);
            dateIndexes.set(i, [real_date.getMonth(), real_date.getDate()]);
        }

        return dateIndexes;
    }

    // returns index of day
    getIndex(month, day) {
        var index = NaN;
        this.dateIndexes.forEach(function(value, key) {
            if (value[0] == month && value[1] == day) {
                index = key;
            }
        });
        return index;
    }

}