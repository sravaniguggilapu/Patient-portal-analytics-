const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('data.db');
const jwt = require('jsonwebtoken');
const SECRET = 'dev-secret-please-change';

function auth(req,res,next){
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({error:'no auth'});
  const token = h.replace('Bearer ','');
  try{
    req.user = jwt.verify(token, SECRET);
    next();
  }catch(e){res.status(401).json({error:'invalid token'});} 
}

router.get('/latest', auth, (req,res)=>{
  const rows = db.prepare('SELECT metric, value, ts FROM rpm WHERE user_id=? ORDER BY ts DESC').all(req.user.id);
  res.json(rows);
});

router.get('/timeseries/:metric', auth, (req,res)=>{
  const metric = req.params.metric;
  const rows = db.prepare('SELECT value, ts FROM rpm WHERE user_id=? AND metric=? ORDER BY ts ASC').all(req.user.id, metric);
  res.json(rows);
});

router.post('/push', auth, (req,res)=>{
  const {metric, value} = req.body;
  db.prepare('INSERT INTO rpm (user_id,metric,value,ts) VALUES (?,?,?,?)').run(req.user.id, metric, value, Date.now());
  res.json({ok:true});
});

router.get('/patients', auth, (req,res)=>{
  if(req.user.role !== 'clinician') return res.status(403).json({error:'forbidden'});
  const patients = db.prepare("SELECT id,name,email FROM users WHERE role='patient'").all();
  res.json(patients);
});

module.exports = router;
