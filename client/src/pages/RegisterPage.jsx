import { useState } from 'react'
import '../styles/RegisterPage.css'
import InputField from '../components/InputField'

function RegisterPage() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    // Username validation check
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }
    // Email validation check
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    // Password validation check
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    // Confirm password match check
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  async function handleSubmit(e) {
    // Stops browser from refreshing the page on form submit
    e.preventDefault() 

    if (isSubmitting) return

    // Run validation first — stop if there are errors
    const validationErrors = validate() 
    setErrors(validationErrors)

    // If there are no keys, error object is empty, which means it is valid
    if (Object.keys(validationErrors).length > 0) return

    // confirmPassword: _confirmPassword is to let ESLint know I'm ignoring it intentionally
    const { confirmPassword: _confirmPassword, ...dataToSend } = formData

    setIsSubmitting(true)

    try {
      // TODO: replace this mock with a real API call:
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dataToSend)
      // })

      console.log('Submitting to API:', dataToSend)

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Registration successful!')

      // TODO: redirect to home or login after success
      // navigate('/login')

    } catch (error) {
      console.error('Registration failed:', error)
      setErrors({ general: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-brand">SocialApp</div>
        <h1>Create Your Account</h1>
        <p className="register-subtitle">Join our community today</p>

        <hr className="register-divider" />

        <form className="register-form" onSubmit={handleSubmit} noValidate>

          {/* General error — shown at the top of the form */}
          {errors.general && (
            <span className="error-message">{errors.general}</span>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="login-link">
            Already have an account? <a href="/login">Log in here</a>
          </p>

          {/* TEMPORARY: remove after testing */}
          <h4>Test state</h4>
          <pre>{JSON.stringify(formData, null, 2)}</pre>

        </form>
      </div>
    </div>
  )
}

export default RegisterPage