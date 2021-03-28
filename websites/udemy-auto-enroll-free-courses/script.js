window.onload = () => {
  function closeWindow() {
    // close the browser window if you are already enrolled in the course (it doesn't work 100% of the time)
    window.open('', '_parent', '');
    window.close();
  }

  function waitForElementToDisplay(selector, checkFrequencyInMs, timeoutInMs) {
    console.log('llamada');
    var startTimeInMs = Date.now();
    (function loopSearch() {
      let buyBtn = document.querySelectorAll(selector)[0];
      if (buyBtn != null && buyBtn != undefined) {
        let buyBtnInnerText = buyBtn.innerText;
        if (buyBtnInnerText == "Enroll now") {
          // click enroll now button
          document.querySelectorAll(selector)[0].click();
        }

        if (buyBtnInnerText == "Go to course") {
          closeWindow;
        }
        return true;
      }
      else {
        // check if the maximum waiting time was exceeded
        setTimeout(function () {
          if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) {
            return false;
          }

          try {
            // select the country code/value
            document.getElementById('billingAddressCountry').value = 'AR';
            // click on the enroll button
            document.querySelectorAll('button[type="submit"]')[2].click();
            closeWindow;
          }
          catch {
            console.log('reloco');
            loopSearch();
          }
        }, checkFrequencyInMs);
      }
    })();
  }

  waitForElementToDisplay('button[data-purpose="buy-this-course-button"]', 1000, 7000);
}
