import throttle from 'lodash.throttle';
// 1) получим элементы формы
const refs = {
  form: document.querySelector('.feedback-form'),
  emaile: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};
// тут мы загружаем значения из хранилища если в нем что-то есть
if (localStorage.getItem('emaile') || localStorage.getItem('message')) {
  loader();
}

// подписываемся на события
refs.form.addEventListener('input', throttle(onSaveInput, 500));
refs.form.addEventListener('submit', onSendSabmit);

function onSaveInput(e) {
  //   используем делегирование событий чтоб выполнять все одной функцией
  if (e.target.nodeName === 'INPUT') {
    localStorage.setItem('emaile', JSON.stringify(e.target.value));
  } else if (e.target.nodeName === 'TEXTAREA') {
    localStorage.setItem('message', JSON.stringify(e.target.value));
  }
}

function onSendSabmit(e) {
  //   откажемся от перезагрузки и отправим JSON сами
  e.preventDefault();
  // иммитируем отправку формы выводом в консоль
  const send = {
    emaile: JSON.parse(localStorage.getItem('emaile')),
    message: JSON.parse(localStorage.getItem('message')),
  };
  console.log(JSON.stringify(send));
  // очистим поля ввода
  e.currentTarget.reset();
  // очистим хранилище
  localStorage.removeItem('emaile');
  localStorage.removeItem('message');
}

function loader() {
  //   вернем значения из хранилища ведь форма не отправлена
  refs.emaile.value = JSON.parse(localStorage.getItem('emaile'));
  refs.message.value = JSON.parse(localStorage.getItem('message'));
}
