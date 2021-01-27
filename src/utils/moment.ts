const Moment = function (timestamp) {
    const timer = new Date(timestamp);

    this._year = timer.getFullYear();
    this._month = timer.getMonth() + 1;
    this._date = timer.getDate();
    this._hours = timer.getHours();
    this._minutes = timer.getMinutes();
    this._seconds = timer.getSeconds();

    this._formatHistory = {};
    this._formatReg = /(YYYY|MM|M|DD|D|HH|H|mm|m|ss|s)/g;
}

Moment.prototype.addHistory = function (format, arr) {
    if (!this._formatHistory[format]) {
        this._formatHistory[format] = arr;
    }
}

Moment.prototype.format = function (format) {
    if (!format) return;

    const formatArr = this._formatHistory[format] || format.match(this._formatReg);

    this.addHistory(format, formatArr);


    formatArr.map(item => {
        let value = "";
        switch (item) {
            case "YYYY":
                value = this._year;
                break;
            case "MM":
                value = this._month < 10 ? "0" + this._month : this._month;
                break;
            case "M":
                value = this._month;
                break;
            case "DD":
                value = this._date < 10 ? "0" + this._date : this._date;
                break;
            case "D":
                value = this._date;
                break;
            case "HH":
                value = this._hours < 10 ? "0" + this._hours : this._hours;
                break;
            case "H":
                value = this._hours;
                break;
            case "mm":
                value = this._minutes < 10 ? "0" + this._minutes : this._minutes;
                break;
            case "m":
                value = this._minutes;
                break;
            case "ss":
                value = this._seconds < 10 ? "0" + this._seconds : this._seconds;
                break;
            case "s":
                value = this._seconds;
                break;
        }
        format = format.replace(item, value);
    });


    return format;
}

const moment = function (timestamp) {
    return new Moment(timestamp);
};

export default moment;