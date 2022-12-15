//Note : if we add or create an file in application then we have to restart the server
//       or you can run this command 'nodemon src/app.js -e js,hbs'  it will restart the server by it self when any changes detect in js or hbs file.


//it is an inbuilt module
import path from 'path'
import { fileURLToPath } from 'url';
import express from 'express'
import hbs from 'hbs'
import forecast from './utils/forecast.js'
import geocode from './utils/geocode.js'
//here we create an express application
//require('express') returns a function reference. that function is called with express() . app is an object returned by express().
//Actually it instantiates Express and assigns app variable to it.
const app = express()
//you cant use direct __dirname or __filename because ECMAscript module doesnt contain it
//console.log(__dirname);
//new mathod
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



console.log(__dirname);
//by using join mathod you can change your path by joining new part of path
console.log(path.join(__dirname, '../public'));



const pubilcdirpath = path.join(__dirname, '../public')
//hbs can find the default path (views/) from directory but if we customize the path according to us then we have let knows hns that what exactly path is.
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)


//if we set an page by using app.use() the app.get() at that endpoint will not render now you can access any file or dir public by simapally adding /about.html or /weather.html
//here we use static means the asets we used are static
app.use(express.static(pubilcdirpath))



//here we use hbs which help us to render dynamic file it's run handlebar behind the sence
//Using hbs as the default view engine requires just one line of code in your app setup. This will render .hbs files when res.render is called.
app.set('view engine', 'hbs');
//here we set the new path to views
app.set('views', viewsPath)


//end points
app.get('',(req,res)=>{
    //here we render an dynamic file not send
    //here first arrgument is file name it will find by it self so don't make file with same name
    //here the second arrgument that we pass to the dynamic file 
    res.render('index',{
        title: 'Weather',
        name: 'Jack'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Jack'
    })
})

app.get('/help',(req,res)=>{ 
    res.render('help',{
        title: 'Help',
        name: 'Jack'
    })
})

app.get('/help/*',(req,res)=>{ 
    res.render('error',{
        title:'404 Error',
        name: 'jack',
        errorMessage: 'Help Article not Found!'
    })
})

//handling query strings
//we can start query by ? and add new query by &
app.get('/product',(req,res)=>{
    //you can't send more then one response at a time so warp your response in 'if-else'  or return it directly
    //here query is an object that contain key , value pair of URL query part
    if(!req.query.search)
    {
        return res.send({
            error: 'Please Provide search term!'
        })
    }
    console.log(req.query);
    res.send({
        product: []
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'Please Provide an address!'
        })
    }
    //taking from weather-app app.js
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ 
                error:error 
            })
        }
        //if geocode will generate then we pass that data to forecast function to get weather status
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            console.log(forecastData);
            return res.send({
                forecast: forecastData,
                location: location,
                latitude: latitude,
                longitude: longitude
            })
        })
    })
    
    console.log(req.query);
    // res.send({
    //     forecst: 'It is cloudy Day',
    //     location: 'India',
    //     address: req.query.address
    // })
})

//we have to write this case at bottom because javascript run form top-bottom * means any URL
app.get('*',(req,res)=>{ 
    res.render('error',{
        title:'404 Error',
        name: 'jack',
        errorMessage: 'Page Not Found!'
    })
})



//base page
//you can send object , array of object (JSON data) as well as html 
// app.get('',(req,res)=>{
//by using send method you can only sent static data , file , or string
//     res.send('<h1>hey , Jack is here!</h1>')
// })

//listing end points
// app.get('/help',(req,res)=>{
//     res.send({
//         forecast:'it is raining',
//         location: 'india'
//     })
// })
// app.get('/about',(req,res)=>{
//     res.send('About Section!')
// })
// app.get('/weather',(req,res)=>{
//     res.send('Getting an weather Report!')
// })
//here we listing the port from where any request comes form and server send response to it
app.listen(3000,()=>{
    console.log('server started!');
})