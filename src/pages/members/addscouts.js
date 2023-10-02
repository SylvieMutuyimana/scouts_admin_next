import React, { useState, useEffect, useRef } from 'react';
// Importing the allmembers object
import styles from '../../assets/styles/module.css/Add_pages.module.css';
import { AppPages } from '../../components/navigation/page_links';

const badges = ['badge1', 'badge2', 'badge3', 'badge4']
const cellGroups = {
  'group1': ['unit101', 'unit102', 'unit103'],
  'group2': ['unit201', 'unit202', 'unit203'],
  'group3': ['unit301', 'unit302', 'unit303'],
  'group4': ['unit401', 'unit402', 'unit403'],
  'group5': ['unit501', 'unit502', 'unit503'],
  'group6': ['unit601', 'unit602', 'unit603']
}
function Addscouts({all_members, districts_provinces }) {
  const clearButtonRef = useRef(null);
  const currentYear = parseInt(new Date().getFullYear())
  const [rwandaProvinces, setRwandaProvinces] = useState();
  const [allmembers, setAllmembers] = useState()
  useEffect(() => {
    setRwandaProvinces(districts_provinces);
  }, [districts_provinces]);
  useEffect(() => {
    setAllmembers(all_members);
  }, [all_members]);
  console.log('districts_provinces: ', districts_provinces)
  console.log('rwandaProvinces: ', rwandaProvinces)
  console.log('all_members: ', all_members)
  console.log('allmembers: ', allmembers)
  const [member, setMember] = useState({
    name: '',image:null, gender:'',
    address: {province:'',district:'',street: '',cell:'', sector: '', group:'', unit:''},
    occupation: '',contact: { phone: '', email: '' },
    entryYear: '',tenure: '', dob:'',age: '',badges:'',
    more:{mother:'', father:'', nationalid:''}
  });
  const [youthGroup, setYouthGroup] = useState({
    young:false, adult:false
  })

  const [type, setType] = useState('')
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMember(prevMember => ({
      ...prevMember, [name]: value,
    }));
    const more = ['mother', 'father', 'nationalid']
    if (name === 'dob') {
      const age = currentYear - parseInt(value.split('-')[0]);
      setMember(prevMember => ({
        ...prevMember, age: age,
      }));
      setType(
        age >= 6 && age <= 12 ? 'Abatoni':
        age >= 13 && age <= 16 ? 'Inyesha' :
        age >= 16 && age <= 20 ? 'Abahizi' :
        age >= 21 && age <= 24 ? 'Ingenzi' :
        age >= 25 ? 'Adults' : ''
      );
      if(age<6){
        alert('Too young to be a scout')
        setMember(prevMember=>({
          ...prevMember, dob:''
        }))
      }
      else if(age >= 6 && age <= 20){
        setYouthGroup(prev=>({...prev, adult:false ,young:true}))
        setMember(prevMember => ({
          ...prevMember, more: {
            ...prevMember.more, id:null
          }
        }))
      }else if(age > 20){
        setYouthGroup(prev=>({...prev, adult:true ,young:false}))
        setMember(prevMember => ({
        ...prevMember, more: {
          ...prevMember.more, father:null, mother:null
        }
      }))}
    }
    else if (name === 'entryYear') {
      const tenure = currentYear - parseInt(value);
      setMember(prevMember => ({
        ...prevMember, tenure: tenure,
      }));
    }
    else if(more.includes(name)){
      setMember(prevMember=>({
        ...prevMember, more: {
          ...prevMember.more, name:value
        }
      }))
    }
  }; 
  const handleBadges = (event) => {
    const { name, checked } = event.target;
    setMember((prevMember) => ({
      ...prevMember,
      badges: checked
        ? [...prevMember.badges, name] // Add the badge if checked
        : prevMember.badges.filter((badge) => badge !== name), // Remove the badge if unchecked
    }));
  };                                                                                                                                                                                                                                                        
  
  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    if(name === 'phone' || name==='email'){
      setMember(prevMember => ({
        ...prevMember,
        contact: {...prevMember.contact,[name]: value,},
      }));
    }else{
      const addressUpdates = {
        province: { district: null, sector: null, cell: null, group: null, unit: null },
        district: { sector: null, cell: null, group: null, unit: null },
        sector: { cell: null, group: null, unit: null },
        cell: { group: null, unit: null },
        group: { unit: null },
        unit: {}
      };
    
      setMember((prevMember) => ({
        ...prevMember,
        address: { ...prevMember.address, ...addressUpdates[name], [name]: value },
      }));
    }
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setMember(prevMember => ({
        ...prevMember,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredFields = {
      required: ['name', 'gender', 'occupation','entryYear'],
      address: ['sector', 'province', 'district', 'group', 'unit'],
      contact: ['phone', 'email']
    };
    let missingFieldGroup = null;
    console.log('here')
    for (const group in requiredFields) {
      console.log('checking: ', group)
      if (group === 'required') {
        console.log('group is required')
        if (requiredFields[group].some(field => member[field].trim() === '')) {
          missingFieldGroup = group;
          console.log('missingFieldGroup: ', missingFieldGroup)
          break;
        }
      } else {
        console.log('group is else' )
        if (requiredFields[group].some(field => member[group][field].trim() === '')) {
          missingFieldGroup = group;
          console.log('missingFieldGroup: ', missingFieldGroup)
          break;
        }
      }
      console.log('getting out/ starting again')
    }
    console.log('finally out')
    if (!missingFieldGroup) { 
      if(!member.image){missingFieldGroup = 'image';}
      else if(member.entryYear && (
        (parseInt(member.entryYear) < 1950) || (parseInt(member.entryYear) > currentYear)
        || ((parseInt(member.entryYear) - parseInt(new Date(member.dob).getFullYear())<17) )
      )){
        setMember(prevMember => ({
          ...prevMember, entryYear:'', tenure: '',
        }));
        missingFieldGroup = 'entry year'
      }else if(member.id && member.id.length!==16){missingFieldGroup = 'id';}
    }
    if (missingFieldGroup) {
      if(missingFieldGroup === 'entry year'){
        if(parseInt(member.entryYear) - parseInt(new Date(member.dob).getFullYear())< 17){
          alert(`Too young to have joined the organisation in ${member.entryYear}`)
        }else if((1950 > parseInt(member.entryYear)) || (parseInt(member.entryYear) > currentYear)){
          alert(`Entry year should be within the organisation existance and not 
          higher than the current year `)}
      }else if(missingFieldGroup === 'id'){
        alert(`National ID should be 17 digits`)
      }else{alert(`Missing ${missingFieldGroup} fields`)}
    }else {
        const newMember = { ...member };
        console.log('allmembers:', allmembers.scouts.Kigali)
        allmembers.scouts[member.address.province][member.address.district][member.address.sector][member.address.cell].push(newMember);
        alert(`${member.name} successfully added to ${member.address.district} members`)
        setMember({
          name: '', age: '', image: null, gender: '',
          address: { province: '', district: '', street: '', sector: '', cell: '' },
          occupation: '', contact: { phone: '', email: '' },
          tenure: '', dob: '', age: '', badges: '', more: { mother: '', father: '', nationalid: '' }
        });
        setYouthGroup({ young: false, adult: false });
        setType('');
    }
  };
  
  
  useEffect(() => {
    const clearButton = clearButtonRef.current;
    const inputs = document.getElementsByTagName('input');
    clearButton.addEventListener('click', function () {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
    });
    return () => {
      clearButton.removeEventListener('click', function () {
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = '';
        }
      });
    };
  }, []);
  return (
  <section id={styles.add_member} className={styles.scout}>
    <nav>
      {AppPages.find(page => page.name === 'Members') && (
        <a href={AppPages.find(page => page.name === 'Members').path}>
          <button className={styles.back}>
            <i class='fa fa-arrow-left'></i>
          </button>           
        </a>
      )}
      <button className={styles.clear} type='button' ref={clearButtonRef}>Clear</button>
    </nav>
    <form onSubmit={handleSubmit} encType='multipart/form-data' id>
      <h3>Add Member</h3>
      <article>
        <label>
          <p>Name * </p>
          <input type='text' name='name' value={member.name} placeholder='Full Name' onChange={handleChange} />
        </label>
        <label>
          <p>Image *</p>
          <input type='file' name='image' accept='image/*' onChange={handleImageChange} />
        </label>
        <label>
          <p>Gender *</p>
          <select name='gender' value={member.gender} onChange={handleChange}>
            <option value=''>Choose Gender</option>
            <option value='Female'>Female</option>
            <option value='Male'>Male</option>
          </select>
        </label>
        <label>
        <p>Date of Birth * </p>
        <input type='date' name='dob' value={member.dob} onChange={handleChange} />
        <input type='text' name='typed' value={type} readOnly placeholder='Group Type' />
        { youthGroup.young === true && (
          <>
            <input type='text' name='mother' placeholder={`Mother${"'"}s full name`} id={styles.left}
              value={member.more.mother} onChange={handleChange}
            />
            <input type='text' name='father' placeholder={`Fatherr${"'"}s full name`} id={styles.right}
              value={member.more.father} onChange={handleChange}
            />
          </>)
        }
        { youthGroup.adult === true && (
          <>
            <input type='text' name='nationalid' placeholder='Enter National ID'
              value={member.more.id} onChange={handleChange}
            />
          </>)
        }
      </label>
      <label>
      <p>Occupation * </p>
      <input type='text' name='occupation' value={member.occupation} placeholder='Occupation' onChange={handleChange} />
    </label>
      </article>
      <aside>
      <label>
      <p>Contact * </p>
      <input type='text' name='phone' value={member.contact.phone} onChange={handleAddressChange} placeholder='Phone Number' />
      <input type='email' name='email'  value={member.contact.email} onChange={handleAddressChange} placeholder='Email'/>
    </label>
      <label>
          <p>Address * </p>
          <select name='province' id={styles.province} value={member.address.province} onChange={handleAddressChange}>
            <option value={''}>Select province</option>
            {rwandaProvinces && rwandaProvinces.length>0 &&Object.keys(rwandaProvinces).map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
          <select name='district' id={styles.district} value={member.address.district} onChange={handleAddressChange}>
            <option value={''}>Select district</option>
            {member.address.province && Object.keys(rwandaProvinces[member.address.province].districts).map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          <select name='sector' id={styles.province} value={member.address.sector} onChange={handleAddressChange}>
            <option value={''}>Select sector</option>
            {member.address.district && Object.keys(rwandaProvinces[member.address.province].districts[member.address.district]).map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          <select name='cell' id={styles.district} value={member.address.cell} onChange={handleAddressChange}>
            <option value={''}>Select cell</option>
            {member.address.sector && rwandaProvinces[member.address.province].districts[member.address.district][member.address.sector].map(cell => (
              <option key={cell} value={cell}>{cell}</option>
            ))}
          </select>  

          <select name='group' id={styles.province} value={member.address.group} onChange={handleAddressChange}>
            <option value={''}>Select group</option>
            {member.address.cell && Object.keys(cellGroups).map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          <select name='unit' id={styles.district} value={member.address.unit}
          onChange={handleAddressChange}>
            <option value={''}>Select unit</option>
            {member.address.group &&(
              cellGroups[member.address.group].map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))
            )}
          </select>
          <input type='text' name='street' value={member.address.street} 
          onChange={handleAddressChange} placeholder='Enter Your Street (Not Required) '/>
        </label>
        <label>
          <p>Membership * </p>
          <input type='number' name='entryYear' placeholder='Entry Year' value={member.entryYear} onChange={handleChange} />
          <p>Badges Earned </p>
          <div className={styles.checkbox_grid}>
            {badges.map((badge) => (
              <div className={styles.checkbox_item} key={badge}>
                <input type='checkbox' id={badge} name={badge} 
                  onChange={handleBadges} checked={member.badges.includes(badge)}
                />
              <label htmlFor={badge}>{badge}</label>
            </div>
          ))}
          </div>
        </label>
      </aside>
      <footer>
        <button type='submit'>Add Member</button>
      </footer>
    </form>
  </section>
  );
}

export default Addscouts;
