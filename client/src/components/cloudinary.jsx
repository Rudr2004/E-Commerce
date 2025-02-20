import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'your-cloud-name',
    api_key: 'your-api-key',
    api_secret: 'your-api-secret',
});

const generateImageUrl = (publicId, options) => {
    return cloudinary.url(publicId, options);
};

export default generateImageUrl;