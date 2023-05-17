const urlBase = 'https://picsum.photos/v2/list?limit=';

const resultNode = document.querySelector('.result');
const btnNode = document.querySelector('.btn');

function picRequest(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
    };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();  
 };

function displayResult(apiData) {
  let cards = '';
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
    
  resultNode.innerHTML = cards;
}

function displayNoResult(inputValue) {
  if (inputValue === "") {
    resultNode.innerHTML = `<h3 class="result">Вы не ввели значение. Введите целое число от 1 до 10.</h3>`;
  } else {
  resultNode.innerHTML = `<h3 class="result">Вы ввели ${inputValue}. Данное значение не подходит. Введите целое число от 1 до 10.</h3>`;
  }
}

btnNode.addEventListener("click", () => {
      const valueStr = document.querySelector('input').value;
      const valueNum = Number(valueStr);
        
      if (valueNum >= 1 && valueNum <= 10) {
          picRequest(urlBase + valueStr, displayResult)
      } else {
          displayNoResult(valueStr);
      } 
});    

