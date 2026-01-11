// MetricsCard.tsx
interface MetricsCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

export function MetricsCard({ title, value, subtitle, color }: MetricsCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <p className="text-sm text-muted-foreground mb-2">{title}</p>
      <p className="text-3xl font-bold mb-1" style={{ color }}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}