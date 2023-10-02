import styles from '../../assets/styles/module.css/Dashboard.module.css';
import Row_Graphs from './pages/Graphs';
import Upcoming_Events from './pages/Upcomingevents';
import Recent_Reports from './pages/RecentReports';
import New_Members from './pages/NewMembers';
import Districts from './pages/Districts';
import {AppPages} from '../../components/navigation/page_links';

const Home = () => {
    return ( 
        <div id={styles.Dashboard}>
            <ul className={styles.row_one}>
                <article>
                    <nav><p>Members</p></nav>
                    <li className={styles.one}>
                        <div className={styles.dash_widget_bg}>
                            <i className='fas'>&#xf0c0;</i>
                        </div>
                        <div className={styles.dash_widget_info}>
                            <h3>1,552</h3>
                            <span>
                                Female 
                                <i className="fa fa-female"></i>
                            </span>
                        </div>
                    </li>
                    <li className={styles.two}>
                        <div className={styles.dash_widget_bg}>
                            <i className='fas'>&#xf0c0;</i>
                        </div>
                        <div className={styles.dash_widget_info}>
                            <h3>1,567</h3>
                            <span>
                                Male 
                                <i className="fa fa-male"></i>
                            </span>
                        </div>
                    </li>
                </article>
                <aside> 
                    <nav><p>Volunteers</p></nav>
                    <li className={styles.one}>
                        <div className={styles.dash_widget_bg}>
                            <i className='fas'>&#xf500;</i>
                        </div>
                        <div className={styles.dash_widget_info}>
                            <h3>311</h3>
                            <span>
                                Female 
                                <i className="fa fa-female"></i>
                            </span>
                        </div>
                    </li>
                    <li className={styles.two}>
                        <div className={styles.dash_widget_bg}>
                            <i className='fas'>&#xf500;</i>
                        </div>
                        <div className={styles.dash_widget_info}>
                            <h3>264</h3>
                            <span>
                                Male 
                                <i className="fa fa-male"></i>
                            </span>
                        </div>
                    </li>
                </aside>
            </ul>
            <ul className={styles.row_two}>
                <Row_Graphs />
            </ul>
            <ul className={styles.row_three}>
                <p>
                    <span className='left'>
                        Upcoming Events
                    </span>
                    <span className='right'>
                        {AppPages.find(page => page.name === 'Activities') && (
                        <a href={AppPages.find(page => page.name === 'Activities').path}>
                            View All
                        </a>
                        )}
                    </span>
                </p> 
                <article>
                    <Upcoming_Events/>
                </article>
                <aside>
                    <Recent_Reports/>
                </aside>
            </ul>
            <ul className={styles.row_four}>
                <article>
                    <New_Members/>
                </article>
                <aside>
                    <Districts/>
                </aside>
            </ul>
        </div>
    );
}
 
export default Home;