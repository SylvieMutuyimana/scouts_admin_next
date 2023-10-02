import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import styles from '../../assets/styles/module.css/Funding.module.css';

const Funding = ({all_timeline, all_projects}) => {
  const [selectedYear, setYear] = useState({
    timeline: 2022, projects: 2022
  })
  const [projectsInfo, setProjects] = useState()
  const [timelineInfo, setTimeline] = useState()

  useEffect(()=>{
    if(all_timeline && all_timeline.length>0){
      setTimeline(all_timeline)
      setYear(prev=> ({
        ...prev, timeline: Object.keys(all_timeline)[0]
      }))
    }
  },[all_timeline])

  //projects
  useEffect(()=>{
    if(all_projects && all_projects.length>0){
      setProjects(all_projects)
      setYear(prev=> ({
        ...prev, projects: Object.keys(all_projects)[0]
      }))
    }
  },[all_projects])

  const yearData = (type, typeData) => typeData?.find(data=>data.year === type)
  const selectedData = {
    projects: yearData(selectedYear.projects, projectsInfo),
    timeline: yearData(selectedYear.timeline, timelineInfo)
  }
  const handleChange = (e) => {
    const {name, value} = e.target
    console.log(name, ': ', value)
    setYear(prev=>({
      ...prev, [name]: parseInt(value)
    }))
  };

  const [dataValues, setDataValues] = useState({
    timeline: null, projects: null
  })
  const [dataLabels, setDataLabels] = useState({
    timeline: null, projects: null
  })
  
  useEffect(()=>{
    if(selectedData && selectedData.length>0){
      setDataValues(prev=>({
        ...prev, timeline: selectedData.timeline,
        projects: selectedData.projects
      }) )
      setDataLabels(Object?.keys(dataValues.timeline)) 
      setDataLabels(prev=>({
        ...prev, timeline: Object?.keys(dataValues.timeline),
        projects: Object?.keys(dataValues.projects)
      }) )
    }
  },[selectedData])
  const timelineData = {
    labels: dataLabels.timeline,
    datasets: [
      {
        label: 'Target',
        data: dataLabels.timeline?.map(month => dataValues.timeline[month].target),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Raised',
        data: dataLabels.timeline?.map(month => dataValues.timeline[month].raised),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const tableData = {
    projects: {
        headers: ['Project', 'Target amount', 'Raised amount', 'Remaining amount'],
        rows: selectedData?.projects?.projects.map(project => [
        project.name, project.target, project.raised,
        project.target - project.raised,
      ]),
    },
    timeline: {
      headers: ['Month', 'Target amount', 'Raised amount', 'Remaining amount'],
      rows: selectedData?.timeline
      ? Object.entries(selectedData.timeline).map(([month, data]) => [
          month, data.target, data.raised,
          data.target - data.raised,
        ])
      : [],    
    }
  };
  const chartOptions = {
    scales: {
      x: {
        id: 'x-axis-0', // This is the default ID for the X-axis
        type: 'linear',
      },
    },
  };
  const projectsData = {
    labels: dataLabels.projects,
    datasets: [
    {
      label: 'Target',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      data: dataLabels.projects?.map(project => dataValues.timeline[project].target),
    },
    {
      label: 'Raised',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      data: dataLabels.projects?.map(project => dataValues.timeline[project].raised),
    },
    {
      label: 'Remaining',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: dataLabels.projects?.map(project => dataValues.timeline[project].target - dataValues.timeline[project].raised),
    },
    ],
  };
  return (
    <div id={styles.Funding}>
      <section>
        <h4>
          <a>View and Edit in Google Sheets</a>
        </h4>
        <article>
          <h5>Current Project Funding</h5>
          <div id={styles.fund_projects}>
            <div>
              <label htmlFor='selectYear'>Select year:</label>
              <select id={styles.selectYear} name = 'projects' value={selectedYear.projects} onChange={handleChange}>
                {projectsInfo && projectsInfo.length>0 && Object.keys(projectsInfo).map(year => (
                  <option value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <table>
              <thead>
                <tr>
                  {selectedData && selectedData.length>0 && tableData .projects.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedData && selectedData.length>0 && tableData .projects.rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, index) => (
                      <td key={index}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={`${styles.chart_container} ${styles.projects}`} >
              <Bar data={projectsData} /> 
            </div>
          </div>
        </article>
          <article>
            <h4>Funding Timeline</h4>
            <div id={styles.fund_timeline}>
              <div>
                <label htmlFor='selectYear'>Select Year: </label>
                <select id={styles.selectYear} value={selectedYear.timeline} name = 'timeline' onChange={handleChange}>
                  {timelineInfo && timelineInfo.length>0 && Object.keys(timelineInfo).map(year => (
                    <option value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <table>
                <thead>
                  <tr>
                    {selectedData && selectedData.length>0 && tableData .timeline.headers.map(header=>(
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedData && selectedData.length>0 && tableData .timeline.rows.map((row, index) => (
                    <tr key={index}>
                      {row.map((cell, index) => (
                        <td key={index}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedData && selectedData.length>0 && 
                dataValues.timeline && dataValues.timeline.length>0 && 
                dataLabels.timeline && dataLabels.timeline.length>0 && (
                <div className={`${styles.chart_container} ${styles.timeline}`}>
                  <Bar data={timelineData} /> 
                </div>
              )}              
            </div>
          </article>
        </section>
      </div>
    );
};       
export default Funding;
