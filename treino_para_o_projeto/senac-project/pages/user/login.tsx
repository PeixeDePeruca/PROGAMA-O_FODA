import { checkToken } from '@/services/tokenConfig';
import styles from '@/styles/login.module.css';
import { setCookie, getCookie } from 'cookies-next';
import { Router, useRouter } from 'next/router';
import { useState } from 'react';

export default function loginPage() {

    const [formData, setFormdata] = useState({
        login: '',
        password: ''
    });

    const router = useRouter();

    function handleFormEdit(event: any, fieldname: string) {
        setFormdata({
            ...formData,
            [fieldname]: event.target.value
        });
    }

    async function formSubmit(event: any) {
        event.preventDefault();

        try {
            const response = await fetch('/api/action/user/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData)
            });


            const responseJson = await response.json();

            console.log(response.status)
            console.log(responseJson);

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }
            else {
                setCookie('authorization', responseJson.token);

                router.push(`/`);
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <main>
            <form className={styles.formulario} onSubmit={formSubmit}>
                <div className={styles.form_container}>

                    <h1 className={styles.title}>Film</h1>
                    <h1 className={styles.title_2}>hub</h1>
                    <br /><br />
                    <h1 className={styles.text}>Acesse sua conta</h1>
                    <br /><br />

                    <input className={styles.form_login} type="text" placeholder="Nome de Usuário" value={formData.login}
                        onChange={(event) => { handleFormEdit(event, 'login') }} required />
                    <br />
                    <input className={styles.form_login} type="password" placeholder="Senha" value={formData.password}
                        onChange={(event) => { handleFormEdit(event, 'password') }} required />
                    <br />

                    <button className={styles.form_btn}>Enviar</button>
                    <br />  <br />
                    <a className={styles.rec_password} href="#">Esqueceu o Nome de Usuário ou Senha?</a>
                    <br /> <br />
                    <a className={styles.reg_member} href="/user/register">Ainda não tem perfil? Registrar-se aqui</a>
                </div>
            </form>
        </main>

    );
}

export function getServerSideProps({ req, res }: any) {
    try {
        const token = getCookie('authorization', { req, res });

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
    catch (err) {
        return {
            props: {}
        }
    }
}
