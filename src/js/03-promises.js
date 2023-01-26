import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
console.log("🚀 ~ formRef", formRef)
// const delayRef = document.querySelector('[name="delay"]');
// const stepRef = document.querySelector('[name="step"]');
// const amountRef = document.querySelector('[name="amount"]');

formRef.addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
  event.preventDefault();

  let delay = formRef.delay.valueAsNumber;
  let step = formRef.step.valueAsNumber;
  let amount = formRef.amount.valueAsNumber;

  for (let i = 1; i <= amount; i += 1) {
     createPromise(i, delay)
      .then(({ position, delay }) => {
       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
     .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  delay += step;
  }

  formRef.reset();

}

function createPromise(position, delay) {

  const promiseObject = {position, delay};
  
  const shouldResolve = Math.random() > 0.3;

  return new Promise ((resolve, reject) => {
  setTimeout(() => {
    if (shouldResolve) {
      // Fulfill
      resolve(promiseObject)
    } else {
      // Reject
      reject(promiseObject)
    }
  }, delay)
})
}