function tableCreate(gamet) {
  let rownames=["Game Code","Title","Regions","Version"]
  let rowfields=["code","name","regions","version"]
  let rows=gamet.length;
  const body = document.body,
        tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.style.border = '1px solid rgb(6, 182, 44)';
  
  //headers
  const tr = tbl.insertRow();
  for (let j = 0; j < 4; j++){
    const td = tr.insertCell(j);
    td.appendChild(document.createTextNode([rownames[j]]));
    td.style.border = '1px solid rgb(6, 182, 44)';
    td.style.color='rgb(6, 182, 44)';
    td.style.fontSize='15px';
    td.style.fontWeight='bold';
    if (j===1){
      td.style.width = '61%';
    }
    else{
      td.style.width = '13%';
    }
  
  }
  
  for (let i = 0; i < rows; i++) {
    const tr = tbl.insertRow();   
    for (let j = 0; j < 4; j++){
      const td = tr.insertCell(j);
      td.appendChild(document.createTextNode(gamet[i][rowfields[j]]));
      //td.style.border = '1px solid rgb(6, 182, 44)';
      td.style.color='rgb(6, 182, 44)';
      td.style.fontSize='15px';
    }
  }
  body.appendChild(tbl);
  body.appendChild(document.createElement('p'));

}

let data=[];
fetch('./gamelist/gdata.json')
  .then(response => response.json())
  .then(json => data = (json));

const f = document.getElementById('form');
const q = document.getElementById('query');

function submitted(event) {
  //console.log({ data })
  event.preventDefault();

  var tables= document.getElementsByTagName('table');
  while (tables.length>0){
    tables[0].parentNode.removeChild(tables[0]);
  }
    

  const text=q.value;
  let codelist=[]
  for (var i = 0; i < data.length; i++){
    let name=data[i]["name"].toLowerCase();
    if (name.includes(text.toLowerCase())){
      let thiscode=data[i]["code"];
      if (codelist.indexOf(thiscode) === -1) {
        codelist.push(thiscode);
      }
    }  
  }
  let gamelist=[];
  for (var i = 0; i < codelist.length; i++){
    let curcode=codelist[i];
    let templist=[];
    for (var j = 0; j < data.length; j++){
      if (curcode===data[j]["code"]){
        templist.push(data[j]);
      }
    }
    gamelist.push(templist);
  }
  console.log(gamelist)
  
  for (var i = 0; i < gamelist.length; i++){
    tableCreate(gamelist[i]);
  }

}

f.addEventListener('submit', submitted);
