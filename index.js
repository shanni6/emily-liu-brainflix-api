const { v4: uuidv4 } = require("uuid");

const express = require("express");

const app = express();
const videosRoute = require("./routes/videos");

app.use(express.json());

app.listen(8080, () => {
    console.log("app listening on port 8080");
});

app.get("/register", (req, res) => {
    //   const apiKey = uuidv4();
    //   const response = {
    //       api_key: apiKey,
    //   };

    //   res.json(response);

    res.json({
        api_key: uuidv4(),
    });
});

app.use((req, res, next) => {
    if (!req.query.api_key) {
        return res.json({
            message:
                "api_key query parameter required. You may use any string (including your name) as your api_key.",
        });
    }
    next();
});

app.use("/videos", videosRoute);
