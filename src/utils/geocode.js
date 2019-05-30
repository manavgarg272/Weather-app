
const request  = require('request')


const geocode = (address,callback)=>{
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibWFuYXYyNzIiLCJhIjoiY2p3NWJjY2Y2MHVjdzN6czRnZDFjdTN6bCJ9.yb00nhMgYsybDMuxOlphLQ'
    
   request({url,json:true} ,(error,{body})=>{
      if(error){
            callback('error due internet problem',undefined)
      }
      else if(body.features.length === 0){
            callback('error due to wrong info',undefined)
      }
      else{
           callback(undefined,{
               longitude: body.features[0].center[0],
               latitude: body.features[0].center[1],
               location: body.features[0].place_name
           })
      }
})
} 

module.exports = geocode