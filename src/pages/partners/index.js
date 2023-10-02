import styles from '../../assets/styles/module.css/Activities_Partners.module.css';
import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {AppPages} from '../../components/navigation/page_links';

const Partners = ({all_partners}) => {
  const [partnersInfo, setPartnersInfo] = useState();
  useEffect(()=>{
    setPartnersInfo(all_partners)
  }, all_partners)
  console.log('all_partners: ', all_partners)
  console.log('partnersInfo: ', partnersInfo)

  const [numCardsToDisplay, setNumCardsToDisplay] = useState(6);

  const handleNumCardsSubmit = (event) => {
    event.preventDefault();
    const inputVal = parseInt(event.target[0].value);
    if (isNaN(inputVal)) {
      setNumCardsToDisplay(6);
    } else {
      setNumCardsToDisplay(Math.max(Math.min(inputVal, (partnersInfo?.length>0)?partnersInfo.length : 6), 0));
    }
  };
  return (
    <div id={styles.partners}>
      <section>
        <nav>
          <article>
            <form onSubmit={handleNumCardsSubmit}>
              <div className={styles.numcards_input}>
                <label htmlFor="numcards_input">Show</label>
                <input
                  type="number"
                  name="numCardsToDisplay"
                  min="1"
                  max={(partnersInfo?.length>0)?partnersInfo.length:1}
                  defaultValue={numCardsToDisplay}
                />
                <button type="submit">Preview</button>
              </div>
            </form>
          </article>
          <aside>
            {AppPages.find(page => page.name === 'AddPartners') && (
              <a href={AppPages.find(page => page.name === 'AddPartners').path}>
                  <button>
                      <i className={styles["material-icons"]}>add</i> Add Partners
                  </button>
              </a>
          )}
          </aside>
        </nav>
        <section>
          <article></article>
          <aside>
            <button onClick={() => setNumCardsToDisplay((partnersInfo.length)?partnersInfo.length:3)}>Show All</button>
            <button onClick={() => setNumCardsToDisplay(3)}>Show Less</button>
          </aside>
          <hr />
          <div className={styles['partners_container']}>
            {partnersInfo &&partnersInfo.length>0 && 
              partnersInfo?.slice(0, numCardsToDisplay).map((partner, index) => (
              <div key={index} className={styles.partner_item}>
                <p>{partner.name}</p>
                <img src={partner.image} alt={partner.name} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Partners;
