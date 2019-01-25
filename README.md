# @sdk_cy/tiny-server

 @sdk_cy/tiny-server is capable of creation http server, performing different actions(just C.R.U.D.) based on different HTTP request and URL.
## Installation

Use the package manager [npm](https://www.npmjs.com/) to install tiny-server.

```bash
npm install @sdkcy/tiny-server
```

## Usage

```javascript
const tiny = require("@sdkcy/tiny-server");
const port =
 8000;
const app = tiny();

app.get("/testGet", (req, res) => {
    res.setHeaders({"Content-Type": "text/html", "X-Authorization": "Bearer " + "key"});
    res.status(200).send("Get request successful");
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