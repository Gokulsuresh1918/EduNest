import React from "react";
import CircularProgress from "@mui/joy/CircularProgress";

function Loading() {
  return (
    <div className="flex justify-center h-screen items-center">
      <CircularProgress
        color="danger"
        determinate={false}
        size="lg"
        variant="soft"
      />
    </div>
  );
}

export default Loading;
