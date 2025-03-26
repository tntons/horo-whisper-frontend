'use client'
import React from 'react';
import { useState } from 'react';

export default function ChoosePackage() {
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [selectedAnonymity, setSelectedAnonymity] = useState<number | null>(null);

    return (
        <div className="flex flex-col h-full">
            <div className="m-4 border border-greyborder rounded-t-lg">

                <div className="bg-purple02 text-white px-4 py-2 rounded-t-lg">
                    <h1>Choose Package</h1>
                </div>

                {/* select price plan */}
                <div className="bg-white p-4">
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setSelectedPackage(0)}
                            className={`w-full p-4 text-left border-2 rounded-lg hover:bg-gray-50 transition-colors ${selectedPackage === 0 ? 'border-purple02' : 'border-greyborder'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">฿ 200</h2>
                                    <p className="text-gray-600">3 questions</p>
                                </div>
                                <div className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${selectedPackage === 0 ? 'border-purple02' : 'border-greyborder'
                                    }`}>
                                    {selectedPackage === 0 && <div className="h-3 w-3 bg-purple02 rounded-full" />}
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => setSelectedPackage(1)}
                            className={`w-full p-4 text-left border-2 rounded-lg hover:bg-gray-50 transition-colors ${selectedPackage === 1 ? 'border-purple02' : 'border-greyborder'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">฿ 300</h2>
                                    <p className="text-gray-600">5 questions</p>
                                </div>
                                <div className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${selectedPackage === 1 ? 'border-purple02' : 'border-greyborder'
                                    }`}>
                                    {selectedPackage === 1 && <div className="h-3 w-3 bg-purple02 rounded-full" />}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* choose anonymity */}
            <div className="mx-4 mb-10 border border-greyborder rounded-t-lg">
                <div className="bg-purple02 text-white px-4 py-2 rounded-t-lg">
                    <h1>Choose Anonymity</h1>
                </div>

                <div className="bg-white p-4">
                    <div className="flex flex-col gap-3">
                        <div>
                            <button className="flex items-center gap-2" onClick={() => setSelectedAnonymity(0)}>
                                <div className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${selectedAnonymity === 0 ? 'border-purple02' : 'border-greyborder'
                                    }`}>
                                    {selectedAnonymity === 0 && <div className="h-3 w-3 bg-purple02 rounded-full" />}
                                </div>
                                <p className="text-md"> I want to stay anonymous</p>
                            </button>
                        </div>
                        <div>
                            <button className="flex items-center gap-2" onClick={() => setSelectedAnonymity(1)}>
                                <div className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${selectedAnonymity === 1 ? 'border-purple02' : 'border-greyborder'
                                    }`}>
                                    {selectedAnonymity === 1 && <div className="h-3 w-3 bg-purple02 rounded-full" />}
                                </div>
                                <p className="text-md"> Share my name with the fortune teller</p>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <button className="bg-purple04 mx-20 text-white py-2 rounded-xl">
                <h1 className="text-xl">Book</h1>
            </button>


        </div>


    );
}