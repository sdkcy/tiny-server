# @sdk_cy/tiny-server

 @sdk_cy/tiny-server is capable of creation server, performing different actions(just C.R.U.D.) based on different HTTP request and URL.
## Installation

Use the package manager [npm](https://www.npmjs.com/) to install tiny-server.

```bash
npm install @sdk_cy/tiny-server
```

## Usage

```javascript
const tiny = require("@sdk_cy/tiny-server");
const port = 8000;
const app = tiny();

app.get("/testGet", (req, res) => {
    res.setHeaders({"Content-Type": "text/html", "X-Authorization": "Bearer " + "key"});
    res.status(200).send("Get request successful");
});

app.get("/testGetParam", function (req, res) {
    const params = req.params;
    const id = params.id;
    return res.status(200).send(id);
});

app.post("/testPost", function (req, res) {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    }).on("end", () => {
        body = Buffer.concat(body).toString();
        return res.status(200).send(body);
    });
});

app.put("/testPut", function (req, res) {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    }).on("end", () => {
        body = Buffer.concat(body).toString();
        return res.status(200).send(body);
    });
});

app.delete("/testDelete", function (req, res) {
    const params = req.params;
    return res.status(200).send(params.id);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Error: ', err)
    }
    console.log("Server is listening on ", port)
});
```

##Middleware usage

```javascript
const tiny = require("@sdk_cy/tiny-server");
const bodyParser = require('body-parser');

const port = 8000;
const app = tiny();
app.use(bodyParser.json());

app.post("/testPost", function (req, res) {
    return res.status(200).send(JSON.stringify(req.body));
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Error: ', err)
    }
    console.log("Server is listening on ", port)
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
