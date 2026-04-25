export type Metric = { k: string; v: string };

export type ProjectDetail = {
  num: string;
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  metrics: Metric[];
  thesis: string;
  code: string[];
  signals: string[];
  filters: string[];
  construction: string[];
  architecture: { title: string; desc: string }[];
  insight: string;
  stack: string[];
};

export type ResearchPost = {
  slug: string;
  title: string;
  date: string;
  read: string;
  desc: string;
  tags: string[];
  chart: "line" | "scatter" | "bars" | "heat";
  thesis: string;
  sections: { heading: string; body: string }[];
  takeaways: string[];
};

export const projects: ProjectDetail[] = [
  {
    num: "01",
    slug: "statistical-arbitrage-engine",
    title: "Statistical Arbitrage Engine",
    desc: "Cross-sectional mean reversion exploiting short-term liquidity imbalances.",
    tags: ["Equities", "StatArb", "Mid-Frequency", "Python"],
    metrics: [{ k: "Sharpe", v: "1.72" }, { k: "Max DD", v: "-6.4%" }, { k: "Turnover", v: "280%" }],
    thesis: "Short-term price dislocations caused by liquidity shocks tend to mean-revert within 1–5 trading days when filtered for crowding, volatility, and borrow constraints.",
    code: ["# Universe: Top 2000", "# Lookback: 63", "", "returns = get_returns(universe, lookback)", "signal = zscore(returns)", "weights = rank(signal)", "", "weights = apply_filters(weights)", "weights = normalize(weights, target_gross=1.0)", "", "pnl = backtest(weights)", "sharpe = calc_sharpe(pnl)", "print(f'Sharpe: {sharpe:.2f}')"],
    signals: ["Z-score of returns", "Cross-sectional ranking", "Liquidity-adjusted residuals"],
    filters: ["Liquidity threshold", "Volatility regime filter", "Borrow availability guard"],
    construction: ["Dollar neutral", "Rank-weighted allocation", "Sector capped exposures"],
    architecture: [
      { title: "Data Ingestion", desc: "Polygon / Refinitiv / KDB+" },
      { title: "Feature Engine", desc: "Compute features, store parquet" },
      { title: "Signal Engine", desc: "Generate signals, risk filters" },
      { title: "Backtester", desc: "Vectorized event engine" },
      { title: "Execution Simulator", desc: "Market impact, slippage model" },
      { title: "Risk Engine", desc: "Exposure monitor, stress tests" },
    ],
    insight: "Performance degraded significantly after transaction-cost modeling, requiring regime-based filtering and turnover constraints.",
    stack: ["Python", "NumPy", "Pandas", "C++", "KDB+", "PostgreSQL", "Docker", "Git"],
  },
  {
    num: "02",
    slug: "options-lab",
    title: "Options Lab",
    desc: "Options pricing, calibration, and volatility surface modeling toolkit.",
    tags: ["Options", "Volatility", "C++", "Python"],
    metrics: [{ k: "Models", v: "12" }, { k: "Latency", v: "<2ms" }, { k: "Coverage", v: "98%" }],
    thesis: "Volatility surfaces become more tradable when calibration quality, arbitrage checks, and scenario analytics live inside one reproducible research loop.",
    code: ["surface = load_chain(expiries, strikes)", "clean = remove_bad_quotes(surface)", "params = calibrate_sabr(clean)", "", "greeks = calc_greeks(params)", "stress = shock_surface(params, vega_bp=25)", "", "if no_static_arb(stress):", "    publish_surface(stress)"],
    signals: ["Skew dislocation", "Term-structure kink", "Vega carry"],
    filters: ["No-arbitrage validator", "Quote staleness cutoff", "Bid-ask width threshold"],
    construction: ["Delta hedged", "Vega bucket neutral", "Expiry capped risk"],
    architecture: [
      { title: "Chain Loader", desc: "OPRA snapshots" },
      { title: "Surface Cleaner", desc: "Quote validation" },
      { title: "Calibrator", desc: "SABR / SVI / Heston" },
      { title: "Greek Engine", desc: "Adjoint risk" },
      { title: "Scenario Runner", desc: "Vol shock grids" },
      { title: "Report API", desc: "Research notebooks" },
    ],
    insight: "The strongest gains came from rejecting bad quotes early instead of adding complexity to the pricing model.",
    stack: ["C++", "Python", "pybind11", "NumPy", "QuantLib", "PostgreSQL", "Docker"],
  },
  {
    num: "03",
    slug: "market-data-pipeline",
    title: "Market Data Pipeline",
    desc: "High-throughput pipeline for tick-level market data ingestion and storage.",
    tags: ["Data Eng", "KDB+", "Python", "AWS"],
    metrics: [{ k: "Throughput", v: "2M/s" }, { k: "Uptime", v: "99.99%" }, { k: "Storage", v: "40TB" }],
    thesis: "Clean research depends on deterministic data lineage: every tick needs provenance, validation state, and a reproducible path from raw feed to feature store.",
    code: ["stream = connect_feed(symbols)", "for tick in stream:", "    event = normalize(tick)", "    validate_schema(event)", "    write_raw(event)", "    publish_feature(event)"],
    signals: ["Feed delay", "Gap detection", "Cross-venue spread"],
    filters: ["Schema validation", "Outlier quarantine", "Clock skew checks"],
    construction: ["Immutable raw layer", "Columnar research store", "Replayable event bus"],
    architecture: [
      { title: "Feed Handler", desc: "Ticks and snapshots" },
      { title: "Normalizer", desc: "Schema mapping" },
      { title: "Validator", desc: "Gap and outlier checks" },
      { title: "KDB+ Store", desc: "Intraday analytics" },
      { title: "Parquet Lake", desc: "Research archive" },
      { title: "Replay Service", desc: "Backtest feeds" },
    ],
    insight: "Most downstream research errors traced back to silent data corrections, so the pipeline treats every repair as a first-class event.",
    stack: ["KDB+", "Python", "Kafka", "Parquet", "AWS", "PostgreSQL", "Grafana"],
  },
  {
    num: "04",
    slug: "real-time-risk-engine",
    title: "Real-Time Risk Engine",
    desc: "Portfolio risk analytics with intraday VaR, exposure limits, and stress tests.",
    tags: ["Risk", "VaR", "C++", "Postgres"],
    metrics: [{ k: "Coverage", v: "100%" }, { k: "Refresh", v: "1s" }, { k: "Books", v: "24" }],
    thesis: "Risk needs to be observable before it is reportable; live exposures, limits, and stress losses should be queryable at the same cadence as trading decisions.",
    code: ["positions = stream_positions()", "market = stream_marks()", "", "risk = aggregate_exposures(positions, market)", "var = historical_var(risk, window=750)", "stress = run_scenarios(risk)", "", "emit_limits(risk, var, stress)"],
    signals: ["Factor exposure", "Liquidity buckets", "Stress drawdown"],
    filters: ["Limit breach severity", "Stale mark detector", "Concentration alert"],
    construction: ["Book-level aggregation", "Desk-level drilldown", "Scenario decomposition"],
    architecture: [
      { title: "Position Bus", desc: "Fills and inventory" },
      { title: "Market Cache", desc: "Curves and marks" },
      { title: "Exposure Grid", desc: "Factor aggregation" },
      { title: "VaR Engine", desc: "Historical simulation" },
      { title: "Stress Runner", desc: "Scenario shocks" },
      { title: "Alert Service", desc: "Limits workflow" },
    ],
    insight: "The key UX improvement was making risk explainable by source instead of showing one opaque portfolio number.",
    stack: ["C++", "Python", "PostgreSQL", "Redis", "Docker", "Grafana", "Git"],
  },
  {
    num: "05",
    slug: "multi-factor-momentum",
    title: "Multi-Factor Momentum",
    desc: "Long-short equities momentum strategy with regime-aware factor weighting.",
    tags: ["Equities", "Momentum", "Factor"],
    metrics: [{ k: "Sharpe", v: "1.34" }, { k: "Beta", v: "0.08" }, { k: "Hit", v: "55%" }],
    thesis: "Momentum survives better when factor weights adapt to volatility, breadth, and macro trend regimes instead of remaining static across market cycles.",
    code: ["mom = calc_momentum(prices, [63, 126, 252])", "quality = calc_quality(fundamentals)", "regime = classify_regime(vol, breadth)", "", "weights = blend_factors(mom, quality, regime)", "portfolio = optimize(weights, beta=0.0)"],
    signals: ["12-1 momentum", "Quality overlay", "Volatility regime"],
    filters: ["Earnings blackout", "Borrow cost cap", "Beta neutrality"],
    construction: ["Long-short basket", "Sector neutral", "Monthly rebalance"],
    architecture: [
      { title: "Data Join", desc: "Prices + fundamentals" },
      { title: "Factor Library", desc: "Momentum / quality" },
      { title: "Regime Model", desc: "Breadth and vol" },
      { title: "Optimizer", desc: "Neutrality constraints" },
      { title: "Cost Model", desc: "Borrow + slippage" },
      { title: "Attribution", desc: "Factor PnL" },
    ],
    insight: "Regime weighting reduced drawdowns more reliably than adding more factors to the model.",
    stack: ["Python", "Pandas", "NumPy", "cvxpy", "DuckDB", "PostgreSQL"],
  },
  {
    num: "06",
    slug: "execution-simulator",
    title: "Execution Simulator",
    desc: "Event-driven simulator with market impact, slippage, and queue modeling.",
    tags: ["Execution", "Simulation", "C++"],
    metrics: [{ k: "Speed", v: "10x" }, { k: "Models", v: "6" }, { k: "Tests", v: "320" }],
    thesis: "Execution quality should be researched against a realistic limit-order-book event stream, not a single end-of-bar fill assumption.",
    code: ["book = replay_lob(session)", "for order in schedule:", "    state = book.snapshot(order.ts)", "    fill = simulate_queue(order, state)", "    impact = estimate_impact(fill)", "    record(fill, impact)"],
    signals: ["Queue position", "Spread state", "Short-term alpha decay"],
    filters: ["Auction windows", "Liquidity minimum", "Volatility pause"],
    construction: ["POV schedule", "Limit crossing model", "Child order simulator"],
    architecture: [
      { title: "LOB Replay", desc: "Order book events" },
      { title: "Scheduler", desc: "Parent order logic" },
      { title: "Queue Model", desc: "Fill probability" },
      { title: "Impact Model", desc: "Temporary impact" },
      { title: "Cost Report", desc: "Arrival slippage" },
      { title: "Test Harness", desc: "Scenario fixtures" },
    ],
    insight: "The simulator showed that queue priority dominated signal quality for short-horizon strategies.",
    stack: ["C++", "Python", "Arrow", "Parquet", "Catch2", "Docker", "Git"],
  },
];

