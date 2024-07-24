import React from 'react'
import avatar from "../../assets/Avatar.png"
import { IChannel } from '../../commonTypes'

type MiniChatProps = {
    channels: IChannel[],
    onChatClickHandler: (id: number) => void
}

function MiniChat({ channels, onChatClickHandler }: MiniChatProps) {


    return (
        <>
            {channels.map(el =>
                <button
                    key={el.id}
                    onClick={() => onChatClickHandler(el.id)}
                    className='flex flex-row items-center justify-between shadow-pink rounded-lg p-4 w-full'>
                    <div>
                        <p>{el.name}</p>
                        <p>Pesquisar chat</p>
                    </div>
                    <div className='w-6 rounded-full bg-[#E1E2FF] text-[#5D5FEF] flex justify-center'>
                        1
                    </div>
                </button>
            )}
        </>
    )
}

export default MiniChat