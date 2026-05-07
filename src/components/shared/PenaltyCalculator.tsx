import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export const PenaltyCalculator = () => {
  const [baseAmount, setBaseAmount] = useState<string>('');
  const [daysDelayed, setDaysDelayed] = useState<string>('');
  const [result, setResult] = useState<{
    penalty: number;
    total: number;
    rate: number;
  } | null>(null);

  const calculatePenalty = () => {
    const amount = parseFloat(baseAmount);
    const days = parseInt(daysDelayed);

    if (isNaN(amount) || isNaN(days) || amount <= 0 || days <= 0) {
      setResult(null);
      return;
    }

    let dailyRate = 0;
    if (amount <= 100000) {
      dailyRate = 0.77;
    } else if (amount <= 2500000) {
      dailyRate = 0.50;
    } else {
      dailyRate = 0.13;
    }

    const penalty = (amount * dailyRate * days) / 100;
    const total = amount + penalty;

    setResult({
      penalty: Math.round(penalty * 100) / 100,
      total: Math.round(total * 100) / 100,
      rate: dailyRate,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card className="p-6 bg-secondary/20 border-accent/20 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-accent" />
        <h4 className="text-lg font-semibold text-foreground">Penalty Calculator</h4>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="baseAmount" className="block text-sm font-medium mb-2 text-foreground">
            Base Payment Amount (₹)
          </label>
          <Input
            id="baseAmount"
            type="number"
            placeholder="Enter base amount"
            value={baseAmount}
            onChange={(e) => {
              setBaseAmount(e.target.value);
              setResult(null);
            }}
            className="bg-background/50 border-border/50"
          />
        </div>

        <div>
          <label htmlFor="daysDelayed" className="block text-sm font-medium mb-2 text-foreground">
            Days Delayed (after relaxation period)
          </label>
          <Input
            id="daysDelayed"
            type="number"
            placeholder="Enter days delayed"
            value={daysDelayed}
            onChange={(e) => {
              setDaysDelayed(e.target.value);
              setResult(null);
            }}
            className="bg-background/50 border-border/50"
          />
        </div>

        <button
          onClick={calculatePenalty}
          className="w-full px-4 py-2 bg-accent text-background font-medium rounded-md hover:bg-accent/90 transition-colors"
        >
          Calculate Penalty
        </button>

        {result && (
          <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border/50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Applicable Rate:</span>
              <span className="text-sm font-semibold text-foreground">{result.rate}% per day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Base Amount:</span>
              <span className="text-sm font-semibold text-foreground">{formatCurrency(parseFloat(baseAmount))}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Penalty Amount:</span>
              <span className="text-sm font-semibold text-destructive">{formatCurrency(result.penalty)}</span>
            </div>
            <div className="pt-3 border-t border-border/50">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-foreground">Total Amount Due:</span>
                <span className="text-lg font-bold text-accent">{formatCurrency(result.total)}</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          Note: This calculator is for estimation purposes only. Actual penalties will be calculated based on the terms in your service agreement. If no specific agreement was made regarding penalty rates, the amount calculated above shall be considered as the final applicable penalty.
        </p>
      </div>
    </Card>
  );
};
