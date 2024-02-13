import { useState } from 'react'
import { Button, Input, Loading, Alert } from 'react-daisyui'
import useAuthenticate from '../services/auth'
const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [code, setVerificationCode] = useState<string>('')
  const {
    signInWithPhoneNumber,
    submitVerificationCode,
    error,
    loading,
    success,
  } = useAuthenticate()

  const handleSignIn = (e: any) => {
    e.preventDefault()
    success ? submitVerificationCode(code) : signInWithPhoneNumber(phoneNumber)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div id="recaptcha-container"></div>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold">Login now!</h1>
      </div>
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSignIn} className="card-body">
          <div className="form-control">
            {error && (
              <Alert
                status="error"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              >
                <span>{error}</span>
              </Alert>
            )}

            <label className="label">
              <span className="label-text">
                {success ? 'SMS Code' : 'Phone Number'}
              </span>
            </label>
            {!success && (
              <Input
                type="string"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone number"
                className="input input-bordered"
                required
              />
            )}
            {success && (
              <Input
                type="string"
                value={code}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter the code sent to you"
                className="input input-bordered"
                required
              />
            )}
          </div>
          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div> */}
          <div className="form-control mt-6" id="recaptcha-id">
            <Button type="submit" color="primary">
              Authenticate
              {loading && <Loading variant="dots" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
