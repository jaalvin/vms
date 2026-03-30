const VMSLogo = ({ className = '', size = 48, secondaryColor = '#8B573A', style = {} }) => {
    // Scale all specific pixel values proportionately if the size prop changes from 48
    const scale = size / 48;
    
    return (
        <div 
            className={`vms-logo-wrapper ${className}`} 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: `${14 * scale}px`,
                ...style 
            }}
        >
            {/* The V Icon Box */}
            <div 
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: secondaryColor,
                    borderRadius: `${10 * scale}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: `${22 * scale}px`,
                    fontWeight: 700,
                    flexShrink: 0
                }}
            >
                V
            </div>
            
            {/* The VMS Text */}
            <div 
                style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: `${28 * scale}px`,
                    fontWeight: 700,
                    color: secondaryColor,
                    letterSpacing: `${4 * scale}px`,
                    lineHeight: 1
                }}
            >
                VMS
            </div>
        </div>
    );
};

export default VMSLogo;
