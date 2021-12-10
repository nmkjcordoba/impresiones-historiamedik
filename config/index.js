const ENVIRONMENT = process.env.ENVIRONMENT || 'staging';

const config = {
    production: {
        BD_SERVER: process.env.BD_SERVER,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME_PRODUCTION,
        

    },
    staging: {
        BD_SERVER: process.env.BD_SERVER,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME_STAGING,
        
    },
    
  };
  
  module.exports = config[ENVIRONMENT];