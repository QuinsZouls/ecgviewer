import React, { useState, useEffect } from 'react';
import LiveChart from '../../components/ui/LiveChart';

import sound from '../../assets/sound.mp3';

import { useAudioSound } from '../../hooks/useAudioSound';
import { useServiceURL } from '../../hooks/useApp';

let websocket = new WebSocket(process.env.REACT_APP_DEFAULT_SERVER);
function initData() {
  let defaultData = [];
  for (let i = 1; i <= 600; i++) {
    defaultData.push({
      time: i,
      value: 0,
    });
  }
  return defaultData;
}
const PulseView = () => {
  const [audioRef, playAudio] = useAudioSound();
  const [service, setService] = useServiceURL();
  const [dataChart, setDataChart] = useState(initData());
  const [stop, setStop] = useState(true);
  useEffect(() => {
    websocket.onmessage = (event) => {
      let response = JSON.parse(event.data);
      if (response?.type === 'realtime_data') {
        _handleSetData(response);
      }
    };

    websocket.onopen = () => {
      console.log('CONNECTED');
    };
  }, []);
  function stopRealTime() {
    websocket.send(JSON.stringify({ option: 'stopRealtimeInfo' }));
  }
  function startRealTime() {
    websocket.send(JSON.stringify({ option: 'getRealtimeInfo' }));
  }
  const _handleSetData = (response) => {
    const parsedValue = Math.round(response.value * 1000);
    if (parsedValue > 990) {
      playAudio();
    }
    setDataChart((oldArray) => {
      let j = 0,
        newArray = [
          { value: parsedValue, time: Math.random() },
          ...oldArray.slice(0, oldArray.length - 1),
        ],
        sortedArr = [];
      for (let item of newArray) {
        sortedArr.push({
          ...item,
          time: j + 1,
        });
        j++;
      }
      return sortedArr;
    });
  };
  const _handleStart = () => {
    setStop(false);
    startRealTime();
  };
  const _handleStop = () => {
    setStop(true);
    stopRealTime();
  };
  return (
    <div className="pulse-view-screen">
      <audio
        ref={audioRef}
        controls={false}
        controlsList={'nodownload noremoteplayback nofullscreen'}
        autoPlay={false}
        name="media"
        style={{ width: 0 }}
      >
        <source src={sound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="container">
        <div className="chart-view">
          <LiveChart data={dataChart} />
        </div>
        <div className="settings-view">
          <div className="item">
            {stop ? (
              <button className="btn start" onClick={_handleStart}>
                Start
              </button>
            ) : (
              <button className="btn stop" onClick={_handleStop}>
                Stop
              </button>
            )}
          </div>
          <div className="item">
            <input
              defaultValue={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseView;
