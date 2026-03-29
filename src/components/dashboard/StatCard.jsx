import Card from '../common/Card';

const StatCard = ({ title, count, alertText, alertIcon = '⚠️' }) => {
    return (
        <Card className="stat-card">
            <div className="stat-content-left">
                <div className="stat-header">
                    <span className="status-dot"></span>
                    <h3>{title}</h3>
                </div>
                <div className="stat-number">{count}</div>
            </div>

            {alertText && (
                <div className="stat-alert">
                    <span>{alertIcon}</span> {alertText}
                </div>
            )}
        </Card>
    );
};

export default StatCard;
