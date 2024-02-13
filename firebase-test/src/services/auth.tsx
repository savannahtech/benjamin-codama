import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { firebaseConfig } from '../firebase.config'

interface AuthState {
  user: firebase.User | null
  error: any
  success: boolean
  loading: boolean
}

interface UseAuthProps extends AuthState {
  signInWithPhoneNumber: (phoneNumber: string) => void
  submitVerificationCode: (code: string) => void
}

const useAuthenticate = (): UseAuthProps => {
  const navigate = useNavigate()

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    success: false,
    loading: false,
  })
  const [verificationId, setVerificationId] = useState<string>('')
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<firebase.auth.RecaptchaVerifier | null>(null)

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    const verifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
    )
    setRecaptchaVerifier(verifier)

    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          setAuthState({ user, error: null, success: true, loading: false })
        } else {
          setAuthState({
            user: null,
            error: null,
            success: false,
            loading: false,
          })
        }
      },
      (error) => {
        setAuthState({ user: null, error, loading: false, success: false })
      },
    )
    return () => {
      unsubscribe()
      if (recaptchaVerifier) {
        recaptchaVerifier.clear()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    try {
      const recaptchaContainer = document.getElementById('recaptcha-container')
      if (recaptchaContainer?.innerHTML) {
        const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          'recaptcha-container',
        )
        recaptchaVerifier.clear()
      }
      const appVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            setAuthState({ ...authState, loading: true })
            const phoneNumberWithCountryCode = `+${phoneNumber}`
            firebase
              .auth()
              .signInWithPhoneNumber(phoneNumberWithCountryCode, appVerifier)
              .then((confirmationResult) => {
                setVerificationId(confirmationResult.verificationId)
                setAuthState({ ...authState, loading: false, success: true })
                // Handle confirmationResult here if needed
              })
              .catch((error) => {
                const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
                  'recaptcha-container',
                )
                recaptchaVerifier.clear()

                setAuthState({
                  ...authState,
                  error,
                  loading: false,
                  success: false,
                })
              })
          },
        },
      )

      await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    } catch (error) {
      setAuthState({
        ...authState,
        user: null,
        error,
        loading: false,
        success: false,
      })
    }
  }

  const submitVerificationCode = async (verificationCode: string) => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode,
      )
      await firebase.auth().signInWithCredential(credential)
      navigate('/profile')
    } catch (error) {
      setAuthState({
        ...authState,
        error: 'Unable to verify code, retry',
        loading: false,
        success: false,
      })
    }
  }

  return { ...authState, signInWithPhoneNumber, submitVerificationCode }
}

export default useAuthenticate
