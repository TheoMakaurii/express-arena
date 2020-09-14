'use strict';

const e = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/sum', (req, res)=> {
  const sum= parseInt(req.query.a,10) + parseInt(req.query.b,10);
  res.send(`the sum of ${req.query.a} and ${req.query.b} is ${sum}`)

});

app.get('/cipher', (req, res)=> {
  const text= [...req.query.text];
  const shift= parseInt(req.query.shift);
  for(let i =0; i< text.length; i++){

    let code= text[i].charCodeAt(0);
    code += shift;
    text[i]= String.fromCharCode(code);
  }
  res.send(text.join(''));
  
});

app.get('/endpoint', (req, res)=> {
  const reqArr = req.query.numbers;
  for(let i = 0; i < reqArr.length; i++){
    reqArr[i] = parseInt(reqArr[i], 10);
  }

  const newArr = [];
  for(let i = 0; i < 6; i++)
    newArr.push(Math.floor(Math.random() * 20) + 1);

  let counter = 0;
  for(let i = 0; i < reqArr.length; i++){
    if(newArr.includes(reqArr[i]))
      counter++;
  }

  console.log(counter);

  if(counter < 4)
    res.send('Sorry, you lose');
  else if(counter === 5 ) 
    res.send('Congratulations! You win $100!');
  else  
    res.send('Congratulations, you win a free ticket');

});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

