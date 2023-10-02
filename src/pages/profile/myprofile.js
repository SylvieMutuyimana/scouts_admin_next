import styles from '../../assets/styles/module.css/Profile_pages.module.css';
import React, { useState, useEffect } from "react";
import { AppPages } from '../../components/navigation/page_links';

const Myprofile = ({all_users, user_id}) => {
  const [userDetails, setuserDetails] = useState();
  const [userId, setUserId] = useState()

  useEffect(() => {
    if (user_id && all_users && all_users.length > 0) {
      const matchingUser = all_users.find(user => String(user.id) === String(user_id));
      if (matchingUser) {
        setUserId(user_id);
        setuserDetails(matchingUser);
      }
    }
  }, [all_users, user_id]);
  
  console.log('all_users: ', all_users)
  console.log('userDetails: ', userDetails)
  console.log('user_id: ', user_id)
  console.log('userId: ', userId)

  return (
    <section id={styles.Myprofile}>
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
        <aside>
          {AppPages.find((page) => page.name === 'EditProfile') && (
            <a href={AppPages.find((page) => page.name === 'EditProfile').path}>
              <button id={styles.button}>
                <i class="material-icons">add</i> Edit Profile
              </button>            
            </a>
          )}
        </aside>
      </nav> 
        <section>
          <ul className={styles.one}>
            <li className={styles.left}>
              <img src={userDetails && userDetails.img} alt="user" />
            </li>
            <li className={styles.right}>
              <ul>
              <li className={styles.name}>{userDetails && userDetails.name}</li>
              <li className={styles.title}>{userDetails && userDetails.title}</li>
              <li className={styles.position}>{userDetails && userDetails.position}</li>
              <li className={styles.adress}>{userDetails && userDetails.location.province} - {userDetails && userDetails.location.district}</li>
              <li>{userDetails && userDetails.location.sector}</li>
              </ul>
            </li>
            <hr/>
          </ul>
          <ul className={styles.two}>
            <li>
              <p>Gender:</p>
              <p>{userDetails && userDetails.gender}</p>
            </li>
            <li>
              <p>Phone:</p>
              <p>{userDetails && userDetails.contact.phone}</p>
            </li>
            <li>
              <p>Email:</p>
              <p>{userDetails && userDetails.contact.email}</p>
            </li>
            <li>
              <p>Age:</p>
              <p>{userDetails && userDetails.age}</p>
            </li>
            <li>
              <p>Address: </p>
              <p>{userDetails && userDetails.address.province}  - {userDetails && userDetails.address.district} </p>
              <p>{userDetails && userDetails.address.sector} - {userDetails && userDetails.address.street} </p>
            </li>
          </ul>
        </section>

    </section>
  );
};
export default Myprofile;
