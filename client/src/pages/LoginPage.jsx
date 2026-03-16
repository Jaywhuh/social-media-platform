import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'
import InputField from '../components/InputField'
import '../styles/RegisterPage.css'

function LoginPage() {

  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function validate() {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (isSubmitting) return

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)

    try {
      // TODO Week 2: replace with real API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      await new Promise(resolve => setTimeout(resolve, 1000))
      // Mock user data — in Week 2 this comes from the API response
      
      const mockUserData = {
        id: 'user1',
        username: formData.email.split('@')[0],
        email: formData.email
      }

      login(mockUserData)

      // TODO Week 2: save token and redirect
      // navigate('/')

    } catch (error) {
      console.error('Login failed:', error)
      setErrors({ general: 'Invalid email or password. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-brand">SocialApp</div>
        <h1>Welcome Back</h1>
        <p className="register-subtitle">Log in to your account</p>

        <hr className="register-divider" />

        <form className="register-form" onSubmit={handleSubmit} noValidate>

          {errors.general && (
            <span className="error-message">{errors.general}</span>
          )}

          <InputField
            label="Email"
            id="email"
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Password"
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>

          <p className="login-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default LoginPage