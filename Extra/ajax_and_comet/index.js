function loadPhones() {

  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'phones.json', true);


  xhr.send();


  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    button.innerHTML = 'Готово!';

    if (xhr.status != 200) {
      // обработать ошибку
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      // вывести результат
      let phones = null;
      try {
        phones = parsePhones(xhr.responseText);
      } catch (error) {
        console.error(`Некорректный ответ ${error.message}`);
        return;
      }
      renderPhones(phones);
    }

  }

  function parsePhones(text) {
    return JSON.parse(text);
  }

  function renderPhones(phones) {
    const renderedPhones = phones.map( phone => 
      `<li>${phone.name}</li>` );
    // const listEl = document.querySelector('.phoneList');
    phoneList.innerHTML = renderedPhones.join("");
  }
  
  button.innerHTML = 'Загружаю...';
  button.disabled = true;
}