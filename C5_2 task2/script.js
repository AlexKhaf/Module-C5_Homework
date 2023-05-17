const jsonStr = `{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`;

const jsData = JSON.parse(jsonStr);
const list = jsData.list;

let result = { 
  list:[]
};
let resultElem = {};

for (let elem of list) {
  resultElem.name = elem.name;
  resultElem.age = Number(elem.age);
  resultElem.prof = elem.prof;

  result.list.push(resultElem);
  resultElem = {};
}

console.log("result", result)

