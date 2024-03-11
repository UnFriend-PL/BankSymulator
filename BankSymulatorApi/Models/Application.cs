using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public class Application
    {
        [Key]
        public string ApplicationId { get; set; }
        [Required]
        [ForeignKey("Id")]
        public string InquirerId { get; set; }
        [Required]
        [ForeignKey("Id")]
        public string RecrespondentId{ get; set; }
        [Required]
        public string Message { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public DateTime SendTime { get; set; }
        public DateTime ReceiveTime { get; set; }
        public bool IsRead { get; set; } = false;
        public bool isAccepted { get; set; } = false;
        public bool isRejected { get; set; } = false;
        public bool isExpired { get; set; } = false;
        public bool noExpirationDate { get; set; } = false;
        public string LinkedAccountNumber { get; set; }  
        public DateTime ExpireTime { get; set; }

        public Application()
        {

        }

    }
}
