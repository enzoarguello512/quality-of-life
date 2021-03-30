window.onload = () => {

  //main variables

  //This is the button on the main page before proceeding to finalize the purchase
  const mainSelector = 'button[data-purpose="buy-this-course-button"]';

  const checkFrequencyInMs = 1000;
  const timeoutInMs = 7000;

  //It is the time it will take before clicking on asd, this is set in case your browser / internet connection is slow, the lower it is, the more likely it will fail (a loop could be used but this may also slow down the process)
  const timeToBeInteractive = 1500;

  function closeWindow() {
    // close the browser window if you are already enrolled in the course (it doesn't work 100% of the time)
    window.open('', '_parent', '');
    window.close();
  }

  function waitForElementToDisplay(selector, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
      const buyBtn = document.querySelectorAll(selector)[0];
      if (buyBtn != null && buyBtn != undefined) {
        let buyBtnInnerText = buyBtn.innerText;
        if (buyBtnInnerText == "Enroll now") {
          // click enroll now button
          setTimeout(document.querySelectorAll(selector)[0].click(), timeToBeInteractive);
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

          //-------Disabled because you can't select a specific option (maybe in some future update udemy will return it to how it was before)

          //try {
          // select the country code/value
          //document.getElementById('billingAddressCountry').value = 'AR';
          // click on the enroll button
          //setTimeout(document.querySelectorAll('button[type="submit"]')[2].click(), timeToBeInteractive);
          //closeWindow;
          //}
          //catch {
          //loopSearch();
          //}

          //-----------------------------------------------
        }, checkFrequencyInMs);
      }
    })();
  }

  waitForElementToDisplay(mainSelector, checkFrequencyInMs, timeoutInMs);
}
