using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BankSymulatorApi.Models.DTO
{
    public class AccountDto
    {
        public string AccountId { get; set; }
        public string OwnerId { get; set; }
        public string AccountNumber { get; set; }
        public string Name { get; set; }
        public float Balance { get; set; }
        public bool IsActive { get; set; }
        public bool IsSaveAccount { get; set; } = false;
        public string currency { get; set; }
    }
}
