const validateSchema = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 100,
        errorKey: 'Name'
    },
    email:{
        required: true,
        errorKey: 'Email',
        pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    phone: {
        required: true,
        errorKey: 'Phone',
        pattern: /^(\+91|91)?[6-9][0-9]{9}$/ 
    },
    password:{
        required: true,
        minLength: 8,
        strength: {
            uppercase: 1,
            lowercase: 1,
            digit: 1,
            special: 1
        },
        errorKey: 'Password'
    },
    pswd:{
        required: true,
        errorKey: 'Password'
    },
    confirmPassword: {
        required: true,
        matchField: 'password', 
        errorKey: 'ConfirmPassword'
    },
    department: {
        required: true,
        minLength: 2,
        maxLength: 80,
        errorKey: 'Department'
    },
    experience: {
        required: true,
        minLength: 2,
        maxLength: 10,
        errorKey: 'Experience'
    },
    position: {
        required: true,
        minLength: 2,
        maxLength: 50,
        errorKey: 'Position'
    },
    pdfFile: {
        required: true,
        errorKey: 'File',
        fileType: 'application/pdf', 
        maxFileSize: 5 * 1024 * 1024
    },
    dateOfJoining: {
        required: true,
        errorKey: 'DateOfJoining',
        pattern: /^\d{4}-\d{2}-\d{2}$/,
    }

}
export default validateSchema;