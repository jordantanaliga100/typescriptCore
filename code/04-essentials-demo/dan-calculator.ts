//data:
// initial amount
// annual contri
// expected return
// duration

type InvestmentDataType = {
  initialAmount: number;
  annualContribution: number;
  duration: number;
  expectedReturn: number;
};

type InvestmentResultType = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
};

function calculateInvestments(
  data: InvestmentData
): InvestmentResult[] | string {
  // function logic here
  const { annualContribution, initialAmount, expectedReturn, duration } = data;

  if (initialAmount < 0) {
    return `Initial investment amount must ne be at least zero`;
  }
  if (duration <= 0) {
    return `No valid amount of years provided`;
  }
  if (expectedReturn < 0) {
    return `Expected return must be at least zero`;
  }

  let total = initialAmount;
  let totalContributions = 0;
  let totalInterestEarned = 0;

  const annualResults: InvestmentResultType[] = [];
  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn);
    totalInterestEarned = total - totalContributions - initialAmount;
    totalContributions = totalContributions + annualContribution;
    total = total + annualContribution;

    annualResults.push({
      year: `Year ${i + 1}`,
      totalAmount: total,
      totalInterestEarned,
      totalContributions,
    });
  }
  return annualResults;
}

function printResults(results: InvestmentResult[] | []) {
  if (typeof results === "string") {
    console.log(results);
    return;
  }
  for (const yearEndResults of results) {
    console.log(yearEndResults.year);
    console.log(`Total: ${yearEndResults.totalAmount.toFixed(0)}`);
    console.log(
      `Total Contributions: ${yearEndResults.totalContributions.toFixed(0)}`
    );
    console.log(
      `Total Interest Earned: ${yearEndResults.totalInterestEarned.toFixed(0)}`
    );
  }
}
const investmentDataArgs: InvestmentDataType = {
  initialAmount: 5000,
  annualContribution: 500,
  expectedReturn: 0.08,
  duration: 10,
};
const res = calculateInvestments(investmentDataArgs);
printResults(res);
