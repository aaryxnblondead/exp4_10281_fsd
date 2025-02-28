import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchTimeAndLocation = async () => {
      // First get timezone from IP
      const ipResponse = await fetch('https://timeapi.io/api/Time/current/ip');
      const ipData = await ipResponse.json();
      
      // Then get detailed time for that timezone
      const timeResponse = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${ipData.timeZone}`);
      const timeData = await timeResponse.json();
      
      setLocation(ipData.timeZone);
      setTime(`${timeData.hour}:${timeData.minute}:${timeData.seconds}`);
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