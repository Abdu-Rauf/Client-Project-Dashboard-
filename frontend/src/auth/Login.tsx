import AuthForm from '../components/AuthForm/AuthForm.tsx'
import SubmitButton from '../components/SubmitButton.tsx'

export default function Login() {
  return (
    <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
      <AuthForm />
      <SubmitButton buttonName="login" />
    </form>
  )
}
