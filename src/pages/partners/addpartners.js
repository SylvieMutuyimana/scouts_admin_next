import styles from '../../assets/styles/module.css/Add_pages.module.css';
import React, { useState} from 'react';
import { useRouter } from 'next/router';

const AddPartners = ({all_partners}) => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const addPartner = () =>{
    
  }

  const newPtrn = (i) => {
    const newPt = { name: '', img: '' };
    return (
      <div key={newPt}>
        <label>
          <input type="file" accept="image/*" />
        </label> 
        <label>
          <input type="text" placeholder='Name' />
          <textarea type="text" placeholder='Description' />
        </label>       
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    // update message based on result
    setMessage('Form submitted successfully!');
    // navigate to Partners page after 2 seconds
    setTimeout(() => {
      router.push('/Partners');
    }, 2000);
  };

  return (
    <section id={styles.add_partner}> {/* Use the className prop */}
      <nav>
        <a href="/Partners">
          <button className={styles.back}> {/* Use the className prop */}
            <i className="fa fa-arrow-left"></i>
          </button>                         
        </a>
      </nav>
      <form onSubmit={handleSubmit}>
        <h3>Add Partners</h3>
        
        <article>
          {[...Array(2)].map((_, i) => (
            <div id={styles.new_partner} key={i}> {/* Use the className prop */}
              <React.Fragment>
                <p className={styles.partner_head}>Partner {i+1}</p> {/* Use the className prop */}
                {newPtrn()}
                <br />
              </React.Fragment>
            </div>
          ))}
        </article>
        <aside>
          {[...Array(2)].map((_, i) => (
            <div id={styles.new_partner} key={i}> {/* Use the className prop */}
              <React.Fragment>
                <p className={styles.partner_head}>Partner {i+3}</p> {/* Use the className prop */}
                {newPtrn()}
                <br />
              </React.Fragment>
            </div>
          ))}
        </aside>
        <br />  
        {message && (
          <p
            style={{ color: message.includes('successfully') ? 'green' : 'red' }}
          >
            {message}
          </p>
        )}
        <footer>
          <button type="submit">Add Partners</button>
        </footer>
      </form>
    </section>
  );
  
};

export default AddPartners;
