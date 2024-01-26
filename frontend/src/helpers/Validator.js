//formData = {
//  name: {'John Doe'},
//  email: 'john.doe@gmail',

// RegexStrings = {
//  name: {regex : ^[a-zA-Z ]+$, required: true}
//  email: {regex : ^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$, required: true},
// }


const Validate = async (formData, RegexStrings) => {
    let errors = {};
    for (const [key, value] of Object.entries(formData)) {
        if (RegexStrings[key].required && value === '') {
            errors[key] = `${key} is required`;
        } else if (RegexStrings[key].regex && !RegexStrings[key].regex.test(value)) {
            errors[key] = `invalid ${key}`;
        }
    }
    return errors;
}

export default Validate;
