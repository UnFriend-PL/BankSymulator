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
        public int AccountNumber { get; set; }
        public string Name { get; set; }
        public float Balance { get; set; } = 0f;
        public bool IsActive { get; set; } = true;
        public bool IsSaveAccount { get; set; } = false;
        public Account() { }
        public Account(string accountId, string ownerId, int accountNumber, string name, float balance, bool isActive, bool isSaveAccount)
        {
            AccountId = accountId;
            OwnerId = ownerId;
            AccountNumber = accountNumber;
            Name = name;
            Balance = balance;
            IsActive = isActive;
            IsSaveAccount = isSaveAccount;
        }
       
    }
}
