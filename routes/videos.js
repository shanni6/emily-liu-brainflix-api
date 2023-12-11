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
    let data = fs.readFileSync("data/videos.json", "utf-8");
    data = JSON.parse(data);

    const video = req.body;
    video.id = uuidv4();
    video.timestamp = Date.now();
    video.likes = "0";
    video.views = "0";
    video.comments = [];
    video.duration = "0:00";
    video.image = "upload.jpg";
    video.video = "video.mp4";

    data.push(video);
    fs.writeFileSync("data/videos.json", JSON.stringify(data));
    res.json(video);
});

router.post("/:id/comments", (req, res) => {
    const videoId = req.params.id;
    const newComment = req.body;
    newComment.id = uuidv4();
    newComment.timestamp = Date.now();
    newComment.likes = 0;

    let data = fs.readFileSync("data/videos.json", "utf-8");
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === videoId) {
            data[i].comments.push(newComment);
        }
    }
    fs.writeFileSync("data/videos.json", JSON.stringify(data));

    res.json(newComment);
});

router.delete("/:videoId/comments/:commentId", (req, res) => {
    const videoId = req.params.videoId;
    const commentId = req.params.commentId;
    let data = fs.readFileSync("data/videos.json", "utf-8");
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === videoId) {
            for (let j = 0; j < data[i].comments.length; j++) {
                if (data[i].comments[j].id === commentId) {
                    const comment = data[i].comments[j];
                    data[i].comments.splice(j, 1);
                    fs.writeFileSync("data/videos.json", JSON.stringify(data));
                    return res.json(comment);
                }
            }
        }
    }
});
router.put("/:id/likes", (req, res) => {
    const videoId = req.params.id;

    let data = fs.readFileSync("data/videos.json", "utf-8");
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === videoId) {
            data[i].likes = Number.parseInt(data[i].likes.replace(",", "")) + 1;
            data[i].likes = data[i].likes.toLocaleString();
            fs.writeFileSync("data/videos.json", JSON.stringify(data));
            return res.json(data[i]);
        }
    }
});

module.exports = router;
