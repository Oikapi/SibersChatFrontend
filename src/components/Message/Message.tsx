import React from 'react'
import { IMessage } from '../../commonTypes'
import { formatMessageDate } from '../../utils/formatMessageDate'

type messageProps = {
  isMine: boolean,
  message: IMessage
}

function Message({ isMine, message }: messageProps) {

  return (
    <div className={`pl-4 flex flex-col mb-4 ${isMine ? "items-end" : ""} `}>
      <p className='mb-2 text-lg'>{message.user.name}</p>
      <div className={`border-[1px] border-[#A5A6F6] p-2 rounded-xl max-w-[50%] ${isMine ? "bg-[#A5A6F6]" : ""}`}>
        {message.message}
      </div>
      <p className='mt-2 text-sm'>
        {
          formatMessageDate(message?.createdAt)}
      </p>
    </div>
  )
}

export default Message