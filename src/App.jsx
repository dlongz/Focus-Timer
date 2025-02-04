import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let timeStamp =
    localStorage.getItem("time_stamp") === null
      ? 0
      : parseInt(localStorage.getItem("time_stamp"));
  let timeStarted =
    localStorage.getItem("time_started") === null
      ? false
      : localStorage.getItem("time_started");

  const [time, setTime] = useState(timeStamp);
  const [started, setStarted] = useState(timeStarted);

  useEffect(() => {
    if (started) {
      let interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

      localStorage.setItem("time_stamp", time);

      return () => clearInterval(interval);
    }
  }, [started, time]);

  function handleStart() {
    if (!started) {
      setStarted(true);
      console.log("Started? " + started);
      localStorage.setItem("time_started", started);
    }
  }

  function handlePause() {
    if (started) {
      setStarted(false);
      console.log("Started? " + started);
      localStorage.setItem("time_started", started);
    }
  }

  function handleReset() {
    setStarted(false);
    setTime(0);

    localStorage.removeItem("time_started");
    localStorage.removeItem("time_stamp");
  }

  function formatTime(timez) {
    let secs = Math.floor(timez % 60);
    let mins = Math.floor((timez / 60) % 60);
    let hrs = Math.floor((timez / 60 / 60) % 24);

    secs = secs < 10 ? "0" + secs : secs;
    mins = mins < 10 ? "0" + mins : mins;
    hrs = hrs < 10 ? "0" + hrs : hrs;

    return `${hrs}:${mins}:${secs}`;
  }

  return (
    <div className="flex h-screen bg-pink-200">
      <main className="flex flex-col justify-center items-center border rounded-md max-w-3xl m-auto p-6 bg-slate-400">
        <h1 className="text-4xl">Focus Timer</h1>
        <section className="text-4xl">{formatTime(time)}</section>
        <div className=" inline-flex  text-gray-100 font-bold">
          {!started ? (
            <button
              className="bg-slate-800 hover:bg-slate-700 py-2 px-4 rounded-l-lg"
              onClick={handleStart}
            >
              Start
            </button>
          ) : (
            <button
              className="bg-slate-800 hover:bg-slate-700 py-2 px-4 rounded-l-lg"
              onClick={handlePause}
            >
              Pause
            </button>
          )}
          <button
            className="bg-slate-800 hover:bg-slate-700 py-2 px-4 rounded-r-lg"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
