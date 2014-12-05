exports.start = function () {
    var Express = require('express');

    var app = Express();
    app.configure(function () {
        app.use(Express.logger());
        app.use(Express.bodyParser());
        app.use(Express.compress());
        app.use(Express.cookieParser());
        app.use(Express.session({ secret: 'iuBviX21'}));

        app.use(Express.json());
        app.use(Express.urlencoded());
        app.use(Express.multipart());
    });

    app.post('*', function (req, res) {
        try {
            require('./routes/routes').handler(req, res);
        }
        catch (e) {
//            console.log("error: " + e + " url: " + req.url);
            res.jsonp("error: " + e + " url: " + req.url);
        }
    });

    app.listen(Number(process.env.PORT || 8080));
};


