// src/pages/SignUpPage.jsx
import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <SignUp path="/sign-up" routing="path" />
    </div>
  )
}
