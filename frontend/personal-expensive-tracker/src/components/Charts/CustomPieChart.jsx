import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

// Component to display a pie chart with optional center text
const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                
                {/* Pie slices */}
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100} // donut chart
                    labelLine={false} // hide default lines
                >  
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]} // assign colors to slices
                        />
                    ))}
                </Pie>

                {/* Custom tooltip and legend */}
                <Tooltip content={CustomTooltip} />
                <Legend content={CustomLegend} />

                {/* Optional text in the center */}
                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="45%"
                            dy={-25}
                            textAnchor="middle"
                            fontSize={14}
                        >
                            {label}
                        </text>

                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill="#333"
                            fontSize={24}
                            fontWeight="600"
                        >
                            {totalAmount}
                        </text>
                    </>
                )}

            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
