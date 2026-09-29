import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';
import { accountsByDate, februaryToNowRange, outcomeBreakdown, plByMonth, selectTrades } from '@/lib/fundedCharts';

function formatUsd(value) {
  const amount = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  if (value > 0) return `+$${amount}`;
  if (value < 0) return `-$${amount}`;
  return `$${amount}`;
}

function OutcomeTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border bg-card px-12 py-8 text-sm text-heading">
      {item.name}: {item.value}
    </div>
  );
}

function PlTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const funded = payload[0].payload?.funded;
  return (
    <div className="rounded-lg border border-border bg-card px-12 py-8 text-sm text-heading">
      {label}: {formatUsd(payload[0].value)}
      {funded ? ' · Funded' : ''}
    </div>
  );
}

function OutcomeDonut({ data, compact }) {
  const slices = data.filter((item) => item.value > 0);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <p className={`flex items-center justify-center text-sm text-text-muted ${compact ? 'h-140' : 'h-240'}`}>
        No outcomes yet
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={compact ? 160 : 280}>
      <PieChart>
        <Pie
          data={slices}
          dataKey="value"
          nameKey="name"
          innerRadius={compact ? 36 : 72}
          outerRadius={compact ? 52 : 104}
          paddingAngle={2}
          stroke="#111a2b"
        >
          {slices.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<OutcomeTooltip />} />
        <Legend
          iconSize={compact ? 8 : 14}
          wrapperStyle={compact ? { fontSize: 10 } : undefined}
          formatter={(value) => {
            const row = data.find((item) => item.name === value);
            return `${value} (${row?.value ?? 0})`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function PlColumns({ data, showFundedLabels, compact }) {
  if (data.length === 0) {
    return (
      <p className={`flex items-center justify-center text-sm text-text-muted ${compact ? 'h-140' : 'h-240'}`}>
        No monthly P/L yet
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={compact ? 160 : 280}>
      <BarChart
        data={data}
        margin={{ top: showFundedLabels && !compact ? 28 : 8, right: 4, left: compact ? 4 : 0, bottom: 0 }}
      >
        <CartesianGrid stroke="#223049" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: '#8b97ab', fontSize: compact ? 10 : 12 }}
          axisLine={{ stroke: '#223049' }}
          tickLine={false}
          interval={0}
        />
        <YAxis
          hide={compact}
          width={compact ? 0 : 64}
          tick={{ fill: '#8b97ab', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatUsd(value)}
          domain={[(dataMin) => Math.min(0, dataMin), (dataMax) => Math.max(0, dataMax)]}
        />
        <Tooltip content={<PlTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
        <Bar dataKey="pl" radius={[6, 6, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.month} fill={entry.fill} />
          ))}
          {showFundedLabels ? (
            <LabelList
              valueAccessor={(entry) => (entry.payload?.funded ? 'Funded' : '')}
              position="center"
              fill="#0b1220"
              fontSize={compact ? 9 : 11}
              fontWeight={700}
            />
          ) : null}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function ChartPair({ title, trades, account, allPlatforms, monthRange, fullRow }) {
  const query = { allPlatforms, monthRange };
  const outcomes = outcomeBreakdown(trades, account, query);
  const monthly = plByMonth(trades, account, query);
  const count = selectTrades(trades, { account, ...query }).length;

  if (account && count === 0) return null;

  const compact = !fullRow;

  return (
    <section className={`relative flex min-w-0 flex-col ${compact ? 'gap-8' : 'gap-16'}${fullRow ? ' w-full' : ''}`}>
      <div className="flex min-w-0 items-baseline justify-between gap-4">
        <h2 className={`min-w-0 truncate font-600 text-heading ${compact ? 'text-sm' : 'text-xl'}`}>{title}</h2>
        <span className="shrink-0 whitespace-nowrap text-sm text-text-muted">{count} trades</span>
      </div>

      {count === 0 && !monthRange ? (
        <div className="rounded-[1.4rem] border border-border bg-card p-24 text-sm text-text-muted">
          No funded trades yet
        </div>
      ) : (
        <div
          className={
            fullRow
              ? 'relative grid w-full grid-cols-2 gap-16'
              : 'relative grid min-w-0 grid-cols-1 gap-8 overflow-hidden rounded-[1.4rem] border border-border bg-card p-8'
          }
        >
          <article className={fullRow ? 'rounded-[1.4rem] border border-border bg-card p-16' : 'min-w-0'}>
            <h3 className="mb-8 text-sm text-text-muted">Outcome breakdown</h3>
            <OutcomeDonut data={outcomes} compact={compact} />
          </article>
          <article className={fullRow ? 'rounded-[1.4rem] border border-border bg-card p-16' : 'min-w-0'}>
            <h3 className="mb-8 text-sm text-text-muted">P/L by month</h3>
            <PlColumns data={monthly} showFundedLabels={!account} compact={compact} />
          </article>
        </div>
      )}
    </section>
  );
}

export default function FundedCharts({ trades }) {
  const monthRange = februaryToNowRange();

  return (
    <div className="flex w-full flex-col gap-32">
      <ChartPair title="All funded accounts" trades={trades} allPlatforms monthRange={monthRange} fullRow />
      <div className="grid w-full min-w-0 grid-cols-6 gap-8">
        {accountsByDate(trades).map((account) => (
          <ChartPair key={account} title={account} trades={trades} account={account} />
        ))}
      </div>
    </div>
  );
}
