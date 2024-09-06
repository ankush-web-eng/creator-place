import dynamic from "next/dynamic";

const CenterVideo = dynamic(() => import("@/components/pages/hero/CenterVideo"), { ssr: false });
const BottomBar = dynamic(() => import("@/components/pages/hero/BottomBar"), { ssr: false });

const Hero: React.FC = () => {
    return (
        <div className="min-w-screen h-fit justify-center items-center lg:py-12 space-y-3 flex flex-col">
            <CenterVideo />
            <BottomBar />
        </div>
    );
};

export default Hero;
