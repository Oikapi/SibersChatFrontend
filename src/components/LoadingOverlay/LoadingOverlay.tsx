import React from 'react'

type LoadingOverlayProps = {
    isLoading: boolean;
    children: React.ReactNode;
}

function LoadingOverlay({ isLoading, children }: LoadingOverlayProps) {
    return (
        <div className="relative">
            {children}
            {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                    <div className="w-10 h-10 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    )
}

export default LoadingOverlay