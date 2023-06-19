import Card from "../Card/Card";
import style from "./Home.module.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getCountries ,getActivities, countryFilter, ordeByName} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from '../Paginado/Paginado';
import soundFile from '../../audio/sonidoBotones.mp3'

const reload = () => {
    window.location.reload(false);
}

const Home = () => {
    
    const countries = useSelector(state => state.countries)
    const dispatch= useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const elementsPerPage = 10;

    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = countries?.slice(indexOfFirstElement, indexOfLastElement);

    const allActivities = useSelector((state) => state.activities);

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    useEffect(()=> {
        dispatch(getCountries())
      },[dispatch])
      
      useEffect(() => {
        dispatch(getActivities())
    }, [dispatch]);


   const [continentFilter,setContinentFilter] = useState("All")
   const [activityFilter,setActivityFilter] = useState("All")
   const [orderBy, setOrderBy] = useState("");
    
    const handleFilterContinent = (event) => {
        event.preventDefault();
        setContinentFilter(event.target.value)
    }

    const handleFilterActivity = (event) => {
        event.preventDefault();
        setActivityFilter(event.target.value)
    }

    const handleFilter = () => {
        handleButtonClick()
        setCurrentPage(1);
        let filters = {
          continent: continentFilter,
          activity: activityFilter,
        };
        dispatch(countryFilter(filters));
        setOrderBy(""); // Restablecer el estado orderBy
      };

    const handleOrderByName = (event) => {
        event.preventDefault();
        const selectedValue = event.target.value;
        setOrderBy(selectedValue);
        dispatch(ordeByName(selectedValue));
      };
    
    const totalPages = Math.ceil(countries?.length / elementsPerPage)
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const handleButtonClick = () => {
        setIsPlaying(true);
        audioRef.current.play();
      };

    return (
        
        <div >

                <div>
                    <SearchBar handleFilter={handleFilter} onPageChange={handlePageChange}/>
                </div>

            <div className={style.home}>
               <div className={style.costado}>
                
            <div className={style.filterContainer}>
                <h1 className={style.title}>Filters</h1>
                <div>
                    <h3 className={style.subtitle}>By Continent</h3>
                  <select className={style.select} onChange={handleFilterContinent}>
                    <option value='All'>All Continents</option>
                    <option value='Africa'>Africa</option>
                    <option value='Antarctica'>Antartica</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='North America'>North America</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='South America'>South America</option>
                  </select>
                </div>
                

                <div>
                    <h3 className={style.subtitle}>By Activity</h3>
                   <select className={style.select} onChange={handleFilterActivity}>
                     <option value="All">All Activities</option>
                     {allActivities && allActivities.map((activity) => {
                         return (
                             <option value={activity.name}>{activity.name}</option>
                             )
                            })}
                  </select>
                </div>

                <button className={style.reload} type="submit" onClick={handleFilter}>Apply</button>
                <audio ref={audioRef} src={soundFile} onEnded={() => setIsPlaying(false)}/>
            </div>

                {/* ---------Ordenamiento por nombre--------- */}
                
                <div className={style.orderContainer}>
                    <h1 className={style.title}>Order By</h1>
                    <h3 className={style.subtitle}>Name/Population</h3>
                    <select className={style.select} onChange={handleOrderByName} value={orderBy}>
                      <option value="" disabled selected>Order by...</option>
                      <option value='ascName'>Names A - Z</option>
                      <option value='descName'>Names Z - A</option>
                       <option value='ascPopulation'>Population Low-High</option>
                       <option value='descPopulation'>Population High-Low</option>
                    </select>
                </div>
                
                        {/* ---------Ordenamiento por Poblacion--------- */}
                
                    {/* <select onChange={handleOrderByPopulation}>
                       <option value="" disabled selected>Population</option>
                    </select> */}
               

                <button className={style.reload} onClick={()=>{reload()}}>Re-load</button>
               </div>

            <div className={style.container}>
                {currentElements.length !== 0 ? 
                currentElements.map(({id, name, flag_img, continent}) => {
                    return (
                    <Card
                    key={id}
                    id={id}
                    name={name}
                    flag_img={flag_img}
                    continent={continent}
                    />
                   )})
                   : (<p className={style.mensaje}>Country not Found</p>)
                }
                <div className={style.espacio}>  </div>
                 <div className={style.pag}>
                                 <Paginado
                                   currentPage={currentPage}
                                   totalPages={totalPages}
                                   onChangePage={handlePageChange}
                                 />
                 </div>
            </div>
            </div>
       

           

       </div>
    )
    
}


export default Home;