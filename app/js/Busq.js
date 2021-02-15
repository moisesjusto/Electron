const na = document.getElementById('search')
const Diconet = require('disconnect').Client;
const form = document.getElementById('o');
const list = document.getElementById('busq');


const { ipcRenderer } = require('electron');


let auth = {
    consumerKey: 'YmKrayMpwljGWudoBHbl',
    consumerSecret: 'NqQKYnCbyKnjAvZDxwwLkyXFvnhukfiW',
    token: 'pQUKVFzQQnXlqyHHoKStmbmpkkJglsKIJPBRgMff',
    tokenSecret: 'iPSkXMejhGQObrBDUyETjTPJBhvbnRWoawQsXWPd',
    authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=pQUKVFzQQnXlqyHHoKStmbmpkkJglsKIJPBRgMff'
};


form.addEventListener('input', e => {
    e.preventDefault();
    search(na.value)

})

const search = async (e) => {
    var dis = new Diconet(auth).database();
    //let OO=  await dis.getRelease(543135)
    //console.log(OO);
    let OO = await dis.search(e)
    if (e.length === 0) {
        list.innerHTML = ''
        await OO.results.map(i => {
            list.innerHTML += `
            <div class="col-md-2 cuadro">
              <a href="#">
                <img
                src=${i.cover_image}
                alt="..."
                class="card-img"
              />
              </a>
            </div>
            `
        })

        
    } else {
        let OO = await dis.search(e)
        list.innerHTML = ''
        await OO.results.map(i => {
            list.innerHTML += `
            <div class="col-md-2 p-1 cuadro">
              <a href="#">
                <img
                src=${i.cover_image}
                alt="..."
                class="card-img"
              />
              </a>
            </div>
            `
        })
    }
}

function name() {
    search('')
}
name()


/* const Data = {
    name: na.value,
    ape: lastname.value
}
ipcRenderer.send('new-taks', Data) */




