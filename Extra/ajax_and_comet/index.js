// Синхронные запросы

// //1. Создаем новый объект XMLHttpRequest
// const xhr = new XMLHttpRequest();
// //2. Конфигурируем его: GET-запрос на URL 'phones-json'
// xhr.open('GET', 'phones.json', false);
// //3. Отсылаем запрос 
// xhr.send();
// // ...ждем выполнения запроса
// //4. Если код ответа сервера не 200, то это ошибка
// if (xhr.status != 200) {
//   //обрабатываем ошибку
//   console.error(`${xhr.status}: ${xhr.statusText}`) //пример: 404: Not Found
// } else {
//   // обработка результатов
//   console.log(xhr.responseText); // текст ответа
// }

// Асинхронные запросы

function loadPhones() {
  var xhr = new XMLHttpRequest();
  const buttonEl = document.querySelector("#button");
  const resultEl = document.querySelector("#result");

  xhr.open("GET", 'phones.json', true);
  xhr.send();

  xhr.onreadystatechange = function() {
    //Запрос еще не завершен
    if (xhr.readyState !== 4) return;
    buttonEl.innerHTML = "Готово!";

    if (xhr.status !== 200) {
      resultEl.innerHTML = `${xhr.status}: ${xhr.statusText}`;
    } else {
      resultEl.innerHTML = xhr.responseText;
    }
  }
}
