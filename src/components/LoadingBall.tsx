import styles from '../styles/Bounceball.module.css'

type Props = {
    isLoading: boolean
    loadingText: string,
}

export default function LoadingBall({ isLoading, loadingText }: Props) {

    return <div>
        {isLoading ? <div className='w-full flex justify-end flex-row'>
            < div className={styles.bounceball} />
            <div className='flex items-center ml-5'>{loadingText}</div>
        </div > :
            <div className='w-full h-[37px]'></div>
        }
    </div>

}