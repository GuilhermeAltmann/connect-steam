const steamController = require("../controllers/steam.controller")

module.exports = (app) => {
    app.get("/api/test", steamController.test)
    app.get("/api/getFriendList", steamController.getFriendList)
    app.get("/api/randomGame", steamController.randomGame)
    app.get("/api/getGameList", steamController.getGameList)
    app.get("/api/getGame", steamController.getGame)
}
