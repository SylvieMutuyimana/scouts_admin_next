import React, { useState, useEffect, useRef } from 'react';
import styles from '../../assets/styles/module.css/Add_pages.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Addactivity({all_events, districts_provinces}) {
    const router = useRouter();
    const [theProvinces, setProvinces] = useState();
    const [activities_info, setActivities] = useState()

    useEffect(() => {
        setProvinces(districts_provinces);
    }, [districts_provinces]);

    useEffect(() => {
        setActivities(all_events);
    }, [all_events]);

    const [districts, set_Districts] = useState([]);
    const [activity, setActivity] = useState({
        title: '',image: null,location: {province:'',district: '',sector:'', place: '' },
        date: '',time: { start: '', end: '' },
        organiser:{name:'',title:'',contact:'',email:''},
        volunteers:[{name:'', contact:'', email:''}],
        RSVP:'', maximum_capacity:'', form:''
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setActivity((prevActivity) => ({
            ...prevActivity,[name]: value,
        }));
    };
    const handleTimeChange = (event) => {
        const { name, value } = event.target;
        setActivity((prevActivity) => ({
            ...prevActivity,
            time: {
                ...prevActivity.time,
                [name]: value,
            },
        }));
    };
    
    const handleLocationChange = (event) => {
        const { name, value } = event.target;
        if (name === 'province') {
            setActivity((prevActivity) => ({
                ...prevActivity,
                location: {
                    ...prevActivity.location,
                    province: value,
                    district: '',
                },
            }));
            set_Districts(theProvinces[value]);
        } else if (name === 'district') {
            setActivity((prevActivity) => ({
                ...prevActivity,
                location: {
                    ...prevActivity.location,
                    district: value,
                },
            }));
        }
        else{
            setActivity((prevActivity) => ({
                ...prevActivity,
                location: {
                    ...prevActivity.location,
                    [name]: value,
                },
            }));
        }
    };
    const handleOrganiserChange = (event) => {
        const { name, value } = event.target;
        setActivity((prevActivity) => ({
            ...prevActivity,
            organiser: {
                ...prevActivity.organiser,
                [name]: value,
            },
        }));
    };  
    
    // assuming there are initially two volunteers
    const [numVolunteers, setNumVolunteers] = useState(1);
    const handleVolunteerChange = (event) => {
        const { name, value } = event.target;
        const [prefix, index] = name.split('');
        if (index > 1 || numVolunteers === 2) return; // Only allow up to 2 volunteers
        setActivity((prevActivity) => ({
            ...prevActivity,
            volunteers: prevActivity.volunteers.map((volunteer, i) => {
                if (i !== index) return volunteer;
                return {
                    ...volunteer,
                    [prefix === 'n' ? 'name' : prefix === 'c' ? 'contact' : 'email']: value,
                };
            }),
        }));
        if (numVolunteers < 2) {
            setNumVolunteers(numVolunteers + 1);
        }
    };
    function handleImageChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setActivity((prevActivity) => ({
                ...prevActivity,
                image: reader.result,
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }  
    const handleSubmit = (event) => {
        event.preventDefault();
        switch (true) {
            case activity.title.trim() === '':
                alert('Missing title');
                return;
            case activity.organiser.name.trim() === ''||
                activity.organiser.contact.trim() === '' || 
                activity.organiser.email.trim() === '':
                alert('Missing organiser');
                return;
            case activity.form.trim() === '':
                alert('Missing participation form');
                return;
            case activity.location.province.trim() === ''||
                activity.location.district.trim() === ''||
                activity.location.sector.trim() === ''||
                activity.location.place.trim() === '':
                alert('Missing address');
                return;
            case activity.maximum_capacity.trim() === '':
                alert('Missing maximum capacity value');
                return;
            case activity.date.trim() === '':
                alert('Missing date');
                return;
            case activity.time.start.trim() === ''||
                activity.time.end.trim() === '':
                alert('Missing time');
                return;
            /*case activity.volunteers.some(
                    volunteer => volunteer.name.trim() === '' 
                    || volunteer.contact.trim() === '' 
                    || volunteer.email.trim() === ''):
                alert('Submit at least 1 volunteer');
                return; */           
            case activity.image === null:
                alert('Image missing');
                return;
            default:
        }
        const newActivity = { ...activity };
        // Adding new activity to activities_info array
        activities_info.push(newActivity);
        // Redirect to the Activities page after submitting the form
        setActivity({
            title: '',image: null,location: {province:'',district: '',sector:'', place: '' },
            date: '',time: { start: '', end: '' },
            organiser:{name:'',title:'',contact:'',email:''},
            volunteers:[{name:'', contact:'', email:''}],
            RSVP:'', maximum_capacity:'', form:''
        });
        router.push("/Activities");

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
    const DeletenewVolunteer = (index) => {
        setActivity((prevActivity) => ({
            ...prevActivity,
            volunteers: prevActivity.volunteers.filter((_, i) => i !== index),
        }));
        setNumVolunteers(numVolunteers - 1);
    };
    
    
    return (
    <section id={styles.add_activity}>
        <nav>
            <Link href='/Activities'>
                <button className={styles.back}>
                    <i class='fa fa-arrow-left'></i>
                </button>                         
            </Link>
            <button className={styles.clear} type='button' ref={clearButtonRef}>Clear</button>
        </nav>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <h3>Add Activity</h3>
            <article>
                <label>
                    <p>Event Poster:</p> 
                    <input type='file' name='image' accept='image/*' onChange={handleImageChange} />
                </label>
                <label>
                    <p>Event Name:</p>
                    <input type='text' name='title' value={activity.title} 
                    onChange={handleChange} placeholder='Enter title' />
                </label>
                <label>
                    <p>Organiser:</p>
                    <input type='text' name='name' value={activity.organiser.name} 
                    onChange={handleOrganiserChange} placeholder='Name' />
                    <input type='number' name='contact' id ='contact' value={activity.organiser.contact} 
                    onChange={handleOrganiserChange} placeholder='Phone number' />
                    <select name='title' id ='title' value={activity.organiser.title} 
                    onChange={handleOrganiserChange}>
                        <option value=''>Title</option>
                        <option value='Admin'>Admin</option>
                        <option value='Volunteer'>Volunteer</option>
                        <option value='Scout'>Scout</option>
                    </select>
                    
                    <input type='email' name='email' value={activity.organiser.email} 
                    onChange={handleOrganiserChange} placeholder='Email' />
                </label>
                <label>
                    <p>Participation Link:</p>
                    <input type='text' name='form' value={activity.form} 
                    onChange={handleChange} placeholder='Enter link' />
                </label>
            </article>
            <aside>
            {[...Array(numVolunteers)].map((_, i) => (
                <label key={i}>
                    <p>
                        <span>Volunteer {i + 1}:</span>
                        <span onClick={() => DeletenewVolunteer(i)}>
                            <i className={styles['fas fa-trash-alt']}></i>
                        </span>
                    </p>
                    <input type='text' name={`name${i}`} value={activity.volunteers[`name${i}`]}
                        onChange={handleVolunteerChange} placeholder='Name' />
                    <input type='number' name={`contact${i}`} value={activity.volunteers[`contact${i}`]}
                        onChange={handleVolunteerChange} placeholder='Phone Number' />
                    <input type='email' name={`email${i}`} value={activity.volunteers[`email${i}`]} 
                        onChange={handleVolunteerChange} placeholder='Email' />
                </label>
            ))}
            {numVolunteers < 3 && (
                <button id={styles.add} onClick={() => setNumVolunteers(numVolunteers + 1)}>Add Volunteer</button>
            )}
            </aside>        
            <aside>
                <label>
                    <p>Location:</p>
                    <select name='province' id={styles.province} value={activity.location.province}
                    onChange={handleLocationChange}>
                        <option value={''}>Select province</option>
                        {theProvinces && theProvinces.length>0 && Object.keys(theProvinces).map((province) => (
                            <option key={province} value={province}>{province}</option>
                        ))}
                    </select>
                    <select name='district' id={styles.district} value={activity.location.district}
                    onChange={handleLocationChange}>
                        <option value={''}>Select district</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                    <input type='text' name='sector' value={activity.location.sector} 
                    onChange={handleLocationChange} placeholder='Sector' />
                    <input type='text' name='place' value={activity.location.place} 
                    onChange={handleLocationChange} placeholder='Place' />
                </label>
                <label>
                    <p>Maximum Capacity:</p> 
                    <input type='number' name='maximum_capacity' value={activity.maximum_capacity} 
                    onChange={handleChange} min='1' placeholder='Maximum capacity' />
                </label>
                <label>
                    <p>Date:</p>
                    <input type='date' id={styles.date} name='date' value={activity.date} 
                    onChange={handleChange} /> 
                </label>
                <label id={styles.start}>
                    <p>Start</p> 
                    <input type='time' name='start' value={activity.time.start} 
                    onChange={handleTimeChange} />
                </label>
                <label id={styles.end}>
                    <p>End</p>
                    <input type='time' name='end' value={activity.time.end} 
                    onChange={handleTimeChange} />
                </label>
            </aside>
            <footer>
                <button type='submit'>Add Activity</button>
            </footer>
        </form>
    </section>
    );
}

export default Addactivity;
