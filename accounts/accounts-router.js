const express = require("express");

const db = require("../data/dbConfig.js");
const { del } = require("../data/dbConfig.js");

const router = express.Router();

router.post("/", (req, res) => {
    const account = req.body;
    db("accounts")
        .insert(account)
        .returning("id") 
        .then(ids => {
            res.status(201).json({ inserted: ids });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
});

router.get("/", (req, res) => {
    db.select("*")
        .from("accounts")
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    const accountId = req.params.id;
    db("accounts")
        .where({ id: accountId })
        .update(changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: "updated successfully" });
            } else {
                res.status(404).json({ message: "not found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
});

router.delete("/:id", (req, res) => {
    const accountId = req.params.id;
    db("accounts")
        .where({ id: accountId })
        .del() 
        .then(count => {
            if (count) {
                res.status(200).json({ 
                    message: "removed successfully" 
                });
            } else {
                res.status(404).json({ 
                    message: "not found" 
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ 
                error: error.message 
            });
        });
});

module.exports = router; 