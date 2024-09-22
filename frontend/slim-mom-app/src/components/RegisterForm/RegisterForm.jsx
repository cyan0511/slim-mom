import {AuthForm} from '../AuthForm/AuthForm';

export const RegisterForm = () => {
    const fields = [
        {name: 'name', type: 'text', placeholder: 'Name *'},
        {name: 'email', type: 'email', placeholder: 'Email *'},
        {name: 'password', type: 'password', placeholder: 'Password *'},
    ];

    return (
        <AuthForm
            header="Register"
            fields={fields}
            buttonText="Register"
            footerText="Login"
            footerLink="/login"
            isLogin={false}
        />
    );
};
