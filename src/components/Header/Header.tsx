import React from 'react'
import personIcon from "../../assets/icons/personIcon.svg"

type headerProps = {
    name: string | null,
}

function Header({ name }: headerProps) {
    return (
        <>
            <header className='flex border-b py-4 px-4 sm:px-10 font-[sans-serif] min-h-[70px] tracking-wide relative z-50 bg-purple-500'>
                <div className='flex flex-wrap items-center gap-5 w-full'>
                    <div>
                        <a>
                            <h1 className='w-36 text-4xl text-white'>Sibers</h1>
                        </a>
                    </div>
                    <div className='flex ml-auto'>
                        <p className='mr-3 text-white text-lg'>{name}</p>
                        <img src={personIcon} />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header