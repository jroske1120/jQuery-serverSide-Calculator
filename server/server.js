let express = require('express');
let bodyParser = require('body-parser');
const app = express();

//Uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Globals
const port = 5000;

//Server up
app.listen(port, () => {
    console.log('Server is listening on port: ', port);
})

//store calculations on server
let calculations = [];

//get calculation objects history
app.get('/calculations', (req, res) => {
    res.send(calculations);
})

//Add calculation to the array
app.post('/calculations', (req, res) => {
    console.log('Got new calculation', req.body);
    calculations.push(req.body);
    res.sendStatus(200);
})

//initial result set to 0
let result = 0;

//POST that does calculation
function calculateNumbers(firstNumber, mathOperation, secondNumber) {
    if (mathOperation === '+') {
        return firstNumber + secondNumber;
    } else if (mathOperation === '-') {
        return firstNumber - secondNumber;
    } else if (mathOperation === '*') {
        return firstNumber * secondNumber;
    } else if (mathOperation === '/') {
        return firstNumber / secondNumber;
    } else {
        return 'Something went horribly wrong. Cannot do math';
    }
}