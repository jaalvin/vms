const Button = ({ children, variant = 'primary', className = '', isLoading = false, disabled, ...props }) => {
  const baseClass = 'vms-btn';
  const variantClass = `vms-btn-${variant}`;

  return (
    <button
      className={`${baseClass} ${variantClass} ${className} ${isLoading ? 'vms-btn-loading' : ''}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="vms-spinner"></span>
          <span style={{ opacity: 0 }}>{children}</span>
        </>
      ) : children}
    </button>
  );
};

export default Button;
