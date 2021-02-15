const { ipcRenderer } = require('electron')

const MD = document.getElementById('MD');



const Discos = async () => {
  ipcRenderer.send('Datos', 'hola')
}

Discos();

ipcRenderer.on('Datos2', (e, args) => {
  const res = JSON.parse(args);
  res.map(i => {
    MD.innerHTML += `
    <div class="col-md-2 p-1 m-lg-2 card-group  border  rounded   bg-light BOX " onclick="ID('${i._id}')" >
            <img
              src=${i.img}
              class="card-img img-thumbnail"
            />
            <div class="card-title ">
              <p class="">${i.name} - ${i.title}</p>
              
            </div>
          </div>
    `
  })
})

// targeta de botones
const ID = (e) => {
  ipcRenderer.send('id', e)
  MD.innerHTML = ''
  MD.innerHTML = `
  <div class="card text-center m-1">
  
  <div class="card-body">
    <h5 class="card-title">Oprime Un Boton</h5>
    <a href="Inpr.html" class="btn btn-primary">Ver</a>
    <a href="index.html" class="btn btn-light">Editar</a>
    <button class="btn btn-danger" onclick="IDD('${e}')" >Borrar</button>
  </div>
  <div class="card-footer">
  <a href="busqueda.html" class="btn btn-secondary">X</a>
  </div>
</div>
  `
}
const IDD = (e) => {
  console.log(e);
  ipcRenderer.send('idd', e)
}

ipcRenderer.on('idd', (e, args) => {
  MD.innerHTML = ''
  MD.innerHTML = `
  <div class="card text-center m-3" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${args}</h5>
    <a href="busqueda.html" class="btn btn-primary">X</a>
  </div>
</div>
  `
})