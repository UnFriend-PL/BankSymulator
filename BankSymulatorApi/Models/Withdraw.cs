using System.ComponentModel.DataAnnotations;

namespace BankSymulatorApi.Models
{
    public class Withdraw
    {
        [Key]
        public string WithdrawId { get; set; }
        public string AccountNumber { get; set; }
        public float Amount { get; set;}
        public float BalanceAfterOperation { get; set; }
        public DateTime WithdrawTime { get; set; }
    }
}
