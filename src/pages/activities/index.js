import React, { useEffect, useState } from 'react';
import rsvp from '../../assets/img/activities/rsvp.png';
import styles from '../../assets/styles/module.css/Activities_Partners.module.css';
import {AppPages} from '../../components/navigation/page_links';

const Activities = ({all_events, all_projects}) => {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [numCardsToDisplay, setNumCardsToDisplay] = useState(6);
  const [activitiesInfo, setActivitiesInfo] = useState();
  const [allProjects, setallProjects] = useState();
  useEffect(()=>{
    setActivitiesInfo(all_events)
  },[all_events])
  useEffect(()=>{
    setallProjects(all_projects)
  },[all_projects])
  
  console.log('all_projects: ', all_projects)
  console.log('allProjects: ', allProjects)

  const toggleCardExpansion = (id) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = (index) => {
    const updatedActivities = [...activitiesInfo];
    updatedActivities.splice(index, 1);
    setActivitiesInfo(updatedActivities);
  };

  const handleShare = (id) => {
    const activity = activitiesInfo[id];
    const link = `//${activity.form}`;
    window.location.href = link;
  };  

  const renderCards = () => {
    const activity_ids = Object.keys(activitiesInfo).slice(0, numCardsToDisplay);
    return activity_ids.map((activity_id, index) => {
      const activity = activitiesInfo[activity_id];
      const isExpanded = index === expandedCardId;
      const isNotExpanded = !isExpanded;
      return (
        <div
          key={index}
          className={`${styles.activity_card} ${isExpanded ? styles.view : ''}`}
        > 
          <article>
              <img src={activity.image} alt={activity.title} />
              <h3>{activity.title}</h3>
          </article>
          <aside>
            <nav>
              <div className={styles.activity_card_menu}>
                <button onClick={() => handleDelete(index)}>
                  <i className='fa fa-trash-o'></i>  
                </button>
                <button onClick={() => handleShare(index)}>
                <i className='fa fa-share'></i>
                </button>
              </div>
            </nav>
            <section>
              {isNotExpanded && 
                <>
                  <div>
                      <p>{activity.location.district}</p>
                      <p>{activity.location.place} </p>
                  </div>
                  <div>
                      <p>{activity.date}</p>
                      <p>{activity.time.start} - {activity.time.end}</p>
                  </div>
                  <div>
                      <p>{activity.organiser.name}</p>
                      <p>{activity.organiser.title} </p>
                  </div>
                </>
              }
              {isExpanded &&
                <>
                  <div>
                      <table>
                        <thead><tr><th></th></tr></thead>
                        <tbody>
                          <tr>
                              <td className={styles.place}>
                                  <p>{activity.location.district}</p>
                                  <p>{activity.location.place} </p>
                              </td>
                              <td className={styles.date}>
                                  <p>{activity.date}</p>
                                  <p>{activity.time.start} - {activity.time.end} </p>
                              </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <thead><tr><th></th></tr></thead>
                        <tbody>
                          <tr>
                              <td className={styles.organised}>
                                  <p>Organised by: </p>
                                  <p>.</p><p>.</p><p>.</p>
                              </td>
                              <td>
                                  <p>{activity.organiser.name}</p>
                                  <p>{activity.organiser.title}</p>
                                  <p>{activity.organiser.contact}</p>
                                  <p>{activity.organiser.email}</p>
                              </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <thead><tr><th></th></tr></thead>
                        <tbody>
                          <tr>
                              <td>
                                  <img src={rsvp} alt='rsvp' />
                              </td>
                              <td>
                                  <p>RSVP: {activity.RSVP}/{activity.maximum_capacity}</p>
                                  <p className={styles.part_form}>Participation Form:
                                    {' '}<a href=''>{activity.form}</a></p>
                              </td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                  <table>
                    <thead><tr><th></th></tr></thead>
                    <tbody>
                      <tr>
                          <th>Name</th>
                          <th className={styles.contact}>Contact</th>
                          <th className={styles.email}>Email</th>
                      </tr>
                      {activity.volunteers.map((volunteer, i) => {                  
                          return (
                              <tr key={i}>
                                  <td>{volunteer.name}</td> 
                                  <td className={styles.contact}>{volunteer.contact}</td>  
                                  <td className={styles.email}>{volunteer.email}</td>  
                              </tr>                   
                          )
                      })}
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr><th>Funding Details</th></tr>
                      <tr>
                        <td>Target</td> 
                        <td>Raised</td> <td>Remaining </td>
                      </tr>
                    </thead>
                    <tbody>
                      {allProjects && allProjects.length > 0 && (
                        <tbody>
                          {Object.keys(allProjects).map(year => (
                            Object.values(allProjects[year]).map(project => (
                              project.activityid === activity_id && (
                                <tr>
                                  <td>{project.target}</td>
                                  <td>{project.raised}</td>
                                  <td>{project.target - project.raised}</td>
                                </tr>
                              )
                            ))
                          ))}
                        </tbody>
                      )}                    
                    </tbody>
                  </table>
                </>
              }            
            </section>
            <div className={styles.activity_card_buttons}>
              <button className={styles.view} onClick={() => toggleCardExpansion(index)}>
                {isExpanded ? (
                  <>
                    Resize <i className={styles['material-icons']}>&#xe5d1;</i>
                  </>
                ) : (
                  <>
                    View <i className={styles['fas fa-expand']}></i>
                  </>
                )}
              </button>
            </div>
          </aside>
        </div>
      );
    })  
  };
  

  const handleNumCardsSubmit = (event) => {
    event.preventDefault();
    const inputVal = parseInt(event.target[0].value);
    if (isNaN(inputVal)) {
      setNumCardsToDisplay(6);
    } else {
      setNumCardsToDisplay(Math.max(Math.min(inputVal, activitiesInfo.length), 0));
    }
  };

  const handleSortByDate = () => {
    const sortedActivities = [...activitiesInfo].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    setActivitiesInfo(sortedActivities);
  };
  return (
    <div id={styles.Activities}>
      <section>
        <nav>
          <article>
            <form onSubmit={handleNumCardsSubmit}>
              <div className={styles.numcards_input}>
                <label htmlFor='numcards_input'>Show</label>
                <input type='number'
                    name='numCardsToDisplay' min='1'
                    max={numCardsToDisplay}
                    defaultValue={numCardsToDisplay}
                />
                <button type='submit'>Preview</button>
              </div>
            </form>
          </article>
          <aside>
            {AppPages.find(page => page.name === 'AddActivity') && (
              <a href={AppPages.find(page => page.name === 'AddActivity').path}>
                <button>
                  <i className='material-icons'>add</i> Add Activity
                </button>
              </a>
            )}
          </aside>
        </nav>
        <section>
            <article className={styles.top}>
                <button onClick={handleSortByDate}>
                    Date
                    <i className={styles['fa fa-sort-alpha-asc']}></i>
                </button>
            </article>
            <aside className={styles.top}>
                <button onClick={() => setNumCardsToDisplay(activitiesInfo.length)}>
                    Show All
                </button>
                <button onClick={() => setNumCardsToDisplay(3)}>
                    Show Less
                </button>
            </aside>
            <hr/>
            <div className={styles.activities_container}>
                <div className={styles.activities_grid}>
                  {activitiesInfo && renderCards()}
                </div>
            </div>
        </section>
      </section>
    </div>
    );
};

export default Activities;
