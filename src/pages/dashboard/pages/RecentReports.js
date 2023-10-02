import styles from '../../../assets/styles/module.css/Dash_Content.module.css';
import React, { useState } from 'react';
import Link from 'next/link';
import {reports_info} from '../../../components/data/reports';
import { AppPages } from '../../../components/navigation/page_links';

const Recent_Reports = () => {
  const [reportsInfo, setReportsInfo] = useState(reports_info);

  // Sort the reports by the most recent date
  const sortedReports = [...reportsInfo.years].sort((a, b) => {
    const yearA = a.year;
    const yearB = b.year;
    return yearB - yearA;
  }).flatMap((year) => year.reports.sort((a, b) => {
    const dateA = new Date(a.uploaded);
    const dateB = new Date(b.uploaded);
    return dateB - dateA;
  }));
  

  return (
    <div className={styles.Recent_reports}>
      <table>
        <thead>
          <tr>
            <th>Recent Reports</th>
            <th>
              {AppPages.find((page) => page.name === 'Reports') && (
                <a href={AppPages.find((page) => page.name === 'Reports').path}>
                  View All
                </a>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedReports.slice(0, 4).map((report, index) => (
            <tr key={index}>
              <td>
                <p>{report.report}</p>
                <p>By {report.author}</p>
              </td>
              <td>
                <a href={report.link} target="_blank" rel="noopener noreferrer">
                  View Report
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recent_Reports;
