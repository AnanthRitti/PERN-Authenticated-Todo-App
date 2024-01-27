import express from "express";
import db from './db.js';
import cors from "cors";
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())

app.get("/todos/:userEmail", async (req, res) => {
    const userEmail = req.params.userEmail;

    try {
        const result = await db.query("SELECT * FROM todos where user_email = $1", [userEmail]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
    }
});

app.post("/todos", async (req, res) => {
    const { user_email, title, progress } = req.body;
    try {
        const result = await db.query("INSERT INTO todos(user_email, title, progress) VALUES($1, $2, $3)", [user_email, title, progress]);
        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { user_email, title, progress } = req.body;
    try {
        const result = await db.query("UPDATE todos SET user_email = $1, title = $2, progress=$3 WHERE id=$4", [user_email, title, progress, id]);
        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const result = await db.query("DELETE from todos WHERE id=$1", [id]);
    res.json(result);
});

app.post("/login", async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const login = await db.query('SELECT * FROM users WHERE email=$1', [Email]);

        if (!login.rows.length) return res.json({ detail: 'user does not exist' });

        const success = await bcrypt.compare(Password, login.rows[0].hashed_pass);

        if (success) {
            const token = jsonwebtoken.sign({ Email }, 'secret', { expiresIn: '1hr' });
            res.json({ 'Email': login.rows[0].email, 'token': token });
        } else {
            res.json({ 'detail': 'login failed' });
        }
    } catch (err) {
        console.error(err);
    }
});

app.post("/signup", async (req, res) => {
    const { Email, Password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(Password, salt);

    try {
        const signup = await db.query(`INSERT INTO users (email,hashed_pass) VALUES ($1,$2)`, [Email, hashPassword]);
        const token = jsonwebtoken.sign({ Email }, 'secret', { expiresIn: '1hr' });
        res.json({ Email, token });
    } catch (err) {
        console.error(err);
        if (err) {
            res.json({ 'detail': err.detail });
        }
    }
});

app.listen(port, () => {
    console.log("Serving running on 3000...");
});
