// ==UserScript==
// @name         UdemyCourses
// @include      https://www.udemy.com/cart/checkout/*
// @include      https://www.udemy.com/course/*
// @include      https://www.udemy.com/cart/*
// @include      http://www.udemy.com/cart/checkout/*
// @include      http://www.udemy.com/course/*
// @include      http://www.udemy.com/cart/*
// @version      0.1.6
// @description  Semi-automatic enrollment for udemy courses
// @author       Arguel
// @grant        window.close
// ==/UserScript==



"use strict";
//main variables

// This is the button on the main page before proceeding to finalize the purchase
const mainSelector = 'button[data-purpose="buy-this-course-button"]'; //string querySelectorAll

// This refers to the text of "Great choice [user]" that is activated once we confirm the purchase
const purchasedSelector = '.udlite-in-udheavy.mb-space-lg.styles--success-alert-banner-container--3ylca';

const checkFrequencyInMs = 1000; //int
const timeoutInMs = 20000; //int

// It is the time it will take before clicking on the buttons, this is set in case your browser/internet connection is slow, the lower it is, the more likely it will fail (a loop could be used but this may also slow down the process)
const timeToBeInteractiveInMs = 1500; //int

// Language variables (you would have to translate the text on the right into your current language)
const EN_EnrollNow = "Enroll now";
const EN_GoToCourse = "Go to course";
const EN_GreatChoice = "Great choice";

window.onload = () => {

  function closeWindow() {
    // close the browser window if you are already enrolled in the course (it doesn't work 100% of the time)
    window.open('', '_self', '');
    window.open('', '_parent', '');
    window.close();
  }

  function waitForElementToDisplay(selector, checkFrequency, timeout) {
    const startTimeInMs = Date.now();
    (function loopSearch() {
      const buyBtn = document.querySelector(selector);
      if (buyBtn !== null) {
        let buyBtnText = buyBtn.textContent;
        // click enroll now button
        if (buyBtnText === EN_EnrollNow) setTimeout(buyBtn.click(), timeToBeInteractiveInMs);
        if (buyBtnText === EN_GoToCourse) closeWindow();
      }
      else {
        // check if the maximum waiting time was exceeded
        setTimeout(function () {
          if (timeout && Date.now() - startTimeInMs > timeout) {
            return;
          }

          //-------Disabled because you can't select a specific option (maybe in some future update udemy will return it to how it was before)

          //try {
          // select the country code/value
          //document.getElementById('billingAddressCountry').value = 'AR';
          // click on the enroll button
          //setTimeout(document.querySelectorAll('button[type="submit"]')[2].click(), timeToBeInteractiveInMs);
          //closeWindow();
          //}
          //catch {
          loopSearch();
          //}

          //-----------------------------------------------

          // if the script manages to subscribe to the course it will auto close the browser window
          const coursePurchased = document.querySelector(purchasedSelector);
          if (coursePurchased != null) {
            const coursePurchasedText = coursePurchased.textContent;
            if (coursePurchasedText.startsWith(EN_GreatChoice)) {
              closeWindow();
            }
          }

        }, checkFrequency);
      }
    })();
  }

  waitForElementToDisplay(mainSelector, checkFrequencyInMs, timeoutInMs);
}

