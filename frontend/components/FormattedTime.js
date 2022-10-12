import { useEffect, useState } from "react";

export default function FormattedTime({ time }) {
  const [formattedTime, setFormattedTime] = useState(0);
  const [timeNow, setTimeNow] = useState(Math.floor(new Date() / 1000));

  useEffect(() => {
    const timeDifference = timeNow - Math.floor(new Date(time) / 1000);

    if (timeDifference < 60 && timeDifference > 0) {
      setFormattedTime(`${timeDifference}s`);
    } 
    
    if (timeDifference > 60 && timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      setFormattedTime(`${minutes}m`);
    } 

    if (timeDifference > 3600) {
      const hours = Math.floor(timeDifference / 3600);
      setFormattedTime(`${hours}h`);
    }

    if (timeDifference > 86400) {
      const days = Math.floor(timeDifference / 86400);
      setFormattedTime(`${days}d`);
    }

    if (timeDifference > 604800) {
      const weeks = Math.floor(timeDifference / 604800);
      setFormattedTime(`${weeks}w`);
    }

    if (timeDifference > 2419200) {
      const months = Math.floor(timeDifference / 2419200);
      setFormattedTime(`${months}m`);
    }
  }, [timeNow]);

  useEffect(() => {
    let intervalId = setTimeout(() => {
      setTimeNow((prevValue) => prevValue + 1);
    }, 1000);

    return () => clearTimeout(intervalId);
  }, [timeNow]);

  return `${formattedTime}`;
}