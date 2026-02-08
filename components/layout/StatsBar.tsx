'use client';

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  percentage?: number;
  color?: 'default' | 'positive' | 'warning' | 'danger';
}

function StatCard({
  label,
  value,
  unit,
  percentage,
  color = 'default',
}: StatCardProps) {
  const bgColors: Record<string, string> = {
    default: 'bg-[#1a1a2e]',
    positive: 'bg-[#1a3a2a]',
    warning: 'bg-[#3a3a1a]',
    danger: 'bg-[#3a1a1a]',
  };

  const textColors: Record<string, string> = {
    default: 'text-gray-300',
    positive: 'text-[#00b894]',
    warning: 'text-[#fdcb6e]',
    danger: 'text-[#e17055]',
  };

  return (
    <div className={`${bgColors[color]} rounded-lg p-4 border border-[#2a2a3e]`}>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className={`text-xl font-bold ${textColors[color]}`}>{value}</span>
        {unit && <span className="text-xs text-gray-500">{unit}</span>}
      </div>
      {percentage !== undefined && (
        <p className="text-xs text-gray-400 mt-2">{percentage}% del total</p>
      )}
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="bg-[#0a0a0f] border-b border-[#1a1a2e] p-4">
      <div className="max-w-full overflow-x-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 min-w-min lg:min-w-full">
          <StatCard
            label="Calorías/día"
            value="2.150"
            unit="kcal"
            color="default"
          />
          <StatCard
            label="Proteína"
            value="161"
            unit="g"
            percentage={30}
            color="positive"
          />
          <StatCard
            label="Carbohidratos"
            value="204"
            unit="g"
            percentage={38}
            color="positive"
          />
          <StatCard
            label="Grasas"
            value="76"
            unit="g"
            percentage={32}
            color="positive"
          />
          <StatCard
            label="Déficit"
            value="-500"
            unit="kcal"
            color="warning"
          />
          <StatCard
            label="Agua"
            value="3.5"
            unit="L"
            color="positive"
          />
        </div>
      </div>
    </div>
  );
}
