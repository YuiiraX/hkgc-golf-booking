const app = angular.element($(".main-container")[0]);
const scope = cheater.scope();
const bookingFactory = cheater.injector().get("bookingFactory");

function findValidSlot(data) {
  let valid = [];
  valid = valid.concat(
    data.EdenCourse.Slots.filter((val) => {
      return val.IsAllowBooking && val.IsVisitor && val.WholeTimeslot !== null;
    })
  );
  valid = valid.concat(
    data.NewCourse.Slots.filter((val) => {
      return val.IsAllowBooking && val.IsVisitor && val.WholeTimeslot !== null;
    })
  );
  valid = valid.concat(
    data.OldCourse.Slots.filter((val) => {
      return val.IsAllowBooking && val.IsVisitor && val.WholeTimeslot !== null;
    })
  );
  return valid;
}


let tries = 0;
let tester = setInterval(tryBook, 300);

function tryBook() {
  validSlots = findValidSlot(scope.CourseRotationModel);
  if (validSlots.length > 0) {
    clearInterval(tester);
    for(let i = 0; i < validSlots.length; i++) {
      let slot = validSlots[i]
      setTimeout(function() {
        var data = {
          id: slot.WholeTimeslot,
          action: "add",
          from: "bv",
        };
        bookingFactory.verifyEnterTimeslot(data).then(function (response) {
          if (response.success) {
            window.open(response.navigateUrl, "_blank");
          }
          else {
            scope.RefreshData();
          }
        });
      }, 500 * i)
    }
  } else if (tries < 10) {
    scope.RefreshData();
    tries++;
  } else {
    clearInterval(tester);
  }
}
