import clsx from 'clsx';

type Column<T> = {
  key: string;
  label: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  zebra?: boolean;
  className?: string;
  emptyMessage?: string;
};

export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  zebra = true,
  className,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    'px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-emerald-900',
                    column.className,
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, index) => (
              <tr
                key={keyExtractor(row, index)}
                className={clsx(
                  'transition-colors hover:bg-emerald-50/30',
                  zebra && index % 2 === 1 && 'bg-emerald-50/20',
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={clsx('px-6 py-4 text-sm', column.className)}
                  >
                    {column.render
                      ? column.render(row, index)
                      : (row[column.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

