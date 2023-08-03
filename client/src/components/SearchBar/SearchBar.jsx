import React from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { searchCountry } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import style from './SearchBar.module.css'
import linkedin from '../img/linkedin.png'
import github from '../img/github.png'
import soundFile from '../../audio/search.mp3'

const reload = () => {
  window.location.reload(false);
}

export default function SearchBar(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleSubmit = (event) => {
    handleButtonClick()
    event.preventDefault();
    dispatch(searchCountry(name));
    setName('')
    props.onPageChange(1);
  };

  //----------------------Audio Botones-------------------------
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleButtonClick = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  return (
    <div className={style.barra}>
      <button className={style.countries} onClick={() => { reload() }}>Countries PI</button>
      <input className={style.search} type='search' placeholder=' Search Country...' value={name} onChange={(event) => handleChange(event)} />
      <button className={style.buttonsearch} type='submit' disabled={name === ''} onClick={(event) => handleSubmit(event)}>Search</button>
      <audio ref={audioRef} src={soundFile} onEnded={() => setIsPlaying(false)} />{/*Sonido*/}
      <button className={style.buttonsearchh} type='submit' onClick={(event) => props.handleFilter(event)}>Reset Search</button>
      <audio ref={audioRef} src={soundFile} onEnded={() => setIsPlaying(false)} />{/*Sonido*/}
      <NavLink className={style.select} to="/">Exit</NavLink>
      <NavLink className={style.select} to="/form">Create Activity</NavLink>
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
  )
}
