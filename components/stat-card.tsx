import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    subValue: string;
    icon: LucideIcon;
    color: string;
}

export function StatCard({ title, value, subValue, icon: Icon, color }: StatCardProps) {
    return (
        <Card className={`${color} text-white border-none shadow-lg`}>
            <CardContent className="p-6">
                <div className="flex items-center gap-3 opacity-90 mb-4">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Icon size={18} />
                    </div>
                    <span className="text-sm font-medium">{title}</span>
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-bold">{value}</h3>
                    <p className="text-xs opacity-80">{subValue}</p>
                </div>
            </CardContent>
        </Card>
    );
}