'use client'

import VuexyLogo from '@/components/svg/Logo'

const Logo = () => {
    return (
        <div className='flex items-center gap-3'>
            <VuexyLogo className='text-2xl text-primary' />
            <span className='text-[1.375rem] font-bold leading-[1.09091] tracking-[0.25px] text-textPrimary'>
                IPO Diary
            </span>
        </div>
    )
}

export default Logo
