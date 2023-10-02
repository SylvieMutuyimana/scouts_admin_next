import styles from '../../assets/styles/module.css/Members_MyProfile.module.css';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { AppPages } from '../../components/navigation/page_links';

const Members = ({ all_members, districts_provinces }) => {
    const router = useRouter()
    const [rwandaProvinces, setRwandaProvinces] = useState();
    const [allmembers, setAllmembers] = useState()
    useEffect(() => {
      setRwandaProvinces(districts_provinces);
    }, [districts_provinces]);
    useEffect(() => {
      setAllmembers(all_members);
    }, [all_members]);
    console.log("districts_provinces: ", districts_provinces)
    console.log("rwandaProvinces: ", rwandaProvinces)
    console.log("all_members: ", all_members)
    console.log("allmembers: ", allmembers)
    const [searchQuery, setSearchQuery] = useState('');
    const [locationInfo, setLocationInfo] = useState({
      province : null , district : null , sector : null , 
      cell : null, image : null
    })
    const [scoutsInfo, setScoutsInfo] = useState({
      all: null, cell:null, selected:null, theScouts:null
    })
    const [adultsInfo, setAdultsInfo] = useState({
      all: null, cell:null, selected:null, theAdults:null
    })
    const [numToShow, setnumToShow] = useState({
      scouts: null, adults: null
    })
    const [showError, setShowError] = useState({
      adults: false, scouts:false
    })
    const [errorText, setErrorText] = useState({
      adults: false, scouts:false
    })
    const [groupChoice, setGroupChoice] = useState({
      scout:'', adult:''
    })
    const [groupScouts, setGroupScouts] = useState([]);
    const [depAdults, setDepAdults] = useState([]);
    const handleGroupChoice = (e) => {
      if (e.scout) {
        setGroupChoice(prev => ({ ...prev, scout: e.scout }));
      } else if (e.adult) {
        setGroupChoice(prev => ({ ...prev, adult: e.adult }));
      }
    };  
    const scoutGroupRanges = {
      Abatoni: { min: 6, max: 12 },
      Inyesha: { min: 13, max: 16 },
      Abahizi: { min: 17, max: 20 },
      Ingenzi: { min: 21, max: 24 },
      Adults: { min: 25, max: 100 }
    };
    useEffect(() => {
      if(locationInfo.province && locationInfo.district && locationInfo.sector && locationInfo.cell) {
      }
      if (locationInfo.cell) {
        const theAdults = allmembers.adults[locationInfo.province]?.[locationInfo.district]?.[locationInfo.sector]?.[locationInfo.cell];
        const theScouts = allmembers.scouts[locationInfo.province]?.[locationInfo.district]?.[locationInfo.sector]?.[locationInfo.cell];
        if (theAdults !== undefined && theAdults.length > 0) {
          setAdultsInfo(prev=>({...prev, 
            all:theAdults, cell:theAdults, 
            selected:theAdults.slice(0, numToShow.adults
          )}))
        } else {
          setAdultsInfo(prev=>({...prev, all:null, cell:null, selected:null}))
        }
        if (theScouts !== undefined && theScouts.length > 0) {
          setScoutsInfo(prev=>({
            ...prev, all:theScouts, cell:theScouts, 
            selected:theScouts.slice(0, numToShow.scouts)
          }))
        } else {
          setScoutsInfo(prev=>({...prev, all:null,sector:null, selected:null}))
        }
      }
  
    }, [locationInfo.cell,locationInfo.sector, locationInfo.district, locationInfo.province, numToShow.adults, numToShow.scouts]);
  
    useEffect(() => {
      if (groupChoice.adult && adultsInfo.cell.length !== 0) {
        let dep_individuals;
        groupChoice.adult === '' ? dep_individuals = adultsInfo.cell
          :dep_individuals = adultsInfo.cell.filter(
            adult => adult.department === groupChoice.adult
          );
        if (groupChoice.adult && dep_individuals) {
          setAdultsInfo(prev=>({...prev, selected:dep_individuals}))
        } 
        else {
          setAdultsInfo(prev=>({...prev, selected:null}))
          setDepAdults(dep_individuals)
        }
      }
    }, [groupChoice.adult, adultsInfo.cell]);
  
    useEffect(() => {
      if (groupChoice.scout && scoutsInfo.cell.length !== 0) {
        let groupScouts;
        const filter = (min, max) =>{
          groupScouts = scoutsInfo.cell.filter(scout => scout.age >= min && scout.age <= max);
        }
        if (groupChoice.scout === '') {groupScouts = scoutsInfo.cell}
        else {
          const { min, max } = scoutGroupRanges[groupChoice.scout] || { min: 0, max: 100 };
          filter(min, max);
        }      
        if (groupChoice.scout && groupScouts) {
          setScoutsInfo(prev=>({...prev, selected:groupScouts}))
        } 
        else {
          setScoutsInfo(prev=>({...prev, selected: null}))
          setGroupScouts(groupScouts)
        }
      }
    }, [groupChoice.scout, scoutsInfo.cell]);
  
    const handleReset = () => {
      if (locationInfo.cell !== null){
        setLocationInfo((previnfo) =>({
          ...previnfo, cell: null
        }))
      }
      else if (locationInfo.sector !== null){
        setLocationInfo((previnfo) =>({
          ...previnfo, sector: null
        }))
      }
      else if (locationInfo.province !== null || locationInfo.district !== null ){
        setLocationInfo((previnfo) =>({
          ...previnfo, province: null, district: null
        }))
      }
      setScoutsInfo(prev=>({...prev, selected:null}))
    };
    const removeMember = (name) => {
      const _new =(array, type)=> {
        array.all.filter(members => members.name !== type)
      }
      if (name.scout) {
        setScoutsInfo(prev => ({ ...prev, 
          all:_new(scoutsInfo,name.scout), sector: _new(scoutsInfo,name.scout), 
          selected: scoutsInfo.cell 
        }));
      } else if (name.adult) {
        setAdultsInfo(prev => ({ ...prev, 
          all:_new(adultsInfo,name.adult), sector: _new(adultsInfo,name.adult), 
          selected: adultsInfo.cell }));
      }
    };
    const handleShowClick = (type) => {
      const idType = type === 'scouts' ? 'numScouts' : 'numAdults';
      const valueShow = parseInt(document.getElementsByName(idType)[0].value, 10);
      const data = (type) => {
        if (type === 'scouts') {
          let groupScouts;
          if (groupChoice.scout && groupChoice.scout!=='' ) {
            console.log('choice: ', groupChoice.scout)
            console.log('scoutsInfo.cell: ', scoutsInfo.cell)
            const filter = (min, max) =>{
              groupScouts = scoutsInfo.cell.filter(scout => scout.age >= min && scout.age <= max);
            }
            const { min, max } = scoutGroupRanges[groupChoice.scout] || { min: 0, max: 100 };
            filter(min, max);
            console.log('groupScouts: ', groupScouts)
            setScoutsInfo(prev=>({...prev, selected:groupScouts}))
            return groupScouts;
          } else {return scoutsInfo.cell;}
        } else if (type === 'adults') {
          let dep_individuals;
          if (groupChoice.adult && groupChoice.adult!=='' ) {
            dep_individuals = adultsInfo.cell.filter(
              adult => adult.department === groupChoice.adult
            );
            setAdultsInfo(prev=>({...prev, selected:dep_individuals}))
            return dep_individuals;
          } else {return adultsInfo.cell;}
        }
      };
    
      const updateSelectedData = (array, valueShow, type) => {
        console.log('array: ', array.length , ': \n', array)
        console.log('type = ', type)
        if ((valueShow >= 0) && (valueShow <= array.length)) {
          const theSelected = array.slice(0, valueShow);
          setErrorText((prev) => ({ ...prev, scouts: null, adults: null }));
          if (type === 'scouts') {
            setScoutsInfo((prev) => ({ ...prev, selected: theSelected }));
            setnumToShow((prev) => ({ ...prev, scouts: valueShow }));
          } else {
            setAdultsInfo((prev) => ({ ...prev, selected: theSelected }));
            setnumToShow((prev) => ({ ...prev, adults: valueShow }));
          }
        } else {
          const errorText = `Please enter a number between 1 and ${array.length}`;
          if (type === 'scouts') {
            setShowError((prev) => ({ ...prev, scouts: true }));
            setErrorText((prev) => ({ ...prev, scouts: errorText }));
          } else {
            setShowError((prev) => ({ ...prev, adults: true }));
            setErrorText((prev) => ({ ...prev, adults: errorText }));
          }
        }
      };
    
      updateSelectedData(data(type), valueShow, type);
    };
    const handleShowReturn = (type) => {
      const show_value = 2
      setErrorText((prev) => ({ ...prev, scouts: null, adults: null }));
      if(type === 'allScouts' || type === 'lessScouts'){
        let groupScouts
        if (groupChoice.adult && groupChoice.adult!=='' ) {
          const filter = (min, max) =>{
            groupScouts = scoutsInfo.cell.filter(scout => scout.age >= min && scout.age <= max);
          }
          const { min, max } = scoutGroupRanges[groupChoice.scout] || { min: 0, max: 100 };
          filter(min, max);
        }else{groupScouts = scoutsInfo.cell}
        if(type === 'lessScouts'){
          setnumToShow((prev) => ({ ...prev, scouts: show_value }));
          setScoutsInfo(prev=>({...prev, selected:groupScouts.slice(0,show_value)}))
        }else{
          setnumToShow((prev) => ({ ...prev, scouts: groupScouts.length }));
          setScoutsInfo(prev=>({...prev, selected:groupScouts}))
        }
      }else if(type==='allAdults' || type==='lessAdults'){
        let dep_individuals
        if (groupChoice.adult && groupChoice.adult!=='' ) {
          dep_individuals = adultsInfo.cell.filter(adult => adult.department === groupChoice.adult)
        }else{
          dep_individuals = adultsInfo.cell
        }
        if(type === 'lessAdults'){
          setnumToShow((prev) => ({ ...prev, adults: show_value }));
          setAdultsInfo(prev=>({...prev, selected:dep_individuals.slice(0, show_value)}))
        }
        else{
          setnumToShow((prev) => ({ ...prev, adults: dep_individuals.length }));
          setAdultsInfo(prev=>({...prev, selected:dep_individuals}))
        }
      }
    };
  
    const handleResetAll = () => {
      setScoutsInfo(prev=>({...prev, selected:null}))
      setAdultsInfo(prev=>({...prev, selected:null}))
      setLocationInfo((previnfo) =>({
        ...previnfo, 
        province: null, district: null, sector: null, cell: null
      }))
    };
    const handleSearch = (e) => {
      const { value } = e.target
      setSearchQuery(value);
      if(value != ''){
        let the_provinces = {}
        Object.entries(districts_provinces).map(([province, provinceData])=>{
          if(province.toLowerCase().startsWith(value.toLowerCase())){
            the_provinces[province] = provinceData
          }
        })
        setRwandaProvinces(the_provinces)
        if (Object.keys(the_provinces).length === 0){
          Object.entries(districts_provinces).map(([province, provinceData])=>{
            Object.entries(provinceData.districts).map(([district, districtData])=>{
              let the_districts = []
              if(district.toLowerCase().startsWith(value.toLowerCase())){
                the_districts.push(district)
                the_provinces[province] = provinceData
              }
            })
          })
          setRwandaProvinces(the_provinces)
        }
      }
      else{setRwandaProvinces(districts_provinces)}
    };
    const handleLocationClick = (province, district, sector, cell, image) => {
      setLocationInfo((previnfo) => ({
        ...previnfo,
        province: province, district: district,
        sector: sector, cell: cell, image: image,
      }));
      if(cell === null){
        setnumToShow(prev=>({
          ...prev, scouts: 5, adults: 5
        }))
      }
    };
  
    const districtsCards = () => {
      return (
        <>
          {rwandaProvinces && !locationInfo.district && !locationInfo.province &&
            Object.entries(rwandaProvinces).map(([province, provincedata]) => (
              <>
                {province !== 'Kigali' ? <br /> : null}
                <h3 className={styles.provincehead}>Province: {province}</h3>
                <div className={styles.activities_grid} key={province}>
                  {Object.entries(provincedata.districts).map(([district, districtData]) => {
                    const adultMembers = Object.values(allmembers?.adults?.[province]?.[district] || {})
                      .map(sectorData => Object.values(sectorData))
                      .flat()
                      .map(cellData => cellData.length)
                      .reduce((a, b) => a + b, 0);
            
                    const scoutMembers = Object.values((allmembers?.scouts?.[province]?.[district]) || {})
                      .map(sectorData => Object.values(sectorData))
                      .flat()
                      .map(cellData => cellData.length)
                      .reduce((a, b) => a + b, 0);
                    const totalMembers = adultMembers + scoutMembers;
                    return (
                      <div
                        className= {`${styles.activity_card} ${styles.districts}`}
                        key={district}
                        style={{ backgroundImage: `url(${provincedata.image})` }}
                        onClick={() => handleLocationClick(province, district,null,null, provincedata.image)}>
                        <h3> {district} </h3>
                        <div className={styles.details}>
                          <p>Sectors: {Object.keys(districtData).length}</p>
                          <p>Members: {totalMembers} </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ))
          }
        </>
      );
    };
  
    const sectorCards = () => {
      return (
        <>
          {!locationInfo.sector && locationInfo.district && locationInfo.province && (
            <>
            <h3 className={styles.provincehead}>District: {locationInfo.district}</h3>
            <div className={styles.activities_grid} key={locationInfo.province}>
              {Object.entries(rwandaProvinces[locationInfo.province].districts[locationInfo.district]).map(([sector, sectorData]) => {
                const adultMembers = Object.values(allmembers.adults[locationInfo.province]?.[locationInfo.district]?.[sector] || {})
                  .map(cellData => cellData.length)
                  .reduce((a, b) => a + b, 0);
                const scoutMembers = Object.values(allmembers.scouts[locationInfo.province]?.[locationInfo.district]?.[sector] || {})
                  .map(cellData => cellData.length)
                  .reduce((a, b) => a + b, 0);
                const totalMembers = adultMembers + scoutMembers;
                return (
                  <div
                    className={`${styles.activity_card} ${styles.districts}`} key={sector}
                    style={{ backgroundImage: `url(${locationInfo.image})` }}
                    onClick={() => handleLocationClick(locationInfo.province, locationInfo.district, sector, null, locationInfo.image)}>
                    <h3> {sector} </h3>
                    <div className={styles.details}>
                      <p>Cells: {Object.keys(sectorData).length}</p>
                      <p>Members: {totalMembers}</p>
                    </div>
                  </div>
                );
              })}
            </div>
  
            </>
          )}
        </>
      );
    };  
    const cellCards = () => {
      return (
        <>
        <h4 className={styles.provincehead}>District: {locationInfo.district}</h4>
        <h5 className={styles.provincehead}>Sector: {locationInfo.sector}</h5>
        <div className={styles.activities_grid}>
          {Object.entries(allmembers.adults[locationInfo.province]?.[locationInfo.district]?.[locationInfo.sector] || {}).map(
            ([cell, cellData]) => {
              const adultMembers = cellData.length;
              const scoutData = allmembers.scouts[locationInfo.province]?.[locationInfo.district]?.[locationInfo.sector]?.[cell] || {};
              const scoutMembers = scoutData.length;
              return (
                <div
                  className={`${styles.activity_card} ${styles.districts}`} key={cell}
                  style={{ backgroundImage: `url(${locationInfo.image})` }}
                  onClick={() => handleLocationClick(locationInfo.province, locationInfo.district, locationInfo.sector, cell, locationInfo.image)}>
                  <h3> {cell} </h3>
                  <div className={styles.details}>
                    <p>Adults: {adultMembers}</p>
                    <p>Scouts: {scoutMembers}</p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </>
      
      
      );
    };  
  
    const renderScouts = () => {
      if (scoutsInfo.selected && scoutsInfo.selected.length === 0) {
        return (
          <div>
          {groupChoice.scout && (
            <p>There are no {groupChoice.scout} scouts in the selected area</p>
          )}  
          {!groupChoice.scout && (
            <p>There are no scouts in the selected area</p>
          )}  
            <p>Province : {locationInfo.province}</p>
            <p>District : {locationInfo.district}</p>
            <p>Sector : {locationInfo.sector}</p>
          </div>
        );
      } else if (scoutsInfo.selected && scoutsInfo.selected.length !== 0) {
        return (
          <table>
            <thead>
              <tr>
                {allmembers.scoutsheaders.map((header) => (
                  <th key={header} className={styles[header]}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scoutsInfo.selected.slice(0, numToShow.scouts).map((scout) => (
                <tr key={scout}>
                  <td className={styles.Name}>
                    <article>
                      <img width={20} height={20} src={scout.image} alt={scout.name} />
                    </article>
                    <aside>
                      <p>{scout.name}</p>
                      <p>{scout.gender}</p>
                    </aside>
                  </td>
                  <td className={styles.Age}>{scout.age}</td>
                  <td className={styles.Address}>
                      <p>{locationInfo.sector}</p>
                      <p>{scout.street}</p>
                  </td>
                  <td className={styles.District}>
                      <p>{locationInfo.district}</p>
                      <p>{locationInfo.province}</p>
                  </td>
                  <td className={styles.Occupation}>{scout.occupation}</td>
                  <td className={styles.Contact}>
                    <p>{scout.contact.phone}</p>
                    <p>
                      <a href={`mailto:${scout.contact.email}`}>
                        {scout.contact.email}
                      </a>
                    </p>
                  </td>
                  <td className={styles.Tenure}>{scout.tenure}</td>
                  <td className={styles.Action}>
                    {AppPages.find(page => page.name === 'SMS') && (
                      <a href={AppPages.find(page => page.name === 'SMS').path}>
                        <i class="material-icons">chat</i>
                      </a>
                    )}
                    <a href='#' onClick={() => removeMember({scout:scout.name})}>
                      <i className="material-icons">delete</i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      return null;
    };
    const renderAdults = () => {
      if ( locationInfo.province && locationInfo.district && locationInfo.sector && adultsInfo.selected && adultsInfo.selected.length === 0) {
        return (
          <div>
          {groupChoice.adult && (
            <p>There are no {groupChoice.adult} adults in the selected area</p>
          )}  
          {!groupChoice.adult && (
            <p>There are no adults in the selected area</p>
          )}  
            <p>Province : {locationInfo.province}</p>
            <p>District : {locationInfo.district}</p>
            <p>Sector : {locationInfo.sector}</p>
          </div>
        );
      } else if (adultsInfo.selected && adultsInfo.selected.length !== 0) {
        return (
          <table>
            <thead>
              <tr>
                {allmembers.adultsheaders.map((header) => (
                  <th key={header} className={styles[header]}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adultsInfo.selected.slice(0, numToShow.adults).map((adult) => (
                <tr key={adult}>
                  <td className={styles.Name}>
                    <article>
                      <img width={20} height={20} src={adult.image} alt={adult.name} />
                    </article>
                    <aside>
                      <p>{adult.name}</p>
                      <p>{adult.gender}</p>
                    </aside>
                  </td>
                  <td className={styles.Age}>{adult.age}</td>
                  <td className={styles.Address}>
                      <p>{locationInfo.sector}</p>
                      <p>{adult.street}</p>
                  </td>
                  <td className={styles.District}>
                      <p>{locationInfo.district}</p>
                      <p>{locationInfo.province}</p>
                  </td>
                  <td className={styles.Role}>{adult.role}</td>
                  <td className={styles.Contact}>
                    <p>{adult.contact.phone}</p>
                    <p>
                      <a href={`mailto:${adult.contact.email}`}>
                        {adult.contact.email}
                      </a>
                    </p>
                  </td>
                  <td className={styles.Tenure}>{adult.tenure}</td>
                  <td className={styles.Action}>
                    {AppPages.find(page => page.name === 'SMS') && (
                      <a href={AppPages.find(page => page.name === 'SMS').path}>
                        <i class="material-icons">chat</i>
                      </a>
                    )}
                    <a href='#' onClick={() => removeMember({adult:adult.name})}>
                      <i className="material-icons">delete</i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      return null;
    };
  
    const [showAdd, setShowAdds] = useState(false);
    const handleAdd = (option) => {
      setShowAdds(!showAdd);
      if(option === 'Scout' || option === 'Adult' ){
        router.push(AppPages.find(page => page.name === `Add${option}`).path)
      }
    };
    return (
      <div id={styles.Members}>
        <section>
          {locationInfo.province && locationInfo.district && locationInfo.sector && locationInfo.cell &&( 
            <h4 style={{textAlign:'left', width:'98%', marginLeft:'1%'}}><u>Scouts </u></h4>
          )}
          <nav>
            <article>
              {(scoutsInfo.selected && scoutsInfo.selected.length > 0 )?
                <>
                  <label htmlFor='numScouts'>Show</label>
                  <input type='number' id='numScouts' name='numScouts' min='1' max={scoutsInfo.all} defaultValue={numToShow.scouts} />
                  <button onClick={()=> handleShowClick('scouts')}>Preview</button>
                  {showError.scouts && (<span className={styles.error}>{errorText.scouts}</span>)}
                </> :
                !locationInfo.district ?
                  <div className={styles.search_bar}>
                    <input type='text' placeholder='Search province or district'
                      value={searchQuery} onChange={handleSearch}
                    />
                    <button onClick={() => setSearchQuery('')}>Clear</button>
                  </div>
                :null
              }
            </article>
            <aside>
            <button onClick={handleAdd}>
            <i className='material-icons'>add</i> Add Member
              {showAdd && (
              <ul className={styles.add}>
                <li className={styles.item} onClick={() => handleAdd('Scout')}>Scout</li>
                <li className={styles.item} onClick={() => handleAdd('Adult')}>Adult</li>
              </ul>
            )}
            </button>
            </aside>
          </nav>
          <section>
            <article>
              {locationInfo.province && locationInfo.district && !locationInfo.sector && !locationInfo.cell&& (
                <button className={styles.back} onClick={handleReset}>
                  <i class='fa fa-arrow-left'></i>
                </button>
              )}
              {locationInfo.province && locationInfo.district && locationInfo.sector && !locationInfo.cell&& (
                <button className={styles.back} onClick={handleReset}>
                  <i class='fa fa-arrow-left'></i>
                </button>
              )}
              {locationInfo.province && locationInfo.district && locationInfo.sector && locationInfo.cell &&(
                <button className={styles.back} onClick={handleReset}>
                  <i class='fa fa-arrow-left'></i>
                </button>
              )}
              {scoutsInfo.selected && locationInfo.sector && 
                <select value={groupChoice.scout} onChange={(e) => handleGroupChoice({ scout: e.target.value })}>
                  <option value=''>Group</option>
                  <option value='Abatoni'>Abatoni</option>
                  <option value='Inyesha'>Inyesha</option>
                  <option value='Abahizi'>Abahizi</option>
                  <option value='Ingenzi'>Ingenzi</option>
                  <option value='Adults'>Adults</option>
                </select>
              }
            </article>
            <aside>
              {scoutsInfo.selected && scoutsInfo.selected.length > 0 && (
                <>
                  <span>Total: {scoutsInfo.selected.length}</span>
                  <button className={styles.show} onClick={()=> handleShowReturn('allScouts')}>
                    Show All
                  </button>
                  <button className={styles.show} onClick={()=> handleShowReturn('lessScouts')}>
                  Show Less
                  </button>
                  <button className={styles.reset} onClick={handleResetAll}>
                    Starting Page
                  </button>
                </>
              )}
            </aside>
            <hr />
            {
              !locationInfo.cell &&
              <div className={styles.activities_container}>
                {
                  ! locationInfo.district ? districtsCards() :
                  ! locationInfo.sector ? sectorCards() : 
                  ! locationInfo.cell? cellCards(): undefined
                }
              </div>
            }
            {locationInfo.province && locationInfo.district && locationInfo.sector && locationInfo.cell && renderScouts()}
  
          </section>
        </section>
        <br/>
        {/*Render Adults*/}
        {locationInfo.province && locationInfo.district && locationInfo.sector && locationInfo.cell && (
        <section>
          <br/>
          <h4 style={{textAlign:'left', width:'98%', marginLeft:'1%'}}><u>Adults </u></h4>
          <nav>
            {adultsInfo.selected && adultsInfo.selected.length > 0 && (
              <>
              <article>
                <label htmlFor='numAdults'>Show</label>
                <input type='number' id='numAdults' name='numAdults' min='1' max={adultsInfo.all} defaultValue={numToShow.adults} />
                <button onClick={()=> handleShowClick('adults')}>Preview</button>
                {showError.adults && (
                  <span className={styles.error}>{errorText.adults}</span>
                )}
              </article>
              <aside style={{height:'0px', display:'none'}}></aside>
              </>
            )}
          </nav>
          <section>
            <article>
              
              {locationInfo.province && locationInfo.district && !locationInfo.sector && !locationInfo.cell && (
                <button className={styles.back} onClick={handleReset}>
                  <i class='fa fa-arrow-left'></i>
                </button>
              )}
              {locationInfo.province && locationInfo.district && locationInfo.sector && !locationInfo.cell&&(
                <button className={styles.back} onClick={handleReset}>
                  <i class='fa fa-arrow-left'></i>
                </button>
              )}
              {locationInfo.province && locationInfo.district && locationInfo.sector && locationInfo.cell &&(
                <button className={styles.back} onClick={handleReset}>
                  <i class='fa fa-arrow-left'></i>
                </button>
              )}
              {adultsInfo.selected && locationInfo.sector && 
                <select value={groupChoice.scout} onChange={(e) => handleGroupChoice({ adult: e.target.value })}>
                  <option value=''>Department</option>
                  <option value='Administration'>Administration</option>
                  <option value='Education'>Education</option>
                  <option value='Professionals'>Professionals</option>
                </select>
              }
            </article>
            <aside>
              {adultsInfo.selected && adultsInfo.selected.length > 0 && (
                <>
                  <span>Total: {adultsInfo.selected.length}</span>
                  <button className={styles.show} onClick={()=>handleShowReturn('allAdults')}>
                    Show All
                  </button>
                  <button className={styles.show} onClick={()=>handleShowReturn('lessAdults')}>
                  Show Less
                  </button>
                  <button className={styles.reset} onClick={handleResetAll}>
                    Starting Page
                  </button>
                </>
              )}
            </aside>
            <hr />
            {locationInfo.province && locationInfo.district && locationInfo.sector && locationInfo.cell && renderAdults()}
          </section>
        </section>
        )}
      </div>
    )
  };
export default Members;
