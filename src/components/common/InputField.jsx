import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputField = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    required = false,
    className = '',
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <div className={isPassword ? 'password-input-wrapper' : ''}>
                <input
                    type={inputType}
                    name={name}
                    className={`vms-input ${className}`}
                    value={value}
                    onChange={onChange}
                    required={required}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="btn-toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputField;
