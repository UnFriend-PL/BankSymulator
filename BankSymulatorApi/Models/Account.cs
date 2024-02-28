using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public class Account
    {
        [Key]
        public string AccountId { get; set; }

        [ForeignKey("UserId")]
        public int OwnerId { get; set; }
        public int AccountNumber { get; set; }
        public string Name { get; set; }
        public float Balance { get; set; }
        public bool IsActive { get; set; }
        public bool IsSaveAccount { get; set; } = false;
        public Account() { }
       
    }
}
