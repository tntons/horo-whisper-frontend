import Image from 'next/image';

export default function Chat() {
    return (
        <div className="flex flex-col h-full relative">
            {/* header section */}
            <section className="bg-[#565896] w-full h-28">
                <div className="flex flex-row h-full items-center justify-between p-3 gap-2">

                    {/* Left Island */}
                    <div className="bg-greybackground w-9/12 h-full rounded-lg border border-greyborder">
                        <div className='flex flex-row items-center h-full p-3 gap-3'>

                            {/* Left Column - Image */}
                            <div className="relative w-[50px] h-full bg-gray-300 rounded-lg flex-shrink-0 overflow-hidden">
                                <Image src="/teller00.png" fill alt="Teller profile" className="object-cover" />
                            </div>

                            {/* Right Column - Details */}
                            <div className="flex flex-col flex-grow justify-center mx-3">
                                <h2>Golf the teller</h2>
                                <h1 className='text-md'>Start: 23 Mar 2025 : 10:00 </h1>
                                <span className='text-md text-[#727272] underline mt-2 '>Report</span>
                            </div>

                        </div>
                    </div>

                    {/* Right Island */}
                    <div className="flex flex-col gap-2 w-3/12 h-full">

                        {/* TopIsland */}
                        <div className="flex flex-col bg-greybackground w-full h-1/2 rounded-lg border border-greyborder items-center justify-center">
                            <span className='text-base'>Time Left</span>
                            <span className='text-md font-bold'>13hr 14min</span>
                        </div>

                        {/* Bottom Island */}
                        <div className="flex flex-col bg-greybackground w-full h-1/2 rounded-lg border border-greyborder items-center justify-center">
                            <button className='flex flex-col items-center justify-center'>
                                <span className='text-base font-bold text-purple02'>Share Prediction </span>
                                <span className='text-base font-bold text-purple02'>Attributes </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* chat section */}
            <section className="flex-1 overflow-y-auto">
                {/* Chat content goes here */}
            </section>
        </div>
    )
}