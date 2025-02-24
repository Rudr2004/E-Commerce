const url = `https://api.cloudinary.com/v1_1/dxnbxg50o/image/upload`;

const uploadFile = async (file) => {
    if (!file) {
        console.error("No file provided for upload.");
        return null;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "chat-app");

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log("Cloudinary Upload Response:", data);

        if (!response.ok) {
            console.error("Upload failed:", data);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
};

export default uploadFile;
