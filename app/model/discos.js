const { Schema, model } = require('mongoose');

const Release = new Schema({
    name: { type: String },
    title: { type: String },
    formato: { type: String },
    Pais: { type: String },
    liberada: { type: String },
    genero: { type: String },
    img: { type: String },
    label: { type: String },
    cant: { type: Array }
});
const Artista = new Schema({
    name: { type: String },
    img: { type: String }

});
const Master = new Schema({
    img: { type: String },
    title: { type: String },
    stylo: { type: String },
    Pais: { type: String },
    año: { type: String },
    genero: { type: String }
});
const Label = new Schema({
    img: { type: String },
    name: { type: String }
    
});

const rel =  model('Release', Release);
const art =  model('Artista', Artista);
const mast =   model('Master', Master);
const lab =  model('Label', Label);

module.exports = { rel, art, mast, lab }