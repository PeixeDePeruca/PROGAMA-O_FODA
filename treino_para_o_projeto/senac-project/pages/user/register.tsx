
import styles from '@/styles/register.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function registerPage() {
    const [formData , setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const router = useRouter();

    function handleFormEdit(event: any , fieldName:string) {
        setFormData({
            ...formData,
            [fieldName] : event.target.value
        });
    }

    async function formSubmit(event:any) {
        event.preventDefault();

        try {
            
            const response = await fetch('/api/action/user/create', {
                method: 'POST' ,
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(formData)
            });

            const responseJson = await response.json();

            console.log(response.status);
            console.log(responseJson);

        if (response.status !=201) {
            throw new Error (responseJson.message);  
        }   
        else {
            alert('Account Created');
            router.push('/user/login');
        }

    }    
        catch (err:any) {
            console.log(err);
            alert(err.message)
        }
    }        

    return (
        <main className={styles.main}>
            <form className={styles.formulario} onSubmit={formSubmit}>
                <div className={styles.form_container}>

                <input type="text" placeholder="Digite o seu nome" onChange={(event) => {handleFormEdit(event, 'name') } } value={formData.name} className='mt-10'/>
                <br />
                <input type="email" placeholder="Email" min={9} max={64} required onChange={(event) => {handleFormEdit(event, 'email') } } value={formData.email}/>
                <br />
                <input type="text" placeholder="Usuário" min={5} max={32} required onChange={(event) => {handleFormEdit(event, 'username') } } value={formData.username}/>
                <br />  
                <input type="password" placeholder="Senha" min={6} max={32} required onChange={(event) => {handleFormEdit(event, 'password') } } value={formData.password}/>
                <br />
                <input type="password" placeholder="Confirmação de Senha" min={6} max={32} required onChange={(event) => {handleFormEdit(event, 'confirmPassword') } } value={formData.confirmPassword}/>
                <br />

                <button className={styles.form_btn}>Enviar</button>
                </div>
            </form>
        </main>
    );
}