import Wrong from './wrong';

interface PayFailedBoxProps {
    setIsPaySuccess: (value: boolean | null) => void;
}
export default function PayFailBox({ setIsPaySuccess }: PayFailedBoxProps) {
    return (
        <div className="fixed inset-0 bg-grey02 bg-opacity-50 flex flex-col items-center justify-center z-50">
            <div className="flex flex-col gap-4 bg-white p-4 w-[250px] rounded-lg shadow-2xl transform scale-105 border border-gray-100 justify-center items-center">
                <h2>Payment Failed</h2>
                <div >
                    <Wrong />
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <button className="bg-grey01 text-black px-3 py-1.5 rounded-lg w-1/2">
                        <p className="text-md">Back Home</p>
                    </button>
                    <button className="bg-purple04 text-white px-3 py-1.5 rounded-lg w-1/2"
                        onClick={() => setIsPaySuccess(null)}
                    >
                        <p className="text-md">Try Again</p>
                    </button>
                </div>
            </div>
        </div>
    )
}