'use client'

import VuexyLogo from '@/components/svg/Logo'
// import IpoDiary from 'logo.png'
import { Avatar } from '@mui/material'

const Logo = () => {
    return (
        <div className='flex items-center gap-3'>
            {/* <VuexyLogo className='text-2xl text-primary' /> */}
            {/* <Avatar src='/logo.png' sx={{ width: 36, height: 36 }} /> */}
            <img
                src='/logo.png'
                alt='IPO Diary Logo'
                width={34}
                height={34}
                className='rounded-md'
            />

            <span className='text-[1.375rem] font-bold leading-[1.09091] tracking-[0.25px] text-textPrimary'>
                IPO Diary
            </span>
        </div>
    )
}

export default Logo
