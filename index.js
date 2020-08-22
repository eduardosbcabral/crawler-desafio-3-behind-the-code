const cheerio = require('cheerio');
const got = require('got');

const TedTalks = require('./TedTalks');
const OlharDigital = require('./OlharDigital');
const StartSe = require('./StartSe');
const URLS = require('./urls');
const fs = require('fs');
const path = require('path');

const request = require('request');
const iconv = require("iconv-lite");

const fileFolder = './arquivos';

if (!fs.existsSync(fileFolder)){
    fs.mkdirSync(fileFolder);
} else {
  fs.readdir(fileFolder, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(fileFolder, file), err => {
        if (err) throw err;
      });
    }
  });
}

URLS.forEach(currentUrl => {
  request({uri: currentUrl, encoding: 'binary'}, function(err, response, bodyRequest) {
    
    let body;

    if(isSite(currentUrl) === 1) {
      body = iconv.decode(bodyRequest, "utf-8");
    } else if(isSite(currentUrl) === 2) {
      body = iconv.decode(bodyRequest, "iso-8859-1");
    } else if(isSite(currentUrl) === 3) {
      body = iconv.decode(bodyRequest, "utf-8");
    } 

    const $ = cheerio.load(body);
  
    const site = checkSite($, currentUrl);
  
    if(!site) {
      return;
    }
  
    const data = {
      title: site.getTitle(),
      author: site.getAuthor(),
      url: site.getUrl(),
      type: site.getType(),
      body: site.getBody()
    };

    const titleLowerCase = data.title.toLowerCase();
    let titleWithoutEmptySpace = titleLowerCase.replace(/\s/g, '_');
    if(titleWithoutEmptySpace[titleWithoutEmptySpace.length-1]==='_'){
      titleWithoutEmptySpace = titleWithoutEmptySpace.substring(0, titleWithoutEmptySpace.length -1);
    }
    if(titleWithoutEmptySpace[titleWithoutEmptySpace.length-1]==='.') {
      titleWithoutEmptySpace = titleWithoutEmptySpace.substring(0, titleWithoutEmptySpace.length -1);
    }

    const filePath = `arquivos/${site.getSite()}-${titleWithoutEmptySpace}.json`;

    fs.writeFile(filePath, JSON.stringify(data, null, 2).replace(/\\/g,''), function (err) {
      if(err) return console.log(err);
    })
  });

});

function checkSite($, url) {
  if(url.includes('www.ted.com')) {
    return new TedTalks($, url);
  }

  if(url.includes('olhardigital.com.br')) {
    return new OlharDigital($, url);
  }

  if(url.includes('www.startse.com')) {
    return new StartSe($, url);
  }
}

function isSite(url) {
  if(url.includes('www.ted.com')) {
    return 1;
  }

  if(url.includes('olhardigital.com.br')) {
    return 2;
  }

  if(url.includes('startse.com')) {
    return 3;
  }

  return 0;
}