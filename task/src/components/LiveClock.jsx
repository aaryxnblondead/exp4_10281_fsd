import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    // Detect user's timezone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimeZone);

    const fetchTimeAndLocation = async () => {
      const response = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${userTimeZone}`);
      const data = await response.json();
      
      // Format time with leading zeros
      const hours = String(data.hour).padStart(2, '0');
      const minutes = String(data.minute).padStart(2, '0');
      const seconds = String(data.seconds).padStart(2, '0');
      
      setTime(`${hours}:${minutes}:${seconds}`);
      setLocation(data.timeZone);
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
      <div className="timezone">{timezone}</div>
    </div>
  );
}