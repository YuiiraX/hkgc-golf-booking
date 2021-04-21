const { timetable } = require("./timetable.json");
const open = require("open");

const start = 12;
const end = 16;
const slots = timetable.NewCourse.Slots;
const baseUrl = "https://visitorbookings.hkgolfclub.org/Booking/AddBooking/";
const suffix = "?fm=bv";

const morningSlots = slots.filter((item) => {
  return (
    parseInt(item.Timeslot.split(":")[0]) >= start &&
    parseInt(item.Timeslot.split(":")[0]) < end &&
    item.IsVisitor == true
  );
});

console.log(morningSlots.length);
morningSlots.forEach(async (slot) => {
  console.log("Timeslot: ", slot.Timeslot, slot.WholeTimeslot);
  await open(baseUrl + slot.WholeTimeslot + suffix);
});
