import styles from '../../assets/styles/module.css/Profile_pages.module.css';
import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import {User_details} from '../../components/data/user';
import { AppPages } from '../../components/navigation/page_links';

const Editprofile = ({districts_provinces}) => {
  const [theProvinces, setProvinces] = useState()

  useEffect(()=>{
    setProvinces(districts_provinces)
  },[districts_provinces])
  
  const router = useRouter();
  const [newdetails, setNewDetails] = useState({
    img:User_details.img, name:User_details.name,gender:User_details.gender,
    title:User_details.title, position:User_details.position,
    location:{
      province:User_details.location.province, 
      district:User_details.location.district, 
      sector:User_details.location.sector
    },
    address:{
      province:User_details.address.province, 
      district:User_details.address.district, 
      sector:User_details.address.sector,
      sector:User_details.address.street
    },
    contact:{phone:"", email:""},age:'',
  });

  const [Userdetails, setUserDetails] = useState(User_details);
  const [addressDistrict, setAddressDistrict] = useState([]);
  const [locationDistrict, setLocationDistrict] = useState([]);
  const handleChange = (event) => {
    const {name, value } = event.target;
    setNewDetails((prevDetails) => ({
      ...prevDetails, [name]: value,
    }));
  };
  const handleAddress = (event) => {
    const { name, value } = event.target;
    if (name === 'address_province') {
      setNewDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          province: value,
          district: "",
        },
      }));
      setAddressDistrict(theProvinces[value]);
    }
    else if (name === 'address_district') {
      setNewDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          district: value,
        },
      }));
    }
    else{
      setNewDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          [name]: value,
        },
      }));
    }
  };
  const handleLocation = (event) => {
    const { name, value } = event.target;
    if (name === 'location_province') {
      setNewDetails((prevDetails) => ({
        ...prevDetails,
        location: {
          ...prevDetails.location,
          province: value,
          district: "",
        },
      }));
      setLocationDistrict(theProvinces[value]);
    }
    else if (name === 'location_district') {
      setNewDetails((prevDetails) => ({
        ...prevDetails,
        location: {
          ...prevDetails.location,
          district: value,
        },
      }));
    }
    else{
      setNewDetails((prevDetails) => ({
        ...prevDetails,
        location: {
          ...prevDetails.location,
          [name]: value,
        },
      }));
    }
  };
  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      contact: {
        ...prevDetails.contact,[name]: value,
      },
    }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewDetails((prevDetails) => ({
        ...prevDetails,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSave = (event) => {  
    event.preventDefault();
    switch (true) {
      case newdetails.name.trim() === "" || newdetails.age.trim() === "" || newdetails.gender.trim() === "":
        alert("Missing name, age or gender");
        return;
      case newdetails.title.trim() === "":
        alert("title missing");
        return;
      case newdetails.position.trim() === "":
        alert("position missing");
        return;
      case newdetails.location.province.trim() === ""||
        newdetails.location.district.trim()===""||
        newdetails.location.sector.trim()==="":
        alert("Volunteering area missing");
        return;
      case newdetails.contact.phone.trim() === "" || newdetails.contact.email.trim() === "":
        alert("Contact missing");
        return;
      /*case newdetails.img === null:
        alert("Image missing");
        return;*/
      /*case newdetails.address.province.trim() === ""||
        newdetails.address.district.trim() === "":
        alert("Missing address province and district");
        return;*/
      case newdetails.address.street.trim() === "" || 
        newdetails.address.sector.trim() === "":
        alert("Missing address street and sector");
        return;
      default:
    }
    const filled_details = { ...newdetails };
    setUserDetails(filled_details)
    router.push("/MyProfile");
  };
  
  return (
    <section id={styles.Editprofile}>
      <nav>
        <article>
          <h4>
            {AppPages.find((page) => page.name === 'MyProfile') && (
              <a href={AppPages.find((page) => page.name === 'MyProfile').path}>
                <i class="fa fa-arrow-left"></i>
              </a>
            )}
          </h4>
        </article>
        <aside>
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
        </aside>
      </nav>        
      <section>
        <form>
          <ul className={styles.one}>
            <li className={styles.left}>
              <img src={Userdetails.img} alt="user"/>
              <input type="file" placeholder="profile" accept="image/*" onChange={handleImageChange}/>
            </li>
            <li className={styles.right}>
              <ul>
              <li className={styles.name}>
                <input type="text" id={styles.name} name="name" placeholder={User_details.name} 
                value={newdetails.name} onChange={handleChange} />
              </li>
              <li className={styles.title}>
                <select name="title" id={styles.title} value={newdetails.title} onChange={handleChange}>
                  <option value=''>Title</option>
                  <option value='Admin'>Admin</option>
                  <option value='User'>User</option>
                </select>
              </li>
              <li className={styles.position}>
                <select name="position" id={styles.position} value={newdetails.position} onChange={handleChange}>
                  <option value=''>Position</option>
                  <option value='Scout Head'>Scout Head</option>
                  <option value='Staff'>Staff</option>
                  <option value='Scout'>Scout</option>
                  <option value='Volunteer'>Volunteer</option>
                </select>
              </li>
              <li>
                <select name="location_province" id={styles.province} onChange={handleLocation} value={newdetails.location.province}>
                  <option value="">province</option>
                  {theProvinces && Object.keys(theProvinces).length >0 && Object.keys(theProvinces).map((location_province) => (
                    <option key={location_province} value={location_province}>{location_province}</option>
                  ))}
                </select> - 
                <select name="location_district" id={styles.district} onChange={handleLocation} value={newdetails.location.district}>
                  <option value="">district</option>
                  {locationDistrict && locationDistrict.length>0 &&locationDistrict.map((location_district) => (
                    <option key={location_district} value={location_district}>{location_district}</option>
                  ))}
                </select>
              </li>
              <li>
                <input placeholder={User_details.location.sector} id={styles.sector} type="text"
                name="sector" value={newdetails.location.sector} onChange={handleLocation} 
                />
              </li>
              </ul>
            </li>
            <hr/>
          </ul>
          <ul className={styles.two}>
            <li>
              <p>Gender:</p>
              <p>
              <select name="gender" id={styles.gender} value={newdetails.gender} onChange={handleChange}> 
                <option value=''>gender</option>   
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
              </p>
            </li>
            <li>
              <p>Phone:</p>
              <p>
                <input id={styles.phone} type="number" placeholder={User_details.contact.phone}
                name="phone" value={newdetails.contact.phone} onChange={handleContactChange}
                />
                </p>
            </li>
            <li>
              <p>Email:</p>
              <p>
                <input id={styles.email} type="email" placeholder={User_details.contact.email}
                name="email" value={newdetails.contact.email} onChange={handleContactChange}
                />
              </p>
            </li>
            <li>
              <p>Age:</p>
              <p>
                <input type="number" placeholder={User_details.age}
                name="age" value={newdetails.age.phone} onChange={handleChange}
                />
              </p>
            </li>
            <li className={styles.large}>
              <p>Address: </p>
              <p>
                <select name="address_province" id={styles.province} onChange={handleAddress} value={newdetails.address.province}>
                  <option value={""}>province</option>
                  {theProvinces && Object.keys(theProvinces).length >0 && Object.keys(theProvinces).map((address_province) => (
                    <option key={address_province} value={address_province}>{address_province}</option>
                  ))}
                </select>
                <select name="address_district" id={styles.district} onChange={handleAddress} value={newdetails.address.district}>
                  <option value={""}>district</option>
                  {addressDistrict && addressDistrict.length>0 && addressDistrict.map((address_district) => (
                    <option key={address_district} value={address_district}>{address_district}</option>
                  ))}
                </select>
              </p>
              <p>
                <input placeholder={User_details.address.sector} id={styles.sector} type="text"
                name="sector" value={newdetails.address.sector} onChange={handleAddress}
                />
                <input placeholder={User_details.address.street} id={styles.street} type="text"
                name="street" value={newdetails.address.street} onChange={handleAddress} 
                />
              </p>
            </li>
          </ul>
          <ul className={styles.three}>
            <button onClick={handleSave}>Save</button>
          </ul>
        </form>
      </section>
    </section>
  );
};
export default Editprofile;
