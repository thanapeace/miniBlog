import { Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div style={{ marginTop: "100px" }}>
      <Spinner
        aria-label="Info spinner example"
        color="info"
      />
    </div>
  );
};

export default LoadingToRedirect;
