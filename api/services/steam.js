const https = require('https')
require('dotenv').config({path:__dirname+'/./../.env'})

const STEAM_API = process.env.STEAM_API

exports.getFriendList = (steamId) => {
    return new Promise((resolve, reject) => { 
        https.get(`https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${STEAM_API}&steamid=${steamId}`, (resp) => {
            let data = '';
        
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk
            })
            
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                data = JSON.parse(data).friendslist.friends
                resolve(data)
            })
        }).on('error', reject).end()
    })
}

exports.getPlayerSummaries = (steamIds) => {
    return new Promise((resolve, reject) => { 
        https.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API}&steamids=${steamIds}`, (resp) => {
            let data = '';
        
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk
            })
            
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                data = JSON.parse(data).response.players
                resolve(data)
            })
        }).on('error', reject).end()
    })
}

exports.getOwnedGames = (steamId) => {
    return new Promise((resolve, reject) => { 
        https.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API}&steamid=${steamId}`, (resp) => {
            let data = '';
        
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk
            })
            
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                data = JSON.parse(data).response.games
                resolve(data)
            })
        }).on('error', reject).end()
    })
}