using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public class Transfer
    {
        [Key]
        public string TransferId { get; set; }
        public int TransferType { get; set; } = 0;
        public float TransferAmount { get; set; }
        public float TransferFee { get; set; } = 0.5f;
        public DateTime TransferTime { get; set; }
        [ForeignKey("AccountId")]
        public int FromAccountId { get; set; }
        [ForeignKey("AccountId")]
        public int ToAccountId { get; set; }
        public string Message { get; set; }
        public bool IsCompleted { get; set; }
    }
}
