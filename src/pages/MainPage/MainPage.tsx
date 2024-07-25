import React, { useEffect, useState } from 'react'
import personIcon from "../../assets/icons/personIcon.svg"
import Header from '../../components/Header/Header'
import ChatBody from '../../components/ChatBody/ChatBody'
import MiniChat from '../../components/MiniChat/MiniChat'
import ChatFooter from '../../components/ChatFooter/ChatFooter'
import NavGroupButton from '../../components/NavGroupButton/NavGroupButton'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTs'
import { fetchUser } from '../../store/UserSlice'
import { fetchChannels, fetchMessages, getMessage } from '../../store/ChannelSlice'
import { IChannel } from '../../commonTypes'
import echo from '../../utils/echo'
import CreateChatModal from '../../components/CreateChatModal/CreateChatModal'


function MainPage() {
    const dispatch = useAppDispatch();
    const userName = useAppSelector(state => state.user.name);
    const channels = useAppSelector(state => state.channels.channels)
    const [activeChatId, setActiveChatId] = useState<number>(-1);
    const [isCreateNewChatModalOpen, setIsCreateNewChatModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchChannels());
    }, []);

    useEffect(() => {
        channels.forEach(channel => {
            console.log(channel);
            echo.channel(`chat_${channel.id}`)
                .listen('.store_message', (event: any) => {
                    console.log(event);
                    dispatch(getMessage(event));
                });
        });

        return () => {
            channels.forEach(channel => {
                echo.leave(`chat_${channel.id}`);
            });
        };
    }, [channels])


    // console.log(channels);
    // console.log(activeChat);
    const onChatClickHandler = (id: number) => {
        dispatch(fetchMessages(id));
        setActiveChatId(id);
    }



    return (
        <>
            <Header name={userName} />
            <div className='flex flex-row justify-center mt-8 gap-3 items-start min-h-[500px]'>
                {/* <NavGroupButton /> */}
                <div className='min-w-[30%] bg-[#FDFDFF] border-[1px] rounded-2xl p-4 min-h-[80vh]'>
                    <div className='flex gap-3 my-3'>
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                        </div>
                        <button
                            className='bg-[#A5A6F6] p-1 rounded-md'
                            onClick={() => setIsCreateNewChatModalOpen(true)}
                        >Create Chat
                        </button>
                    </div>
                    <MiniChat channels={channels} onChatClickHandler={onChatClickHandler} currentChannel={activeChatId} />
                </div>
                <div className='w-[50%] border-[1px] border-[#E1E2FF] rounded-xl min-h-[80vh]'>
                    {activeChatId !== -1 &&
                        <ChatBody chat={channels.find(el => el.id === activeChatId) || channels[0]} />
                    }
                    {/* <ChatFooter /> */}
                </div>
            </div>
            <CreateChatModal isOpen={isCreateNewChatModalOpen} setOpen={() => setIsCreateNewChatModalOpen(prev => !prev)} />
        </>
    )
}

export default MainPage