namespace BankSymulatorApi.Models.Loans
{
    public class Loan
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public float TotalAmountOfLoan { get; set; }
        public DateTime LoanEndDate { get; set; }
        public DateTime LoanStartDate { get; set; } = DateTime.Now;
        public float InterestRate { get; set; }
        public float MonthlyInstallment { get; set; }
        public float RemainingAmount { get; set; }
        public string AccountToTransfer { get; set; }
        public string AccountToRepayment { get; set; }
        public string Currency { get; set; }
        public virtual User User { get; set; }
        public string UserId { get; set; }
    }

    public enum LoanType
    {
        Mortgage,
        Consumer,
        Cash,
        Car,
        Student
    }

}
