const light_cost = 0.17;

class Device {
    constructor(name = "", timeConsume = 0, hoursActive = 0, passiveConsume = 0) {
        this.name = name;
        this.timeConsume = timeConsume;
        this.hoursActive = hoursActive;
        this.passiveConsume = passiveConsume;
        this.totalConsume = 0;
        this.cost = 0;
    }

    calculateConsumption() {
        this.totalConsume = (this.timeConsume * this.hoursActive + this.passiveConsume).toFixed(1);
        this.cost = (this.totalConsume * light_cost).toFixed(0);
    }

    updateTimeConsume(newTimeConsume) {
        this.timeConsume = newTimeConsume;
    }

    updateHoursActive(newHoursActive) {
        this.hoursActive = newHoursActive;
    }

    updatePassiveConsume(newPassiveConsume) {
        this.passiveConsume = newPassiveConsume;
    }

    updateName(newName) {
        this.name = newName;
    }
}