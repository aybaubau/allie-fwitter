const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy,
  xtractJwt = require('passport-jwt').ExtractJwt;

const { comparePassword, fetchUserByUsernameFromDb, fetchUserByIdFromDb } = require('../model/userOrm');

const localStrategy = new LocalStrategy(async (username, password, done) => {
//  Find a user with some given criteria
  //   if an error happened when you tried to find that user
  //   call done like this done(err, null);
  let user;
  try {
    user = await fetchUserByUsernameFromDb(username);
  } catch (e) {
    return done(e, null);
  }
  //   if you do find a user, check the users credentials
//   if the users credentials match, call done like this done(null, userWeFound);
//   What passport will do if we pass a user as the 2nd param to done
//   on the next request that the middleware applied
  if (user) {
    const doesPasswordMatch = await comparePassword(password, user.password);
    if (doesPasswordMatch) {
      return done(null, user);
    }
    return done(null, false);
  } else {
    return done(null, false);
  }
//   if no user was found call done like return done(null, false);
});

// const jwtOptions = {
//   // Look specifically from the header where it's called authorization
//   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//   secretOrKey: process.env.JWT_SECRET,
// };
//
// const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtToken, done) => {
//   console.log(jwtToken);
//   let user;
//   try {
//     user = await fetchUserByIdFromDb(jwtToken.sub);
//   } catch (e) {
//     return done(e, false);
//   }
//   if (!user) {
//     return done(null, false);
//   } else {
//     return done(null, user);
//   }
// });


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtToken, done) => {
  console.log(jwtToken);
  let user;
  try {
    user = await fetchUserByIdFromDb(jwtToken.sub);
  } catch (e) {
    return done(e, null);
  }
  if (!user) {
    return done(null, false);
  } else {
    return done(null, user);
  }
});

// Hey passport we have declare a strategy named 'local'
// if we tell you to authenticate using 'local'
// run the localStrategy function that we gave to you
passport.use(localStrategy);
passport.use(jwtStrategy);
