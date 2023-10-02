import React,{useEffect,useState} from 'react';
import styles from '../../../assets/styles/module.css/Message_Links.module.css';
import user_img from '../../../assets/img/user.jpg';
import Layout from '../Layout';
import { useRouter } from 'next/router';
import { AppPages } from '../../../components/navigation/page_links';
const Email = ({ all_messages, user_id }) => {
  const [activeEmail, setActiveEmail] = useState(null);
  const [UserEmails, setEmails] = useState([]);
  const [searchQuery, setSearchQuery]= useState()
  const [body, setBody] =useState()
  const [therecipient, setRecipient] =useState()
  const [subject, setSubject] =useState()

  const handle_SendEmail = () =>{

  }

  const router = useRouter()
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
  

  const redirect = (email) => {
    router.push(AppPages.find(page=>page.name==='Emails').path)
  }

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
              onClick={() => redirect(the_email)}
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
        <div id={styles.chat_window}>
          <div id={`${styles.new_form_container} ${styles.email}`}>
            <div className={styles.container}>
              <div className={styles.the_head}>
                  <article>
                      <h4>New Email</h4>
                  </article>
                  <aside>
                      <button onClick={redirect} id={styles.close_button}>
                          <i class='fa fa-window-close'></i>
                      </button>
                  </aside>
              </div>
              <div className={styles.recipient}>
                  Recipients:{' '}
                  <input type='text' value={therecipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder='Enter email here'
                  />
              </div>
              <div className={styles.the_subject}>
                  Subject:{' '}
                  <input type='text' value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder='Subject'
                  />
              </div>
              <div className={styles.body}>
                  {' '}
                  <textarea id={styles.body} value={body} onChange={
                  (e) => setBody(e.target.value)}
                  placeholder='The Body' />
              </div>
              <div className={styles.the_footer}>
                  <button onClick={handle_SendEmail} id={styles.send}>
                      Send
                      <i class='material-icons'>send</i>
                  </button>
              </div>
            </div>
          </div>
        </div>    
      </div>
    </Layout>
  );
};

export default Email;