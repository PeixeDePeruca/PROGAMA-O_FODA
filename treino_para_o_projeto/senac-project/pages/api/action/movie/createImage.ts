import { NextApiRequest , NextApiResponse } from "next";
import { getImage } from '@/utils/formidable';
import { uploadImage } from '@/utils/cloudinary';


export const config = {
    api: {
        bodyParser: false,
    },
}

export default async (req: NextApiRequest , res: NextApiResponse) => {
    if ( req.method != 'POST' ) {
        return res.status(403).json({ message: 'Method not allowed'});
    }

    const imageUploaded = await getImage(req);

    if (!imageUploaded) {
        return res.status(403).json({ messge: "Can't handle this file" });
    }

    //Deu tudo certo, vamos enviar a imagem para o cloudinary.
    const imgData = await uploadImage(imageUploaded[0].filepath);


    return res.status(200).json(imgData);
}