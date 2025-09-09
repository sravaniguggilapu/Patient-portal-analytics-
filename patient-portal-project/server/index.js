const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const rpmRoutes = require('./routes/rpm');
const reports = require('./routes/reports');
const dbInit = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
dbInit();

app.use('/api/auth', authRoutes);
app.use('/api/rpm', rpmRoutes);
app.use('/api/reports', reports);

app.get('/', (req,res)=>res.json({ok:true, message:'Patient Portal Server'}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Server started on', PORT));
