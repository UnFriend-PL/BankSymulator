using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public class Deposit
    {
        [Key]
        public string DepositId { get; set; }
        public float Amount { get; set; }
        public DateTime DepositTime { get; set; }
        [ForeignKey("AccountNumber")]
        public string AccountNumber { get; set; }
    }
}
