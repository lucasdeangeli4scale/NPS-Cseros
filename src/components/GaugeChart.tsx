import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const GaugeChart = ({ score }: { score: number }) => {
  const data = [
    { name: 'Red', value: 33 },
    { name: 'Yellow', value: 33 },
    { name: 'Green', value: 34 },
  ];
  const COLORS = ['#ef4444', '#eab308', '#22c55e'];

  // Calculate needle angle based on score (0-100)
  // The pie chart is 180 degrees (0 to 180)
  const needleAngle = (score / 100) * 180;

  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
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
        className="absolute bottom-0 left-1/2 w-1 h-20 bg-slate-900 dark:bg-slate-100 origin-bottom transition-transform duration-500"
        style={{ transform: `rotate(${needleAngle - 90}deg)` }}
      />
      
      <div className="absolute bottom-2 font-bold text-2xl">{score}</div>
    </div>
  );
};

export default GaugeChart;
