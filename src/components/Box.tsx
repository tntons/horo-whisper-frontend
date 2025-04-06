interface BoxProps {
    title: string;
    children: React.ReactNode;
}

const Box = ({ title, children }: BoxProps) => {
    return (

            <div className="mx-4 mt-4 border border-greyborder rounded-t-lg">
                <div className="bg-purple02 text-white px-4 py-2 rounded-t-lg">
                    <h1>{title}</h1>
                </div>
                
                <div className="bg-greybackground p-4">
                    {children}
                </div>
            </div>

    )
}

export default Box;
