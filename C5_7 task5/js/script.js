function picRequest(valuePageNum, valueLimit) {
    return fetch(`https://picsum.photos/v2/list?page=${valuePageNum}&limit=${valueLimit}`)
        .then(response => response.json())
        .catch(() => {
            console.log('error')
            resultNode.innerHTML = '<p>Ошибка при запросе картинки.</p>'
        })
}

function displayResult(apiData) {
  let cards = '';
  
  apiData.forEach((item) => {
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

function outOfRangeMessage(valuePageNum, valueLimit) {
  const min = 1, max = 10;
  if (valuePageNum >= min && valuePageNum <= max) {
    resultNode.innerHTML = `Лимит вне диапазона от 1 до 10.`  
  } else if (valueLimit >= min && valueLimit <= max) {
    resultNode.innerHTML = `Номер страницы вне диапазона от 1 до 10.`  
  } else {
    resultNode.innerHTML = `Номер страницы и лимит вне диапазона от 1 до 10.`
  }
}

const resultNode = document.querySelector('.result');
const btnNode = document.querySelector('.btn');



 window.addEventListener("DOMContentLoaded", (event) => {
      if (localStorage.getItem('lastJson')) {
        const json = JSON.parse(localStorage.getItem('lastJson'))
        console.log(json, 'Local storage')
        displayResult(json)  
      }
 });

btnNode.addEventListener("click", async () => {
  
      const valuePageNum = document.querySelector('.inputPageNum').value;
      const valueLimit = document.querySelector('.inputLimit').value;
      const min = 1, max = 10;
  
  if ((valuePageNum >= min && valuePageNum <= max) && (valueLimit >= min && valueLimit <= max)) {
      const json = await picRequest(valuePageNum, valueLimit);
      console.log(json, 'Loaded')
      localStorage.setItem('lastJson', JSON.stringify(json))
                     
      if  (resultNode.innerHTML !== '<p>Ошибка при запросе картинки.</p>') {
        displayResult(json)  
      }  
  } else { 
      outOfRangeMessage(valuePageNum,valueLimit);
  }

});    