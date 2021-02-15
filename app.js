//import
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs-extra');
const Diconet = require('disconnect').Client;




//ini
const App = express();



//midergues
App.use(cors())
App.use(morgan('dev'))
App.use(express.json())


//routers
App.get('/', async (req, res) => {

    //const db = new Diconet().database();
    //await  db.getRelease(176126);
    var dis = new Diconet({ token: 'djUZyJSOxsqlMFdOrReGqliUziaaqxlhnPcGgIlw' })
    console.log(dis);;
    // var col = new Diconet().user().collection();
    // var o = await col.getReleases('laxexideltumbao', 0);
    // res.json(o.releases[0])
    res.send('ok')
})

App.get('/authorize', (req, res) => {
    var oAuth = new Diconet().oauth();
    oAuth.getRequestToken(
        'YmKrayMpwljGWudoBHbl',
        'NqQKYnCbyKnjAvZDxwwLkyXFvnhukfiW',
        'http://localhost:3000/callback',
        function (err, requestData) {
            // Persist "requestData" here so that the callback handler can 
            // access it later after returning from the authorize url
            console.log(requestData);
            res.redirect(requestData.authorizeUrl);
        }
    );
});

App.get('/callback', async (req, res) => {
    var oAuth = new Diconet({
        method: 'oauth',
        level: 0,
        consumerKey: 'YmKrayMpwljGWudoBHbl',
        consumerSecret: 'NqQKYnCbyKnjAvZDxwwLkyXFvnhukfiW',
        token: 'pQUKVFzQQnXlqyHHoKStmbmpkkJglsKIJPBRgMff',
        tokenSecret: 'iPSkXMejhGQObrBDUyETjTPJBhvbnRWoawQsXWPd',
        authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=pQUKVFzQQnXlqyHHoKStmbmpkkJglsKIJPBRgMff'
    }).oauth();
    let accessData = await oAuth.getAccessToken(req.query.oauth_verifier);
    console.log(accessData);
    res.send('ok')

});



let auth = {
    consumerKey: 'YmKrayMpwljGWudoBHbl',
    consumerSecret: 'NqQKYnCbyKnjAvZDxwwLkyXFvnhukfiW',
    token: 'pQUKVFzQQnXlqyHHoKStmbmpkkJglsKIJPBRgMff',
    tokenSecret: 'iPSkXMejhGQObrBDUyETjTPJBhvbnRWoawQsXWPd',
    authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=pQUKVFzQQnXlqyHHoKStmbmpkkJglsKIJPBRgMff'
};


App.get('/identity', async (req, res)=> {
    var dis = new Diconet(auth).database();
    //let OO=  await dis.getRelease(543135)
    //console.log(OO);
    let OO = await dis.search('Various')
    console.log(OO);
        res.send('ok');
    
});



App.use(express.urlencoded({ extended: false }))




App.listen(3000, () => {
    console.log('init');
}) 

