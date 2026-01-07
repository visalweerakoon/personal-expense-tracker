import { addThousandsSeparator } from "../../utils/helper";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart
} from 'recharts';

// Component to display a line/area chart with a custom tooltip
const CustomLineChart = ({ data }) => {

    // Custom tooltip for area chart
    const CustomToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    {/* Display category */}
                    <p className='text-xs font-semibold text-red-800 mb-1'>{payload[0].payload.category}</p>
                    {/* Display amount */}
                    <p className='text-sm text-gray-600'>
                        Amount : <span className='text-sm font-medium text-gray-900'>LKR {addThousandsSeparator(payload[0].payload.amount)}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='bg-white'>
            {/* Responsive container to adjust chart to parent width */}
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    {/* Gradient for the area fill */}
                    <defs>
                        <linearGradient id="incomeGradient" xl="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor='#ff0c0cff' stopOpacity={0.4} />
                            <stop offset="95%" stopColor='#ff0000ff' stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke='none' />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                    <Tooltip content={<CustomToolTip />} />

                    {/* Area for amount values */}
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke='#ff0000ff'
                        fill="url(#incomeGradient)"
                        strokeWidth={3}
                        dot={{ r: 3, fill: "#ab8df8" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;
