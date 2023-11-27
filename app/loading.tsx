import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center p-10 justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
