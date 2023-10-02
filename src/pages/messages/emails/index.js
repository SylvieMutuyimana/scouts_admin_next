import React,{useEffect,useState} from 'react';
import styles from '../../../assets/styles/module.css/Message_Links.module.css';
import user_img from '../../../assets/img/user.jpg';
import Layout from '../Layout';

const Email = ({ all_messages, user_id }) => {
  const [activeEmail, setActiveEmail] = useState(null);
  const [UserEmails, setEmails] = useState([]);
  const [searchQuery, setSearchQuery]= useState()

  useEffect(() => {
    if (all_messages && all_messages.length > 0 && user_id) {
      const currentUser = all_messages.find(user => String(user_id) === String(user.userid));
      if (currentUser && currentUser.Email_Messages) {
        const allEmails = Object.entries(currentUser.Email_Messages).flatMap(([key, emails]) =>
          emails.map(email => ({ type: key, ...email }))
        );
        const filteredEmails = searchQuery
          ? allEmails.filter(email =>
              email.type === 'inbox'?
              email.sender.name.toLowerCase().includes(searchQuery.toLowerCase())
              : email.receiver.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : allEmails;
        setEmails(filteredEmails);
      }
    }
  }, [all_messages, user_id, searchQuery]);
  

  const handleEmailClick = (email) => {
    setActiveEmail(email);
    console.log("setting the Email: ", email)
  }

  const EmailViewer = (the_email) => {
    return (
      <div className={styles.chat}>
        <div className={styles.the_head}>
          <span> {the_email.type} </span>
        </div>
        <div className={styles.email_view}>
          <article>
            <img src={user_img} alt='user'/>
            {the_email.type==='sent'? 'Me': the_email.receiver.name}
            {` <`}{
              the_email.type==='sent'?the_email.receiver.s_email: the_email.sender.s_email
            }{`>`}
          </article>
          <aside>
            {formatedTime(the_email.timestamp).toLocaleTimeString(
              [], { 
                hour: '2-digit', 
                minute: '2-digit' 
              }
            )} | {` `}
            {formatedTime(the_email.timestamp).toLocaleDateString(
              'en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              }
            ).replace(/,/g, '')},
            <p><i className='material-icons'>delete</i></p>
          </aside>                
          <div className={`${styles.the_message} ${styles.email}`}>
            <h3>{the_email.subject}</h3>
            <div className={`${styles.body} ${styles.email}`}>{the_email.body}</div>
          </div>
        </div>
      </div>
    );
  };
  const formatedTime =(date)=>new Date(date)
  return (
    <Layout>
      <div id={styles.Email}>
        <div id={styles.message_board}>
          <div className={styles.search_bar}>
            <input
              type='text'
              placeholder='Search Email'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => setSearchQuery('')}>Clear</button>
          </div>
          {UserEmails && UserEmails.length>0 && UserEmails.map(the_email => (
            <ul
              className={`${styles.email_item} ${
                activeEmail && activeEmail.id === the_email.id ? 'active' : ''
              }`}              
              onClick={() => handleEmailClick(the_email)}
            >
              <li className={styles.sender}>
                {
                  the_email.type==='sent'?the_email.receiver.s_email: the_email.sender.s_email
                }
              </li>
              <li className={styles.content}>{the_email.body}</li>
              <li className={styles.timestamp}>
                {the_email.type} - {' '}
                {
                  (formatedTime(the_email.timestamp)).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }).replace(/,/g, '')
                }
              </li>
            </ul>
          ))}
        </div>
        {/* Render chat window with active email */}
        <div id={styles.chat_window}>
          { activeEmail && Object.keys(activeEmail).length>0 && EmailViewer(activeEmail)}
        </div>    
      </div>
    </Layout>
  );
};

export default Email;
