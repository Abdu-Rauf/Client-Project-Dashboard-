import AuthForm from '../components/AuthForm/AuthForm.tsx'
import SubmitButton from '../components/SubmitButton.tsx'

const roles = ['Admin', 'Developer', 'Project Manager'] as const

export default function Register() {
  return (
    <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
      <AuthForm />
      <label>
        Role
        <select name="role" defaultValue="">
          <option value="" disabled>
            Select a role
          </option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>
      <SubmitButton buttonName="register" />
    </form>
  )
}
