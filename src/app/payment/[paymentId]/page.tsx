'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Box from '@/components/Box';
import PaySuccessBox from '@/app/payment/[paymentId]/PaySuccessBox';
import PayFailBox from '@/app/payment/[paymentId]/PayFailBox';
import WaitingBox from '@/app/payment/[paymentId]/WaitingBox';
import { apiFetch } from '@/lib/api/fetch';
interface PaymentInfo {
    data: {
        package: {
            price: number;
        };
    };
}

const CountdownTimer = ({ onTimeout, shouldStop }: { onTimeout: () => void, shouldStop: boolean }) => {
    const [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        if (shouldStop) {
            return; // Exit early if shouldStop is true
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    onTimeout();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeout, shouldStop]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <p className="text-lg">{minutes}:{seconds.toString().padStart(2, '0')} minutes</p>
    );
};

export default function Payment() {
    const router = useRouter();
    const [isPaySuccess, setIsPaySuccess] = useState<boolean | null>(null);
    const [isWaiting, setIsWaiting] = useState<boolean | null>(false);
    const [timerKey, setTimerKey] = useState(0);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const {paymentId} = useParams(); // Replace with actual payment ID

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            try {
                const response = await apiFetch(`/customers/get-payment/${paymentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch payment information');
                }
                const data = await response.json();
                console.log(data);
                setPaymentInfo(data);
            } catch (error) {
                console.error('Error fetching payment info:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentInfo();
    }, []);

    const handleTryAgain = () => {
        setIsPaySuccess(null);
        setTimerKey(prev => prev + 1);
    };

    const handleAlreadyPaid = async () => {
        setIsWaiting(true);
        try {
            const response = await apiFetch(`/customers/verify-payment/${paymentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to verify payment');
            }

            setIsPaySuccess(true);
        } catch (error) {
            console.error('Error verifying payment:', error);
            setIsPaySuccess(false);
        } finally {
            setIsWaiting(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {isPaySuccess === true && <PaySuccessBox setIsPaySuccess={setIsPaySuccess} />}
            {isPaySuccess === false && <PayFailBox setIsPaySuccess={handleTryAgain} />}
            {isWaiting && <WaitingBox />}
            <Box title="Scan QR Code to pay">
                <div className="flex flex-col gap-3 justify-center items-center">
                    {isLoading ? (
                        <p>Loading Payment Information...</p>
                    ) : (
                        <>
                            <h2>Total: {paymentInfo?.data.package.price} Baht</h2>
                            <img src="/promptPayQr.png" width={250} height={250} />
                            <CountdownTimer
                                key={timerKey}
                                onTimeout={() => setIsPaySuccess(false)}
                                shouldStop={isPaySuccess === true}
                            />

                            <div className="flex flex-row gap-4 w-full">
                                <button className=" text-greydate border border-greydate rounded-lg w-2/5 py-1"
                                    onClick={() => router.push('/home')}
                                >
                                    <p className="text-lg">Cancel</p>
                                </button>
                                <button
                                    className="text-black border border-black rounded-lg w-3/5 py-1"
                                    onClick={handleAlreadyPaid}
                                >
                                    <p className="text-lg">Already Paid?</p>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Box>
        </div>
    );
}