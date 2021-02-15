const FF = document.getElementById('muestra');
const Ca = document.getElementById('cant');

const { ipcRenderer } = require('electron');

ipcRenderer.send('UUID','a')
ipcRenderer.on('UUID',(e,args)=>{
  const res = JSON.parse(args)
  console.log(res);
  
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
      
        <div class="card-header bg-light">
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

function IM() {
    print()
}