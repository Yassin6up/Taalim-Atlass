const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require("./db");

function initialize(passport) {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { username: username },
                });

                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    // Facebook Strategy for Passport
    passport.use(new FacebookStrategy({
        clientID: '696109156013241',
        clientSecret: '98bfd2470d097be2c2d60cd6f9429ba0',
        callbackURL: 'http://localhost:5000/auth/facebook/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        let result = null;

        try {
            result = await prisma.user.findUnique({
                where: {
                    id: Number(profile.id) 
                }
            });

            if (!result) {
                

                result = await prisma.user.create({
                    data: {
                        id: Number(profile.id) ,
                        name: profile.displayName,
                        age: profile.ageRange,
                        gender: profile.gender,
                        photo: profile.profileUrl,
                        email: "test@gmail.com", // Use .value to get the email address
                    }
                });
            }
        } catch (error) {
            // Handle the error
            console.error('Error in Facebook strategy:', error);
        }

        if (result !== null) {
            const token = jwt.sign(result, 'yassinkokabi4', { expiresIn: '5s' });
            return done(null, { result, token });
        }
    }));

    // Serialize and deserialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: id },
            });

            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

module.exports = initialize;
