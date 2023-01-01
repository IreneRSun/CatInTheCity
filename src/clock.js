class Clock{

    // constructor, initializes Date object
    constructor(months, days, hours) {
        // initialize month, day, and hour elements of clock
        this.months = months;
        this.days = days;
        this.hours = hours;

        // current date of clock
        this.date = new Date();
    }

    incrementTime() {
        this.date.setDate(this.date.getDate() + 1);
        
        var new_hour = this.date.getHours();
        var new_day = this.date.getDate();

        // increment hour
        this.hours.forEach(function(element) {
            const style = `
            transform: rotateZ(${-360/24}deg);
            `
            element.style.cssText = style;
        });
        
        // increment day
        if (new_hour == 0) {
            this.days.forEach(function(element) {
                const style = `
                transform: rotateZ(${-360/31}deg);
                `
                element.style.cssText = style;
            });
        }
        
        // increment month
        if (new_day == 1) {
            this.hours.forEach(function(element) {
                const style = `
                transform: rotateZ(${-360/12}deg);
                `
                element.style.cssText = style;
            });
        }
    }

}