import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from '../common/Card';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const VisitorChart = ({ title = "Peak Visiting Hours", chartData }) => {
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Visitors',
                data: chartData.data,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) { return null; }
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, '#D7CCC8'); // lighter
                    gradient.addColorStop(1, '#8D6E63'); // darker
                    return gradient;
                },
                borderRadius: 8,
                barThickness: 16,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#8B573A',
                padding: 10,
                cornerRadius: 8,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 10, family: 'Outfit' }, color: '#A1887F' }
            },
            y: {
                display: false, // Hide Y axis per mockup
                grid: { display: false }
            }
        }
    };

    return (
        <Card className="chart-card">
            <h3>{title}</h3>
            <div className="chart-container">
                <Bar data={data} options={options} />
            </div>
        </Card>
    );
};

export default VisitorChart;
