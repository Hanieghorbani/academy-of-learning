import React, { useEffect, useState } from "react";

export default function LandingCounter({ limit }) {
  const [courseCounter, setCourseCounter] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCourseCounter((prevCount) => prevCount + 1);
    }, 1);

    if (courseCounter === limit) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [courseCounter]);

  return <span class="landing-status__count">{courseCounter}</span>;
}
