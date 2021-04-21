const { timetable } = require('./timetable-20201127.json')
const open = require('open')
const moment = require('moment')

const slots = timetable.OldCourse.Slots
const baseUrl = 'https://visitorbookings.hkgolfclub.org/Booking/AddBooking/'
const suffix = '?fm=bv'

// const testLink = 'https://visitorbookings.hkgolfclub.org/Booking/AddBooking/163629729559353-9630?fm=bv'

const morningSlots = slots.filter((item) => {
    return parseInt(item.Timeslot.split(':')[0]) < 12 && parseInt(item.Timeslot.split(':')[0]) >= 8 && item.IsVisitor == true
})

let isBooked = false;
let tryTime = new Date();

tryTime.setHours(11,59,55);

console.log(morningSlots.length)
while(Date.now() <= )
morningSlots.forEach(async slot => {
    console.log("Timeslot: ", slot.Timeslot, slot.WholeTimeslot)
    // await open(baseUrl + slot.WholeTimeslot + suffix, {app: ['chrome']});
    // console.log("next")
})

// const openTestLink = async () => {
//     await open(testLink, {app: ['chrome']});
// }

// openTestLink().then(() => {
//     console.log('opening browser')
// })