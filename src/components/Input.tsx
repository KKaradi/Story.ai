import { Montserrat } from 'next/font/google'
import SendIcon from '@mui/icons-material/Send';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { ChatBlocks } from '@/app/api/chat/route';


type Props = {
    submitHandler: (input: string | undefined) => void;
};

const inter = Montserrat({
    weight: "400", subsets: ['latin']
})


export default function Input({ submitHandler }: Props) {
    const textRef = useRef(null);

    return <div className={inter.className}>
        <div className='flex items-end'>
            <div className='w-11/12'>
                <textarea ref={textRef} className='resize-none w-full rounded text-black p-1' />
            </div>
            <div className='w-1/12 flex justify-center' onClick={() => submitHandler(textRef?.['current']?.['value'])}>
                <SendIcon></SendIcon>
            </div>
        </div>
    </div >

}