const { timetable } = require("./timetable.json");
const open = require("open");

const start = 8;
const end = 12;
const slots = timetable.EdenCourse.Slots;
const baseUrl = "https://visitorbookings.hkgolfclub.org/Booking/AddBooking/";
const suffix = "?fm=bv";

const morningSlots = slots.filter((item) => {
  return (
    parseInt(item.Timeslot.split(":")[0]) >= start &&
    parseInt(item.Timeslot.split(":")[0]) < end &&
    item.IsVisitor == true
  );
});

// console.log(morningSlots.length);
function openBooking(slots) {
  slots.forEach(async (slot) => {
    console.log("Timeslot: ", slot.Timeslot, slot.WholeTimeslot);
    await open(baseUrl + slot.WholeTimeslot + suffix);
  });
}

var interval = setInterval(() => {
  var now = new Date()
  var target = new Date()
  target.setHours(12)
  target.setMinutes(13)
  target.setSeconds(0)
  console.log(now, target)
  if(now > target) {
    openBooking(morningSlots)
    clearInterval(interval)
  }
}, 1000);