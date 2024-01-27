import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "todoapp",
    password: "ananth.2003",
    port: 5432,
  });
  
  db.connect();

  export default db;