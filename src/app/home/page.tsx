export default function Home() {
    return (
        <div className="relative min-h-screen w-full">
            {/* Fixed black background layer */}
            <div className="fixed inset-0 bg-black">
            </div>

            {/* Scrollable white overlay layer */}
            <div className="relative mt-[40vh] min-h-[80vh] bg-white rounded-t-[20px]">
                {/* Add some content to demonstrate scrolling */}
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4">Content Section</h1>

                </div>
            </div>
        </div>
    )
}

