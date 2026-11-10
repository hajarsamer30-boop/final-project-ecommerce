import { Bubbles } from "lucide-react";


export function Loading()
{
    return <div className="fixed inset-0 flex items-center justify-center bg-background/85 text-primary backdrop-blur-sm">
    <Bubbles />
    </div>
}
