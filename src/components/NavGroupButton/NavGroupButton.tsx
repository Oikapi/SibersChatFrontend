import React from 'react'

function NavGroupButton() {
    return (
        <div className=''>
            <ul>
                <li>
                    <button className="bg-purple-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full mb-3">
                        My Chats
                    </button>
                </li>
                <li>
                    <button className="bg-purple-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full mb-3">
                        Peoples
                    </button>
                </li>
                <li>
                    <button className="bg-purple-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full mb-3">
                        Chats
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default NavGroupButton