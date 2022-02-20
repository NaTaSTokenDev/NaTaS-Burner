import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";

export default function Counter() {
  const [remainingTime, setRemainingTime]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState<number>(0);
  const [updatedTime, setUpdatedTime]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState<number>(0);
  const referenceTime = useRef<number>(50);
  const intervalRef = useRef<number>(updatedTime);

  const increaseTime = () =>
    setUpdatedTime((prevState) => {
      if (prevState > 1) {
        return parseFloat(
          (
            (updatedTime * 1000 + referenceTime.current - Date.now()) /
            1000
          ).toFixed(0)
        );
      } else {
        setRemainingTime(0);
        return 0;
      }
    });

  useEffect(() => {
    if (remainingTime > 0) {
      intervalRef.current = (setInterval(
        increaseTime,
        1000
      ) as unknown) as number;
    }

    return () => clearInterval(intervalRef.current);
  }, [remainingTime]);

  return (
    <div className="Counter">
      <h1>{updatedTime}</h1>
      <button
        onClick={() => {
          referenceTime.current = Date.now();
          setRemainingTime(45);
          setUpdatedTime(45);
        }}
      >
        Set Start Value
      </button>
      <button
        onClick={() =>
          setUpdatedTime((prevState) => {
            if (prevState < 10) {
              return 0;
            } else {
              return prevState - 10;
            }
          })
        }
      >
        -10
      </button>
      <button onClick={() => setUpdatedTime((prevState) => prevState + 10)}>
        +10
      </button>
    </div>
  );
}
