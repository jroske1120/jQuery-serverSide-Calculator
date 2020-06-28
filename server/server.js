const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
let calcHistory = [];
let result = 0;

//Serve static files
app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended:true}));
//Request to port
app.listen(port, () => {
    console.log('Server is running on port:', port);    
})
//POST request
app.post('/calculate', (req, res) => {
    result = calculateNum(Number(req.body.firstNumber), req.body.mathOperation, Number(req.body.secondNumber));
    console.log('The result is', result);
    req.body.result = result;
    calcHistory.push(req.body)
    console.log(calcHistory);
    res.sendStatus(200);
})

//GET request for calculation result
app.get('/result', (req, res) => {
    let newExpression = calcHistory[calcHistory.length - 1];
    console.log('The new expression is', newExpression);
    res.send(newExpression);
})

//GET request for calculation history
app.get('/history', (req, res) => {
    res.send(calcHistory);
})

//Function to calculate data from POST request
function calculateNum(firstNumber, operator, secondNumber) {
    if(operator === '+') {
        result = (firstNumber + secondNumber).toFixed(1);
    } else if(operator === '-') {
        result = (firstNumber - secondNumber).toFixed(1);
    } else if(operator === '*') {
        result = (firstNumber * secondNumber).toFixed(1);
    } else if(operator === '/') {
        result = (firstNumber / secondNumber).toFixed(1);
    }
    return result;
}