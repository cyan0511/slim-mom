import css from './LoginForm.module.css';
import { AuthForm } from '../AuthForm/AuthForm';

export const LoginForm = () => {

  const fields = [
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];


  return (
    <div className={css.container}>
      <h1>
        Log In
      </h1>
      <p>
        Welcome back to effortless expense tracking! Your financial dashboard awaits..
      </p>

      <AuthForm
        fields={fields}
        buttonText="Sign In"
        footerText="Don't have an account?"
        footerLink="/signup"
        footerLinkText="Sign Up"
        isLogin={true}
      />

    </div>
  );
};
