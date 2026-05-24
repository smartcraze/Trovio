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
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Universal soft orbs for subtle depth */}
            <div className="absolute -top-10 left-[10%] h-36 w-36 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute bottom-10 right-[12%] h-28 w-28 rounded-full bg-white/4 blur-2xl" />

            {themeId === "japan-minimal" && (
                <div className="absolute top-6 right-16 text-[140px] leading-none font-serif opacity-[0.05]">
                    桜
                </div>
            )}

            {themeId === "anime-sakura" && (
                <div className="absolute top-10 right-12 text-[120px] leading-none font-bold opacity-[0.06]">
                    ☆
                </div>
            )}

            {themeId === "cyberpunk" && (
                <div className="absolute bottom-8 left-10 h-24 w-24 rounded-full border border-white/10 opacity-40" />
            )}

            {themeId === "golden-hour" && (
                <div className="absolute top-12 left-[20%] h-20 w-20 rounded-full bg-white/10 blur-xl" />
            )}

            {themeId === "lofi-coffee" && (
                <div className="absolute bottom-12 left-[30%] h-16 w-16 rounded-full bg-white/8 blur-xl" />
            )}

            {themeId === "neon-ocean" && (
                <div className="absolute top-16 right-[20%] h-24 w-24 rounded-full bg-white/7 blur-2xl" />
            )}
        </div>
    );
}

export default ProfileDecorations;
