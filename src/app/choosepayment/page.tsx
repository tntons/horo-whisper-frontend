'use client'
import React from 'react';
import { useState } from 'react';
import Box from '@/components/Box';

export default function ChoosePayment() {
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [selectedAnonymity, setSelectedAnonymity] = useState<number | null>(null);

    return (
        <div className="flex flex-col h-full">

            <Box title="Confirm Bill">
                <div className="flex flex-col gap-3">

                </div>
            </Box>

            <Box title="Choose Payment Method">
                <div className="flex flex-col gap-3">
                    <div>
                        <button className="flex items-center gap-2" onClick={() => setSelectedAnonymity(0)}>
                            <div className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${selectedAnonymity === 0 ? 'border-purple02' : 'border-greyborder'}`}>
                                {selectedAnonymity === 0 && <div className="h-3 w-3 bg-purple02 rounded-full" />}
                            </div>
                            <p className="text-md"> I want to stay anonymous</p>
                        </button>
                    </div>
                    <div>
                        <button className="flex items-center gap-2" onClick={() => setSelectedAnonymity(1)}>
                            <div className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${selectedAnonymity === 1 ? 'border-purple02' : 'border-greyborder'}`}>
                                {selectedAnonymity === 1 && <div className="h-3 w-3 bg-purple02 rounded-full" />}
                            </div>
                            <p className="text-md"> Share my name with the fortune teller</p>
                        </button>
                    </div>
                </div>
            </Box>

            <div className="mt-4 mx-4 mb-20">
                <button
                    disabled={selectedPackage === null || selectedAnonymity === null}
                    className={`w-full bg-purple04 text-white py-3 rounded-xl ${(selectedPackage === null || selectedAnonymity === null) ? 'opacity-50' : ''}`}
                    onClick={() => console.log("Book Button is Clicked")}
                >
                    <span className="text-xl">Book</span>
                </button>
            </div>
        </div>
    );
}