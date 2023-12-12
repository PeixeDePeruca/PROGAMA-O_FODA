import { createMovieModel, findMovieByNameModel, selectMoviesModel } from "../model/movie";

export async function createMovie(name: string, releasedate: string, imageURL: string) {
    try {
        const movieByName = await findMovieByNameModel(name);

        if (movieByName != undefined) {
            return { message: "Já tem esse filme doido,cadastre outro Movie" };
        }

        const response = await createMovieModel(name, releasedate, imageURL);
        return response;

    }
    catch (err) {
        return { message: "Something went errado :/ " };
    }
}

export async function selectMovies() {
    try {
        const movies = await selectMoviesModel();

        return movies;

    }
    catch (err) {
        return { message: "Something went wrong" };
    }
}

export async function findMovieByName(name: string) {
    try {
        const movie = await findMovieByNameModel(name);

        if (movie == undefined) {
            return { message: "Movie not found" };
        }
        return movie;

    }
    catch (err) {
        return { message: "Something went werong" };
    }
}