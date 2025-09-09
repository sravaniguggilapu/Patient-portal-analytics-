const Database = require('better-sqlite3');
const db = new Database('data.db');

module.exports = function init(){
  db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'patient'
  )`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS rpm (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    metric TEXT,
    value REAL,
    ts INTEGER
  )`).run();

  const user = db.prepare('SELECT * FROM users WHERE email=?').get('demo@patient.test');
  if(!user){
    const bcrypt = require('bcryptjs');
    const pw = bcrypt.hashSync('demo123',8);
    db.prepare('INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)').run('Demo Patient','demo@patient.test',pw,'patient');
    db.prepare('INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)').run('Dr Clinician','clinician@health.test',bcrypt.hashSync('clinician123',8),'clinician');

    const now = Date.now();
    const insert = db.prepare('INSERT INTO rpm (user_id, metric, value, ts) VALUES (?,?,?,?)');
    for(let d=0; d<30; d++){
      const t = now - (29-d)*24*3600*1000;
      insert.run(1,'heart_rate',60 + Math.round(Math.random()*30), t);
      insert.run(1,'glucose',80 + Math.round(Math.random()*60), t);
    }
  }
}
