import React from "react";
import { View } from "react-native";

const Video = ({ testID, onError }) =>
  React.createElement(View, { testID: testID ?? "mock-video", onError });

Video.displayName = "Video";

export default Video;
