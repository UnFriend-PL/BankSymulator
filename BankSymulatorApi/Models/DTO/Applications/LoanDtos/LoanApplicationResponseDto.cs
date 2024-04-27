using BankSymulatorApi.Models.Loans;

namespace BankSymulatorApi.Models.DTO.Applications.LoanDtos
{
    public class LoanApplicationResponseDto : Application
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public LoanType LoanType { get; set; }
        public float TotalAmountOfLoan { get; set; }
        public DateTime LoanEndDate { get; set; }
        public DateTime LoanStartDate { get; set; } = DateTime.Now;
        public float InterestRate { get; set; }
        public float MonthlyInstallment { get; set; }
        public string AccountNumberToTransfer { get; set; }
        public string AccountNumberToRepayment { get; set; }
        public string Currency { get; set; }

        public LoanApplicationResponseDto()
        {
        }
        public LoanApplicationResponseDto(LoanApplication loanApplication)
        {
            Name = loanApplication.Name;
            LoanType = loanApplication.LoanType;
            TotalAmountOfLoan = loanApplication.TotalAmountOfLoan;
            LoanEndDate = loanApplication.LoanEndDate;
            LoanStartDate = loanApplication.LoanStartDate;
            InterestRate = loanApplication.InterestRate;
            MonthlyInstallment = loanApplication.MonthlyInstallment;
            AccountNumberToTransfer = loanApplication.AccountNumberToTransfer;
            AccountNumberToRepayment = loanApplication.AccountNumberToRepayment;
            Currency = loanApplication.Currency;
        }   
    }
}
