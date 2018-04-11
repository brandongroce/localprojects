const Memcached = require('memcached'),
      mc = new Memcached('127.0.0.1:11211'),
      _ = require('underscore');
      udm = require('./udm.json');

let p20cookie = process.argv[2];

if(!p20cookie){
    console.log("Missing Key Parameter")
    process.exit();
}



console.log(udm.AFAuto.Sales)

mc.del(p20cookie, (err) => {
    if(!err){
        mc.set(p20cookie, JSON.stringify(udm), 1200, (err) => {
            console.log(err)
            return mc.end()
        })
    }
})

