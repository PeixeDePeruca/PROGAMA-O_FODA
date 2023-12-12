import { findMovieByNameModel } from "../model/movie";
import { createRatingModel, deleteRatingModel, findRatingByUserAndMovie } from "../model/rating";
import { findUserByEmail } from "../model/user";


export async function createRating(value: number, comment: string,
    email: string, movieName: string) {
    try {

        if (value < 0 || value > 5) {
            return { message: "invalid rating" }
        }

        const userByEmail = await findUserByEmail(email);

        if (userByEmail == undefined) {
            return { message: "User not found" };
        }

        const movieByName = await findMovieByNameModel(movieName);

        if (movieByName == undefined) {
            return { message: "Movie not found" };
        }

        const RatingByUserAndMovie = await findRatingByUserAndMovie(userByEmail.id, movieByName.id);

        if (RatingByUserAndMovie != undefined) {
            return { message: "Rating already exist" }
        }


        const response = await createRatingModel (value, comment, userByEmail.id, movieByName.id);

        return response;


    }
    catch (err) {
        return { message: "Something went wrong" };
    }
}