const   request = require('request'), 
        express = require('express'),
        hue     = require('node-hue-api'),
        HueManager = require('./lib/HueManager'),
        palette = require('./data/palette'),
        convert = require('color-convert'),
        storage = require('node-persist');
        app     = express();

let user = 'nBlX8lGORmnex1fPWK60LpyESwU8G7fWgVYJISan'
let groupId = 4;
let hueManager = new HueManager(hue, user)
let isOnline = false;
let interval = 0; 
console.info("Initializing localstorage...");
// await storage.init();
console.info("Init Complete");

let checkRobloxUserOnline = () => {
    request.get('http://api.roblox.com/users/462935774/friends', (err, response) => {
        let friends = JSON.parse(response.body)
        let user
        friends.forEach(friend => {
            if(friend.Username === 'Thebiscuit5'){
                user = friend;
            }
        })
        if(user.IsOnline && !isOnline){
            console.log("User Online")
            isOnline = true;
            hueManager.flashAllLights(10);
        }else if(!user.IsOnline && isOnline){
            isOnline = false;
            console.log("User is offline")
            hueManager.flashAllLights(1);
        }
        console.log(`Interval: ${++interval}`)
        console.log(user)
    });
}

hueManager.connect().then(config => {
    hueManager.api.groups((err, groups) => {
        if (err) return console.log(err)
        hueManager.setGroups(groups);
        hueManager.setCurrentGroupId(groupId);
        checkRobloxUserOnline();
        console.log("Manager Initialized");
    })
})

app.get('/random/:groupId', (req, res, next) => {
    hueManager.setCurrentGroupId(req.params.groupId);
    console.log(groupId)
    
    hueManager.applyRandomGroupPalette();
    res.json(hueManager);
})

app.get('/random/:groupId/:lum/:sat', (req, res, next) => {
    hueManager.setCurrentGroupId(req.params.groupId);
    hueManager.setCurrentBrightness(req.params.lum);
    hueManager.setCurrentSaturation(req.params.sat);
    
    hueManager.applyRandomGroupPalette();
    res.json(hueManager);
})

app.get('/brightness/:groupId/:lum', (req, res, next) => {
    hueManager.setCurrentGroupId(req.params.groupId);
    hueManager.setCurrentBrightness(req.params.lum);
    hueManager.updateBrightness();
    res.json(hueManager);
});

app.get('/saturation/:groupId/:sat', (req, res, next) => {
    hueManager.setCurrentGroupId(req.params.groupId);
    hueManager.setCurrentSaturation(req.params.sat);
    hueManager.updateSaturation();
    res.json(hueManager);
});

app.get('/groups', (req, res, next) => {
    let groups = hueManager.getGroups();
    // if content type application/json res.json(groups);
    let response = groups.reduce((acc, group) => {
        acc.push({Name: group.name, ID: group.id})
        return acc;
    },[])
    res.json(response);
})

let intervalMinutes = 1;

setInterval(checkRobloxUserOnline, intervalMinutes * 60 * 1000);

app.listen(3456, () => console.log('Example app listening on port 3456!'))