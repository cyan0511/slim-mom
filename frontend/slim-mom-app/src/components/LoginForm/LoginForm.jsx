import {AuthForm} from '../AuthForm/AuthForm';

export const LoginForm = () => {

    const fields = [
        {name: 'email', type: 'email', placeholder: 'Email *'},
        {name: 'password', type: 'password', placeholder: 'Password *'},
    ];


    return (
        <AuthForm
            header="Log in"
            fields={fields}
            buttonText="Log in"
            footerText="Register"
            footerLink="/register"
            footerLinkText="Sign Up"
            isLogin={true}
        />
    );
};
