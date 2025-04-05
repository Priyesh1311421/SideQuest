// src/pages/SignInPage.jsx
import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <SignIn path="/sign-in" routing="path" />
    </div>
  )
}
