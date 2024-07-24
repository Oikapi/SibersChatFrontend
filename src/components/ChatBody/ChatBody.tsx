import React, { useEffect, useState } from 'react'
import Message from '../Message/Message';
import sendIcon from "../../assets/icons/sendIcon.svg"
import { IChannel } from '../../commonTypes';

type message = {
    text: string,
    date: Date,
}

type chatBodyProps = {
    chat: IChannel;
}


function ChatBody({ chat }: chatBodyProps) {

    const [messages, setMessages] = useState<message[]>();
    // useEffects
    console.log(chat);

    return (
        <>
            <div className='min-w-[50%]'>
                <div className='p-6 rounded-t-xl border-[1px] border-[#E1E2FF]'>
                    <p className='bold'>{chat?.name}</p>
                </div>
                <div className='p-4 overflow-y-scroll h-[400px]'>
                    {chat.messages?.map(message =>
                        <Message isMine={true} message={message} key={message.id} />
                    )}
                </div>
            </div>
            <div className="chat-footer flex-none">
                <div className="flex flex-row items-center p-4">
                    <div className="relative flex-grow">
                        <label>
                            <input className="rounded-xl py-2 pl-3 pr-10 w-full border border-[#A5A6F6]  bg-white focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in" type="text" value="" placeholder="Aa" />
                            <button type="button" className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none bg-[#5D5FEF] hover:text-blue-700 w-6 h-6 rounded-md p-1">
                                <img src={sendIcon} />
                            </button>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBody