-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  encrypted_password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  profile_type VARCHAR(50) DEFAULT 'standard' CHECK (profile_type IN ('standard', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolios table
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  initial_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  monthly_contribution DECIMAL(12,2) NOT NULL DEFAULT 0,
  risk_profile VARCHAR(20) CHECK (risk_profile IN ('conservative', 'moderate', 'aggressive')),
  reinvest_dividends BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assets table
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) CHECK (type IN ('stock', 'fii', 'etf', 'reit', 'bond')),
  market VARCHAR(10) CHECK (market IN ('BR', 'US')),
  currency VARCHAR(3) DEFAULT 'BRL',
  current_price DECIMAL(12,4),
  dividend_yield DECIMAL(5,2),
  sector VARCHAR(100),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio assets (many-to-many)
CREATE TABLE portfolio_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  allocation_percentage DECIMAL(5,2) NOT NULL CHECK (allocation_percentage >= 0 AND allocation_percentage <= 100),
  quantity DECIMAL(12,4) NOT NULL DEFAULT 0,
  average_price DECIMAL(12,4) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(portfolio_id, asset_id)
);

-- Dividend history
CREATE TABLE dividend_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  ex_date DATE NOT NULL,
  payment_date DATE NOT NULL,
  amount_per_share DECIMAL(12,4) NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'BRL',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Simulations
CREATE TABLE simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  period_months INTEGER NOT NULL,
  scenario VARCHAR(20) CHECK (scenario IN ('conservative', 'moderate', 'aggressive')),
  initial_projection DECIMAL(15,2) NOT NULL,
  monthly_projection DECIMAL(15,2) NOT NULL,
  monthly_breakdown JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) CHECK (alert_type IN ('dividend_drop', 'volatility_increase', 'price_target', 'portfolio_deviation')),
  asset_symbol VARCHAR(20),
  threshold_value DECIMAL(12,2),
  is_active BOOLEAN DEFAULT true,
  triggered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_portfolio_assets_portfolio_id ON portfolio_assets(portfolio_id);
CREATE INDEX idx_portfolio_assets_asset_id ON portfolio_assets(asset_id);
CREATE INDEX idx_dividend_history_asset_id ON dividend_history(asset_id);
CREATE INDEX idx_dividend_history_ex_date ON dividend_history(ex_date);
CREATE INDEX idx_simulations_portfolio_id ON simulations(portfolio_id);
CREATE INDEX idx_alerts_user_id ON alerts(user_id);
CREATE INDEX idx_alerts_asset_symbol ON alerts(asset_symbol);

-- Row Level Security (RLS) policies
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own portfolios" ON portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolios" ON portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolios" ON portfolios
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolios" ON portfolios
  FOR DELETE USING (auth.uid() = user_id);

-- Grant permissions
GRANT SELECT ON portfolios TO anon;
GRANT ALL PRIVILEGES ON portfolios TO authenticated;
GRANT SELECT ON assets TO anon;
GRANT SELECT ON dividend_history TO anon;
GRANT ALL PRIVILEGES ON simulations TO authenticated;
GRANT ALL PRIVILEGES ON alerts TO authenticated;

-- Sample data insertion
INSERT INTO assets (symbol, name, type, market, currency, current_price, dividend_yield, sector) VALUES
('VALE3', 'Vale S.A.', 'stock', 'BR', 'BRL', 65.20, 8.5, 'Mineração'),
('ITUB4', 'Itaú Unibanco', 'stock', 'BR', 'BRL', 28.15, 7.2, 'Bancos'),
('MXRF11', 'Maxi Renda FII', 'fii', 'BR', 'BRL', 9.85, 9.1, 'Títulos e Valores'),
('IVVB11', 'iShares S&P 500', 'etf', 'BR', 'BRL', 245.30, 1.8, 'ETF Internacional'),
('VYM', 'Vanguard High Dividend Yield', 'etf', 'US', 'USD', 105.20, 2.9, 'ETF Dividendos'),
('O', 'Realty Income Corp', 'reit', 'US', 'USD', 62.15, 5.4, 'REIT'),
('AAPL', 'Apple Inc', 'stock', 'US', 'USD', 185.90, 0.5, 'Tecnologia');
