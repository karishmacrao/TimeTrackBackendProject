const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./myapp/routers/router');

function main() {
    let app = express();
    //{extended:true}-the URL-encoded data will be parsed with the qs library
    //eg: ("person[name]=bobby&person[age]=3") => { person: { name: 'bobby', age: '3' } } or ("?a=b") => { '?a': 'b' }
    //value can be any type (when extended is true)
    //{extended:false}-the URL-encoded data will instead be parsed with the querystring library.
    //eg: ("person[name]=bobby&person[age]=3") => { 'person[age]': '3', 'person[name]': 'bobby' } ("?a=b") or  => { a: 'b' }
    //value can be a string or array (when extended is false)

    app.use(bodyParser.urlencoded({ extended: false }));
    //converts url with data into json string
    app.use(bodyParser.json());
    //ignores policy of same origin(host and port url) 
    app.use(cors());

    app.use('/api', apiRouter);
    
    const port = process.env.PORT === 'production' ? (process.env.PORT || 80) : 8080;
    const server = app.listen(port, function () {
        console.log('server is listening at port' + port);
    }
    );
}
    main();



