// JavaScript for countdown timer
const daysElement = document.querySelector('.days');
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');

// Set the date we're counting down to
const countDownDate = new Date("Dec 5, 2023 00:00:00").getTime();

// Update the countdown every 1 second
const x = setInterval(function() {

    // Get the current date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the countdown elements
    daysElement.textContent = formatTime(days);
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);

    // If the count down is finished, display text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById('countdown').innerHTML = "Website Launched!";
    }
}, 1000);

// Function to add leading zero to numbers less than 10
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
