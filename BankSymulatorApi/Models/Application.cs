using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public abstract class Application
    {
        [Key]
        public string ApplicationId { get; set; }

        [Required]
        [ForeignKey("Approver")]
        public string ApproverId { get; set; }
        public User Approver { get; set; }

        [ForeignKey("Inquirer")]
        public string InquirerId { get; set; }
        public User Inquirer { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Status { get; set; }

        public DateTime SendTime { get; set; }

        public DateTime? ReceiveTime { get; set; }

        public bool IsRead { get; set; } = false;

        public bool IsAccepted { get; set; } = false;

        public bool IsRejected { get; set; } = false;

        public bool IsExpired { get; set; } = false;

        public bool NoExpirationDate { get; set; } = false;

        public DateTime? ExpireTime { get; set; }

        public Application()
        {

        }
    }
}
