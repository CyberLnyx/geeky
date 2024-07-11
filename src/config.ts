const config = {
  API_URL: import.meta.env.VITE_API_URL,
  FIRE_BASE: {
    API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // DATABASEURL: import.meta.env.VITE_DATABASEURL,
    PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
    //   MEASUREMENTID: import.meta.env.VITE_MEASUREMENTID,
  },
  GOOGLE: {
    //   API_KEY: import.meta.env.VITE_GOOGLE_API_KEY,
    //   CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    //   SECRET: import.meta.env.VITE_GOOGLE_SECRET_KEY,
  },
  FACEBOOK: {
    //   APP_ID: import.meta.env.VITE_FACEBOOK_APP_ID,
  },
};

export default config;
