const urlBase = 'https://picsum.photos/';

const resultNode = document.querySelector('.result');
const btnNode = document.querySelector('.btn');

function picRequest(valueWidth, valueHeight) {
    return fetch(urlBase + valueWidth +'/'+ valueHeight)
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(() => {
            console.log('error')
            resultNode.innerHTML = '<p>Ошибка при запросе картинки.</p>'
        })
}

btnNode.addEventListener("click", async () => {
  
      const valueWidth = document.querySelector('.inputWidth').value;
      const valueHeight = document.querySelector('.inputHeight').value;
      const min = 100, max = 300;
  
  if ((valueWidth >= min && valueWidth <= max) && (valueHeight >= min && valueHeight <= max)) {
      const url = await picRequest(valueWidth, valueHeight);
      if  (resultNode.innerHTML !== '<p>Ошибка при запросе картинки.</p>') {
        resultNode.innerHTML = `<img src='${url}' alt='image'>`  
      }  
  } else {
    resultNode.innerHTML = `одно из чисел вне диапазона от ${min} до ${max}.`  
  }

});    