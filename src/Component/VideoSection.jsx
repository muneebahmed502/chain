import React from "react";
import { Box, Typography } from "@mui/material";
import FrontVideo from '../video/FrontVideo.mp4'

const VideoSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",  // Full width of the parent container
        height: "99vh", // Full viewport height
        overflow: "hidden",
        // paddingTop: "60px",  // Adjust padding to avoid overlap with the fixed header
      }}
    >
      <video
        src={FrontVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",  // Ensure video takes up full width
          height: "100%", // Ensure video takes up full height of the parent
          objectFit: "cover", // Ensures the video covers the full area without distortion
        }}
      ></video>

      {/* Optional: Text Overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          color: "#ffffff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "10px 20px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6">Explore Our Collection</Typography>
        <Typography variant="body2">Discover the best perfumes curated just for you.</Typography>
      </Box>
    </Box>
  );
};

export default VideoSection;
