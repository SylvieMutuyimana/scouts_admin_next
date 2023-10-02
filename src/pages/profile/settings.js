import styles from '../../assets/styles/module.css/Profile_pages.module.css';
import React, { useState, useEffect} from 'react';
import { AppPages } from '../../components/navigation/page_links';

const Settings = ({districts_provinces}) => {
  const [theProvinces, setProvinces] = useState()

  useEffect(()=>{
    setProvinces(districts_provinces)
  },[districts_provinces])

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const handleChooseProvince = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict("");
  };
  
  const handleChooseDistrict = (event) => {
    setSelectedDistrict(event.target.value);
  };
  
  return (
    <section id={styles.Settings}>
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
        </aside>
      </nav>        
      <section>
        <form>
          <h3>Company Settings</h3>
          <article>
            <label>
              <p>Company Name <span>*</span></p>
              <input type="text" value=""/>
              <p>Logo</p>
              <input type="file" value=""/>
            </label>
            <label>
              <p>Address</p>
              <select name="province" id={styles.province} onChange={handleChooseProvince} value={selectedProvince}>
                <option value={""}>Select province</option>
                {theProvinces && Object.keys(theProvinces)>0 && Object.keys(theProvinces).map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              <select name="district" id={styles.district} onChange={handleChooseDistrict} value={selectedDistrict}>
                <option value={""}>Select district</option>
                {selectedProvince && theProvinces && Object.keys(theProvinces)>0 &&
                  theProvinces[selectedProvince].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              <input value="Sector" id={styles.sector} type="text"/>
              <input value="Street"id={styles.street} type="text"/>
            </label>
            <label>
              <p>Postal Code</p>
              <input value="91403" type="text"/>
            </label>
          </article>
          <aside>
            <label>
              <p>Email</p>
              <input value="danielporter@example.com" type="email"/>
            </label>
            <label>
              <p>Phone Number</p>
              <input value="0789787102" type="text"/>
            </label>
            <label>
              <p>Mobile Number</p>
              <input value="0786355579" type="text"/>
            </label>
            <label>
              <p>Fax</p>
              <input value="0789787102" type="text"/>
            </label>
            <label >
              <p>Website Url</p>
              <input value="https://www.example.com" type="text"/>
            </label>
          </aside>
          <footer>
            <button type="button">Save</button>
          </footer>
        </form>
      </section>
    </section>
  );
};
export default Settings;
