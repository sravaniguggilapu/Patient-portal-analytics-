const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('data.db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'dev-secret-please-change';

router.post('/login', (req,res)=>{
  const {email,password} = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email=?').get(email);
  if(!user) return res.status(401).json({error:'Invalid'});
  if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({error:'Invalid'});
  const token = jwt.sign({id:user.id,email:user.email,role:user.role,name:user.name}, SECRET, {expiresIn:'12h'});
  res.json({token,user:{id:user.id,email:user.email,role:user.role,name:user.name}});
});

router.post('/register', (req,res)=>{
  const {name,email,password} = req.body;
  try{
    const hashed = bcrypt.hashSync(password,8);
    db.prepare('INSERT INTO users (name,email,password) VALUES (?,?,?)').run(name,email,hashed);
    res.json({ok:true});
  }catch(e){
    res.status(400).json({error:e.message});
  }
});

module.exports = router;
