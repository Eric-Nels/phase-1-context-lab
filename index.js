function createEmployeeRecord(arr) {
   const record = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
   };
   return record;
};

function createEmployeeRecords(arr) {
    const records = [];
    arr.forEach(subArr => {
        const record = createEmployeeRecord(subArr)
        records.push(record);
    });
    return records
};

function createTimeInEvent(date_time) {
    const [date, hour] = date_time.split(' ');
    const timeInEvent = {
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour, 10) 
    };
    this.timeInEvents.push(timeInEvent);
    return this;
};

function createTimeOutEvent(date_time) {
    const [date, hour] = date_time.split(' ');
    const timeOutEvent = {
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour, 10) 
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
};

function hoursWorkedOnDate(date) {
    let timeIn;
    let timeOut;
    for(let i = 0; i < this.timeInEvents.length; i++) {
        if (this.timeInEvents[i].date === date) {
            timeIn = this.timeInEvents[i].hour;
            break;
        };
    };
    for(let i = 0; i < this.timeOutEvents.length; i++) {
        if (this.timeOutEvents[i].date === date) {
            timeOut = this.timeOutEvents[i].hour;
            break;
        };
    };
    const timeWorked = (timeOut - timeIn) / 100;
    return timeWorked; 
};

function wagesEarnedOnDate(date) {
    const rate = this.payPerHour;
    const timeWorked = hoursWorkedOnDate.call(this, date);
    const earned = timeWorked * rate;
    return earned;
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) 

    return payable;
};

function findEmployeeByFirstName(arr, firstName) {
    return arr.find((record) => record.firstName === firstName)
};

function calculatePayroll(array) {
    let payroll = 0;
    for (let i = 0; i<array.length; i++) {
        const employee = array[i];
        const earned = allWagesFor.call(employee);
        payroll += earned;
    }
    return payroll
  };

