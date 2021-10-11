const cheater = angular.element($(".main-container")[0]);
const scope = cheater.scope();
const bookingFactory = cheater.injector().get("bookingFactory");

const end = 17
function findValidSlot(data) {
  let valid = [];
  valid = valid.concat(
    data.EdenCourse.Slots.filter((val) => {
      return val.IsAllowBooking && val.IsVisitor && val.WholeTimeslot !== null && parseInt(val.Timeslot.split(":")[0]) < end;
    })
  );
  valid = valid.concat(
    data.NewCourse.Slots.filter((val) => {
      return val.IsAllowBooking && val.IsVisitor && val.WholeTimeslot !== null && parseInt(val.Timeslot.split(":")[0]) < end;
    })
  );
  valid = valid.concat(
    data.OldCourse.Slots.filter((val) => {
      return val.IsAllowBooking && val.IsVisitor && val.WholeTimeslot !== null && parseInt(val.Timeslot.split(":")[0]) < end;
    })
  );
  return valid;
}


let tries = 0;
let tester = setInterval(tryBook, 200);

function tryBook() {
  validSlots = findValidSlot(scope.CourseRotationModel);
  if (validSlots.length > 0) {
    clearInterval(tester);
    for(let i = 0; i < validSlots.length; i++) {
      let slot = validSlots[i]
      var data = {
        id: slot.WholeTimeslot,
        action: "add",
        from: "bv",
      };
      bookingFactory.verifyEnterTimeslot(data).then(function (response) {
        if (response.success) {
          window.open(response.navigateUrl, "_blank");
        }
      });
    }
  } else if (tries < 10) {
    scope.RefreshData();
    tries++;
  } else {
    clearInterval(tester);
  }
}
