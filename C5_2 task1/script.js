const xmlStr = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const parser = new DOMParser();
const DomJs = parser.parseFromString(xmlStr, "text/xml");
// console.log('DomJs', DomJs);

const listNode = DomJs.querySelector('list');
let studentNode = listNode.querySelector('student');
let jsObj = {
  list:[]
};
let jsObjElem = {};
let i = 0;

while (studentNode) {
  // console.log('studentNode', studentNode);
  let nameNode = studentNode.querySelector('name');
  let firstNode = nameNode.querySelector('first');
  let secondNode = nameNode.querySelector('second');
  jsObjElem.name = firstNode.textContent + ' ' + secondNode.textContent
  
  let ageNode = studentNode.querySelector('age');
  jsObjElem.age = Number(ageNode.textContent);
  
  let profNode = studentNode.querySelector('prof');
  jsObjElem.prof = profNode.textContent;
  
  jsObjElem.lang = nameNode.getAttribute("lang");
  
  jsObj.list.push(jsObjElem);
  studentNode = studentNode.nextElementSibling;
  i += 1;
  jsObjElem = {};
}

console.log('jsObj', jsObj);