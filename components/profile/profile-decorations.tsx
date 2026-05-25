/**
 * profile-decorations.tsx
 * Optional ambient decorations. Kept minimal for performance.
 */
"use client";

interface ProfileDecorationsProps {
    themeId: string;
}

export function ProfileDecorations({ themeId }: ProfileDecorationsProps) {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Universal soft orbs for subtle depth */}
            <div className="absolute -top-10 left-[10%] h-36 w-36 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute bottom-10 right-[12%] h-28 w-28 rounded-full bg-white/4 blur-2xl" />

            {/* 1. Obsidian Glass (glass-dark) */}
            {themeId === "glass-dark" && (
                <>
                    {/* Geometric crystal wireframe line in bottom right */}
                    <svg viewBox="0 0 100 100" className="absolute bottom-24 right-[8%] w-56 h-56 opacity-[0.03] stroke-current text-[#e6e6fa] fill-none stroke-[0.5]">
                        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" />
                        <line x1="50" y1="5" x2="50" y2="95" />
                        <line x1="10" y1="30" x2="90" y2="30" />
                        <line x1="10" y1="70" x2="90" y2="70" />
                        <line x1="50" y1="5" x2="10" y2="70" />
                        <line x1="50" y1="5" x2="90" y2="70" />
                        <line x1="50" y1="95" x2="10" y2="30" />
                        <line x1="50" y1="95" x2="90" y2="30" />
                    </svg>
                    {/* Small accent diamond in top left */}
                    <svg viewBox="0 0 100 100" className="absolute top-16 left-[10%] w-10 h-10 opacity-[0.04] stroke-current text-[#e6e6fa] fill-none stroke-[0.75]">
                        <polygon points="50,10 90,50 50,90 10,50" />
                    </svg>
                </>
            )}

            {/* 2. Japan Minimal (japan-minimal) */}
            {themeId === "japan-minimal" && (
                <>
                    {/* Elegant Japanese Cherry Blossom character top right */}
                    <div className="absolute top-6 right-16 text-[140px] leading-none font-serif opacity-[0.05] select-none text-[#d4a5a5]">
                        桜
                    </div>
                    {/* Falling cherry blossom petals scattered around */}
                    <svg viewBox="0 0 24 24" className="absolute top-1/4 right-[30%] w-5 h-5 opacity-[0.08] fill-[#d4a5a5] rotate-12">
                        <path d="M12,21C12,21 16,16.5 17.5,13.5C19,10.5 19,7 16,7C14,7 12.5,8.5 12,10C11.5,8.5 10,7 8,7C5,7 5,10.5 6.5,13.5C8,16.5 12,21 12,21Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="absolute top-1/3 left-[15%] w-6 h-6 opacity-[0.06] fill-[#d4a5a5] -rotate-45">
                        <path d="M12,21C12,21 16,16.5 17.5,13.5C19,10.5 19,7 16,7C14,7 12.5,8.5 12,10C11.5,8.5 10,7 8,7C5,7 5,10.5 6.5,13.5C8,16.5 12,21 12,21Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="absolute bottom-[30%] right-[20%] w-4.5 h-4.5 opacity-[0.07] fill-[#d4a5a5] rotate-[60deg]">
                        <path d="M12,21C12,21 16,16.5 17.5,13.5C19,10.5 19,7 16,7C14,7 12.5,8.5 12,10C11.5,8.5 10,7 8,7C5,7 5,10.5 6.5,13.5C8,16.5 12,21 12,21Z" />
                    </svg>
                </>
            )}

            {/* 3. LoFi Coffee (lofi-coffee) */}
            {themeId === "lofi-coffee" && (
                <>
                    {/* Slowly spinning coffee ring detail on top right */}
                    <div className="absolute top-16 right-[15%] w-44 h-44 rounded-full border border-dashed border-[#faf9f6]/4 animate-[spin_120s_linear_infinite]" />
                    {/* Floating coffee bean icons in bottom-left and middle-right */}
                    <svg viewBox="0 0 24 24" className="absolute bottom-28 left-[8%] w-10 h-10 opacity-[0.04] fill-[#faf9f6] rotate-45">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C14.75,4 17.15,5.6 18.25,8C17,9 15.5,9.5 13.5,9C11.5,8.5 10.5,7 9.5,5.5C8.85,4.5 7.85,4 6.75,4C8.25,4.75 9.5,6.5 11,7C12.5,7.5 13.5,6.5 14.5,5C15.25,4.35 16.25,4 17.25,4M6.75,4C5.25,5.25 4.5,7.25 4.5,9.5C4.5,12 5.5,14 7,15.5C8.5,17 11.5,18.5 13,19.5C14.5,20.5 16.5,20 18.25,18C16.5,19.25 14.5,18.75 13,17.5C11.5,16.25 10,14.5 8.5,13C7,11.5 6,9.5 6.75,4Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="absolute top-[40%] right-[10%] w-7 h-7 opacity-[0.03] fill-[#faf9f6] -rotate-12">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C14.75,4 17.15,5.6 18.25,8C17,9 15.5,9.5 13.5,9C11.5,8.5 10.5,7 9.5,5.5C8.85,4.5 7.85,4 6.75,4C8.25,4.75 9.5,6.5 11,7C12.5,7.5 13.5,6.5 14.5,5C15.25,4.35 16.25,4 17.25,4M6.75,4C5.25,5.25 4.5,7.25 4.5,9.5C4.5,12 5.5,14 7,15.5C8.5,17 11.5,18.5 13,19.5C14.5,20.5 16.5,20 18.25,18C16.5,19.25 14.5,18.75 13,17.5C11.5,16.25 10,14.5 8.5,13C7,11.5 6,9.5 6.75,4Z" />
                    </svg>
                </>
            )}

            {/* 4. Ocean Depths (ocean-depths) */}
            {themeId === "ocean-depths" && (
                <>
                    {/* Deep sea floating bubble rings and waves */}
                    <div className="absolute bottom-[30%] left-[8%] w-6 h-6 rounded-full border border-[#00ffff]/10" />
                    <div className="absolute bottom-[60%] right-[10%] w-4 h-4 rounded-full border border-[#00e5ff]/5" />
                    <div className="absolute top-[20%] left-[12%] w-8 h-8 rounded-full border border-[#00e5ff]/8" />
                    
                    {/* Wave paths at the bottom of the page */}
                    <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-20 opacity-[0.03] text-[#00e5ff] fill-current">
                        <path d="M0,10 Q25,5 50,10 T100,10 L100,20 L0,20 Z" />
                    </svg>
                    <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-14 opacity-[0.02] text-[#0077b6] fill-current">
                        <path d="M0,10 Q25,15 50,10 T100,10 L100,20 L0,20 Z" />
                    </svg>
                </>
            )}

            {/* 5. Sunset Boulevard (sunset-boulevard) */}
            {themeId === "sunset-boulevard" && (
                <>
                    {/* Large retro sunset sun disk rising from bottom right */}
                    <svg viewBox="0 0 100 100" className="absolute -bottom-16 right-[5%] w-80 h-80 opacity-[0.04] text-[#ff7e5f] fill-current">
                        <circle cx="50" cy="50" r="45" />
                        <line x1="0" y1="58" x2="100" y2="58" className="stroke-[#140b18] stroke-[3]" />
                        <line x1="0" y1="68" x2="100" y2="68" className="stroke-[#140b18] stroke-[4]" />
                        <line x1="0" y1="78" x2="100" y2="78" className="stroke-[#140b18] stroke-[6]" />
                    </svg>
                    {/* Faint orbit rays at top left */}
                    <svg viewBox="0 0 100 100" className="absolute top-16 left-[5%] w-48 h-48 opacity-[0.02] stroke-[#ff007f] stroke-[0.5] fill-none">
                        <circle cx="50" cy="50" r="40" />
                        <circle cx="50" cy="50" r="20" />
                    </svg>
                </>
            )}

            {/* 6. Forest Canopy (forest-canopy) */}
            {themeId === "forest-canopy" && (
                <>
                    {/* Giant faint leaf silhouettes top right & bottom left */}
                    <svg viewBox="0 0 24 24" className="absolute top-16 right-[8%] w-32 h-32 opacity-[0.03] fill-[#52b788] rotate-[30deg]">
                        <path d="M17,8C15,6 12,6 10,8C8,10 8,13 10,15C11.5,16.5 13.5,17 15,16.5C16.5,16 17,14.5 16.5,13C16,11.5 14,10 12,12C10.5,13.5 10.5,15.5 12,17C10,17 7.5,15 6,12C4.5,9 5,6.5 7,4.5C9,2.5 11.5,2 14.5,3C17.5,4 18.5,6.5 17,8Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="absolute bottom-24 left-[5%] w-40 h-40 opacity-[0.02] fill-[#52b788] -rotate-[45deg]">
                        <path d="M17,8C15,6 12,6 10,8C8,10 8,13 10,15C11.5,16.5 13.5,17 15,16.5C16.5,16 17,14.5 16.5,13C16,11.5 14,10 12,12C10.5,13.5 10.5,15.5 12,17C10,17 7.5,15 6,12C4.5,9 5,6.5 7,4.5C9,2.5 11.5,2 14.5,3C17.5,4 18.5,6.5 17,8Z" />
                    </svg>
                </>
            )}

            {/* 7. Modern Minimalist (modern-minimalist) */}
            {themeId === "modern-minimalist" && (
                <>
                    {/* Modernist layout anchors in corners */}
                    <div className="absolute top-12 left-12 w-6 h-6 border-t border-l border-white/8" />
                    <div className="absolute top-12 right-12 w-6 h-6 border-t border-r border-white/8" />
                    <div className="absolute bottom-12 left-12 w-6 h-6 border-b border-l border-white/8" />
                    <div className="absolute bottom-12 right-12 w-6 h-6 border-b border-r border-white/8" />
                    {/* technical string indicator */}
                    <div className="absolute top-1/2 left-6 -translate-y-1/2 font-mono text-[7px] text-white/10 tracking-[0.3em] select-none rotate-90">
                        DESIGN-SYSTEM-PRESET-V4
                    </div>
                </>
            )}

            {/* 8. Golden Hour (golden-hour) */}
            {themeId === "golden-hour" && (
                <>
                    {/* Radiant golden sun rays in top left */}
                    <svg viewBox="0 0 100 100" className="absolute -top-16 -left-16 w-[450px] h-[450px] opacity-[0.03] text-[#f4a900] fill-none stroke-current stroke-[0.2]">
                        <circle cx="0" cy="0" r="10" />
                        <circle cx="0" cy="0" r="30" />
                        <circle cx="0" cy="0" r="50" />
                        <circle cx="0" cy="0" r="70" />
                        <circle cx="0" cy="0" r="90" />
                        <line x1="0" y1="0" x2="100" y2="100" />
                        <line x1="0" y1="0" x2="100" y2="50" />
                        <line x1="0" y1="0" x2="50" y2="100" />
                    </svg>
                </>
            )}

            {/* 9. Arctic Frost (arctic-frost) */}
            {themeId === "arctic-frost" && (
                <>
                    {/* Frosted ice crystals top-right and bottom-left */}
                    <svg viewBox="0 0 24 24" className="absolute top-24 right-[10%] w-14 h-14 opacity-[0.04] text-[#90e0ef] fill-none stroke-current stroke-[0.5]">
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <line x1="5" y1="5" x2="19" y2="19" />
                        <line x1="5" y1="19" x2="19" y2="5" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="absolute bottom-32 left-[8%] w-20 h-20 opacity-[0.03] text-[#3a86c8] fill-none stroke-current stroke-[0.5]">
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <line x1="5" y1="5" x2="19" y2="19" />
                        <line x1="5" y1="19" x2="19" y2="5" />
                        <circle cx="12" cy="12" r="4" />
                    </svg>
                </>
            )}

            {/* 10. Desert Rose (desert-rose) */}
            {themeId === "desert-rose" && (
                <>
                    {/* Soft sand dune lines at bottom, rose flower outline top right */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-36 opacity-[0.03] text-[#cd7f64] fill-none stroke-current stroke-[0.5]">
                        <path d="M0,80 Q30,60 60,80 T100,70" />
                        <path d="M0,90 Q40,80 80,95 T100,90" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="absolute top-24 right-[12%] w-16 h-16 opacity-[0.04] fill-[#cd7f64]">
                        <path d="M12 2C11.5 2 11 2.2 10.6 2.6C9.5 3.7 9.5 5.5 10.6 6.6L12 8L13.4 6.6C14.5 5.5 14.5 3.7 13.4 2.6C13 2.2 12.5 2 12 2M12 8.5C10.5 8.5 9 9 7.8 10.2C5.4 12.6 5.4 16.4 7.8 18.8L12 23L16.2 18.8C18.6 16.4 18.6 12.6 16.2 10.2C15 9 13.5 8.5 12 8.5M12 11C13 11 14 11.4 14.8 12.2C16.4 13.8 16.4 16.2 14.8 17.8L12 20.6L9.2 17.8C7.6 16.2 7.6 13.8 9.2 12.2C10 11.4 11 11 12 11Z" />
                    </svg>
                </>
            )}

            {/* 11. Tech Innovation (tech-innovation) */}
            {themeId === "tech-innovation" && (
                <>
                    {/* Code console logging strings top left & bottom right */}
                    <div className="absolute top-10 left-10 font-mono text-[9px] text-[#06b6d4]/10 select-none space-y-1">
                        <div>{"// INIT_SYSTEM_V4"}</div>
                        <div>{"// ADDR: 0x7FFF82C4"}</div>
                    </div>
                    <div className="absolute bottom-10 right-10 font-mono text-[9px] text-[#6366f1]/10 select-none text-right">
                        <div>{"LATENCY: 12ms"}</div>
                        <div>{"RATE: 98.4%"}</div>
                    </div>
                    {/* Small geometric ticks */}
                    <div className="absolute top-1/3 right-[8%] font-mono text-xs text-[#06b6d4]/10 select-none">+</div>
                    <div className="absolute bottom-1/3 left-[8%] font-mono text-xs text-[#6366f1]/10 select-none">+</div>
                </>
            )}

            {/* 12. Botanical Garden (botanical-garden) */}
            {themeId === "botanical-garden" && (
                <>
                    {/* Elegant leaves and vines outlines climbing from top right, bottom left, and scattered */}
                    <svg viewBox="0 0 24 24" className="absolute top-16 right-[6%] w-28 h-28 opacity-[0.04] fill-[#74c69d] rotate-[45deg]">
                        <path d="M17,8C15,6 12,6 10,8C8,10 8,13 10,15C11.5,16.5 13.5,17 15,16.5C16.5,16 17,14.5 16.5,13C16,11.5 14,10 12,12C10.5,13.5 10.5,15.5 12,17C10,17 7.5,15 6,12C4.5,9 5,6.5 7,4.5C9,2.5 11.5,2 14.5,3C17.5,4 18.5,6.5 17,8Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="absolute bottom-20 left-[4%] w-36 h-36 opacity-[0.03] fill-[#74c69d] -rotate-[60deg]">
                        <path d="M21,3C21,3 18,3 15,6C12,9 12,12 14,14C15.5,15.5 17.5,16 19,15.5C20.5,15 21,13.5 20.5,12C20,10.5 18,9 16,11C14.5,12.5 14.5,14.5 16,16C14,16 11.5,14 10,11C8.5,8 9,5.5 11,3.5C13,1.5 15.5,1 18.5,2C21.5,3 22.5,5.5 21,3Z" />
                    </svg>
                    {/* Small floating leaves drifting across center rows */}
                    <svg viewBox="0 0 24 24" className="absolute top-[35%] left-[15%] w-6 h-6 opacity-[0.06] fill-[#74c69d] rotate-[15deg]">
                        <path d="M17,8C15,6 12,6 10,8C8,10 8,13 10,15C11.5,16.5 13.5,17 15,16.5" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="absolute bottom-[35%] right-[15%] w-8 h-8 opacity-[0.04] fill-[#74c69d] -rotate-[30deg]">
                        <path d="M17,8C15,6 12,6 10,8C8,10 8,13 10,15C11.5,16.5 13.5,17 15,16.5" />
                    </svg>
                </>
            )}

            {/* 13. Midnight Galaxy (midnight-galaxy) */}
            {themeId === "midnight-galaxy" && (
                <>
                    {/* Orbital galaxy trajectory rings */}
                    <svg viewBox="0 0 100 100" className="absolute top-[20%] right-[-8%] w-[380px] h-[380px] opacity-[0.04] text-[#d946ef] fill-none stroke-current stroke-[0.25] stroke-dashed -rotate-12">
                        <circle cx="50" cy="50" r="45" />
                        <circle cx="50" cy="50" r="25" />
                    </svg>
                    {/* Sparkling 4-point stars */}
                    <svg viewBox="0 0 24 24" className="absolute top-24 left-[18%] w-5 h-5 opacity-[0.08] fill-[#6366f1] animate-[pulse_3s_infinite_1s]">
                        <path d="M12,2L14.5,9.5L22,12L14.5,14.5L12,22L9.5,14.5L2,12L9.5,9.5Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="absolute bottom-32 right-[12%] w-6 h-6 opacity-[0.08] fill-[#d946ef] animate-[pulse_4s_infinite_2s]">
                        <path d="M12,2L14.5,9.5L22,12L14.5,14.5L12,22L9.5,14.5L2,12L9.5,9.5Z" />
                    </svg>
                </>
            )}
        </div>
    );
}

export default ProfileDecorations;
