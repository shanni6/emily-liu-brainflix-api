const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const fs = require("node:fs");
const { error } = require("node:console");
const videosFilePath = "./data/videos.json";
router.get("/", (req, res) => {
    fs.readFile(videosFilePath, "utf8", (error, data) => {
        if (error) throw error;
        data = JSON.parse(data);
        res.json(data);
    });
});

router.get("/:id", (req, res) => {
    fs.readFile(videosFilePath, "utf8", (error, data) => {
        if (error) throw error;
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === req.params.id) {
                return res.json(data[i]);
            }
        }
        return res.status(404).json({ message: "video not found" });
    });
    // res.json(videos.find((video) => video.id === req.params.id));
});

router.post("/", (req, res) => {
    const video = req.body;
    video.id = uuidv4();
    video.timestamp = Date.now();
    videos.push(video);
    res.json(video);
});

module.exports = router;
