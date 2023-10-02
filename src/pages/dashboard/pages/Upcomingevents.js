import styles from '../../../assets/styles/module.css/Dash_Content.module.css';
import React, { useState } from 'react';
import { AppPages } from '../../../components/navigation/page_links';
import {activities_info} from "../../../components/data/activitiesinfo";

const Upcoming_Events = () => {
    const sortedActivities= activities_info.sort((a, b) => a.title.localeCompare(b.title));
    return (
        <div className={styles.Upcoming_events}>
            <table>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Organizer</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedActivities.slice(0, 4).map((event, index) => (
                        <tr key={index}>
                            <td>{event.title}</td>
                            <td>
                                <p>{event.location.district}, {event.location.province}</p>
                                <p>{event.location.place}</p>
                            </td>
                            <td>
                                <p>{event.date}</p>
                                <p>{event.time.start} - {event.time.end}</p>
                            </td>
                            <td>
                                <p>{event.organiser.name}</p>
                                <p>{event.organiser.title}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.last}>
                {AppPages.find(page => page.name === 'AddActivity') && (
                    <a href={AppPages.find(page => page.name === 'AddActivity').path}>
                        Add Event <i className="fa"> &#xf067;</i>                     
                    </a>
                )}
            </div>
        </div>
    );
};
    
export default Upcoming_Events;
