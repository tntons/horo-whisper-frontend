import Correct from './correct';
import { useRouter } from 'next/navigation';
interface PaySuccessBoxProps {
    setIsPaySuccess: (value: boolean | null) => void;
}

export default function PaySuccessBox({ setIsPaySuccess }: PaySuccessBoxProps) {
    const router = useRouter();
    return (
        <div className="fixed inset-0 bg-grey02 bg-opacity-50 flex flex-col items-center justify-center z-50">
            <div className="flex flex-col gap-4 bg-white p-4 w-[250px] rounded-lg shadow-2xl transform scale-105 border border-gray-100 justify-center items-center">
                <h2>Payment Successful</h2>
                <div>
                    <Correct />
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <button 
                        className="bg-grey01 text-black px-3 py-1.5 rounded-lg w-1/2"
                        onClick={() => router.push('/home')}
                    >
                        <p className="text-md">Back Home</p>
                    </button>
                    <button className="bg-purple04 text-white px-3 py-1.5 rounded-lg w-1/2">
                        <p className="text-md">Join Chat Now</p>
                    </button>
                </div>
            </div>
        </div>
    )
}