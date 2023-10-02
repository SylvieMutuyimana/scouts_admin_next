import { v4 as uuidv4 } from 'uuid'; 
import { connectDatabase } from '../assets/db.js';
import { cloudinary_endpoint } from '../endpoints.js';

export const postOrUpdate = async (req, res, isUpdate = false) => {
    const table = req.params.table;
    if (!endpoint) {
        return res.status(404).json({ error: 'Endpoint not found' });
    }
    try {
        const new_det = req.body.details;
        const db = await connectDatabase();
        if (isUpdate) {
            const theid = new_det.id;
            delete new_det.id;
            await db.collection(endpoint.collection).updateOne(
                { _id: theid },
                { $set: new_det }
            );
        } else {
            new_det.id = uuidv4();
            if (req.files && req.files.image) {
                const imageFile = req.files.image;
                const cloudinaryResponse = await cloudinary_endpoint.uploader.upload(imageFile.tempFilePath, {
                    folder: endpoint.cloud_folder
                });
                const imageUrl = cloudinaryResponse.secure_url;
                new_det.image = imageUrl;
            }
            await db.collection(endpoint.collection).insertOne(new_det);
        }

        res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
