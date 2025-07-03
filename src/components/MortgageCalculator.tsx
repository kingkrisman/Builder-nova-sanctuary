import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, PiggyBank } from "lucide-react";

export function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(50000000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(18);
  const [loanTerm, setLoanTerm] = useState(20);
  const [showResults, setShowResults] = useState(false);

  const calculateMortgage = () => {
    const principal = propertyPrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    const downPaymentAmount = propertyPrice * (downPayment / 100);

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      downPaymentAmount,
      principal,
    };
  };

  const results = calculateMortgage();

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Mortgage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Price */}
        <div className="space-y-2">
          <Label htmlFor="property-price">Property Price</Label>
          <Input
            id="property-price"
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            placeholder="Enter property price"
          />
        </div>

        {/* Down Payment */}
        <div className="space-y-3">
          <Label>
            Down Payment: {downPayment}% (
            {formatCurrency((propertyPrice * downPayment) / 100)})
          </Label>
          <Slider
            value={[downPayment]}
            onValueChange={(value) => setDownPayment(value[0])}
            max={50}
            min={5}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <Label>Interest Rate: {interestRate}% per year</Label>
          <Slider
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
            max={30}
            min={5}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div className="space-y-3">
          <Label>Loan Term: {loanTerm} years</Label>
          <Slider
            value={[loanTerm]}
            onValueChange={(value) => setLoanTerm(value[0])}
            max={30}
            min={5}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 years</span>
            <span>30 years</span>
          </div>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={() => setShowResults(true)}
          className="w-full bg-primary text-black hover:bg-primary/90"
        >
          Calculate Monthly Payment
        </Button>

        {/* Results */}
        {showResults && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-4 w-4 text-primary mr-1" />
                <span className="text-sm font-medium">Monthly Payment</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(results.monthlyPayment)}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <PiggyBank className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm font-medium">Down Payment</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(results.downPaymentAmount)}
              </div>
            </div>

            <div className="md:col-span-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Loan Amount:</span>
                <span className="font-medium">
                  {formatCurrency(results.principal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest:</span>
                <span className="font-medium">
                  {formatCurrency(results.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Total Payment:</span>
                <span className="font-bold">
                  {formatCurrency(results.totalPayment)}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
