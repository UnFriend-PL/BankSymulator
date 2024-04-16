using BankSymulatorApi.Models.Loans;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public class Account
    {
        public string AccountId { get; set; }
        [Key]
        public string AccountNumber { get; set; }
        [ForeignKey("OwnerId")]
        public string OwnerId { get; set; }
        public User Owner { get; set; }
        [ForeignKey("JointOwnerId")]
        public string? JointOwnerId { get; set; }
        public User? JointOwner { get; set; }
        public string Name { get; set; }
        public float Balance { get; set; } = 0f;
        public bool IsActive { get; set; } = true;
        public bool IsSaveAccount { get; set; } = false;
        public bool isClosed { get; set; } = false;
        public bool isArchived { get; set; } = false;
        public string Currency { get; set; } = "PLN";
        public bool isJointAccount { get; set; } = false;
        public List<Loan> LoansToTransfer { get; set; }
        public List<Loan> LoansToRepayment { get; set; }
        public List<Deposit> Deposits { get; set; }
        public List<Withdraw> Withdraws { get; set; }
        public List<Transfer> FromTransfers { get; set; }
        public List<Transfer> ToTransfers { get; set; }
        public List<Contributor> Contributors { get; set; }
        public Account() { }
        public Account(string ownerId, string accountNumber, string name, float balance, bool isActive, bool isSaveAccount, string currency)
        {
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
