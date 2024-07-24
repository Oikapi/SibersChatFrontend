import React from 'react'
import sendIcon from "../../assets/icons/sendIcon.svg"

function ChatFooter() {
    return (
        <div className="chat-footer flex-none">
            <div className="flex flex-row items-center p-4">
                <div className="relative flex-grow">
                    <label>
                        <input className="rounded-xl py-2 pl-3 pr-10 w-full border border-[#A5A6F6]  bg-white focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in" type="text" value="" placeholder="Aa" />
                        <button type="button" className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block bg-[#5D5FEF] hover:text-blue-700 w-6 h-6 rounded-md p-1">
                            <img src={sendIcon} />
                        </button>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ChatFooter