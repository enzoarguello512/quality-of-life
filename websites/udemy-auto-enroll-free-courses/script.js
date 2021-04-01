// ==UserScript==
// @name         UdemyCourses
// @include      https://www.udemy.com/cart/checkout/*
// @include      https://www.udemy.com/course/*
// @include      https://www.udemy.com/cart/*
// @include      http://www.udemy.com/cart/checkout/*
// @include      http://www.udemy.com/course/*
// @include      http://www.udemy.com/cart/*
// @version      0.1.5
// @description  Semi-automatic enrollment for udemy courses
// @author       Arguel
// @grant        window.close
// ==/UserScript==



"use strict";
//main variables

// This is the button on the main page before proceeding to finalize the purchase
const mainSelector = 'button[data-purpose="buy-this-course-button"]'; //string querySelectorAll

// This refers to the text of "Great choice [user]" that is activated once we confirm the purchase
const purchasedSelector = 'div[class="styles--success-alert__text--1kk07"]';

const checkFrequencyInMs = 1000; //int
const timeoutInMs = 10000; //int

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
    var startTimeInMs = Date.now();
    (function loopSearch() {
      const buyBtn = document.querySelectorAll(selector)[0];
      if (buyBtn != null && buyBtn != undefined) {
        let buyBtnInnerText = buyBtn.innerText;
        if (buyBtnInnerText == EN_EnrollNow) {
          // click enroll now button
          setTimeout(document.querySelectorAll(selector)[0].click(), timeToBeInteractiveInMs);
        }

        if (buyBtnInnerText == EN_GoToCourse) {
          closeWindow();
        }
        return;
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
          const coursePurchased = document.querySelector(purchasedSelector).innerText;
          if (coursePurchased != null && coursePurchased != undefined) {
            if (coursePurchased.startsWith(EN_GreatChoice)) {
              closeWindow();
            }
          }

        }, checkFrequency);
      }
    })();
  }

  waitForElementToDisplay(mainSelector, checkFrequencyInMs, timeoutInMs);
}

