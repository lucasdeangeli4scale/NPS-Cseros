import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const GaugeChart = ({ score }: { score: number }) => {
  // Thresholds: 0-69 (Red), 69-79 (Yellow), 79-89 (Teal), 89-100 (Green)
  const data = [
    { name: 'Red', value: 69 },
    { name: 'Yellow', value: 10 },
    { name: 'Teal', value: 10 },
    { name: 'Green', value: 11 },
  ];
  const COLORS = ['#ef4444', '#eab308', '#06b6d4', '#22c55e'];

  // Calculate needle angle based on score (0-100)
  const needleAngle = (score / 100) * 180;

  return (
    <div className="relative w-full h-48 flex flex-col items-center justify-center overflow-hidden">
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={90}
            paddingAngle={2}
            cornerRadius={10}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Needle */}
      <div 
        className="absolute bottom-4 left-1/2 w-0.5 h-24 bg-slate-900 dark:bg-slate-100 origin-bottom transition-transform duration-500 rounded-full"
        style={{ transform: `rotate(${needleAngle - 90}deg)` }}
      >
        <div className="absolute -top-1 -left-1.5 w-3.5 h-3.5 bg-slate-900 dark:bg-slate-100 rounded-full border-2 border-white dark:border-slate-800" />
      </div>
      
      {/* Labels */}
      <div className="absolute top-24 flex flex-col items-center">
        <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">{score}</div>
      </div>
    </div>
  );
};

export default GaugeChart;
