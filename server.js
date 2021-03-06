const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
    User, sequelize
} = require('./models');
const routes = require('./routes');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'))
});



sequelize.sync({/*force: true*/}).then(() => {
    console.log('connected to DB');

    

    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({
            where: { username }
        }).then(user => {
            if (!user) {
                return done(null, false);
            }
            if (!user.comparePassword(password)) {
                return done(null, false);
            }
            return done(null, user.dataValues);
        }).catch(err => done(err));
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser(async (id, cb) => {
        try {
            const user = await User.findOne({
                where: {id}
            });
            cb(null, user)
        } catch (err) {

        }
    });

    app.use(session({
        secret: 'change this',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', routes);

    app.listen(PORT, () => console.log(`Server started on ${PORT}`));

}).catch(err => console.log('err connecting to DB', err));