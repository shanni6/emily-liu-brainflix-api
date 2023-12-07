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

app.use("/videos", videosRoute);