export const researchPosts: ResearchPost[] = [
  {
    slug: "why-most-backtests-lie",
    title: "Why Most Backtests Lie",
    date: "May 12, 2024",
    read: "6 min read",
    desc: "Common backtesting pitfalls that inflate performance and how to build more realistic evaluations.",
    tags: ["Backtesting", "Methodology", "Risk"],
    chart: "line",
    thesis: "Backtests fail less because of math and more because of hidden assumptions: survivorship, stale prices, costs, and decisions that accidentally know the future.",
    sections: [
      { heading: "Leakage", body: "Any feature built with revised data, delayed fundamentals, or post-close constituents can create an edge that was never available in live trading." },
      { heading: "Costs", body: "A strategy with modest turnover can look excellent before fees and collapse after spread, impact, borrow, and market-on-close capacity constraints." },
      { heading: "Validation", body: "The best defense is walk-forward testing, timestamped data, simple baselines, and post-trade attribution that explains where every basis point came from." },
    ],
    takeaways: ["Timestamp every input", "Model costs before ranking ideas", "Prefer robust edges over optimized parameters"],
  },
  {
    slug: "factor-crowding-is-underrated",
    title: "Factor Crowding is Underrated",
    date: "Apr 28, 2024",
    read: "8 min read",
    desc: "Measuring crowding in equity factors and its impact on future returns.",
    tags: ["Factors", "Crowding", "Equities"],
    chart: "scatter",
    thesis: "A factor can be statistically valid and still unattractive when too much capital is leaning into the same names with the same rebalance calendar.",
    sections: [
      { heading: "Measurement", body: "Crowding can be proxied through short interest, ownership concentration, borrow cost, volume-normalized factor exposure, and correlated drawdowns." },
      { heading: "Failure Mode", body: "Crowded factors often unwind quickly because de-risking pressure is mechanical: the same risk limits force similar portfolios to sell simultaneously." },
      { heading: "Mitigation", body: "Capacity-aware sizing and factor orthogonalization usually help more than switching to a more complex alpha model." },
    ],
    takeaways: ["Capacity is part of alpha", "Monitor ownership pressure", "Diversify rebalance timing"],
  },
  {
    slug: "latency-is-a-strategy",
    title: "Latency is a Strategy",
    date: "Apr 10, 2024",
    read: "7 min read",
    desc: "How microstructure dynamics and latency advantages create sustainable edges.",
    tags: ["Microstructure", "Execution", "HFT"],
    chart: "bars",
    thesis: "Latency is not just speed; it is the ability to observe state, decide, and cancel before the market reprices around adverse selection.",
    sections: [
      { heading: "Queue Economics", body: "At short horizons, expected value often comes from where an order sits in queue rather than whether a signal direction is right." },
      { heading: "Adverse Selection", body: "Slow quotes are picked off when public signals move faster than resting orders can be repriced or cancelled." },
      { heading: "System Design", body: "Deterministic processing, minimal allocation, and clear failure modes create more value than isolated micro-optimizations." },
    ],
    takeaways: ["Measure decision latency", "Model queue priority", "Optimize reliability before cleverness"],
  },
  {
    slug: "regime-detection-with-hidden-markov-models",
    title: "Regime Detection with Hidden Markov Models",
    date: "Mar 22, 2024",
    read: "9 min read",
    desc: "Using HMMs to identify market regimes and adapt strategy exposure.",
    tags: ["Machine Learning", "Regime", "Python"],
    chart: "heat",
    thesis: "Regime models are most useful when they control risk budgets, not when they pretend to forecast the next return observation exactly.",
    sections: [
      { heading: "Features", body: "Volatility, correlation, breadth, liquidity, and credit stress often separate regimes more reliably than raw returns." },
      { heading: "Interpretability", body: "A two or three-state model is usually easier to monitor and safer to deploy than a high-dimensional classifier with unstable boundaries." },
      { heading: "Usage", body: "The model should scale exposure, tighten risk filters, or alter rebalance cadence rather than directly flip strategy direction." },
    ],
    takeaways: ["Keep state counts low", "Use regimes for sizing", "Track transition stability"],
  },
  {
    slug: "transaction-costs-change-everything",
    title: "Transaction Costs Change Everything",
    date: "Mar 05, 2024",
    read: "5 min read",
    desc: "The compounding impact of costs and how to model them correctly.",
    tags: ["Transaction Costs", "Slippage", "Risk"],
    chart: "line",
    thesis: "Costs are not a final haircut on performance; they are a design constraint that changes which signals, holding periods, and universes are viable.",
    sections: [
      { heading: "Components", body: "Spread, fees, taxes, borrow, market impact, and opportunity cost each respond differently to size and liquidity." },
      { heading: "Turnover", body: "Turnover converts tiny estimation errors into persistent drag, especially in cross-sectional strategies with frequent re-ranking." },
      { heading: "Research Loop", body: "Include costs at the candidate stage so the optimizer learns to prefer stable signals and capacity-aware portfolios." },
    ],
    takeaways: ["Put costs in the objective", "Limit turnover by design", "Validate impact by liquidity bucket"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getResearchPost(slug: string) {
  return researchPosts.find((post) => post.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

export function getAdjacentResearchPost(slug: string) {
  const index = researchPosts.findIndex((post) => post.slug === slug);
  return {
    previous: researchPosts[(index - 1 + researchPosts.length) % researchPosts.length],
    next: researchPosts[(index + 1) % researchPosts.length],
  };
}
