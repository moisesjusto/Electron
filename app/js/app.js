const na = document.getElementById('search')
const form = document.getElementById('o');
const list = document.getElementById('list');
const Mio = document.getElementById('mio');

//TODO: conesiones
const Diconet = require('disconnect').Client;

const { ipcRenderer } = require('electron');

//TODO: autenticacon de la api de discos
let auth = {
    consumerKey: 'YmKrayMpwljGWudoBHbl',
    consumerSecret: 'NqQKYnCbyKnjAvZDxwwLkyXFvnhukfiW',
    token: 'pQUKVFzQQnXlqyHHoKStmbmpkkJglsKIJPBRgMff',
    tokenSecret: 'iPSkXMejhGQObrBDUyETjTPJBhvbnRWoawQsXWPd',
    authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=pQUKVFzQQnXlqyHHoKStmbmpkkJglsKIJPBRgMff'
};


//TODO: input de busqueda
form.addEventListener('input', e => {
    e.preventDefault();
    search(na.value)
})


//TODO: busqueda de discos por nombre y instantanea
const search = async (e) => {
    var dis = new Diconet(auth).database();
    let OO = await dis.search(e)
    if (e.length === 0) {
        list.innerHTML = ''
        await OO.results.map(i => {
            list.innerHTML += `
            <div class="col-md-2 cuadro" onclick="ID('${i.id}','${i.type}')">
                <img
                src=${i.cover_image}
                alt="..."
                class="card-img"
              />
            </div>
            `
        })

        
    } else {
        let OO = await dis.search(e)
        list.innerHTML = ''
        await OO.results.map(i => {
            list.innerHTML += `
            <div class="col-md-2 p-1 cuadro" onclick="ID('${i.id}','${i.type}')">
                <img
                src=${i.cover_image}
                alt="..."
                class="card-img"
              />
            </div>
            `
        })
    }
}

//TODO: Ejecuta por si solo la busquedad instantanea
function name() {
    search('')
}
name()


//TODO: busqueda por id del disco
 const ID =  (i,t) => {
    const Dta =[i,t]
    
    //ipcRenderer.send('new', Dta ) 

}

const Discos = async () => {
    ipcRenderer.send('Diss','Disco')
}

Discos();


ipcRenderer.on('Diss',(e,args)=>{
    const res = JSON.parse(args);
    console.log(res);
    res.map(i=>{
        Mio.innerHTML+=`

        
        <div class="col-md-2 mb-2 id='${i._id}' ">
        <a href='#'>
        <img
          src=${i.img}
          alt="..."
          class="card-img"
        />
        </a>
      </div>
      
    `
    })
})





