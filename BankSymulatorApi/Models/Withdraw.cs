using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public class Withdraw
    {
        [Key]
        public string WithdrawId { get; set; }
        [ForeignKey("WithdrawAccountNumber")]
        public string AccountNumber { get; set; }
        public Account Account { get; set; }
        public float Amount { get; set;}
        public float BalanceAfterOperation { get; set; }
        public DateTime WithdrawTime { get; set; }
    }
}
