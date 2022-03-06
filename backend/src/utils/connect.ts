import mongoose from 'mongoose';
import config from 'config'
import logger from './logger';


 const connect=async()=> {
     const DATABASE_URL = config.get<string>("DATABASE_URL");
    await mongoose.connect(DATABASE_URL).then(() => { logger.info('Connected') }).catch((err) => {
        logger.error('Could not connect to database');
        process.exit(1)
     });
}

export default connect