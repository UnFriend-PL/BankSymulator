namespace BankSymulatorApi.Models.Loans
{
    public class LoanApplication : Application
    {
        public float TotalAmountOfLoan { get; set; }
        public virtual Account AccountToTransfer { get; set; }
        public string AccountNumberToTransfer { get; set; }
        public virtual Account AccountToRepayment { get; set; }
        public string AccountNumberToRepayment { get; set; }
        public LoanType LoanType { get; set; }
        public DateTime LoanStartDate { get; set; }
        public DateTime LoanEndDate { get; set; }
        public float InterestRate { get; set; }
        public float MonthlyInstallment { get; set; }
        public string Name { get; set; }
        public string Currency { get; set; }

    }
}
