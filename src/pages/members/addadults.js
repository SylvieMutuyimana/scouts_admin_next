import React, { useState, useEffect, useRef } from 'react';
// Importing the adults_info object
import styles from '../../assets/styles/module.css/Add_pages.module.css';
import { AppPages } from '../../components/navigation/page_links';
const departments = {
  Education:['Trainer','Advisor','Counselor','Instructor'],
  Administration:['Main Admin','Employee','Volunteer'],
  Professionals:['HR','Secretary','IT Specialist','Accountant'],
  Volunteer:[]
}
const education = {
  'Primary':['General','International', 'Other'],
  'O Level':['General','International', 'Other'],
  'A Level':['TTC','TVET','REB', 'Other'],
  'Diploma':['Other'],
  'UnderGraduate':['Human Relations','Accounting','IT or Computer Science','Human Science','Economics','Other'],
  'Masters':['International Resources','Accounting','Computing','Human Science','Economics','Other'],
  'Postgraduate':['Environmental Conservation','Accounting','Computing','Human Science','Economics', 'Other']
}
const training = [
  'level1', 'level2', 'level3', 'level4'
]
const disabilities = [
  'disability1', 'disability2', 'disability3', 'disability4','disability5'
]
function AddAdult({all_members, districts_provinces }) {
  const [rwandaProvinces, setRwandaProvinces] = useState();
  const [allmembers, setAllmembers] = useState()
  useEffect(() => {
    setRwandaProvinces(districts_provinces);
  }, [districts_provinces]);
  useEffect(() => {
    setAllmembers(all_members);
  }, [all_members]);
  const [member, setMember] = useState({
    name: '',age: '',image:null, gender:'',
    address: {province:'',district:'',street: '', sector: '' },
    department: '',role: '',contact: { phone: '', email: '' },
    tenure: '', education:{level:'', field:''},
    id:'', maritialstatus:'', dob:'', entryYear:''
  });
  const currentYear = parseInt(new Date().getFullYear())

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'educationlevel' || name === 'studyfield' || name === 'specification' ) {
      if (name === 'educationlevel') {
        setMember(prevMember => ({
          ...prevMember,
          education: {
            ...prevMember.education,
            level: value,
            field: '',
          },
        }));
      } else if (name === 'studyfield') {
        setMember(prevMember => ({
          ...prevMember,
          education: {
            ...prevMember.education,
            field: value,
            ...(value === 'Other' ? { specification: '' } : {}),
          },
        }));
      } else if (name === 'specification') {
        setMember(prevMember => ({
          ...prevMember,
          education: {
            ...prevMember.education,specification: value,
          },
        }));
      }  
    }
    else if(name==='startDate' || name==='endDate'){
      setMember(prevMember=>({
        ...prevMember, 
          volunteerTime: {...prevMember.volunteerTime,
            [name]:value
          },
      }))
      let end_date; let start_date
      if(member.volunteerTime.startDate!= '' && name==='endDate'){
        start_date = member.volunteerTime.startDate; end_date = value
      }else if(member.volunteerTime.endDate!= '' && name==='startDate'){
        end_date = member.volunteerTime.endDate; start_date = value
      }
      if(start_date && end_date){
        if(start_date >= end_date){
          setMember(prevMember=>({
            ...prevMember, volunteerTime: {...prevMember.volunteerTime,
                [name]: '', daysDuration:''
              },
          }))
          alert('Volunteer start and end date are not correctly set')
        }
        else{
          const startDate = new Date(start_date)
          const endDate = new Date(end_date)
          const millsec_diff = endDate - startDate 
          setMember(prevMember=>({
            ...prevMember, volunteerTime:{
              ...prevMember.volunteerTime,
              daysDuration:  parseInt(Math.floor(millsec_diff / (1000 * 60 * 60 * 24)))
            }
          })) 
        }
      }
    }else if (name === 'dob') {
      const age = currentYear - parseInt(value.split('-')[0]);
      setMember(prevMember => ({
        ...prevMember, age: age,
      }));
      if(age<17){
        alert('Too young to be an adult member')
        setMember(prevMember=>({
          ...prevMember, dob:''
        }))
      }else {
        setMember(prevMember => ({
          ...prevMember, dob:value, age:age
        }))
      }
    }else{
      if(name==='department' && value==='Volunteer'){
        setMember(prevMember=>({
          ...prevMember, 
            volunteerTime: {startDate:'', endDate:'', daysDuration:''}
        }))
      }
      if(name==='entryYear'){
        console.log(parseInt(member.entryYear) < parseInt(new Date(member.dob).getFullYear()))
      }
      setMember(prevMember => ({
        ...prevMember,
        [name]: value,
      }));
    }
  };  

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    const addressUpdates = {
      province: { district: null, sector: null, cell: null },
      district: { sector: null, cell: null },
      sector: { cell: null },
    };
  
    setMember((prevMember) => ({
      ...prevMember,
      address: { ...prevMember.address, ...addressUpdates[name], [name]: value },
    }));
  };  

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setMember(prevMember => ({
      ...prevMember, contact: {
        ...prevMember.contact,[name]: value,
      },
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setMember(prevMember => ({
        ...prevMember, image: reader.result,
      }));
    };
    if (file) {reader.readAsDataURL(file);}
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredFields = {
      required: ['name', 'gender', 'department','entryYear', 'id'],
      address: ['sector', 'province', 'district'],
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
      }else if(member.id.length!==16){missingFieldGroup = 'id';}
    }
    if (missingFieldGroup) {
      if(missingFieldGroup === 'entry year'){
        if(parseInt(member.entryYear) - parseInt(new Date(member.dob).getFullYear())< 17){
          alert(`Too young to have joined the organisation in ${member.entryYear}`)
        }else if((1950 > parseInt(member.entryYear)) || (parseInt(member.entryYear) > currentYear)){
          alert(`Entry year should be within the organisation existance and not 
          higher than the current year `)}
      }else if(missingFieldGroup === 'id'){
        alert(`National ID should be 16 digits`)
      }else{alert(`Missing ${missingFieldGroup} fields`)}
    }else {
        const newMember = { ...member };
        console.log('allmembers:', allmembers.adults.Kigali)
        allmembers.adults[member.address.province][member.address.district][member.address.sector][member.address.cell].push(newMember);
        alert(`${member.name} successfully added to ${member.address.district} adult members`)
        setMember({
          name: '',age: '',image:null, gender:'',
          address: {province:'',district:'',street: '', sector: '' },
          department: '',role: '',contact: { phone: '', email: '' },
          tenure: '', education:{level:'', field:''},
          id:'', maritialstatus:'', dob:'', entryYear:''
        });
    }
  };
  const clearButtonRef = useRef(null);
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
    <section id={styles.add_member} className={styles.adult}>
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
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <h3>Add Member</h3>
          <article>
            <label>
              <p>Name *</p>
              <input type='text' name='name' value={member.name} placeholder='Full Name' onChange={handleChange} />
            </label>
            <label>
              <p>Image</p>
              <input type='file' name='image' accept='image/*' onChange={handleImageChange} />
            </label>
            <label>
              <p>Date of Birth *</p>
              <input type='date' name='dob' value={member.dob} onChange={handleChange}/>
              <p>Personal Details *</p>
              <input type='number' name='id' value={member.id} placeholder='National ID' onChange={handleChange} />
              <select name='gender' value={member.gender} onChange={handleChange}>
                <option value=''>Gender</option>
                <option value='Female'>Female</option>
                <option value='Male'>Male</option>
              </select>
              <select name='maritialstatus' value={member.maritialstatus} onChange={handleChange}>
                <option value=''>Maritial Status</option>
                <option value='Single'>Single</option>
                <option value='Married'>Married</option>
              </select>
            </label>
            <label>
              <p>Education *</p>
              <select name='educationlevel' value={member.education.level} onChange={handleChange}>
                <option value=''>Education Level</option>
                {Object.keys(education).map((key) => (
                  <option value={key} key={key}>{key}</option>
                ))}              
              </select>
              <select name='studyfield' value={member.education.field} onChange={handleChange}>
                <option value=''>Field of Study</option>
                {member.education.level && education[member.education.level].map(field=>(
                  <option value={field}>{field}</option>
                ))}
              </select>
              {member.education.field && member.education.field === 'Other' &&(
                <input name='specification' value={member.education.specification} onChange={handleChange} placeholder='Specification'/>
              )}
              <p>Disabilities</p>
              <p>
              {disabilities.map((level) => (
                <span id={styles.checkbox} key={level}>
                <input type='checkbox' id={styles.checkbox} name='disabilities' value={disabilities}
                  onChange={handleChange} checked={level.disabilities}/>
                {level}
                </span>
              ))}
              </p>
            </label>     
          </article>
          <aside>
            <label>
              <p>Contact *</p>
              <input type='text' name='phone' placeholder='Phone Number' value={member.contact.phone} onChange={handleContactChange} />
              <input type='email' name='email' placeholder='Email' value={member.contact.email}  onChange={handleContactChange} />
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
            <input type='text' name='street' value={member.address.street} 
            onChange={handleAddressChange} placeholder='Enter Your Street (Not Required) '/>
            </label>
            <label>
              <p>Membership *</p>
              <input type='number' name='entryYear' placeholder='Entry Year' value={member.entryYear} onChange={handleChange} />
              <p>Training Level *</p>
              <p>
              {training.map((level) => (
                <span id={styles.checkbox} key={level}>
                <input  type='checkbox' id={styles.checkbox} name='training' value={level}
                  onChange={handleChange} checked={level.selected}/>
                  {level}
                </span>
              ))}
              </p>
              <p>Department *</p>
              <select name='department' value={member.department} onChange={handleChange}>
                <option value=''>Department</option>
                {Object.keys(departments).map((key) => (
                  <option value={key} key={key}>{key}</option>
                ))}   
              </select>
              {member.department && (
                member.department==='Volunteer'?
                <>
                  <p>Start and End Date</p>
                  <input type='date' name='startDate' id={styles.left} value={member.volunteerTime.startDate} onChange={handleChange}/>
                  <input type='date' name='endDate' id={styles.right} value={member.volunteerTime.endDate} onChange={handleChange} />
                  {member.volunteerTime.daysDuration && (
                    <input
                      placeholder={`Duration: ${
                        member.volunteerTime.daysDuration >= 30
                          ? `${parseInt(member.volunteerTime.daysDuration / 30)} ${
                              parseInt(member.volunteerTime.daysDuration / 30) > 1 ? 'months' : 'month'
                            }`
                          : `${member.volunteerTime.daysDuration} days`
                      }`}
                      readOnly
                    />
                  )}                          
                </>
                :<select name='role' value={member.role} onChange={handleChange}>
                  <option value=''>Role</option>
                  {departments[member.department].map(role=>(
                    <option value={role}>{role}</option>
                  ))}
                </select>
              )}                 
            </label>
          </aside>
          <footer><button type='submit'>Add Member</button></footer>
        </form>
    </section>
    );
}

export default AddAdult;
