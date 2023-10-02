import React, { useState, useEffect } from 'react';
import styles from '../../assets/styles/module.css/Message_Links.module.css';
import Layout from './Layout';

const SMS = ({ all_messages, user_id }) => {
  const [activeContact, setActiveContact] = useState(null);
  const [UserContacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery]= useState()

  useEffect(() => {
    if (all_messages && all_messages.length > 0 && user_id) {
      const currentUser = all_messages.find(user => String(user_id) === String(user.userid));
      if (currentUser) {
        const filteredContacts = searchQuery
            ? currentUser.Contacts.filter((contact) =>
                contact.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : currentUser.Contacts;
          setContacts(filteredContacts);
      }
    }
  }, [all_messages, user_id, searchQuery]);

  const handleContactClick = (contact) => {
    setActiveContact(contact);
    console.log("setting the contact: ", contact)
  }

  const contactViewer = (thecontact) => {
    const redirectToWhatsApp = (phoneNumber) => {
      window.location.href = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}`;
    };

    return (
      <div className={styles.chat}>
        <div className={styles.position}>
          <ul style={{ listStyleType: 'none' }}>
            <br />
            <li><h4> User Details </h4></li>
            <li>{thecontact && thecontact.name}</li><br />
            <li>{thecontact && thecontact.position}</li><br />
            <li>
              {thecontact && thecontact.position === 'Volunteer'
                ? `${thecontact && thecontact.volunteerTime.startDate} - ${thecontact && thecontact.volunteerTime.endDate}`
                : `${thecontact && thecontact.role}`}
            </li><br />
            <li>{thecontact && thecontact.street}</li><br />
            <li>+25{thecontact && thecontact.contact.phone}</li><br />
            <li>
              <i onClick={() => redirectToWhatsApp(thecontact && thecontact.contact.phone)}><b>Redirect to WhatsApp</b> </i>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div id={styles.SMS}>
        <div id={styles.message_board}>
          <div className={styles.search_bar}>
            <input
              type="text"
              placeholder="Search Contact"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => setSearchQuery('')}>Clear</button>
          </div>
          {UserContacts&&UserContacts.length>0 && UserContacts.map(thecontact => (
            <ul
              className={`contactItem ${activeContact && activeContact.id === thecontact && thecontact.id ? 'active' : ''}`}
              onClick={() => handleContactClick(thecontact)}
            >
              <li className={styles.sender}>{thecontact && thecontact.name}</li>
              <li className={styles.content}>{thecontact && thecontact.contact.phone}</li>
            </ul>
          ))}
          
        </div>
        <div id={styles.chat_window}>
          { activeContact && Object.keys(activeContact).length>0 && contactViewer(activeContact)}
        </div>
      </div>
    </Layout>
  );
};

export default SMS;
