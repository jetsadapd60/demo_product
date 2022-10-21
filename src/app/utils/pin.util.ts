

function pin() {
  const correctPin = "0000";
  let disableInput = false;
  let _pinArray: any[] = [];

  function reset() {
    closeLock().then(() => {
      disableInput = false;
      _pinArray = [];
      bindPinToDisplay(_pinArray);
    });
  }

  function closeLock() {
    const topSection = document.querySelector(".pin-info");
    const bottomSection = document.querySelector(".pin-display");

    const promises = [
      anime({
        targets: bottomSection,
        translateY: "0%",
        duration: 600,
        easing: "easeOutCubic",
      }).finished,
      anime({
        targets: topSection,
        translateY: "0%",
        duration: 600,
        easing: "easeOutCubic",
      }).finished,
    ];

    return Promise.all(promises);
  }

  function openLock() {
    const topSection = document.querySelector(".pin-info");
    const bottomSection = document.querySelector(".pin-display");

    const promises = [
      anime({
        targets: bottomSection,
        translateY: "125%",
        duration: 600,
        easing: "easeInCubic",
      }).finished,
      anime({
        targets: topSection,
        translateY: "-101%",
        duration: 600,
        easing: "easeInCubic",
      }).finished,
    ];

    return Promise.all(promises);
  }

  function errorShake() {
    return Promise.resolve();
  }
  
  function bindPinToDisplay(pinArray?: any, pinStatus?: any) {
    document.querySelectorAll(".pin-circle").forEach((el, index) => {
      if (pinStatus === "success") {
        el.classList.add("success");
      } else if (pinStatus === "error") {
        el.classList.add("error");
      } else if (index > pinArray.length - 1) {
        el.classList.remove("entered");
        el.classList.remove("success");
        el.classList.remove("error");
      } else {
        el.classList.add("entered");
      }
    });

    if (pinStatus === "error") {
      let confirmation: any = document.querySelector(".confirmation-dots");
      confirmation.classList.add("error");
    } else {
      let confirmation: any = document.querySelector(".confirmation-dots");
      confirmation.classList.remove("error");
    }
  }

  function evaluatePin(pinArray: any) {
    const enteredPin = pinArray.join("");
    if (enteredPin === correctPin) {
      disableInput = true;
      setTimeout(() => {
        bindPinToDisplay(pinArray, "success");
        setTimeout(() => {
          openLock();
        }, 500);
      }, 250);
      console.log("correct PIN");
    } else {
      disableInput = true;
      setTimeout(() => {
        bindPinToDisplay(pinArray, "error");
        setTimeout(() => {
          _pinArray = [];
          bindPinToDisplay(_pinArray);
          disableInput = false;
        }, 350);
      }, 250);
    }
  }

  function initKeypad() {
    document.querySelectorAll(".keypad--button[data-value]").forEach((el) => {
      el.addEventListener("click", (evt: any) => {
        if (disableInput) {
          return;
        }
        const value = evt.target.attributes["data-value"].value;
        if (_pinArray.length < 4) {
          _pinArray.push(value);
          bindPinToDisplay(_pinArray);
          if (_pinArray.length === 4) {
            evaluatePin(_pinArray);
          }
        }
      });
    });

    let keyboardBackArrow: any = document
    keyboardBackArrow.querySelector(".keyboard--button__back-arrow")
      .addEventListener("click", () => {
        if (disableInput) {
          return;
        }
        _pinArray.pop();
        bindPinToDisplay(_pinArray);
      });

    let keyboardButton__x: any = document
    keyboardButton__x.querySelector(".keyboard--button__x")
      .addEventListener("click", () => {
        if (disableInput) {
          return;
        }
        _pinArray = [];
        bindPinToDisplay(_pinArray);
      });

    let reset: any = document.querySelector("#reset-button");
    reset.addEventListener("click", () => {
      reset();
    });
  }

  function initLayout() {
    const containerHeight: any = document.querySelector(".container");
    containerHeight.offsetHeight;
    const keypadHeight: any = document.querySelector(".pin-display");
    keypadHeight.offsetHeight;
    let pinInfo: any = document.querySelector(".pin-info");
    pinInfo.style.height = `${containerHeight - keypadHeight + 1}px`;
  }

  function init() {
    initKeypad();
    initLayout();
  }

  init();
}
