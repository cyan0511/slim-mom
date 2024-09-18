import css from './RegisterForm.module.css';
import { AuthForm } from '../AuthForm/AuthForm';

export const RegisterForm = () => {
  const fields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];

  return (
    <div className={css.container}>
      <h1>
        Sign Up
      </h1>
      <p>
        Step into a world of hassle-free expense management! Your journey towards financial mastery begins here.
      </p>
       <AuthForm
        fields={fields}
        buttonText="Sign Up"
        footerText="Already have an account?"
        footerLink="/login"
        footerLinkText="Sign In"
        isLogin={false}
      />
    </div>
  );
};
