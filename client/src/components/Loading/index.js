import React from "react";
import Spinner from "../Spinner";

function Loading() {
    return (
        <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex-grow-0">
            <div className="flex flex-col items-center space-y-2">
                <Spinner custom="h-12 w-12" />
                <span className="text-white">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;
