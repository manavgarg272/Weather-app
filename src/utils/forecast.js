const request  = require('request')

const forecast = (latitude,longitude,callback)=>{
   
    const url = 'https://api.darksky.net/forecast/5e7ad96a6b97360d535e8bc4860f508c/' + latitude + ',' + longitude
     request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
      }
      else if(body.error){
            callback('Unable to find location', undefined)
      }
      else{
           callback(undefined,body.daily.data[0].summary + 'it is currently' + body.currently.temperature + ' degree out ' + body.currently.precipProbability + ' % chance of rain')
      }

     })
    
}

module.exports = forecast
