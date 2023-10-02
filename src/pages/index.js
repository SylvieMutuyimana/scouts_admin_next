import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../assets/styles/module.css/index.module.css';
import { cloud_imgs, all_images } from '../../backend/assets/cloudinary';
import { AppPages } from '../components/navigation/page_links';

const Index = ({setRendersidebar}) => {
  const router = useRouter();
  const logo = cloud_imgs(all_images.header.logo)
  useEffect(() => {
    // Simulating an asynchrono=us authentication process
    setRendersidebar(false)
    setTimeout(() => {
      setRendersidebar(false)
      handleAuthenticate(); // Check if the user is authenticated
    }, 2000);
  }, []);

  const getUserFromLocalStorage = () => {
    // Simulating retrieval of user data from local storage
    const userJSON = localStorage.getItem('logged_email');
    return JSON.parse(userJSON);
  };

  const handleAuthenticate = () => {
    // Simulating user authentication based on user object
    //const user = getUserFromLocalStorage(); 
    const user = getUserFromLocalStorage()
    // Will Replace this with actual logic to retrieve user data
    if (user) {
      router.push(AppPages.find(page=>page.name='Dashboard').path)
    } else {
      router.push(AppPages.find(page=>page.name='Login').path)
    }
  };
  
  return (
    <div id={styles.loading_container}>
      <img className={styles.loading_image} src={logo} alt='Loading' />
      <p>Loading ...</p>
    </div>
  );

};

export default Index;
