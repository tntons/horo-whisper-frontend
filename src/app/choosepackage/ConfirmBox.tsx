import { collectRoutesUsingEdgeRuntime } from 'next/dist/build/utils';
import Correct from '../payment/correct';
import { useRouter } from 'next/navigation';


export default function ConfirmBox() {
    const router = useRouter();
    return (
        <div className="fixed inset-0 bg-grey02 bg-opacity-50 flex flex-col items-center justify-center z-50">
            <div className="flex flex-col gap-4 bg-white p-4 w-[250px] rounded-lg shadow-2xl transform scale-105 border border-gray-100 justify-center items-center">
                <h2>Session is Booked !</h2>
                <div>
                    <Correct />
                </div>
                <p>Please wait for session acceptance!</p>
                <div className="flex flex-row gap-2 w-full">

                    <button className="bg-purple04 text-white px-3 py-1.5 rounded-lg w-full"
                    onClick={()=>router.push('/home')}>
                        <p className="text-md">Got it!</p>
                    </button>
                </div>
            </div>
        </div>
    )
}