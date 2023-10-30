import session, { SessionOptions } from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { Client } from "model/entities";
import { IClient } from "model/types/client";

export const sessionConfig: SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: new session.MemoryStore(),
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
};

passport.use(
  new Strategy({ usernameField: "email" }, async (email: string, password: string, done: Function) => {
    try {
      const client = await Client.findClientBy("email", email);

      if (!client) return done(null, false);

      const matchedPassword = await bcrypt.compare(password, client.password);

      if (!matchedPassword) return done(null, false);

      return done(null, client);
    } catch (error) {
      return done(error);
    }
  })
);
// Serialize a client
passport.serializeUser((client: IClient, done) => {
  done(null, client.id);
});
// Deserialize a client
passport.deserializeUser(async (id: string, done) => {
  try {
    const client = await Client.findClientBy("id", id);
    return done(null, client);
  } catch (error) {
    return done(error);
  }
});
