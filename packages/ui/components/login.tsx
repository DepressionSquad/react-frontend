import { useState } from "react";
import AuthService from "../resources/api/auth";
import { UserLogin } from "./types";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginForm = Object.fromEntries(formData.entries()) as UserLogin;

    if (!loginForm.email || !loginForm.password) {
      setMessage("Please enter your email address and password.");
      return;
    }

    try {
      const response = await AuthService.login(loginForm);
      setMessage(`Hello ${response.firstName} ${response.lastName}`);

      return response;
    } catch (err) {
      console.error((err as Error).message);
      setMessage("An unexpected error occured");

      return;
    }
  };

  return (
    <main className="login-page">
      <div className="login-layout">
        <section className="welcome-panel" aria-labelledby="welcome-title">
          <a className="brand" href="/" aria-label="Synchro home">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>Synchro</span>
          </a>
          <div className="welcome-copy">
            <p className="eyebrow">A clearer way to work together</p>
            <h1 id="welcome-title">Everything in sync.</h1>
            <p className="welcome-description">
              Bring your team, projects, and plans together in one calm,
              connected workspace.
            </p>
          </div>
          <div className="welcome-footer">
            <span className="status-dot" />
            <span>Your workspace, right where you left it.</span>
          </div>
        </section>

        <section className="form-panel" aria-labelledby="login-title">
          <div className="form-heading">
            <p className="eyebrow">Welcome back</p>
            <h2 id="login-title">Sign in to Synchro</h2>
            <p>Enter your details to access your workspace.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field-label" htmlFor="email">
              Email address
            </label>
            <input
              autoComplete="email"
              className="text-input"
              id="email"
              name="email"
              placeholder="you@company.com"
              required
              type="email"
            />

            <div className="password-heading">
              <label className="field-label" htmlFor="password">
                Password
              </label>
              <a
                className="text-link"
                href="mailto:support@synchro.app?subject=Password%20reset"
              >
                Forgot password?
              </a>
            </div>
            <div className="password-field">
              <input
                autoComplete="current-password"
                className="text-input"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                type={showPassword ? "text" : "password"}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="visibility-button"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label className="remember-option">
              <input name="remember" type="checkbox" />
              <span>Keep me signed in</span>
            </label>

            <button className="submit-button" type="submit">
              Sign in <span aria-hidden="true">&#8594;</span>
            </button>
            <p aria-live="polite" className="form-message">
              {message}
            </p>
          </form>

          <p className="signup-prompt">
            New to Synchro?{" "}
            <a
              className="text-link"
              href="mailto:support@synchro.app?subject=Create%20an%20account"
            >
              Create an account
            </a>
          </p>
          <p className="legal-note">
            By continuing, you agree to our{" "}
            <a href="mailto:support@synchro.app?subject=Terms%20of%20service">
              Terms
            </a>{" "}
            and{" "}
            <a href="mailto:support@synchro.app?subject=Privacy%20policy">
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;
