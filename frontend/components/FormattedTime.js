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
  }, [timeNow]);

  useEffect(() => {
    let intervalId = setTimeout(() => {
      setTimeNow((prevValue) => prevValue + 1);
    }, 1000);

    return () => clearTimeout(intervalId);
  }, [timeNow]);

  return `${formattedTime}`;
}