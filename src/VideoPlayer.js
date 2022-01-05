import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const feedOne = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
const feedTwo = "https://media.w3.org/2010/05/bunny/movie.mp4";

const vids = {
  0: feedOne,
  1: feedTwo,
};

export const VideoPlayer = (props) => {
  const videoPlayerRef = useRef(null);

  const [value, setValue] = useState(0);
  const [vid, setVid] = useState(null);

  const handleChange = (event, newValue) => {
    const currentTime = vid.currentTime();

    setValue(newValue);

    vid.src([
      {
        src: vids[newValue],
        type: "video/mp4",
      },
    ]);
    console.log(videoPlayerRef.current);
    vid.currentTime(currentTime);
  };

  const videoJSOptions = {
    autoplay: "muted",
    controls: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      remainingTimeDisplay: false,
      currentTimeDisplay: true,
      durationDisplay: true,
    },
    sources: [
      {
        src: vids[value],
        type: "video/mp4",
      },
    ],
  };

  useEffect(() => {
    if (videoPlayerRef) {
      setVid(videojs(videoPlayerRef.current, videoJSOptions));
    }
  }, []);

  useEffect(() => {
    if (vid) {
      vid.on("ready", () => {
        console.log(value);
        vid.on("ended", () => {
          console.log("ended");
        });
        vid.on("timeupdate", () => {});
        console.log("Player Ready");
      });
    }
    return () => {};
  }, [vid]);

  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Feed 1" {...a11yProps(0)} />
            <Tab label="Feed 2" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      <video
        style={{ width: "100%" }}
        ref={videoPlayerRef}
        className="video-js"
      />
    </div>
  );
};
