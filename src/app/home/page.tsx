import React from 'react';
import SessionBox from '@/components/SessionBox';

export default function Home() {
    return (
            <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-gradient-to-b from-[#090C6C] via-[#575ABA] via-35% to-[#575ABA]">
                <section className="w-full h-[30vh] snap-start">

                </section>

                <section className="w-full h-screen bg-background snap-start rounded-t-3xl justify-center items-center px-10 pt-6">
                    <div className="flex flex-col gap-8">

                        <button className="bg-purple04 text-white rounded-xl px-20 py-2">
                            <h1>Book New Session</h1>
                        </button>

                        <div className='flex flex-col gap-3'>
                        <h2>Current Session</h2>
                        <SessionBox name="Mekk Maedhus" date="23 Mar 2025" active={true} status="Last reply: 2 hours ago" />
                        </div>

                        <div className='flex flex-col gap-3'>
                        <h2>Session History</h2>
                        <SessionBox name="John Doe" date="2024-01-01" active={true} status="Active" />
                        </div>


                    </div>
                </section>
            </div>

    );

}
