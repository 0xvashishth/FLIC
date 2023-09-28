function validateEmailAndPasswordForSignup(email, password) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
    if (!emailRegex.test(email)) {
      return { error: true, message: 'Invalid email format' };
    }
  
    if (!passwordRegex.test(password)) {
      return {
        error: true,
        message:
          'Invalid password format. Password must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)',
      };
    }
  
    return { error: false, message: 'Validation passed' };
  }

module.exports = {validateEmailAndPasswordForSignup}