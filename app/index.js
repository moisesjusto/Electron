const { nueba_app } = require('./main');
const { app } = require('electron');

require('./db/database')

app.whenReady().then(nueba_app)
app.allowRendererProcessReuse = true;