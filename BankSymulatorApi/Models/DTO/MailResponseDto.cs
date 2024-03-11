using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BankSymulatorApi.Models.DTO
{
    public class MailDto
    {
        public string MailId { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public string Message { get; set; }
        public string Subject { get; set; }
        public DateTime SendTime { get; set; }
        public DateTime ReceiveTime { get; set; }
        public bool IsRead { get; set; } = false;
        public bool isAccepted { get; set; } = false;
        public bool isRejected { get; set; } = false;
        public bool isExpired { get; set; } = false;
        public bool noExpirationDate { get; set; } = false;
        public DateTime ExpireTime { get; set; }
    }
}
