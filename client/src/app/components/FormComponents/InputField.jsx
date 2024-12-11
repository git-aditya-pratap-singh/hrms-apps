import PropTypes from 'prop-types';
import "../../../assets/css/components/inputfield.scss";

const InputField = ({type = 'text', name, value, placeholder, autoComplete = 'off' }) => {
  return (
    <div className="formsInput">
        <label>{placeholder}</label>
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
        />
    </div>
    
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string // For rendering icon components
};

export default InputField;
