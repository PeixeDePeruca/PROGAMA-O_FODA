import { checkToken } from '@/services/tokenConfig';
import styles from '@/styles/login.module.css';
import { setCookie , getCookie } from 'cookies-next';
import { Router, useRouter } from 'next/router';
import { useState } from 'react';
 
export default function loginPage() {

    const [formData, setFormdata]= useState({
        login: '',
        password: ''        
    });

    const router = useRouter();

    function handleFormEdit(event:any , fieldname:string) {
        setFormdata({
            ...formData,
            [fieldname] : event.target.value
        });
    }

    async function formSubmit(event:any) {
         event.preventDefault();
        
        try {
            const response = await fetch('/api/action/user/login', {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(formData)
            });


            const responseJson = await response.json();

            console.log(response.status)
            console.log(responseJson);

            if ( response.status !=200 ) {
                throw new Error(responseJson.message);
            }
            else {
                setCookie('authorization' , responseJson.token);

                router.push(`/`);
            }    
        }
        catch( err:any ) {
            alert(err.message);
        }
    }

    return(
        <main className={`flex min-h-screen`}>
            <form className={styles.formulario} onSubmit={formSubmit}>
                <div className={styles.form_container}>
                    <h1 className={styles.title}>Sistema</h1>
 
                    <input type="text" placeholder="Username" value={formData.login} onChange={(event) => {handleFormEdit(event, 'login')}} required />
                    <br />
 
                    <input type="password" placeholder="Senha" value={formData.password} onChange={(event) => {handleFormEdit(event , 'password')}} required />
                    <br/>

                    <button className={styles.form_btn}>Enviar</button>
                </div>
            </form>
        </main>
 
    );
}

export function getServerSideProps( { req, res }:any) {
    try {
        const token = getCookie('authorization' , { req , res});

        if (!token) {
            throw new Error('Invalid Token');
        }
        checkToken(token);

     return {
        redirect: {
            permanent: false,
            destination: '/'
            },
            props: {}
        }
        
    }
    catch(err) {
        return {
            props: { }
        }
    }
}
