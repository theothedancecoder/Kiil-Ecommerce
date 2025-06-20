import Image from "next/image";

function BlackFridayBanner() {
    return (
        <div className="relative overflow-hidden mx-4 mt-8 mb-12 h-[400px] sm:h-[500px] md:h-[600px]">
            {/* Hero Image */}
            <div className="absolute inset-0">
                <Image
                    src="/Fjordfiesta_ScandiaSeniorVipp_HansBrattrud_Photo_SirenLauvdal_Styling_kraakevik_D´Orazio_-1.jpg"
                    alt="Fjordfiesta Luxury Furniture"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Light Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />
            </div>

            <div className="relative h-full">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center justify-center sm:justify-start">
                    <div className="w-[220px] sm:w-[250px] md:w-[270px] h-[250px] sm:h-[280px] md:h-[313.95px] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 flex flex-col items-center justify-between -ml-0 sm:-ml-8 md:-ml-16 lg:-ml-24 xl:-ml-32">
                        {/* Made For Summer Box */}
                        <div className="w-[140px] sm:w-[160px] md:w-[180px] h-[24px] sm:h-[28px] md:h-[34.55px] flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                            <div className="flex flex-col items-center text-center w-full justify-center">
                                <span className="block uppercase font-sans not-italic text-lg sm:text-xl md:text-2xl font-normal text-gray-900 leading-tight">Made For</span>
                                <span className="block lowercase font-serif italic text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-tight font-bold">summer</span>
                            </div>
                        </div>
                        {/* Product List */}
                        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 text-center">
                            <p className="text-base sm:text-lg font-serif text-gray-900 leading-relaxed">Scandia Senior</p>
                            <p className="text-base sm:text-lg font-serif text-gray-900 leading-relaxed">Scandia Net</p>
                            <p className="text-base sm:text-lg font-serif text-gray-900 leading-relaxed">Scandia Ottoman</p>
                        </div>
                        {/* Discount Badge */}
                        <div className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-[#eff9ff] text-primary rounded-lg">
                            <span className="text-lg sm:text-xl font-bold">15% OFF</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlackFridayBanner;
