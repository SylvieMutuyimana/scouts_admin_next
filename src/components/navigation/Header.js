import styles from '../../assets/styles/module.css/Header.module.css';
import React, { useEffect, useState } from 'react';
import { AppPages } from './page_links';
import {the_alerts} from '../data/alerts' ;
import { useRouter } from 'next/router';
import { all_images, cloud_imgs } from '../../../backend/assets/cloudinary';

const Header = ({renderSidebar, sidebarOpen, toggleSidebar, all_users, all_alerts, user_id})  => {
  const [userDetails, setuserDetails] = useState();
  const [userId, setUserId] = useState()
  const header_imgs = all_images.header
  const logo = cloud_imgs(header_imgs.logo)
  const openmenu_arrow = cloud_imgs(header_imgs.openmenu_arrow)
  const closemenu_arrow = cloud_imgs(header_imgs.closemenu_arrow)

  useEffect(() => {
    if (user_id && all_users && all_users.length > 0) {
      const matchingUser = all_users.find(user => String(user.id) === String(user_id));
      if (matchingUser) {
        setUserId(user_id);
        setuserDetails(matchingUser);
      }
    }
  }, [all_users, user_id]);

  const [alerts, setAlerts] = useState(the_alerts);
  const router = useRouter();
  const [headerLeft, setheaderLeft] = useState('350px')
  const [headerArticle, setheaderArticle] = useState('300px')
  const [headerLeftPad_L, setheaderLeftPad_L] = useState('70px')
  const [headerLeftPad_S, setheaderLeftPad_S] = useState('40px')
  const [small_screen, setsmallscreen]=useState('no')
  const DeleteNotification = (index) => {
    const updatedNotifications = [...alerts.notifications];
    updatedNotifications.splice(index, 1);
    setAlerts((prevState) => ({
      ...prevState,
      notifications: updatedNotifications,
    }));
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setsmallscreen('yes');
        setheaderLeft('150px');
        setheaderLeftPad_L('5px');
        setheaderLeftPad_S('5px');
        setheaderArticle('100px');
      } else {
        setsmallscreen('no');
        setheaderLeft('350px');
        setheaderLeftPad_L('70px');
        setheaderLeftPad_S('40px');
        setheaderArticle('300px');
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);  

  const handleLogout = () => {
    router.push('/');
    router.reload();
  };

  return (
    <nav id={styles.mainNav}>
      {
        renderSidebar?(
          <>
            <div id={styles.header_left} style={{ width: sidebarOpen ? headerLeft : '150px',
              paddingLeft: sidebarOpen? headerLeftPad_S: headerLeftPad_L
            }}>
              <article style={{ width: sidebarOpen ? headerArticle : '100px' }}> 
                <div className={styles.logo} >
                  <img src={logo} alt='logo' />
                  {small_screen==='no'&&small_screen!='yes' && <span >{sidebarOpen ? 'Rwanda Scouts Association' : 'RSA'}</span>}
                  {small_screen==='yes'&&small_screen!='no' && <span >RSA</span>}
                </div>
              </article>
              <aside>
                <span onClick={toggleSidebar} className={styles.toggleSidebar}>
                  <img src={sidebarOpen ? closemenu_arrow: openmenu_arrow} alt='menuarrow' />
                </span>
              </aside>
            </div>
            <div id={styles.header_right}>
              <ul>
                <li id={styles.notifications}>
                  <div id={styles.theHead}>
                    <i className={'fa fa-bell'} ></i> 
                    <span className={styles.badge}> 
                      {alerts.notifications.length}
                    </span>
                  </div>
                  <div className={`${styles.dropdown_menu} ${styles.notifications}`}>
                    <div className={styles.heading}>
                      <h4>NOTIFICATIONS</h4>
                      {AppPages.find(page => page.name === 'Notifications') && (
                        <a href={AppPages.find(page => page.name === 'Notifications').path}>
                            View All
                        </a>
                        )}
                    </div>
                    <table>
                      <thead><tr><th></th></tr></thead>
                      <tbody>
                        {alerts.notifications.slice(0, 4).map((notification, index) => (
                          <tr key={index}>
                            <td><i className={styles['material-icons']}>style</i></td>
                            <td className={styles.alert}>{notification.alert}</td>
                            <td>
                              <button onClick={DeleteNotification}><i className={styles['fas fa-trash-alt']}></i></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </li>
                <li id={styles.messages}>
                  <div id={styles.theHead}>
                    <i className={'fa fa-user'}></i>
                    <span className={styles.badge}> 
                      {alerts.messages.length}
                    </span>
                  </div>
                  <div className={`${styles.dropdown_menu} ${styles.messages}`}>
                    <div className={styles.heading}>
                      <h4>MESSAGES</h4>
                      <span> 
                        {AppPages.find(page => page.name === 'Emails') && (
                          <a href={AppPages.find(page => page.name === 'Emails').path}>
                              View All
                          </a>
                        )}
                      </span>
                    </div>
                    <table>
                      <tbody>
                        {alerts.messages.slice(0, 4).map((message, index) => (
                          <tr key={index} id={styles.message}>
                            <td><i className={'fa fa-user'}></i></td>
                            <td>
                              <p>{message.name}</p>
                              <p>{message.text}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </li>
                <li id={styles.user}>
                  <div id={styles.theHead} href='/Myprofile' style={{borderRadius:'50%'}}>
                    <img src={userDetails && userDetails.img} alt='user' className={styles.img} style={{borderRadius:'50%'}}/>
                  </div>
                  <div className={`${styles.dropdown_menu} ${styles.user}`}>
                    <div className={styles.user_header}>
                      <div className={styles.avatar}>
                        <img src={userDetails && userDetails.img} alt='user'/>
                        <p>{userDetails && userDetails.name}</p>
                        <p>{userDetails && userDetails.contact.email}</p>
                      </div>
                    </div>
                    <table>
                      <tbody>
                        <tr>
                          <td className={styles.icon}>
                            {AppPages.find(page => page.name === 'MyProfile') && (
                              <a href={AppPages.find(page => page.name === 'MyProfile').path}>
                                <i className={'fa fa-user'}/>
                              </a>
                              )}
                          </td>
                          <td>My Profile</td>
                        </tr>
                        <tr>
                          <td className={styles.icon}>
                            {AppPages.find(page => page.name === 'Settinga') && (
                              <a href={AppPages.find(page => page.name === 'Settings').path}>
                                <i className={'fa fa-cog'}/>
                              </a>
                              )}
                          </td>
                          <td>Account Settings</td>
                        </tr>
                        <tr onClick={handleLogout}>
                          <td className={styles.icon}>
                            {AppPages.find(page => page.name === 'Login') && (
                              <a href={AppPages.find(page => page.name === 'Login').path}>
                                  View All
                                  <i className={'fa fa-power-off'}/>
                              </a>
                              )}
                          </td>
                          <td>Logout</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
          </>
        ):
        (
          <div id={styles.header_left} style={{ 
            paddingLeft: '40px', width: '90%'
          }}>
            <article style={{ width: '90%', textAlign:'left' }}> 
              <div className={styles.logo} >
                <img src={logo} alt='logo'/>
                <span >Rwanda Scouts Association</span>
              </div>
            </article>
          </div>
        )
      }
      </nav>
    );
  };
  
  export default Header;
