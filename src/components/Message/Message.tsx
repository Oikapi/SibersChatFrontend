import React from 'react'
import { IMessage } from '../../commonTypes'

type messageProps = {
  isMine: boolean,
  message: IMessage
}

function Message({ isMine, message }: messageProps) {

  return (
    <div className={`pl-4 flex flex-col ${isMine ? "items-end" : ""} `}>
      <p className='mb-2 text-lg'>{message.user.name}</p>
      <div className='border-[1px] p-2 rounded-xl max-w-[50%]'>
        {message.message}
      </div>
      <p className='mt-2'>
        {message.createdAt?.toDateString() || 0}
      </p>
    </div>
  )
}

export default Message