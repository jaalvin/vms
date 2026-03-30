const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`vms-card ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
