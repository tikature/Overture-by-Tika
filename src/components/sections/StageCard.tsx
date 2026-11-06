import Image from "next/image";
import React from "react";

export default function StageCard() {
  return (
    <div className="relative w-[310px] sm:w-[350px] md:w-[370px] mx-auto lg:mx-0 min-w-0">
      {/* Backing glow */}
      <div className="absolute inset-0 m-auto w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-burgundy via-oxblood/35 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      {/* Card wrapper with overflow-visible for portrait pop-out */}
      <div className="relative overflow-visible select-none group">
        {/* Stage Card Backdrop Frame */}
        <div className="relative w-full h-[470px] sm:h-[490px] rounded-3xl bg-[#26090e] border border-[#7a1829]/60 shadow-[0_20px_60px_rgba(15,2,4,0.95),inset_0_0_40px_rgba(75,10,20,0.7)] p-4 flex flex-col justify-between overflow-hidden">
          {/* Inner hairline border */}
          <div className="absolute inset-2.5 rounded-2xl border border-darkCream/15 pointer-events-none" />
          
          {/* Vertical gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#3a0b14]/70 via-[#22060b]/90 to-[#190408] pointer-events-none" />
          
          {/* Top Header Bar */}
          <div className="relative z-20 flex items-start justify-between gap-3 px-1 pt-1">
            <span className="min-w-0 text-[10.5px] font-opera uppercase tracking-[0.22em] text-darkCream/95 font-semibold drop-shadow-sm leading-tight">
              STAGE VIRTUOSO EDITION
            </span>
            <div className="shrink-0 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#3d0913]/90 border border-wineRed/40 shadow-inner whitespace-nowrap">
              <span className="w-2.5 h-2.5 rounded-full bg-wineRed shadow-[0_0_8px_#B0303C,0_0_12px_#B0303C]" />
              <span className="text-[10px] font-opera text-cream uppercase tracking-[0.12em] font-bold">
                PRINCIPAL MAESTRO
              </span>
            </div>
          </div>
          
          {/* Spacer */}
          <div className="flex-1" />
          
          {/* Bottom Footer Bar */}
          <div className="relative z-20 bg-[#160307]/90 backdrop-blur-md rounded-2xl p-3 border border-[#6b1625]/50 flex items-center justify-between shadow-2xl">
            <div className="flex flex-col">
              <div className="text-[11.5px] text-cream font-opera font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cream shadow-[0_0_6px_#FFF5E1]" />
                <span>THE ROYAL STAGE</span>
              </div>
              <p className="text-[10px] text-warmCream/70 font-serif tracking-wide mt-0.5">
                Grand Théâtre • Lead Software Composition
              </p>
            </div>
            <span className="whitespace-nowrap text-[10.5px] font-opera px-3 py-1 rounded bg-[#4a0a16] text-cream border border-[#800020]/60 shadow-[0_0_12px_rgba(128,0,32,0.6)] font-bold tracking-widest">
              MAESTRO V4.0
            </span>
          </div>
        </div>
        
        {/* Portrait pop-out layer */}
        <div className="absolute inset-0 pointer-events-none overflow-visible z-10 flex items-center justify-center">
          <div
            className="absolute top-[38px] sm:top-[42px] left-1/2 -translate-x-1/2 w-[140%] max-w-none flex justify-center"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 95%)",
              maskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 95%)",
            }}
          >
            <Image
              alt="Dewi Atika Muthi, frontend developer and software engineer"
              className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] drop-shadow-[0_0_24px_rgba(128,0,32,0.3)] transition-transform duration-500 group-hover:scale-[1.02]"
              src="/images/atika.png"
              width={520}
              height={365}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}