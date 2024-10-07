"use client"

import Image from "next/image";

export const AlliancesGrid = () => {

    const handleClick = (url: string) => {
        window.location.href = url;
    };

    return (
<div className="mb-4 mt-4">
  <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    
    <div className="relative isolate mb-1 mt-1" onClick={() => handleClick('https://wow.viajow.com/ES/')}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
        <Image src="https://res.cloudinary.com/dvxh2vynm/image/upload/v1728050123/si-voy/sjlove1p5rllm5jrzsuw.png" alt="viajow" className="max-w-full max-h-full" 
         width={200} height={200}/>
      </div>
    </div>

    <div className="relative isolate mb-1 mt-1" onClick={() => handleClick('https://nouneventos.com.ar/')}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
        <Image src="https://res.cloudinary.com/dvxh2vynm/image/upload/v1728048851/si-voy/xgfkuxstcfyohp7yn5uc.jpg" alt="noun" className="max-w-full max-h-full"
         width={200} height={200} />
      </div>
    </div>
    
    <div className="relative isolate mb-1 mt-1" onClick={() => handleClick('https://www.porigualmas.org')}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center 2xl:mt-8 md:mt-8 sm:mt-8">
        <Image src="https://res.cloudinary.com/dvxh2vynm/image/upload/v1728048850/si-voy/lxkel2joeydyhibfsswy.png" alt="por igual más" className="max-w-full max-h-full"
         width={200} height={200} />
      </div>
    </div>

    <div className="relative isolate mb-1 mt-1" onClick={() => handleClick('https://margatour.com.ar/')}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
        <Image src="https://res.cloudinary.com/dvxh2vynm/image/upload/v1728048850/si-voy/kehgxpes6a7zrpdfjnlh.png" alt="margatour" className="max-w-full max-h-full"
        width={200} height={200} />
      </div>
    </div>
  </div>
</div>
    );
};