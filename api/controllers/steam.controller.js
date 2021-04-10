const service = require("../services/steam")
const games = require("../json/games.json")

exports.test = (req, res) => {

    res.send('Hello World!')
}

exports.getFriendList = async (req, res) => {

    let steamId = req.query.steamid

    let friendsIds = [], friendsArray = [], friendsArrayReturn = []

    const friends = await service.getFriendList(steamId).then((data) => {
        return data
    })

    friends.forEach(friend => {
        friendsArray[friend.steamid] = friend
        friendsIds.push(friend.steamid)
    })

    friendsIds = friendsIds.join()

    const friendsPlayerSummaries = await service.getPlayerSummaries(friendsIds).then((data) => {
        return data
    })

    friendsPlayerSummaries.forEach(player => {
        friendsArray[player.steamid]['nickname'] = player.personaname
        friendsArray[player.steamid]['profileurl'] = player.profileurl
        friendsArray[player.steamid]['avatar'] = player.avatar
    })

    friendsArrayReturn = Object.values(friendsArray)

    res.send(friendsArrayReturn)
}

exports.randomGame = async (req, res) => {

    let steamIds = req.query.steamids

    let steamIdsArr = steamIds.split(",")

    let apps = []

    let gameIds = await new Promise( async (resolve, reject) => { 

        let i = 0
        let intersectionGames = []
        
        getIntersectionGames = async steamIdsArr => {

            let intersectionGames = []

            for(;i < steamIdsArr.length;){

                let appsPlayer = []

                let steamId = steamIdsArr[i]
                
                let games = await service.getOwnedGames(steamId).then((data) => {
                    return data
                })

                games.forEach(game => {
                    appsPlayer.push(game.appid)
                })

                apps.push(appsPlayer)

                if(i <= 0 ){
                    intersectionGames = apps[i]
                }else{
                    intersectionGames = apps[i].filter(x => apps[(i-1)].includes(x))
                }
                i++
            }

            return intersectionGames
        }

        intersectionGames = await getIntersectionGames(steamIdsArr)

        resolve(intersectionGames)
    }).then((data) => {
        return data
    })

    let rng = Math.floor(Math.random() * gameIds.length); 

    let game = games.applist.apps.filter((app) => {
        
        if(gameIds[rng] == app.appid){
            return true
        }else{
            return false
        }
    })

    res.send(game)
}

exports.getGameList = async (req, res) => {

    res.send(games.applist.apps)
}

exports.getGame = async (req, res) => {

    let steamApp = req.query.steamappid

    let game = games.applist.apps.filter((app) => {
        
        if(steamApp == app.appid){
            return true
        }else{
            return false
        }
    })

    res.send(game)
}