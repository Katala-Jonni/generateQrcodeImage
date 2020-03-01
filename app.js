const express = require('express');
const exphbs = require('express-handlebars');
const hbsHelpers = require('./utils/hbs-helpers');

const indexRouter = require('./routes/index');

const app = express();

// создание hbs
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: hbsHelpers
});

// регистрируем в express движок handlebarse
app.engine('hbs', hbs.engine);
// используем движок
app.set('view engine', 'hbs');
// указываем, где лежат views
app.set('views', 'views');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log('app is start');
});

// module.exports = app;
