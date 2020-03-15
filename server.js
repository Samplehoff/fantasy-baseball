const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
    User, sequelize
} = require('./models')

const app = express();
const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
    console.log('connected to DB');
}).catch(err => console.log('err connecting to DB', err));

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!user.verifyPassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    });
}));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findOne({
            id
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


app.get('/api/login', passport.authenticate('local', {
    failureRedirect: '/api'
}), (req, res) => {
    res.redirect('/')
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));