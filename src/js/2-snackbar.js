import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault(); // Предотвращаем отправку формы

  const delay = parseInt(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
    });
    })
    .catch((delay) => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
    });
    });
});