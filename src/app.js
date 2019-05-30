const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')
const port = process.env.PORT || 3000
// define path for express configration
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPaths = path.join(__dirname,'../template/partials')

//setup handlebar engine and view location
app.use(express.static(publicDirectoryPath))

// Setup static directory to work 
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPaths)

console.log(geocode)

app.get('/weather',(req,res)=>{
   if(!req.query.address){
      return res.send({
         error:'provide the address'
      })

   }

   geocode(req.query.address,(error,{longitude ,latitude,location} = {}) =>{
      if(error){
         return res.send({error})
      }

      forecast(latitude,longitude,(error,forecastData)=>{
       if(error){
          return res.send({error })
       }
       
       res.send({
         forecast: forecastData,
         location:location,
         address:req.query.address
       })
       
      })
 })

 })
app.get('/about',(req,res)=>{ 
   res.render('about.hbs',{
        title:'it is about',
       name:'manav garg'
   })
 })
app.get('',(req,res)=>{
  res.render('index.hbs',{
      title:'Weather app',
      name:'manav garg'
  })
})

app.get('/help',(req,res)=>{
   res.render('help.hbs',{
        title:'it is help',
       helptext:'please help',
       name:'help name'
   })
 })

 app.get('/help/*',(req,res)=>{
   res.render('404',{
        title:'it is help 404',
       errormessage:'please help error 404',
       name:'manav garg'
   })
 })
 app.get('*',(req,res)=>{
   res.render('404',{
        title:'404',
       errormessage:'404 error',
       name:'manav garg'
   })
 })
 
 

app.listen(port,() =>{
   console.log('server in on port' + port)
})