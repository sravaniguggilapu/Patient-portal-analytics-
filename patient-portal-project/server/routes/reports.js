const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('data.db');
const createCsvWriter = require('csv-writer').createObjectCsvStringifier;
const jwt = require('jsonwebtoken');
const SECRET = 'dev-secret-please-change';

function auth(req,res,next){
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({error:'no auth'});
  const token = h.replace('Bearer ','');
  try{req.user = jwt.verify(token, SECRET); next();}catch(e){res.status(401).json({error:'invalid token'});} 
}

router.get('/export/patient/:id', auth, (req,res)=>{
  const id = Number(req.params.id);
  if(req.user.role!=='clinician' && req.user.id !== id) return res.status(403).json({error:'forbidden'});
  const rows = db.prepare('SELECT metric, value, ts FROM rpm WHERE user_id=? ORDER BY ts ASC').all(id);
  const csv = createCsvWriter({header:[{id:'metric', title:'Metric'},{id:'value', title:'Value'},{id:'ts', title:'Timestamp'}]}).stringifyRecords(rows.map(r=>({metric:r.metric, value:r.value, ts:new Date(r.ts).toISOString()})));
  res.setHeader('Content-disposition', 'attachment; filename=report.csv');
  res.setHeader('Content-Type','text/csv');
  res.send(csv);
});

module.exports = router;
