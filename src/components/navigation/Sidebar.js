import styles from '../../assets/styles/module.css/sidebar.module.css';
import Link from 'next/link';
import { SidebarPages } from './page_links';
import { useRouter } from 'next/router';
import React from 'react';

const Sidebar = (props) => {
  const router = useRouter();
  const handleLinkClick = (event) => {
    event.preventDefault();
  };

  const closeSidebar = (event) => {
    event.stopPropagation();
    if (window.innerWidth <= 900 && props.sidebarOpen) {
      props.toggleSidebar();
    }
  };
  const value = {small: '70px', big: '100%'}
  return (
    <div id={styles.sidebar_inner} className={styles.sidebar_inner} style={{ width: props.sidebarOpen ? props.sidebarExp : props.sidebarDim }}>
      <ul>
        {SidebarPages.map((sidebarPage) => (
          <React.Fragment key={sidebarPage.menuTitle}>
            <li className={styles.menu_title} style={{  
              width: props.sidebarOpen ? value.big : '26px',
            }}>
              {sidebarPage.menuTitle}
            </li>
            {sidebarPage.menu.map((page) => {
              if (page.submenu) {
                return (
                  <li key={page.path} className={styles.submenu}
                  style={{  width: props.sidebarOpen ? value.big : value.small,}} >
                    <a href='#' onClick={handleLinkClick}>
                      <i className={page.icon}></i>
                      <div className={styles.right}>
                        <span style={{ display: props.sidebarOpen ? 'block' : 'none' }}>
                          {page.linkText}
                        </span>
                        <i className={`fas ${page.icon_drop} the_dropdown`}></i>
                      </div>
                    </a>
                    <ul>
                      {page.submenu.map((subpage) => (
                        <li key={subpage.path}
                          className={subpage.path === router.pathname ? 'active' : ''}
                          onClick={(event) => closeSidebar(event)}
                          >
                          <a href={subpage.path}>
                            <i className={`fas ${subpage.icon}`}></i>
                            <span style={{ display: props.sidebarOpen ? 'block' : 'none' }}>
                              {subpage.linkText}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              } else {
                return (
                  <li
                    key={page.path}
                    className={page.path === router.pathname ? 'active' : ''}
                    onClick={(event) => closeSidebar(event)}
                    style={{  width: props.sidebarOpen ? value.big : value.small,}}>
                    <a href={page.path}>
                      <i className={page.icon}></i>
                      <span style={{ display: props.sidebarOpen ? 'block' : 'none' }}>
                        {page.linkText}
                      </span>
                    </a>
                  </li>
                );
              }
            })}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
