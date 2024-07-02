const { create } = require("apisauce")

const api = create({
    baseURL: "http://localhost:3001"
})

module.exports = api