const cheater = angular.element($(".main-container")[0]);
const scope = cheater.scope();
const bookingFactory = cheater.injector().get("bookingFactory");

const end = 16;
let tries = 0;
let stopBooking = false;
let tester;

function GetMonth(val) {
  switch (val) {
    case "Jan":
      return "01";
    case "Feb":
      return "02";
    case "Mar":
      return "03";
    case "Apr":
      return "04";
    case "May":
      return "05";
    case "Jun":
      return "06";
    case "Jul":
      return "07";
    case "Aug":
      return "08";
    case "Sep":
      return "09";
    case "Oct":
      return "10";
    case "Nov":
      return "11";
    case "Dec":
      return "12";
    default:
      return "00";
  }
}
var date = scope.CourseRotationModel.SelectedDate.split(",")[1].split(" ");
var selectDate = date[3] + "-" + GetMonth(date[2]) + "-" + date[1];

function findValidSlot(data) {
  let valid = [];
  valid = valid.concat(
    data.EdenCourse.Slots.filter((val) => {
      return (
        val.IsAllowBooking &&
        val.IsVisitor &&
        val.WholeTimeslot !== null &&
        parseInt(val.Timeslot.split(":")[0]) < end
      );
    })
  );
  valid = valid.concat(
    data.NewCourse.Slots.filter((val) => {
      return (
        val.IsAllowBooking &&
        val.IsVisitor &&
        val.WholeTimeslot !== null &&
        parseInt(val.Timeslot.split(":")[0]) < end
      );
    })
  );
  valid = valid.concat(
    data.OldCourse.Slots.filter((val) => {
      return (
        val.IsAllowBooking &&
        val.IsVisitor &&
        val.WholeTimeslot !== null &&
        parseInt(val.Timeslot.split(":")[0]) < end
      );
    })
  );
  return valid;
}

function tryBook() {
  console.debug("Trial #", tries)

  if (tries < 3600 && !stopBooking) {
    tries++;
  } else {
    clearInterval(tester);
    return;
  }

  bookingFactory.getData(selectDate, false, false).then((response) => {
    if (response.success) {
      validSlots = findValidSlot(response.timetable);
      if (validSlots.length > 0) {
        for (let i = 0; i < validSlots.length; i++) {
          let slot = validSlots[i];
          var data = {
            id: slot.WholeTimeslot,
            action: "add",
            from: "bv",
          };
          bookingFactory.verifyEnterTimeslot(data).then(function (response) {
            console.debug(response)
            if (response.success) {
              window.open(response.navigateUrl, "_blank");
            }
          });
        }
      }
    }
  });
}

function start() {
   tester = setInterval(tryBook, 500);
}

function stop() {
  stopBooking = true
}