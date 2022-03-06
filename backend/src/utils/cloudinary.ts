import config from 'config'
import { v2 } from 'cloudinary';

v2.config({
    cloud_name: config.get('CLOUD_NAME'),
    api_key: config.get('CLOUDINARY_API_KEY'),
    api_secret: config.get('CLOUDINARY_API_SECRET')
});

export default v2;