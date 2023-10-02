import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../assets/styles/module.css/App.module.css';
import Header from '../components/navigation/Header';
import Sidebar from '../components/navigation/Sidebar';
import '../assets/styles/css/global.css';
import { all_endpoints, frontendhost, backendhost } from '../../backend/endpoints';

function App({Component,pageProps}) {

  const user_id = "34039"
  const router = useRouter()
  const Signup_Login = ['signup', 'login']
  const {pathname} = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [renderSidebar, setRendersidebar] = useState(false)
  const [districts_provinces, setDistricts] = useState([]);
  const [all_members, setAllMembers] = useState();
  const [all_events, setAllEvents] = useState();
  const [all_partners, setAllPartners] = useState();
  const [all_projects, setAllProjects] = useState();
  const [all_gallery, setAllGallery] = useState();
  const [all_timeline, setAllTimeline] = useState();
  const [all_reports, setAllReports] = useState();
  const [all_users, setAllUsers] = useState();
  const [all_messages, setAllMessages] = useState();
  const [all_alerts, setAllAlerts] = useState();
  
  useEffect(() => {
    async function fetchData() {
      async function fetchData(name, path) {
        const response = await fetch(`${backendhost}${path}`);
        const the_data = await response.json()
        console.log('name: ', name)
        console.log('the_data: ', the_data)
        const data = the_data.map(({ _id, ...rest }) => rest);
        console.log('data: ', data)
        switch(name){
          case 'districts': setDistricts(data[0]); break
          case 'members': setAllMembers(data[0]); break
          case 'events': setAllEvents(data[0]); break
          case 'partners': setAllPartners(data); break
          case 'projects': setAllProjects(data); break
          case 'gallery': setAllGallery(data); break
          case 'timeline': setAllTimeline(data[0]); break
          case 'reports': setAllReports(data[0]); break
          case 'users': setAllUsers(data); break
          case 'messages': setAllMessages(data); break
          case 'alerts': setAllAlerts(data[0]); break
        }
      }
      all_endpoints.forEach(({ name, path }) => {
        fetchData(name, path);
      });
    }
    fetchData();
  }, []);  
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setSidebarOpen(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(()=>{
    if(pathname.endsWith('/')){
      router.push( pathname.slice(0, -1))
    }
  },[pathname])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 1000) {
        setSidebarOpen(false);
      }
    }
  }, []);

  useEffect(()=>{
    if(pathname.endsWith(Signup_Login[0])){setRendersidebar(false)
    } else if(pathname.endsWith(Signup_Login[1])){setRendersidebar(false)
    } else if(pathname.endsWith(frontendhost)){setRendersidebar(false)
    } else{setRendersidebar(true)}
  },[pathname])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
        <title>Rwanda Scouts Association</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <section id = {styles.App}>
        <header className = {styles.header}>
          <Header sidebarOpen = {sidebarOpen} toggleSidebar = {toggleSidebar} renderSidebar = {renderSidebar}/>
        </header>
        {renderSidebar && (
          <aside className = {styles.sidebar} id = {styles.sidebar}
            style = {{ width: sidebarOpen ? '230px' : '70px'}}
          >
            <Sidebar sidebarOpen = {sidebarOpen} />
          </aside>
        )}
        <article className = {styles.page_wrapper}>
          <section className = {styles.content}
            style = {{
              marginLeft: !renderSidebar ? '0' : sidebarOpen? '230px' : '70px',
            }}
          >
            <Component {...pageProps}
              setRendersidebar = {setRendersidebar}
              all_members = {all_members}
              districts_provinces = {districts_provinces}
              all_events = {all_events}
              all_partners = {all_partners}
              all_projects = {all_projects}
              all_gallery = {all_gallery}
              all_timeline = {all_timeline}
              all_reports = {all_reports}
              all_users = {all_users}
              all_messages = {all_messages}
              all_alerts = {all_alerts}
              user_id = {user_id}
              backendhost ={backendhost}
            />
          </section>
        </article>
      </section>
    </>
  );
}

export default App;
