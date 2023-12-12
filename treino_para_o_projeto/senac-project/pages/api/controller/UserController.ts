import { createUserModel, findUserByEmail, findUserByUsername, findUserLoginByEmail, findUserLoginByUserName } from "../model/user";
import {generateToken , checkToken } from '@/services/tokenConfig';

export async function createUser(name:string, email:string, username:string, password:string, confirmPassword: string) {
    try{
        if(password != confirmPassword){
            return { message: 'Passwords dont match' };
        }
        const userByEmail = await findUserByEmail(email);
        if( userByEmail != undefined ) {
            return { message: 'Email already registered'};
        }
        const userByUsername = await findUserByUsername (username);
        if( userByUsername != undefined) {
            return {message: 'Username already registered'};
        }
        const response = await createUserModel(name, email, username, password);
        return response;
    }
    catch(err) {
        return { message: 'Something went wrong' }
    }
}
export async function singIn(login:string, password:string) {
    try {
        const userByEmail = await findUserLoginByEmail(login, password);
        const userByUsername = await findUserLoginByUserName(login, password);
        var email;

        if ( userByEmail == undefined && userByUsername == undefined){
            return { message: 'Invalid Login or Password'}
        }


        if ( userByEmail != undefined ) {
            email = userByEmail.email;
        } else {
            email = userByUsername?.email;
        }

        const _token = generateToken(email);

        return { token: _token };

    }
    catch {
        return { message: 'Something went wrong'}
    }
}