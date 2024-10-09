import React,{useState, useEffect} from 'react';
import './Home.css'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const events = [
    { title: "Gandhi Jayanti", date: "18-09-2024" },
    { title: "Diwali", date: "12-11-2024" },
    { title: "Christmas", date: "25-12-2024" }
  ];

  const nextEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };
  return (
    <div className='leave'>
     <h1>{events[currentIndex].title}</h1>
      <p>{events[currentIndex].date}</p>
      <button onClick={prevEvent}>&lt; Previous</button>
      <button onClick={nextEvent}>Next &gt;</button>
    </div>
  )
}

export default Home