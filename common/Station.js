class Station {
    
    constructor(name, track, timeOfArrival) {
        this.name = name;
        this.track = track;
        this.timeOfArrival = timeOfArrival;
    }

    formattedTime() {
        console.log(this.timeOfArrival);
        return this.padZeros(this.timeOfArrival.getHours()) + ':' + this.padZeros(this.timeOfArrival.getMinutes());
    }

    padZeros(value) {
        value = String(value);
        console.log(value);
        if (value.length == 1) {
            return "0" + value;
        }
        return value;
    }

}

export default Station;