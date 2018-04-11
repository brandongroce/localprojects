const Memcached = require('memcached'),
      mc = new Memcached('127.0.0.1:11211'),
      _ = require('underscore');

let p20cookie = process.argv[2];


// Apply UDM segments to response as needed
let buildResponse = (udm, res) => {
  res = udm;
  return res;
}

// Log it
mc.get(p20cookie, (err, data) => {
    let res = {}

    try {

      let udm = JSON.parse(data)
      res = buildResponse(udm, res);
    }catch(e){
      res.errorMsg = "not found: "+p20cookie;
      res.error = e.message;
    }

    console.log(JSON.stringify(res))
    return mc.end()
})
