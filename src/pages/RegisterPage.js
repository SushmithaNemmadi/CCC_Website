// src/pages/RegisterPage.js

import { useNavigate } from 'react-router-dom';
import '../styles/FormStyles.css'; // ✅ Styling added

function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const phone = event.target.phone.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const user = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, phone }),
      });

      if (user.ok) {
        const data = await user.json();
        console.log('Registration successful:', data);
        navigate('/login'); // Redirect to login page
      } else {
        const err = await user.json();
        console.error('Registration failed:', err.message || 'Unknown error');
        alert(err.message || 'Registration failed. Try again.');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="page-background">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="text" name="phone" placeholder="Phone Number" required />
          <input type="password" name="password" placeholder="Password" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
