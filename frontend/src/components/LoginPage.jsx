import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import { loginPageStyles } from '../assets/dummyStyles'
import { ArrowLeft, Eye, EyeOff, Lock, User } from 'lucide-react'

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    if (!rememberMe) {
      toast.error("You must agree to remember me.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    // === NEW: log all form data to the console ===
    // NOTE: Logging passwords is fine for development/testing only. Remove before production.
    console.log("Login form submitted — form data:", {
      email,
      password,
      rememberMe,
      showPassword,
      timestamp: new Date().toISOString(),
    });

    // Simulate a successful login: store auth info in localStorage so Navbar can detect it
    try {
      // create a simple fake token for demo (replace with real token from server in production)
      const fakeToken = btoa(`${email}:${Date.now()}`);

      // Persist token & login flag (Navbar checks these keys)
      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("isLoggedIn", "true");

      try {
        window.dispatchEvent(
          new CustomEvent("authChanged", { detail: { loggedIn: true } })
        );
      } catch (err) {
        // ignore if browser doesn't allow CustomEvent construction in this environment
      }
    } catch (err) {
      // ignore storage errors
    }

    // Show success toast
    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 1200,
      theme: "light",
    });

    // Redirect to home after short delay so user sees the toast
    setTimeout(() => {
      navigate("/");
    }, 1250);
  };

  return (
    <div className={loginPageStyles.pageContainer} style={{fontFamily: "'Playfair Display', serif"}}>
        <ToastContainer />

        <div className={loginPageStyles.mainContent}>
            <button onClick={() => navigate('/')} className={loginPageStyles.backButton}>
                <ArrowLeft className={`h-5 w-5 text-gray-800 mr-2`} />
                <span>Back to Home</span>
            </button>

            <div className={loginPageStyles.loginCard}>
                <div className={loginPageStyles.decorativeTopLeft}></div>
                <div className={loginPageStyles.decorativeBottomRight}></div>

                <h2 className={loginPageStyles.cardTitle}>
                  Welcome Back
                </h2>

                <p className={loginPageStyles.cardSubtitle}>
                  Sign in to your account
                </p>

                <form onSubmit={handleSubmit}>
                  <div className={loginPageStyles.formField}>
                    <label htmlFor="email" className={loginPageStyles.formLabel}>
                      Email
                    </label>

                    <div className={loginPageStyles.inputContainer}>
                      <div className={loginPageStyles.inputIconContainer}>
                        <User className={loginPageStyles.inputIcon} />
                      </div>
                      <input type="email" id='email' placeholder='Enter your email' className={loginPageStyles.inputBase} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>

                  <div className={loginPageStyles.formField}>
                    <label htmlFor="password" className={loginPageStyles.formLabel}>
                      Password
                    </label>

                    <div className={loginPageStyles.inputContainer}>
                      <div className={loginPageStyles.inputIconContainer}>
                        <Lock className={loginPageStyles.inputIcon} />
                      </div>
                      <input type={showPassword ? "text" : "password"} id='password' placeholder='Enter your password' className={loginPageStyles.passwordInputBase} value={password} onChange={(e) => setPassword(e.target.value)} required />

                      <button className={loginPageStyles.passwordToggle} type='button' onClick={() => setShowPassword(!showPassword)} >
                        {showPassword ? (
                          <EyeOff className={loginPageStyles.passwordToggleIcon} />
                        ) : (
                          <Eye className={loginPageStyles.passwordToggleIcon} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={loginPageStyles.rememberMeContainer}>
                      <div className={loginPageStyles.checkboxContainer}>
                        <input type="checkbox" id='rememberMe' className={loginPageStyles.checkbox} checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} required />
                      </div>

                      <div className={loginPageStyles.checkboxLabelContainer}>
                        <label htmlFor="rememberMe" className={loginPageStyles.checkboxLabel}>
                          Remember me {" "}
                          <span className={loginPageStyles.requiredStar}>
                            *
                          </span>
                        </label>
                      </div>
                  </div>

                  <button type='submit' className={loginPageStyles.submitButton}>
                    Login
                  </button>
                </form>

                <div className={loginPageStyles.signupContainer}>
                  <span className={loginPageStyles.signupText}>
                      You don't have an account? {" "}
                      
                      <a href="/signup" className={loginPageStyles.signupLink}>
                        Sign up
                      </a>
                  </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage