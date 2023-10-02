import React, { useState, useEffect} from 'react';
import styles from '../../assets/styles/module.css/Reports.module.css';
import { AppPages } from '../../components/navigation/page_links';

const Reports = ({all_reports}) => {
  const [reportsInfo, setreportsInfo] = useState()
  const [selectedYear, setSelectedYear] = useState('all');
  const [filteredReports, setFilteredReports] = useState();
  useEffect(() => {
    setreportsInfo(all_reports);
    console.log("reportsInfo: ", reportsInfo)
    if(all_reports && Object.keys(all_reports).length>0){
      let the_reports = [];
      if( selectedYear === 'all'){
        all_reports.years.forEach(year => {
          the_reports.push(...year.reports);
        });
      }else{
        all_reports[years].map(yearReports=>{
          Object.entries(yearReports).map(([year, thereports])=>{
            if(year === selectedYear){
              the_reports = thereports.reports
            }
          })
        })
      }
      console.log('selectedYear: ', selectedYear)
      console.log('the_reports: ', the_reports)
      setFilteredReports(the_reports)
    }
  }, [all_reports]);

  console.log("all_reports: ", (all_reports && all_reports.length)? all_reports.length: all_reports)
  console.log("reportsInfo: ", reportsInfo)
  console.log("filteredReports: ", filteredReports)

  const handleYearClick = (event) => {
    if(reportsInfo && Object.keys(reportsInfo).length>0){
      setSelectedYear(event.target.value);
      const newFilteredReports = event.target.value === 'all'
        ? reportsInfo?.years.flatMap((year) => year.reports)
        : reportsInfo?.years.find((year) => year.year === parseInt(event.target.value)).reports;
      setFilteredReports(newFilteredReports);
    }
  };

  const handleDelete = (event, report) => {
    event.preventDefault();
    const updatedReports = filteredReports.filter((item) => item !== report);
    setFilteredReports(updatedReports);
  };

  return (
    <div id={styles.Reports}>
      <section>
        <nav>
          <article>
            <label htmlFor="yearFilter">Filter by year:</label>
            <select id="yearFilter" name="yearFilter" value={selectedYear} onChange={handleYearClick}>
              <option value="all">All</option>
              {reportsInfo && Object.keys(reportsInfo).length> 0 && reportsInfo.years.map(yearData => (
                <option value={yearData.year}>
                  {yearData.year}
                </option>
              ))}
            </select>
          </article>
          <aside style = {{display: 'block'}}>
            {AppPages.find(page => page.name === 'AddReport') && (
              <a href={AppPages.find(page => page.name === 'AddReport').path}>
                <button>
                  <i className="material-icons">add</i> New Report
                </button>              
              </a>
            )}
          </aside>
        </nav>
        <table>
          <thead>
            <tr>
              {reportsInfo && Object.keys(reportsInfo).length>0 && reportsInfo.headers.map((header) => (
                <th key={header} className={styles[header]}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredReports?.map((report) => (
              <tr key={`${report.author}-${report.published}`}>
                <td className={styles.Author}>{report.author}</td>
                <td className={styles.Report}>{report.report}</td>
                <td className={styles.Date_Published}>{report.published}</td>
                <td className={styles.Date_Uploaded}>{report.uploaded}</td>
                <td className={styles.Action}>
                  <a href={report.link}>Read</a>
                  <a href="#" onClick={(event) => handleDelete(event, report)}>
                    <i className="fas fa-trash-alt"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Reports;
