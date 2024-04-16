using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models.Loans
{
    public class Installment
    {
        public string Id { get; set; }
        public virtual Loan Loan { get; set; }
        [ForeignKey("LoanId")]
        public string LoanId { get; set; }
        public float InstallmentAmount { get; set; }
        public DateTime InstallmentDate { get; set; }
        public bool IsPaid { get; set; }
    
    }
}
