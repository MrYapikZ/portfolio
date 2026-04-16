

export default function PopUpWindow() {
    return (
        <>
            <div className="absolute top-40 2xl:top-50 left-10 md:left-30 2xl:left-40 [clip-path:var(--window-clip)] h-9/12 w-10/12 md:w-9/12 bg-black/95">
                <div className="flex flex-row justify-between items-center w-full h-20 py-5 pl-5 pr-10">
                    {/* Close Button */}
                    <button className="h-10 w-10">
                        <div className="relative h-full w-full">
                            {/* Top Left */}
                            <div className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-white" />
                            {/* Top Right */}
                            <div className="absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-white" />
                            {/* Bottom Left */}
                            <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-white" />
                            {/* Bottom Right */}
                            <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-white" />

                            {/* <div className="absolute inset-0 rounded-full border border-black" /> */}

                            <div className="absolute rotate-45 top-1/2 left-1/2 h-0 w-4 -translate-x-1/2 -translate-y-1/2 border-t border-white" />
                            <div className="absolute rotate-45 top-1/2 left-1/2 h-4 w-0 -translate-x-1/2 -translate-y-1/2 border-l border-white" />
                        </div>
                    </button>

                    <h2 className="font-heading font-bold text-4xl 2xl:text-6xl text-[#F5E709] tracking-[0.5rem]">
                        Work | 仕事
                    </h2>
                </div>
                <div className="flex flex-row justify-between items-start p-12 h-96 w-full">
                    <div className="h-full w-4/12">

                    </div>
                    <div className="w-full h-full bg-white">

                    </div>
                </div>
            </div>
        </>
    );
}