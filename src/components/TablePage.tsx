import { useState } from 'react';

interface TablePageProps {
  data: any;
}

export default function TablePage({ data }: TablePageProps) {
  const list = data?.list || [];
  
  if (list.length === 0) return <div className="p-6">Sem dados para exibir.</div>;

  const allColumns = Object.keys(list[0]);
  const columns = allColumns.filter(col => col !== 'Title' && col !== 'Data e Hora');

  const transformedList = list.map((row: any) => {
    const newRow = { ...row };
    const timeCol = columns[1];
    if (newRow[timeCol]) {
      const date = new Date(newRow[timeCol]);
      if (!isNaN(date.getTime())) {
        newRow[timeCol] = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      }
    }
    return newRow;
  });

  return (
    <div className="p-6 overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white dark:bg-slate-800 rounded-xl shadow-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            {columns.map((col, index) => (
              <th 
                key={col} 
                className={`p-4 font-bold ${index === 1 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'} whitespace-nowrap`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transformedList.map((row: any, i: number) => (
            <tr key={i} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
              {columns.map((col, index) => (
                <td 
                  key={col} 
                  className={`p-4 ${index === 0 ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'} whitespace-nowrap`}
                >
                  {String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
