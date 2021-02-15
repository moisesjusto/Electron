const mongoss = require('mongoose');

mongoss.connect('mongodb://localhost/mi_discos',{
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
})

.then(db => console.log('init'))
.catch(e => console.log(e))