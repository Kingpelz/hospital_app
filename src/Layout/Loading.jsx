import React from "react";

function Loading() {
  return (
    <div>
     <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600">Fetching data</div>
    </div>
    </div>
  );
}

export default Loading;

