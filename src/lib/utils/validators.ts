export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

export function validatePasswordStrength(password: string): {
  isValid: boolean;
  message: string;
} {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain an uppercase letter' };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain a lowercase letter' };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain a number' };
  }

  return { isValid: true, message: 'Strong password' };
}
