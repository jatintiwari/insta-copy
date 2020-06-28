const express = require("express");
// import React from 'react'; // es6 imports
// const React = require('react'); // node import

const app = express();

const environment = process.env.NODE_ENV || "development"; // if something else isn't setting ENV, use development
const configuration = require("../knexfile")[environment]; // require environment's settings from knexfile
const database = require("knex")(configuration);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res, next) => {
    database("users").then((data) => res.json(data));
});

app.get("/users/:id", (req, res, next) => {
    database("users")
        .where("id", req.params.id)
        .then((data) => res.json(data));
});

app.delete("/users/:id", (req, res, next) => {
    database("users")
        .where("id", req.params.id)
        .delete()
        .then((data) => res.json(data));
});

app.post("/users", (req, res, next) => {
    const body = req.body;
    const { first_name, last_name } = body;
    console.log("adding => ", { first_name, last_name });
    database("users")
        .insert({ first_name, last_name })
        .then((data) => res.status(201).json({ success: true }));
});

app.put("/users/:id", (req, res, next) => {
    const body = req.body;
    const { first_name, last_name } = body;
    console.log("updating => ", { first_name, last_name });
    database("users")
        .where("id", req.params.id)
        .update({ first_name, last_name })
        .then((data) => res.json({ success: !!data }));
});

app.listen(4567, () => {
    console.log("http://localhost:4567");
});

app.use((error, req, res, next) => {
    console.error(`Error: `, error.message);
    res.status(400).json({ error: error.message });
});

process.on("unhandledRejection", (error) => {
    console.log("unhandledRejection", error.message);
});
