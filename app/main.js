const { BrowserWindow, ipcMain } = require('electron');

//DB
const { rel } = require('./model/discos')
const Diconet = require('disconnect').Client;

let Datass = ''

let auth = {
    consumerKey: 'YmKrayMpwljGWudoBHbl',
    consumerSecret: 'NqQKYnCbyKnjAvZDxwwLkyXFvnhukfiW',
    token: 'pQUKVFzQQnXlqyHHoKStmbmpkkJglsKIJPBRgMff',
    tokenSecret: 'iPSkXMejhGQObrBDUyETjTPJBhvbnRWoawQsXWPd',
    authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=pQUKVFzQQnXlqyHHoKStmbmpkkJglsKIJPBRgMff'
};


function nueba_app() {
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('app/html/list.html')
}


ipcMain.on('new-taks', (e, args) => {

    guardar(args);
    e.reply('new-save', 'guardado sastifactoriamente');
})


const guardar = async (e) => {
    var dis = new Diconet(auth).database();
    let Data = await dis.getRelease(e)
    const Release = {
        name: Data.artists_sort,
        title: Data.title,
        formato: `${Data.formats[0].name}, ${Data.formats[0].descriptions}`,
        Pais: Data.country,
        liberada: Data.year,
        genero: Data.genres[0],
        img: Data.images[0].uri,
        label: `${Data.labels[0].name} ‎– ${Data.labels[0].catno}`,
        cant: Data.tracklist
    };

    console.log(Release);
    const o = new rel(Release);
    const u = await o.save();


}

//mis discos
ipcMain.on('Datos', async (e, args) => {
    console.log(args);
    const res = await rel.find();
    e.reply('Datos2', JSON.stringify(res));
})

// list de discos
ipcMain.on('Diss', async (e, args) => {
    console.log(args);
    const res = await rel.find().limit(6);
    e.reply('Diss', JSON.stringify(res));
})

// colocar el estado 
ipcMain.on('id', (e, args) => {
    Datass = args;
    console.log(Datass);
    e.reply('id', Datass);
})

// llamar el estado y buscar para editar
ipcMain.on('UUID', async (e, args) => {
    if (!Datass) {
        console.log('no esta');
    } else {
        const res = await rel.findById(Datass);
        e.reply('UUID', JSON.stringify(res));
    }
})

// elimina por ID
ipcMain.on('idd', async (e, args) => {
    if (!args) {
        console.log('no esta');
    } else {
        await rel.findByIdAndDelete(args);
        e.reply('idd', 'Disco Borrado Sastifatoriamente');
    }
})


module.exports = { nueba_app };