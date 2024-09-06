import Image from "next/image";

const BottomBar = () => {
    return (
        <div className="lg:w-[65%] w-full grid grid-cols-2 lg:grid-cols-4 gap-4 shadow-xl drop-shadow-xl rounded-xl p-4">
            <div className="flex justify-center">
                <Image
                    src='/travel.png'
                    alt="Travel"
                    width={100}
                    height={100}
                    className="h-20 w-20 lg:h-32 lg:w-32 object-contain"
                />
            </div>
            <div className="flex justify-center">
                <Image
                    src='/shop.png'
                    alt="Shop"
                    width={100}
                    height={100}
                    className="h-20 w-20 lg:h-32 lg:w-32 object-contain"
                />
            </div>
            <div className="flex justify-center">
                <Image
                    src='/camera.png'
                    alt="Camera"
                    width={100}
                    height={100}
                    className="h-20 w-20 lg:h-32 lg:w-32 object-contain"
                />
            </div>
            <div className="flex justify-center">
                <Image
                    src='/girl.png'
                    alt="Girl"
                    width={100}
                    height={100}
                    className="h-20 w-20 lg:h-32 lg:w-32 object-contain"
                />
            </div>
        </div>
    );
}

export default BottomBar;
