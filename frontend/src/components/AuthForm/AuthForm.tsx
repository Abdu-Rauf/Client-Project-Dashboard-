import './AuthForm.css'

export default function AuthForm() {
  return (
    <>
      <label>
        Name
        <input type="text" name="name" />
      </label>

      <label>
        Email
        <input type="email" name="email" />
      </label>

      <label>
        Password
        <input type="password" name="password" />
      </label>
    </>
  )
}
