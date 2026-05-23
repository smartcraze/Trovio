import type * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LiquidButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
    glow?: boolean;
};

function LiquidButton({ className, glow = true, ...props }: LiquidButtonProps) {
    return (
        <Button
            className={cn("liquid-button", glow && "liquid-button--glow", className)}
            {...props}
        />
    );
}

export { LiquidButton };
