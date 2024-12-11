const validatePasswordStrength = (password, strengthSchema) => {
    const errors = [];
    if (strengthSchema.uppercase && !/[A-Z]/.test(password)) {
        errors.push("Must contain at least one uppercase letter");
    }
    if (strengthSchema.lowercase && !/[a-z]/.test(password)) {
        errors.push("Must contain at least one lowercase letter");
    }
    if (strengthSchema.digit && !/\d/.test(password)) {
        errors.push("Must contain at least one digit");
    }
    if (
        strengthSchema.special &&
        !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    ) {
        errors.push("Must contain at least one special character");
    }
    return errors;
};

const validateField = (fieldName, fieldValue, fieldSchema) => {
    if (fieldSchema.required && !fieldValue)
        return `${fieldSchema.errorKey} should not be empty !!`;
    
    if (fieldSchema.minLength && fieldValue.length < fieldSchema.minLength)
        return `${fieldSchema.errorKey} must be at least ${fieldSchema.minLength} characters long`;
    
    if (fieldSchema.maxLength && fieldValue.length > fieldSchema.maxLength)
        return `${fieldSchema.errorKey} must be no more than ${fieldSchema.maxLength} characters long`;

    if (fieldSchema.pattern && !fieldSchema.pattern.test(fieldValue)) {
        return `${fieldSchema.errorKey} does not match the required pattern!`;
    }

    if (fieldSchema.fileType || fieldSchema.maxFileSize) {
        if (fieldValue && typeof fieldValue === "object") {
            if (
                fieldSchema.fileType &&
                fieldValue.type !== fieldSchema.fileType
            ) {
                return `${fieldSchema.errorKey} must be a valid PDF file`;
            }
            if (
                fieldSchema.maxFileSize &&
                fieldValue.size > fieldSchema.maxFileSize
            ) {
                const maxSizeMB =
                    fieldSchema.maxFileSize / (1024 * 1024); 
                return `${fieldSchema.errorKey} must not exceed ${maxSizeMB} MB`;
            }
        } else {
            return `${fieldSchema.errorKey} is invalid or missing`;
        }
    }

    if (fieldSchema.strength) {
        return validatePasswordStrength(fieldValue, fieldSchema.strength).join(
            ", "
        );
    }
    return null;
};


const validateForm = (formData, schema)=>{
    const errors = {}
    Object.keys(formData).forEach((field)=>{
        const fieldSchema = schema[field];
        const fieldValue = formData[field];
        const error = validateField(field, fieldValue, fieldSchema);
        if (error) errors[field] = error;  
    });
    return errors;
}


export default validateForm;