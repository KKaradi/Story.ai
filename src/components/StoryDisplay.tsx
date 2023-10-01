import { Montserrat } from 'next/font/google'
import { ChatBlocks } from "@/app/api/chat/route";

type Props = {
    story: ChatBlocks;
};

const normalText = Montserrat({
    weight: "400", subsets: ['latin']
})

const bold = Montserrat({
    weight: "800", subsets: ['latin']
})


export default function StoryDisplay({ story }: Props) {
    return <div className='flex items-end flex-col-reverse h-[80vh] overflow-scroll'>
        {

            story.slice().reverse().map(({ role, content }, index) => {
                if (role === "system") {
                    return <div key={index} className="flex rounded mt-5 ">

                    </div>
                } else if (role === "assistant") {
                    return <div key={index} className="flex rounded mt-5 flex-col justify-start text-gray-300">
                        <p className={bold.className}>Dungeon Master:</p>
                        <p className={normalText.className}>{content}</p>
                    </div>
                } else if (role === "user") {
                    return <div key={index} className="flex rounded mt-5 flex-col justify-end">
                        <p className={bold.className}>You:</p>
                        <p className={normalText.className}>{content}</p>
                    </div>
                }
            })
        }
    </div >
}