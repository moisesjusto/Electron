const na = document.getElementById('search')
const Diconet = require('disconnect').Client;
const form = document.getElementById('o');
const list = document.getElementById('carta');



//foto,formulario y canciones
const FF = document.getElementById('muestra');
const Ca = document.getElementById('cant');

//canciones
let cants = document.getElementById('cants');


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



//TODO: buscar
const search = async (e) => {

  var dis = new Diconet(auth).database();
  let OO = await dis.search(e)

  if (e.length === 0) {
    list.innerHTML = ''
  } else {
    list.innerHTML = ''
    await OO.results.map(i => {
      list.innerHTML += `
            <a href="#" class="link" onclick="ID('${i.id}','${i.type}')" >
            <div class="card mb-1">
            <div class="row g-0">
              
              <div class="col-md-4">
              <img src=${i.cover_image} class="col-md-12" >
            </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${i.title}</h5>
                  <p class="card-text">${i.type}</p>
                  
                </div>
              </div>
            </div>
          </div>
          </a>
                `
    })

  }
}


//TODO: Busqueda por id del disco y generador de img y formulario

const ID = async (i, t) => {
  na.value = ''
  list.innerHTML = ''
  FF.innerHTML = ''
  Ca.innerHTML = ''
  if (i.length === 0) {

  } else {
    if (t === 'artist') {
      GetArtist(i)
    } else if (t === 'master') {
      GetMaster(i)
    } else if (t === 'release') {
      Relase(i)
    } else {
      GetLabel(i)
    }
  }


}

//TODO: Busqueda por Label
const GetLabel = async (I) => {
  var dis = new Diconet(auth).database();
  let Data = await dis.getLabel(I)

  FF.innerHTML += `
      <div class="row">
      <div class="col-md-5">
       <div class="card ">
          <div class="col-md-12">
            <img src=${Data.images[0].uri} alt="..." class="card-img" > 
        </div>
      </div>
      </div>
      <div class="col-md-6 p-2">
       <div class="card p-1">
        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Agrega un mensage " aria-label="Recipient's username" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
        </div>
        <div class="card" >
        <div class="card-header">
            ${Data.name}
        </div>
       
      </div>
      <button class="btn btn-primary btn-block m-1"  onclick="Save('arreglo','metodo') >
        Guardar
       </button>
       </div>
      </div>

   </div>
      `

  Ca.innerHTML += `
              <li class="list-group-item">
              No Hay Canciones
               </li>
        `

}

