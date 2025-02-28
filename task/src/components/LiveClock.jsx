import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchTimeAndLocation = async () => {
      const response = await fetch('http://worldtimeapi.org/api/ip');
      const data = await response.json();
      setLocation(data.timezone);
      setTime(new Date(data.datetime).toLocaleTimeString());
    };

    fetchTimeAndLocation();
    const interval = setInterval(() => {
      fetchTimeAndLocation();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <div className="time">{time}</div>
      <div className="location">{location}</div>
    </div>
  );
}
