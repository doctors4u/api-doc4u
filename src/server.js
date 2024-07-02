require("dotenv").config();

const app = require("./app");

app.listen(7777, () => {
    console.log("server running in port 7777")
})
