import styles from '../../../assets/styles/module.css/Dash_Content.module.css';
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const all_months= [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 'September', 
    'October', 'November', 'December'
]
const data = {
    members:{
        2020: {
            boys: [29, 30, 40, 50, 52, 57, 59, 64, 71, 71, 72, 74],
            girls: [15, 49, 49, 49, 55, 56, 65, 68, 79, 82, 83, 88],
            months: all_months,
        },
        2021: {
            boys: [74, 78, 80, 80, 89, 89, 97, 99, 104, 111, 121, 123],
            girls: [89, 89, 96, 97, 99, 105, 107, 110, 121, 123, 125, 127],
            months: all_months,
        },
        2022: {
            boys: [124, 126, 129, 137, 140, 146, 149, 153, 156, 159, 165, 165],
            girls: [129, 134, 148, 150, 152, 158, 159, 160, 163, 164, 167, 169],
            months: all_months,
        }
    },
    volunteers:{
        2020: {
            boys: [29, 30, 40, 50, 52, 57, 59, 64, 71, 71, 72, 74],
            girls: [15, 49, 49, 49, 55, 56, 65, 68, 79, 82, 83, 88],
            months: all_months,
        },
        2021: {
            boys: [74, 78, 80, 80, 89, 89, 97, 99, 104, 111, 121, 123],
            girls: [89, 89, 96, 97, 99, 105, 107, 110, 121, 123, 125, 127],
            months: all_months,
        },
        2022: {
            boys: [124, 126, 129, 137, 140, 146, 149, 153, 156, 159, 165, 165],
            girls: [129, 134, 148, 150, 152, 158, 159, 160, 163, 164, 167, 169],
            months: all_months,
        }
    }
};

const Row_Graphs = () => {
    const members_chartRef = useRef(null);
    const volunteers_chartRef = useRef(null);
    const [selectedYear, setSelectedYear] = useState({
        members: Object.keys(data.members)[Object.keys(data.members).length - 1],
        volunteers: Object.keys(data.volunteers)[Object.keys(data.volunteers).length - 1],
    });
    const [chartData, setChartData] = useState({
        volunteers:data.volunteers[selectedYear.volunteers],
        members:data.members[selectedYear.members],
    });
    useEffect(() => {
        if (volunteers_chartRef && volunteers_chartRef.current && chartData.volunteers) {
            const chart = new Chart(volunteers_chartRef.current, {
                type: 'bar',
                data: {
                    labels: chartData.volunteers.months,
                    datasets: [
                    {
                        label: '',
                        data: chartData.volunteers.boys,
                        borderColor: '#70C4CF',
                        backgroundColor:'#70C4CF',
                        fill: false,
                    },
                    {
                        label: '',
                        data: chartData.volunteers.girls,
                        borderColor: '#3D5EE1',
                        backgroundColor:'#3D5EE1',
                        fill: false,
                    },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {stepSize: 20},
                        },
                    },
                    cubicInterpolationMode: 'monotone',
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                const colors = ['#70C4CF', '#3D5EE1'];
                                return data.datasets.map(function(dataset, i) {
                                    return {
                                        text: dataset.label,
                                        fillStyle: colors[i % colors.length],
                                        hidden: !chart.isDatasetVisible(i),
                                        index: i
                                    };
                                });
                            },
                            font: {
                                family: 'Arial',
                                size: 12, weight: 'bold'
                            },
                            pointRadius: 6, padding: 10, boxWidth: 120
                        }
                    }
                    
                },
            });
            
            return () => {
                chart.destroy();
            };
        }
    }, [volunteers_chartRef, chartData.volunteers]);
    
    useEffect(() => {
        if (members_chartRef && members_chartRef.current && chartData.members) {
            const chart = new Chart(members_chartRef.current, {
                type: 'line',
                data: {
                    labels: chartData.members.months,
                    datasets: [
                    {
                        label: '',
                        data: chartData.members.boys,
                        borderColor: '#70C4CF',
                        backgroundColor:'#70C4CF',
                        fill: false,
                    },
                    {
                        label: '',
                        data: chartData.members.girls,
                        borderColor: '#3D5EE1',
                        backgroundColor:'#3D5EE1',
                        fill: false,
                    },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {stepSize: 20},
                        },
                    },
                    cubicInterpolationMode: 'monotone',
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                const colors = ['#70C4CF', '#3D5EE1'];
                                return data.datasets.map(function(dataset, i) {
                                    return {
                                        text: dataset.label,
                                        fillStyle: colors[i % colors.length],
                                        hidden: !chart.isDatasetVisible(i),
                                        index: i
                                    };
                                });
                            },
                            font: {
                                family: 'Arial',
                                size: 12, weight: 'bold'
                            },
                            pointRadius: 6, padding: 10, boxWidth: 120
                        }
                    }
                    
                },
            });
            
            return () => {
                chart.destroy();
            };
        }
    }, [members_chartRef, chartData.members]);
    
    const handleYear = (e) => {
        const {name, value} = e.target
        setSelectedYear(prev=>({
            ...prev, [name]: value
        }))
        setChartData(prev=>({
            ...prev, [name]:data[name][value]
        }));
    };

    const graphs = (type, year,refData) =>{
        return(
            <div className={styles.membergraph}>
                <nav>
                    <div className={styles.left}>
                        {type.charAt(0).toUpperCase() + type.slice(1)} Overview
                        <select id={styles.year} name={type} value={year} onChange={handleYear}>
                        {Object.keys(data.members).map(year => (
                            <option value={year}>{year}</option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.right}>
                        <div class='label male'>
                            <div class='circle'></div>
                            <p>Boys</p>
                        </div>
                        <div class='label female'>
                            <div class='circle'></div>
                            <p>Girls</p>
                        </div>
                    </div>
                </nav>
                <section>
                    <canvas ref={refData} />
                </section>
            </div>
        )
    }
    return (
        <section>
            <article>{graphs('members', selectedYear.members,members_chartRef)}</article>
            <aside>{graphs('volunteers', selectedYear.volunteers,volunteers_chartRef)}</aside>
        </section>
    );
    
};

export default Row_Graphs;