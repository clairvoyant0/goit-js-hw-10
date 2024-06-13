import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let intervalId = null;
const startButton = document.getElementById('data-start');
const datetimePicker = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
  });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startCountdown(userSelectedDate);
  }
});

function startCountdown(endDate) {
  // Деактивуємо кнопку "Start" і інпут після запуску таймера
  startButton.disabled = true;
  datetimePicker.disabled = true;

  intervalId = setInterval(() => {
    const now = new Date();
    const timeLeft = endDate - now;

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      console.log('Countdown finished');
      // Після завершення відліку, робимо інпут активним і кнопку "Start" неактивною
      startButton.disabled = true;
      datetimePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateCountdownDisplay(days, hours, minutes, seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateCountdownDisplay(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}