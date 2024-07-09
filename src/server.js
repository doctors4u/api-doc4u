require("dotenv").config();

const app = require("./app");

app.listen(8888, () => {
    console.log("server running in port 8888")
})
