namespace BankSymulatorApi.Models
{
    public class Withdraw
    {
        public int WithdrawId { get; set; }
        public string AccountNumber { get; set; }
        public float Amount { get; set;}
        public float BalanceAfterOperation { get; set; }
        public DateTime WithdrawTime { get; set; }
    }
}
