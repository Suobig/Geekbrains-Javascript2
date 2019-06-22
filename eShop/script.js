// let xhr;

// if (window.XMLHttpRequest) {
//   xhr = new window.XMLHttpRequest();
// } else if (window.ActiveXObject) {
//   xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
// }

// xhr.onreadystatechange = function() {
//   /*Возможные состояния:
//      0 - неинциализирован
//      1 - загрузка данных
//      2 - запрос принят
//      3 - обмен данными с сервером
//      4 - запрос выполнен <- самый важный
//   */

//   //Если запрос не выполнен - ждем дальше
//   if (xhr.readyState !== 4) return;
//   //Тут что-то делаем
//   // Проверяем, что ответил сервер на запрос
//   if (xhr.status === 200) {
//     /*
//       200 - все ОК
//       301 - страница была перемещена
//       404 - страница не найдена
//       500 - серверная ошибка
//     */
//    //Выведем JSON
//     console.log(xhr.responseText);
//   }
// };

// //Создаем запрос
// xhr.open("GET", "http://example.com");
// //Указываем тип данных
// xhr.setRequestHeader("Content-type", "application/json");
// //Отправляем запрос
// xhr.send();

// const asyncFunc = (a, callback) => {
//   setTimeout( () => {
//     const b = a + 1;
//     callback(b);
//   }, 200)
// };

//
// asyncFunc(5, (val) => console.log(val))

const async = a => {
  return new Promise( (resolve, reject) => { 
    setTimeout( () => {
      if (a) {
        const b = a + 1;
        resolve(b);
      } else {
        reject("Error: argument expected");
      }
    }, 1500);
  })
};

async(5).then( (b) => {
  return sendData(b); //Вернет Promise
}).then( (res) => {
  return sendAnotherData(res); //Снова вернет Promise
}).then( (fullRes) => {
  console.log(fullRes);
}).catch( (err) => {
  console.error(err);
});


