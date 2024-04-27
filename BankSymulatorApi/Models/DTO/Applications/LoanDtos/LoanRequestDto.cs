using BankSymulatorApi.Models.Loans;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models.DTO.Applications.LoanDtos
{
    public class LoanRequestDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public LoanType LoanType { get; set; }
        public float TotalAmountOfLoan { get; set; }
        public DateTime LoanEndDate { get; set; }
        public DateTime LoanStartDate { get; set; } = DateTime.Now;
        public string AccountNumberToTransfer { get; set; }
        public string AccountNumberToRepayment { get; set; }
        public string Currency { get; set; }
    }
}
