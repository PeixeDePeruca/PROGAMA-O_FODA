import { NextApiRequest , NextApiResponse } from "next";
import { createRating } from "../../controller/RatingController";


export default async (req: NextApiRequest , res: NextApiResponse) => {
    if ( req.method != 'POST' ) {
        return res.status(403).json({ message: 'Method not allowed' });
    }

    const { value, comment, email, movieName } = req.body;

    const response:any = await createRating(value , comment , email, movieName);

    if ( response.message != undefined ) {
        return res.status(403).json(response);
    }
    else {
        return res.status(201).json(response);
    }
}