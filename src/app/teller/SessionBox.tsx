import { RiDeleteBinLine } from "react-icons/ri";

interface SessionBoxProps {
    name: string;
    detail: string;
    date: string;
    time: string;
    current?: boolean;
    past?: boolean;
    upcoming?: boolean;
    message?: number;
}

const SessionBox = ({ name, detail, date, time, current, past, upcoming, message }: SessionBoxProps) => {
    return (
        <div className="flex w-full h-24 ">
            <div className={`${upcoming ? 'w-10/12' : 'w-full'} h-full `}>
                <div className={`flex flex-row justify-between w-full h-24 bg-greybackground ${upcoming ? 'rounded-l-lg' : 'rounded-lg'} border border-greyborder px-6 py-4`}>
                    {/* left Column - Details */}
                    <div className="flex flex-col gap-1">
                        <h2>{name}</h2>
                        <p className="text-md ">{detail}</p>
                        <p className="text-md text-greydate">{date}</p>
                    </div>

                    {/* Right Column*/}
                    <div className="flex flex-col items-end gap-1">
                        <p className="mr-0.5">{time}</p>
                        {message !== undefined && message > 0 && current && (
                            <div className="flex items-center justify-center w-8 h-8 bg-purple04 rounded-full">
                                <span className="text-lg text-white">{message}</span>
                            </div>
                        )}
                        {upcoming && (
      
                                <RiDeleteBinLine className="text-red-500 mt-6 mr-0.5" size={24} />

                        )}
                    </div>
                </div>
            </div>
            {upcoming && (
                <div className="w-2/12 h-full rounded-r-lg bg-[#83E394] border border-[#2C821A] flex items-center justify-center ">
                    <span className="text-lg text-[#2C821A]">Accept</span>
                </div>
            )}


        </div>
    )
}

export default SessionBox;