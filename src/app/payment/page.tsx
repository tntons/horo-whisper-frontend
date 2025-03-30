'use client'
import React from 'react';
import { useState } from 'react';
import Box from '@/components/Box';

export default function Payment() {

    return (
        <div className="flex flex-col h-full">

            <Box title="Scan QR Code to pay">
                <div className="flex flex-col gap-3 justify-center items-center">
                    <h2>Total: 300 Baht </h2>
                    <img src = "/promptPayQr.png" width={250} height={250} />
                    <p className="text-lg">4:23 minutes</p>

                    <div className="flex flex-row gap-4 w-full">
                        <button className=" text-greydate border border-greydate rounded-lg w-2/5 py-1">
                            <p className="text-lg">Cancel</p>
                        </button>
                        <button className="text-black border border-black rounded-lg w-3/5 py-1">
                            <p className="text-lg">Already Paid?</p>
                        </button>
                    </div>

                </div>
            </Box>


            {/* <div className="mt-4 mx-4 mb-20">
                <button
                    disabled={selectedPackage === null || selectedAnonymity === null}
                    className={`w-full bg-purple04 text-white py-3 rounded-xl ${(selectedPackage === null || selectedAnonymity === null) ? 'opacity-50' : ''}`}
                    onClick={() => console.log("Book Button is Clicked")}
                >
                    <span className="text-xl">Book</span>
                </button>
            </div> */}
        </div>
    );
}