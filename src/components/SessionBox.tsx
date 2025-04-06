interface SessionBoxProps {
    name: string;
    date: string;
    active: boolean;
    status: string;

}

const SessionBox = ({ name, date, active, status }: SessionBoxProps) => {
    return (
        <div className='flex flex-col gap-3'>
            {name}
        </div>
    )

}

export default SessionBox;