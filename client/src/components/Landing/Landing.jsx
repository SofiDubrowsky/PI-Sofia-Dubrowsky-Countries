import style from "./Landing.module.css"
import { useNavigate } from "react-router-dom";
import linkedin from '../img/linkedin.png'
import github from '../img/github.png'
import rosadelosvientos from '../img/rosadelosvientos.png'
import { NavLink } from "react-router-dom";



const Landing = ()=>{
    const navigate = useNavigate();
    return(
        <div className={style.landing}>
            <div className={style.shadow}>
            <div className={style.topLeft} >
            <a
            href="https://www.linkedin.com/in/disof%C3%ADadubrowsky/"
            target="_blank"
            rel="noreferrer"
            className={style.alink}
          >
            <img src={linkedin} alt="linkedin" className={style.img} />
          </a> 
          <a
            href="https://github.com/SofiDubrowsky"
            target="_blank"
            rel="noreferrer"
            className={style.alink}
          >
            <img src={github} alt="github" className={style.img} />
          </a> 
            </div>

            <div className={style.text}> 
             <h5 className={style.textsmall}>Henry PI</h5>
             <h1>Countries App Proyect</h1>
             <NavLink to="/home"> <img className={style.rosa} src={rosadelosvientos} alt="start" /> </NavLink>
             
            {/* <button onClick={()=>{navigate('/home')}} className={style.button}>Start</button> */}
             
            </div>
            </div>
        </div>
    )
}
export default Landing;