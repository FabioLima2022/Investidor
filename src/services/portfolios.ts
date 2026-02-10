import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export type PortfolioRecord = {
  id: string
  user_id: string
  name: string
  description: string | null
  initial_amount: number
  monthly_contribution: number
  risk_profile: 'conservative' | 'moderate' | 'aggressive'
  reinvest_dividends: boolean
  is_active: boolean
  created_at: string
  updated_at?: string
}

export async function listPortfolios(user: User) {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as PortfolioRecord[]
}

export async function createPortfolio(
  user: User,
  payload: {
    name: string
    description?: string
    initial_amount: number
    monthly_contribution: number
    risk_profile: 'conservative' | 'moderate' | 'aggressive'
    reinvest_dividends?: boolean
  }
) {
  const { data, error } = await supabase
    .from('portfolios')
    .insert({
      user_id: user.id,
      name: payload.name,
      description: payload.description ?? null,
      initial_amount: payload.initial_amount,
      monthly_contribution: payload.monthly_contribution,
      risk_profile: payload.risk_profile,
      reinvest_dividends: payload.reinvest_dividends ?? true,
      is_active: true,
    })
    .select('*')
    .single()
  if (error) throw error
  return data as PortfolioRecord
}
