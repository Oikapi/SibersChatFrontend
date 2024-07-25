import React, { useEffect, useRef, useState } from 'react'
import Message from '../Message/Message';
import sendIcon from "../../assets/icons/sendIcon.svg"
import { IChannel } from '../../commonTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTs';
import { fetchMembers, sendMessage } from '../../store/ChannelSlice';
import settingsIcon from "../../assets/icons/settingsIcon.svg"
import ChatSettingsModal from '../ChatSettingsModal/ChatSettingsModal';

type message = {
    text: string,
    date: Date,
}

type chatBodyProps = {
    chat: IChannel;
}


function ChatBody({ chat }: chatBodyProps) {

    const [messages, setMessages] = useState<message[]>();
    const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState("");
    const userId = useAppSelector(state => state.user.id);
    const dispatch = useAppDispatch();
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchMembers(chat.id));
    }, [])
    // useEffects
    console.log(userId);

    const onSendClickHandler = () => {
        dispatch(sendMessage(
            {
                channelId: chat.id,
                message: inputValue
            }
        ))
        setInputValue("");
    }

    useEffect(() => {
        scrollToBottom(); // Прокручиваем вниз при обновлении сообщений
    }, [chat]);

    const scrollToBottom = () => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    };

    return (
        <>
            <div className='min-w-[50%]'>
                <div className='p-6 rounded-t-xl border-[1px] border-[#E1E2FF] flex justify-between'>
                    <p className='bold'>{chat?.name}</p>
                    <button
                        onClick={() => setSettingsOpen(prev => !prev)}
                    >
                        <img src={settingsIcon} />
                    </button>
                </div>
                <div className='p-4 overflow-y-scroll h-[400px]' ref={chatBodyRef}>
                    {chat.messages?.map(message =>
                        <Message isMine={message.user.id === userId} message={message} key={message.id} />
                    )}
                </div>
            </div>
            <div className="chat-footer flex-none">
                <div className="flex flex-row items-center p-4">
                    <div className="relative flex-grow">
                        <label>
                            <input
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                className="rounded-xl py-2 pl-3 pr-10 w-full border border-[#A5A6F6]  bg-white focus:outline-none text-black focus:shadow-md transition duration-300 ease-in" type="text" placeholder="Aa" />
                            <button
                                onClick={onSendClickHandler}
                                type="button" className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none bg-[#5D5FEF] hover:text-blue-700 w-6 h-6 rounded-md p-1">
                                <img src={sendIcon} />
                            </button>
                        </label>
                    </div>
                </div>
            </div>
            <ChatSettingsModal isOpen={isSettingsOpen} setOpen={() => setSettingsOpen(prev => !prev)} members={chat.members} channel={chat} />
        </>
    )
}

export default ChatBody