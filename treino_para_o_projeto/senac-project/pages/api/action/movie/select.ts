import { NextApiRequest, NextApiResponse } from "next";
import { selectMovies } from "../../controller/MovieController";

export default async (req: NextApiRequest , res: NextApiResponse) => {
    if ( req.method != 'GET' ) {
        return res.status(403).json({ message: 'Method not allowed' });
    }

    const response:any = await selectMovies();

    if ( response.message != undefined ) {
        return res.status(403).json(response);
    }
    else {
        return res.status(200).json(response);
    }
}