import { NextApiRequest , NextApiResponse } from "next";
import { createMovie } from "../../controller/MovieController";

export default async (req: NextApiRequest , res: NextApiResponse) => {
    if ( req.method != 'POST' ) {
        return res.status(403).json({ message: 'Method not allowed' });
    }

    const { name, releaseDate, imageURL } = req.body;

    const response:any = await createMovie(name , releaseDate , imageURL);

    if ( response.message != undefined ) {
        return res.status(403).json(response);
    }
    else {
        return res.status(200).json(response);
    }
}