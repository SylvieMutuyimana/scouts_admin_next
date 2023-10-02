import styles from '../../assets/styles/module.css/Messages.module.css';
import new_email from '../../assets/img/messages/new_email.png';
import React, { useState} from 'react';
import { AppPages } from '../../components/navigation/page_links';

function Messages({children, user_id}) {
    const [Sel_Chat, setSel_Chat] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeEmail, setActiveEmail] = useState(null);
    const [activeCONTACT, setActiveCONTACT] = useState(null);
    const [NewEmailWindow, set_NewEmailWindow] = useState(
      <div className={styles.chat}></div>
    );
    const EmailCompose = () => {
        setActiveEmail(null);
        set_NewEmailWindow(<New_EmailForm NewEmailWindow={NewEmailWindow} />);
    };    
    const close_emailCompose=()=>{
        set_NewEmailWindow(<div className={styles.chat}></div>);
    }
    const handleSel_Chat = (the_chat) => {
        setSel_Chat(the_chat);  
    };
    const New_EmailForm = ({NewEmailWindow}) => {
        const [to, setTo] = useState('');
        const [subject, setSubject] = useState('');
        const [body, setBody] = useState('');
    
        const handle_SendEmail = () => {
            // send email logic here
        };
        return (
            <div>
                {/* render the NewEmailWindow component */}
                <div id={`${styles.new_form_container} ${styles.email}`}>
                    {NewEmailWindow}
                </div>
                {/* render the compose form */}
                <div id={styles.new_form_container}>
                    <div className={styles.container}>
                        <div className={styles.the_head}>
                            <article>
                                <h4>New Email</h4>
                            </article>
                            <aside>
                                <button onClick={close_emailCompose} id={styles.close_button}>
                                    <i class='fa fa-window-close'></i>
                                </button>
                            </aside>
                        </div>
                        <div className={styles.recipient}>
                            Recipients:{' '}
                            <input type='text' value={to}
                            onChange={(e) => setTo(e.target.value)}
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
        );
    };
    return (
        <div id={styles.Messages}>
            <nav> 
                <ul className={styles.ul1}>
                    {AppPages.find((page) => page.name === 'Emails') && (
                      <a href={AppPages.find((page) => page.name === 'Emails').path}>
                        <li><i className='material-icons'>email</i>EMAIL</li>
                      </a>
                    )}
                    {AppPages.find((page) => page.name === 'SMS') && (
                      <a href={AppPages.find((page) => page.name === 'SMS').path}>
                        <li><i className='material-icons'>textsms</i>CONTACTS</li>
                      </a>
                    )}
                </ul>
                <ul className={styles.ul2}>
                    <aside>               
                        <li>
                            {AppPages.find((page) => page.name === 'NewEmail') && (
                              <a href={AppPages.find((page) => page.name === 'NewEmail').path}>
                                <button onClick={EmailCompose}>
                                  <img src={new_email} alt='new_email' />
                                </button>
                              </a>
                            )}
                        </li>
                    </aside>
                </ul>
            </nav>
            <section>
              {React.Children.map(children, (child) =>
                React.cloneElement(child, {searchQuery, setSearchQuery, activeCONTACT, setActiveCONTACT})
              )}
            </section>
        </div>
    );
}

export default Messages;
