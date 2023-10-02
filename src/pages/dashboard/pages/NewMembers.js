import styles from '../../../assets/styles/module.css/Dash_Content.module.css';
import React, { useEffect, useState } from 'react';
import { AppPages } from '../../../components/navigation/page_links';
const New_Members = ({all_members}) => {
    const [newMembers, setNewMembers] = useState([])
    useEffect(() => {
        if (all_members?.scouts) {
            let new_members = [];
            
            Object.entries(all_members.scouts).forEach(([province, provinceData]) =>
            Object.values(provinceData).forEach(districtData =>
            Object.values(districtData).forEach(sectorData => {
                const [firstCellData] = Object.values(sectorData);
                if (firstCellData && firstCellData.length > 0) {
                    new_members.push(firstCellData[0]);
                    console.log(firstCellData[0])
                }
            })
            )
            );
            
            setNewMembers(new_members);
        }
    }, [all_members]); 
    return (
        <div id={styles.New_Members}>
            <table>
                <thead>
                    <tr>
                        <th>New Members</th>
                        <th></th>
                        <th></th>
                        <th>                          
                            {AppPages.find(page => page.name === 'Members') && (
                                <a href={AppPages.find(page => page.name === 'Members').path}>
                                    View All
                                </a>
                            )}
                        </th>
                            
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <article>
                                <i className={styles['far fa-user-circle']}></i>
                            </article>
                            <aside>
                                <p>Kalisa Emmanuel</p>
                                <p>21 years old</p>
                            </aside>
                        </td>
                        <td>
                            <p>Rusatira, Huye</p>
                            <p>Student</p>
                        </td>
                        <td>
                            07 March 2023
                        </td>
                        <td>
                            <p>0786405045</p>
                            <p>kalisa@gmail.com</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <article>
                                <i className={styles['far fa-user-circle']}></i>
                            </article>
                            <aside>
                                <p>Kalisa Emmanuel</p>
                                <p>21 years old</p>
                            </aside>
                        </td>
                        <td>
                            <p>Rusatira, Huye</p>
                            <p>Student</p>
                        </td>
                        <td>
                            07 March 2023
                        </td>
                        <td>
                            <p>0786405045</p>
                            <p>kalisa@gmail.com</p>
                        </td>
                    </tr>              
                    <tr>
                        <td>
                            <article>
                                <i className={styles['far fa-user-circle']}></i>
                            </article>
                            <aside>
                                <p>Kalisa Emmanuel</p>
                                <p>21 years old</p>
                            </aside>
                        </td>
                        <td>
                            <p>Rusatira, Huye</p>
                            <p>Student</p>
                        </td>
                        <td>
                            07 March 2023
                        </td>
                        <td>
                            <p>0786405045</p>
                            <p>kalisa@gmail.com</p>
                        </td>
                    </tr>          
                    <tr>
                        <td>
                            <article>
                                <i className={styles['far fa-user-circle']}></i>
                            </article>
                            <aside>
                                <p>Kalisa Emmanuel</p>
                                <p>21 years old</p>
                            </aside>
                        </td>
                        <td>
                            <p>Rusatira, Huye</p>
                            <p>Student</p>
                        </td>
                        <td>
                            07 March 2023
                        </td>
                        <td>
                            <p>0786405045</p>
                            <p>kalisa@gmail.com</p>
                        </td>
                    </tr>          
                </tbody>
            </table>
            <div className={styles.last}>
                {AppPages.find(page => page.name === 'AddMember') && (
                    <a href={AppPages.find(page => page.name === 'AddMember').path}>
                        <i className={styles['fas']}>&#xf234;</i>Add Member                   
                    </a>
                )}
            </div>
        </div>
    );
};

export default New_Members;
