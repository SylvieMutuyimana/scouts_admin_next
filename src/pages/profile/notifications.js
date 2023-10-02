import styles from '../../assets/styles/module.css/Profile_pages.module.css';
import React, {useEffect, useState } from 'react';
import { AppPages } from '../../components/navigation/page_links';

const Notifications = ({all_alerts}) => {
  const [alerts, setAlerts] = useState();
  useEffect(()=>{
    setAlerts(all_alerts)
  }, [all_alerts])

  const DeleteNotification = (index) => {
    const updatedNotifications = [...alerts?.notifications];
    updatedNotifications.splice(index, 1);
    setAlerts((prevState) => ({
      ...prevState,
      notifications: updatedNotifications,
    }));
  };
  const DeleteAllNotifications = () => {
    setAlerts((prevState) => ({
      ...prevState,
      notifications: [],
    }));
  };
  
  return (
    <section id={styles.Notifications}>
      <nav>
        <article>
          <h4>
            {AppPages.find((page) => page.name === 'MyProfile') && (
              <a href={AppPages.find((page) => page.name === 'MyProfile').path}>
                My profile 
              </a>
            )} | 
            {AppPages.find((page) => page.name === 'Notifications') && (
              <a href={AppPages.find((page) => page.name === 'Notifications').path}>
                Notifications
              </a>
            )} |
            {AppPages.find((page) => page.name === 'Settings') && (
              <a href={AppPages.find((page) => page.name === 'Settings').path}>
                Settings
              </a>
            )}
          </h4>
        </article>
        <aside></aside>
      </nav>
      <section>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>
                <button onClick={DeleteAllNotifications}>
                  Delete All
                </button>
              </td>
            </tr>
            {alerts && Object.keys(alerts).length > 0 && alerts.notifications.length === 0 ? (
              <tr>
                <td></td>
                <td colSpan="4">There are currently no notifications.</td>
              </tr>
            ) : (
              alerts && Object.keys(alerts).length > 0 && alerts.notifications.map((notification, index) => (
                <tr key={index}>
                  <td><i class="material-icons">style</i></td>
                  <td>{notification.alert}</td>
                  <td>
                    <button onClick={() => DeleteNotification(index)}>
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </section>
  );
  
};

export default Notifications;
