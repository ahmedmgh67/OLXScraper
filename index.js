const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const PORT = process.env.PORT || 3333
const path = require('path')
const url =  "https://www.olx.com.eg/";


async function getLatestAds(req, res){
  
  var request = await axios.get(url)
  // console.log(request.data)
  
  
  var data = []
  var $ = cheerio.load(request.data)
  var adsItemsList = $(".ads__item")
  var adsItemsTitlesList = $(".ads__item__ad--title")
  var adsItemsPhotosList = $(".ads__item__photos")
  var adsItemsPriceList = $(".ads__item__price")
  var adsItemsCategoryList = $(".ads__item__breadcrumbs")
  var adsItemsLocationList = $(".ads__item__location")
  for (let i = 0; i < adsItemsList.length; i++) {
    console.log(i)
    var object = {}
    object.title =  adsItemsTitlesList[i].childNodes[0].data
    object.photoURL = $(adsItemsPhotosList[i]).attr('src')
    object.price = adsItemsPriceList[i].childNodes[0].data
    object.category = adsItemsCategoryList[i].childNodes[0].data
    object.location = adsItemsLocationList[i].childNodes[0].data
    
    data.push(object)
  }
  
  
  // res.json(data)
  res.render('index', {data: data})
}




var app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/api/latestAds", getLatestAds)



app.listen(PORT, ()=> console.log("App Running!"))