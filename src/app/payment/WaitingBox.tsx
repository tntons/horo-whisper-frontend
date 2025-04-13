export default function WaitingBox() {

    return (
        <div className="fixed inset-0 bg-grey02 bg-opacity-50 flex flex-col items-center justify-center z-50">
            <div className="flex flex-col gap-4 bg-white p-4 w-[250px] rounded-lg shadow-2xl transform scale-105 border border-gray-100 justify-center items-center">
                <h2>Please Wait ...</h2>
            </div>
        </div>
    )
}