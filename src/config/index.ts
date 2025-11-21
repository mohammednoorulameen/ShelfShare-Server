import dotenv from "dotenv";
dotenv.config();

export const config = {
  server: {
    HOST: process.env.SERVER_HOST || "localhost",
    PORT: parseInt(process.env.PORT || "4040", 10),
  },

  database: {
    URI: process.env.MONGO_URI || "mongodb://localhost:27017/shelfShare",
  },

  nodeMailer: {
    EMAIL_USER: process.env.EMAIL_USER || 'mohammednoorulameen5445@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'cjbn sgjh vzth afvu',
  },

  cors: {
    ALLOWED_ORIGIN: process.env.CORS_ALLOWED || "http://localhost:3000",
  },

  jwt: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "ACCESS_SECRET",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "REFRESH_SECRET",
    VERIFICATION_TOKEN_SECRET:
      process.env.VERIFICATION_TOKEN_SECRET || "VERIFICATION_TOKEN_SECRET",
  },
};
