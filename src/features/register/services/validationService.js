export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  return {
    isValid,
    message: isValid ? 'Email válido' : 'Formato de email inválido'
  };
};

/**
 * Valida una contraseña según criterios de seguridad
 * @param {string} password - Contraseña a validar
 * @returns {Object} Resultado de la validación con detalles
 */
export const validatePassword = (password) => {
  const criteria = [
    {
      test: password.length >= 8,
      message: 'Al menos 8 caracteres',
      key: 'length'
    },
    {
      test: /[a-z]/.test(password),
      message: 'Al menos una letra minúscula',
      key: 'lowercase'
    },
    {
      test: /[A-Z]/.test(password),
      message: 'Al menos una letra mayúscula',
      key: 'uppercase'
    },
    {
      test: /\d/.test(password),
      message: 'Al menos un número',
      key: 'number'
    },
    {
      test: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      message: 'Al menos un carácter especial',
      key: 'special'
    }
  ];
  
  const passed = criteria.filter(c => c.test);
  const failed = criteria.filter(c => !c.test);
  
  const strength = passed.length;
  let level = 'weak';
  
  if (strength >= 4) level = 'strong';
  else if (strength >= 3) level = 'medium';
  else if (strength >= 1) level = 'weak';
  
  return {
    isValid: strength >= 3, // Requerir al menos 3 criterios
    strength,
    level,
    passed: passed.map(c => c.key),
    failed: failed.map(c => c.key),
    messages: {
      passed: passed.map(c => c.message),
      failed: failed.map(c => c.message)
    }
  };
};

/**
 * Valida un nombre
 * @param {string} name - Nombre a validar
 * @returns {Object} Resultado de la validación
 */
export const validateName = (name) => {
  const trimmedName = name.trim();
  const isValid = trimmedName.length >= 2 && trimmedName.length <= 50;
  const hasValidChars = /^[a-zA-ZÀ-ÿ\s]+$/.test(trimmedName);
  
  let message = '';
  if (!trimmedName) {
    message = 'El nombre es requerido';
  } else if (trimmedName.length < 2) {
    message = 'El nombre debe tener al menos 2 caracteres';
  } else if (trimmedName.length > 50) {
    message = 'El nombre debe tener máximo 50 caracteres';
  } else if (!hasValidChars) {
    message = 'El nombre solo puede contener letras y espacios';
  } else {
    message = 'Nombre válido';
  }
  
  return {
    isValid: isValid && hasValidChars,
    message
  };
};

/**
 * Valida que las contraseñas coincidan
 * @param {string} password - Contraseña original
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {Object} Resultado de la validación
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  const isValid = password === confirmPassword && password.length > 0;
  
  return {
    isValid,
    message: isValid ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'
  };
};

/**
 * Validación completa del formulario de registro
 * @param {Object} formData - Datos del formulario
 * @returns {Object} Resultado de la validación completa
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  // Validar nombre
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }
  
  // Validar email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }
  
  // Validar contraseña
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = 'La contraseña no cumple con los requisitos mínimos';
  }
  
  // Validar confirmación de contraseña
  const matchValidation = validatePasswordMatch(formData.password, formData.confirmPassword);
  if (!matchValidation.isValid) {
    errors.confirmPassword = matchValidation.message;
  }
  
  // Validar términos
  if (!formData.acceptTerms) {
    errors.acceptTerms = 'Debes aceptar los términos y condiciones';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Genera sugerencias para mejorar la contraseña
 * @param {string} password - Contraseña actual
 * @returns {Array} Array de sugerencias
 */
export const getPasswordSuggestions = (password) => {
  const validation = validatePassword(password);
  const suggestions = [];
  
  if (validation.failed.includes('length')) {
    suggestions.push('Agrega más caracteres para alcanzar al menos 8');
  }
  
  if (validation.failed.includes('lowercase')) {
    suggestions.push('Incluye al menos una letra minúscula (a-z)');
  }
  
  if (validation.failed.includes('uppercase')) {
    suggestions.push('Incluye al menos una letra mayúscula (A-Z)');
  }
  
  if (validation.failed.includes('number')) {
    suggestions.push('Incluye al menos un número (0-9)');
  }
  
  if (validation.failed.includes('special')) {
    suggestions.push('Incluye al menos un carácter especial (!@#$%^&*)');
  }
  
  return suggestions;
};

/**
 * Verifica si un email tiene un formato de dominio común
 * @param {string} email - Email a verificar
 * @returns {Object} Información sobre el dominio
 */
export const checkEmailDomain = (email) => {
  const commonDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
    'icloud.com', 'aol.com', 'live.com', 'msn.com'
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  const isCommon = commonDomains.includes(domain);
  
  return {
    domain,
    isCommon,
    suggestion: isCommon ? null : 'Verifica que el dominio esté escrito correctamente'
  };
};