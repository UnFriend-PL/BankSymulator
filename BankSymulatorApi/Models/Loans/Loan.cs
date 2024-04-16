using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models.Loans
{
    public class Loan
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public LoanType LoanType { get; set; }
        public float TotalAmountOfLoan { get; set; }
        public DateTime LoanEndDate { get; set; }
        public DateTime LoanStartDate { get; set; } = DateTime.Now;
        public float InterestRate { get; set; }
        public float MonthlyInstallment { get; set; }
        public float RemainingAmount { get; set; }
        [ForeignKey("AccountToTransfer")]
        public string AccountNumberToTransfer { get; set; }
        public virtual Account AccountToTransfer { get; set; }
        [ForeignKey("AccountToRepayment")]
        public string AccountNumberToRepayment { get; set; }
        public virtual Account AccountToRepayment { get; set; } 
        public string Currency { get; set; }
        public List<Installment> Installments { get; set; }

        public virtual User User { get; set; }
        [ForeignKey("UserId")]
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
