type ButtonProps = {
  buttonName: string
}

export default function SubmitButton({ buttonName }: ButtonProps) {
  return <button type="submit">{buttonName}</button>
}
