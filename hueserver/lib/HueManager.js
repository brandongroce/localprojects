

module.exports = class HueManager {

    constructor(hue, user) {
        this.hue = hue
        this.user = user || null
        this.api = null;
        this.lum = 100;
        this.sat = 100;
        return this;
    }

    connect(){
        console.log("Connecting...")
        return this.getBridge().then((bridge) => {
            let api = this.getApi();
            console.log("Fetched Bridge, api created");
            return new Promise((resolve, reject) => {
                console.log("getting config");
                api.config((err, config) => {
                    if (err) reject(err);
                    if (config) {
                        this.config = config;
                        resolve(config);
                    }
                })
            })
        })
    }

    getBridge() {
        console.log("Getting Bridge");
        if (this.bridge) return Promise.resolve(this.bridge);

        return new Promise((resolve, reject) => {
            return this.hue.nupnpSearch().then((bridges, err) => {
                if (err) reject(err)
                if (bridges.length > 1) reject("Only 1 bridge is supported at this time")
                
                this.bridge = bridges[0]
                resolve(this.bridge)
            }).catch(err => {
                reject(err)
            })
        })
    }

    shufflePalette(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    getApi() {
        if(this.api) return this.api;
        if(!this.bridge) throw new Error("No Bridge Available")
        let api
        if(this.user){
            api = new this.hue.HueApi(this.bridge.ipaddress, this.user)
        } else {
            api = new this.hue.HueApi()
        }
        this.api = api
        return this.api
    }

    createUser(){
        if(!this.bridge) return Promise.reject("No Bridge Available")
        if(this.user) return Promise.reject("User already exists")
        if(this.api) return Promise.reject("Api already created")

        let api = this.getApi();
        console.log('registering user')
        return new Promise((resolve, reject) => {
            api.registerUser(bridge.ipaddress).then((user, err) => {
                if(err){
                    reject("Link button not pressed.  Press link button prior to creating a user: ", err);
                } else {
                    this.user = user
                    fulfill(user)
                }
            })
        })
    }

    setGroups(groups){
        this.groups = groups;
        return this;
    }

    getGroups(){
        return this.groups;
    }

    getGroup(groupId){
        let group;
        this.groups.forEach(g => {
            if(g.id == groupId){
                group = g;
            }
        })
        return group;
    }

    setCurrentGroupId(id){
        this.groupId = id;
        return this;
    }

    getRandomColor(){
        let hue = Math.floor(Math.random() * (360 - 0))
        return [hue, this.sat, this.lum]
    }

    getRandomGroupPalette(){
        let colors = [];
        for(let i = 0; i < this.getGroup(this.groupId).lights.length; i++){
            colors.push(this.getRandomColor())
        }

        return colors;
        //return this.shufflePalette(colors)
    }

    setCurrentBrightness(lum){
        this.lum = lum;
    }

    setCurrentSaturation(sat){
        this.sat = sat;
    }

    applyRandomGroupPalette(){
        console.log(this.groups[this.groupId]);
        console.log(this.groups);
        let lights = this.getGroup(this.groupId).lights;
        let colors = this.getRandomGroupPalette();
        let lastIndex = colors.length - 1;
        let index = 0;
        lights.forEach(light => {
            let state = this.hue.lightState.create().on().hsb(...colors[index]).transitionTime(20);
            console.log("light: ", light, " color: ", colors[index], " index: ", index);
            this.api.setLightState(light, state);
            index = (index === lastIndex)? 0: index + 1;
        });
    }

    updateBrightness(){
        let state = this.hue.lightState.create().on().brightness(this.lum);
        this.api.setGroupLightState(this.groupId, state);
    }

    updateSaturation(){
        let state = this.hue.lightState.create().on().saturation(this.sat);
        this.api.setGroupLightState(this.groupId, state);
    }

    flashAllLights(count){
        let state = this.hue.lightState.create()
        if(count === 10){
            state.alertLong()
        }else{
            state.alertShort()
        }
        this.api.setGroupLightState(0, state)
    }
}