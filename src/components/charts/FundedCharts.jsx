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
import {
  FUNDED_ACCOUNTS,
  februaryToNowRange,
  outcomeBreakdown,
  plByMonth,
  selectTrades,
} from '@/lib/fundedCharts';

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
    <div className="rounded-lg border border-[#2e303a] bg-[#191919] px-12 py-8 text-sm text-[#f3f4f6]">
      {item.name}: {item.value}
    </div>
  );
}

function PlTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const funded = payload[0].payload?.funded;
  return (
    <div className="rounded-lg border border-[#2e303a] bg-[#191919] px-12 py-8 text-sm text-[#f3f4f6]">
      {label}: {formatUsd(payload[0].value)}
      {funded ? ' · Funded' : ''}
    </div>
  );
}

function OutcomeDonut({ data }) {
  const slices = data.filter((item) => item.value > 0);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return <p className="flex h-240 items-center justify-center text-sm text-[#9ca3af]">No outcomes yet</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={slices}
          dataKey="value"
          nameKey="name"
          innerRadius={72}
          outerRadius={104}
          paddingAngle={2}
          stroke="#191919"
        >
          {slices.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<OutcomeTooltip />} />
        <Legend
          formatter={(value) => {
            const row = data.find((item) => item.name === value);
            return `${value} (${row?.value ?? 0})`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function PlColumns({ data, showFundedLabels }) {
  if (data.length === 0) {
    return <p className="flex h-240 items-center justify-center text-sm text-[#9ca3af]">No monthly P/L yet</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: showFundedLabels ? 28 : 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#2e303a" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          axisLine={{ stroke: '#2e303a' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatUsd(value)}
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
              fontSize={11}
              fontWeight={700}
            />
          ) : null}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function ChartPair({ title, trades, account, allPlatforms, monthRange }) {
  const query = { allPlatforms, monthRange };
  const outcomes = outcomeBreakdown(trades, account, query);
  const monthly = plByMonth(trades, account, query);
  const count = selectTrades(trades, { account, ...query }).length;

  if (account && count === 0) return null;

  return (
    <section className="relative flex flex-col gap-16">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-600 text-[#f3f4f6]">{title}</h2>
        <span className="text-sm text-[#9ca3af]">{count} trades</span>
      </div>

      {count === 0 && !monthRange ? (
        <div className="rounded-[1.4rem] border border-[#2e303a] bg-[#191919] p-24 text-sm text-[#9ca3af]">
          No funded trades yet
        </div>
      ) : (
        <div className="relative grid grid-cols-1 gap-16 2xl:grid-cols-1 card">
          <div className="flex flex-col gap-16">
            <article className="rounded-[1.4rem] border border-[#2e303a] bg-[#191919] p-16">
              <h3 className="mb-8 text-sm text-[#9ca3af]">Outcome breakdown</h3>
              <OutcomeDonut data={outcomes} />
            </article>
            <article className="rounded-[1.4rem] border border-[#2e303a] bg-[#191919] p-16">
              <h3 className="mb-8 text-sm text-[#9ca3af]">P/L by month</h3>
              <PlColumns data={monthly} showFundedLabels={!account} />
            </article>
          </div>
        </div>
      )}
    </section>
  );
}

export default function FundedCharts({ trades }) {
  const monthRange = februaryToNowRange();

  return (
    <div className="flex flex-col gap-32 grid grid-cols-1 gap-16 2xl:grid-cols-2">
      <ChartPair title="All funded accounts" trades={trades} allPlatforms monthRange={monthRange} />
      {FUNDED_ACCOUNTS.map((account) => (
        <ChartPair key={account} title={account} trades={trades} account={account} />
      ))}
    </div>
  );
}
