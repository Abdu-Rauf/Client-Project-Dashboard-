import AuthForm from '../components/AuthForm/AuthForm.tsx'
import SubmitButton from '../components/SubmitButton.tsx'

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Developer', value: 'developer' },
  { label: 'Project Manager', value: 'project_manager' },
] as const

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
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </label>
      <SubmitButton buttonName="register" />
    </form>
  )
}