//TODO: Busqueda por Master
const GetMaster = async (I) => {
  var dis = new Diconet(auth).database();
  let Data = await dis.getMaster(I)

  FF.innerHTML += `
      <div class="row">
      <div class="col-md-5">
       <div class="card ">
          <div class="col-md-12">
            <img src=${Data.images[0].uri} alt="..." class="card-img" > 
        </div>
      </div>
      </div>
      <div class="col-md-6 p-2">
       <div class="card p-1">
        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Agrega un mensage " aria-label="Recipient's username" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
        </div>
        <div class="card" >
        <div class="card-header">
            ${Data.title}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Stylo: ${Data.styles[0]}}
        </li>
          <li class="list-group-item">Pais: ${Data.country} </li>
          
          <li class="list-group-item">Liberada: 
            ${Data.year} </li>
            
          <li class="list-group-item">Genero: ${Data.genres[0]}</li>
        </ul>
      </div>
      <button class="btn btn-primary btn-block m-1"  onclick="Save('arreglo','metodo') >
        Guardar
       </button>
       </div>
      </div>

   </div>
      `
  Data.tracklist.map(i => {
    Ca.innerHTML += `
              <li class="list-group-item">
              ${i.position}:
               ${i.title}  
               ${i.duration}
               </li>
        `
  })
}
//TODO: Busqueda por Artista
const GetArtist = async (I) => {
  var dis = new Diconet(auth).database();
  let Data = await dis.getArtist(I)

  FF.innerHTML += `
      <div class="row">
      <div class="col-md-5">
       <div class="card ">
          <div class="col-md-12">
            <img src=${Data.images[0].uri} alt="..." class="card-img" > 
        </div>
      </div>
      </div>
      <div class="col-md-6 p-2">
       <div class="card p-1">
        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Agrega un mensage " aria-label="Recipient's username" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
        </div>
        <div class="card" >
        <div class="card-header">
            ${Data.realname} ‎
        </div>
        <ul class="list-group list-group-flush" id='ul'>
          
        </ul>
      </div>
      <button class="btn btn-primary btn-block m-1"  onclick="Save('arreglo','metodo') >
        Guardar
       </button>
       </div>
      </div>

   </div>
      `
  Ca.innerHTML += `
              <li class="list-group-item">
              No Hay Canciones
               </li>
        `
}
//TODO: Busqueda por Release
const Relase = async (I) => {
  var dis = new Diconet(auth).database();
  let Data = await dis.getRelease(I)

  FF.innerHTML += `
      <div class="row">
      <div class="col-md-5">
       <div class="card ">
          <div class="col-md-12">
            <img src=${Data.images[0].uri} alt="..." class="card-img" > 
        </div>
      </div>
      </div>
      <div class="col-md-6 p-2">
       <div class="card p-1">

        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Agrega un mensage ">
        <button class="btn btn-outline-secondary" type="button" onclick="Buto()" >Añadir</button>
        </div>

        <div class="card" >
        <div class="card-header">
            ${Data.artists_sort} ‎– ${Data.title}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Etiqueta: ${Data.labels[0].name} ‎– ${Data.labels[0].catno} </li>
          <li class="list-group-item">
            Formato: ${Data.formats[0].name}, ${Data.formats[0].descriptions}
        </li>
          <li class="list-group-item">Pais: ${Data.country} </li>
          <li class="list-group-item">Liberada: 
            ${Data.year} </li>
          <li class="list-group-item">Genero: ${Data.genres[0]}</li>
        </ul>
      </div>
      <button class="btn btn-primary btn-block m-1" onclick="Save(${Data.id})">
        Guardar
       </button>
       </div>
      </div>

   </div>
      `
  Data.tracklist.map(i => {
    Ca.innerHTML += `
              <li class="list-group-item">
              ${i.position}:
               ${i.title}  
               ${i.duration}
               </li>
        `
  })
}

const Save = (I) => {
  ipcRenderer.send('new-taks', I)
}

ipcRenderer.on('new-save', (e, args) => {
  Ca.innerHTML = ''
  cants.innerHTML = ''
  FF.innerHTML = `
  <div class="card text-center">
  <div class="card-header">
    Disco
  </div>
  <div class="card-body">
    <h5 class="card-title">${args} </h5>
    
    <a href="busqueda.html" class="btn btn-primary">Ir a Discos </a>
  </div>
  <div class="card-footer text-muted">
    
  </div>
</div>
  `
})




ipcRenderer.send('UUID','0')
ipcRenderer.on('UUID',(e,args)=>{
  const res = JSON.parse(args)
  
  FF.innerHTML += `
      <div class="row">
      <div class="col-md-5">
       <div class="card ">
          <div class="col-md-12">
            <img src=${res.img} alt="..." class="card-img" > 
        </div>
      </div>
      </div>
      <div class="col-md-6 p-2">
       <div class="card p-1">

        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Agrega un mensage ">
        <button class="btn btn-outline-secondary" type="button" onclick="Buto()" >Añadir</button>
        </div>

        <div class="card" >
        <div class="card-header">
            ${res.name} ‎– ${res.title}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Etiqueta: ${res.label[0].name} ‎– ${res.label[0].catno} </li>
          <li class="list-group-item">
            Formato: ${res.formato[0].name}, ${res.formato[0].descriptions}
        </li>
          <li class="list-group-item">Pais: ${res.Pais} </li>
          <li class="list-group-item">Liberada: 
            ${res.liberada} </li>
          <li class="list-group-item">Genero: ${res.genero[0]}</li>
        </ul>
      </div>
      <button class="btn btn-primary btn-block m-1" onclick="Edit(${res._id})">
        Guardar
       </button>
       </div>
      </div>

   </div>
      `
  res.cant.map(i => {
    Ca.innerHTML += `
              <li class="list-group-item">
              ${i.position}:
               ${i.title}  
               ${i.duration}
               </li>
        `
  })
})