window.onload = () => {
  let rootBuyBtnQuery = 'button[data-purpose="buy-this-course-button"]';
  async function startFunction() {
    let checkBuyBtn = new Promise((resolve, reject) => {
      let buyBtn = document.querySelectorAll(rootBuyBtnQuery)[0].innerText;
      if (buyBtn == "Enroll now") {
        document.querySelectorAll(rootBuyBtnQuery)[0].click();
        resolve(() => {
          // select the country code/value
          document.getElementById('billingAddressCountry').value = 'AR';
          // click on the enroll button
          document.querySelectorAll('button[type="submit"]')[2].click();
        });
      }
      if (buyBtn == "Go to course") {
        // close the browser window if you are already enrolled in the course (it doesn't work 100% of the time)
        window.open('', '_parent', '');
        window.close();
      }
    });
    await checkBuyBtn;
  };
  setTimeout(startFunction, 5000);
}
