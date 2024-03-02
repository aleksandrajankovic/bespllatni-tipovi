import { useState, useEffect } from "react";

const useCountdownTimer = (tipDate) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  const calculateTimeRemaining = () => {
    const difference = new Date(tipDate) - new Date();
    const timeLeft = {};

    if (difference > 0) {
      timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      timeLeft.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      timeLeft.minutes = Math.floor((difference / 1000 / 60) % 60);
    } else {
      setTimeRemaining(null);
      return;
    }

    setTimeRemaining(timeLeft);
  };

  useEffect(() => {
    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [tipDate]);

  return timeRemaining;
};

export default useCountdownTimer;
