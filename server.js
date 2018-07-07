

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

let apiKey = '85d2d208623eed8f7bfa7e8ccd6a8aa2';


app.use(express.static('public'))  // To use the .css file
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/',function(req,res) {
  res.render('index', {weather: null, error : null})
})

app.post('/', function (req, res) {
  let city = req.body.city
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function(err,response,body){
    if (err) {
      res.render('index',{weather: null, error: 'Error, please try again'})
    }
    else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index',{weather: null, error: 'Error, please try again'})
      }
      else {
        console.log('Made it here')
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`
        res.render('index',{weather: weatherText, error: null})
      }
    }
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})