using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public class Account
    {
        [Key]
        public string AccountId { get; set; }

        [ForeignKey("UserId")]
        public string OwnerId { get; set; }
        public string AccountNumber { get; set; }
        public string Name { get; set; }
        public float Balance { get; set; } = 0f;
        public bool IsActive { get; set; } = true;
        public bool IsSaveAccount { get; set; } = false;
        public string Currency { get; set; } = "PLN";
        public Account() { }
        public Account(string accountId, string ownerId, string accountNumber, string name, float balance, bool isActive, bool isSaveAccount, string currency)
        {
            AccountId = accountId;
            OwnerId = ownerId;
            AccountNumber = accountNumber;
            Name = name;
            Balance = balance;
            IsActive = isActive;
            IsSaveAccount = isSaveAccount;
            Currency = currency;
        }
       
    }
}
