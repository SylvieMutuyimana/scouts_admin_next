import React, { useState, useEffect, useRef } from 'react';
import styles from '../../assets/styles/module.css/Add_pages.module.css';
import Link from 'next/link';
import { AppPages } from '../../components/navigation/page_links';

function AddReport({all_reports}) {
  const [reportsInfo, setreportsInfo] = useState()
  useEffect(() => {
    setreportsInfo(all_reports);
  }, [all_reports])
  const [report, setReport] = useState({
    author:'', report:'', published:'', uploaded:'', link:'', file:''
  });

  const clearButtonRef = useRef(null);
  useEffect(() => {
      const clearButton = clearButtonRef.current;
      const inputs = document.getElementsByTagName('input');
      clearButton.addEventListener('click', function () {
          for (let i = 0; i < inputs.length; i++) {
              inputs[i].value = '';
          }
      });
      return () => {
          clearButton.removeEventListener('click', function () {
              for (let i = 0; i < inputs.length; i++) {
                  inputs[i].value = '';
              }
          });
      };
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setReport((prevReport) => ({
      ...prevReport,[name]: value,
    }));
    if(name==='published'){
      const upload = new Date().toLocaleDateString(undefined, { 
        year: 'numeric', month: 'numeric', day: 'numeric' 
      });
      setReport((prevReport) => ({ ...prevReport, uploaded: upload}));      
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const publishYear = new Date(report.published).getFullYear();
    const reportYear = reportsInfo?.years.find((yearData) => yearData.year === publishYear);
    reportYear && reportYear?.reports.push(report);    
    setReport({
      author:'', report:'', published:'', uploaded:'', link:'', file:''
    });
  };
    return (
    <section id={styles.add_report}>
      <nav>
        <Link href ='/Reports'>
          <button className={styles.back}>
            <i class='fa fa-arrow-left'></i>
          </button>                         
        </Link>
        <button className={styles.clear} type='button' ref={clearButtonRef}>Clear</button>
      </nav>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <h3>Add Report</h3>
          <article>     
            <label>
              <p>Upload the Report: </p>
              <input type='file' name='file' value={report.file} onChange={handleChange} required/>
            </label>  
            <label>
              <p>Report: </p>
              <input type='text' name='report' value={report.name} onChange={handleChange} placeholder='Report Name' required/>
            </label>  
            <label> 
              <p>Author</p> 
              <input type='text' name='author' value={report.author} onChange={handleChange} placeholder='Author Name' required/>
            </label>
            <label>
              <p>Date Published</p>
              <input type='date' name='published' value={report.published} onChange={handleChange} required/>
            </label>
            <label>
              <p>Report link:</p>
              <input type='text' name='link' value={report.link} onChange={handleChange} placeholder='Enter the report Link if any'/>
            </label>  
          </article>
          <footer>
            <button type='submit'>Add Report</button>
          </footer>
        </form>
    </section>
    );
}

export default AddReport;
