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

function formatTime(time) {
  return new Intl.DateTimeFormat('default', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }).format(time)
}

var targetTime = new Date()
targetTime.setHours(11)
targetTime.setMinutes(59)
targetTime.setSeconds(55)
target = formatTime(targetTime)

var interval = setInterval(() => {
  var nowTime = new Date()
  var now = formatTime(new Date())
  console.clear()
  console.log(`Target: ${target}`)
  console.log(`Now: \t${now}`)
  if (nowTime > targetTime) {
    openBooking(morningSlots)
    clearInterval(interval)
  }
}, 1000);