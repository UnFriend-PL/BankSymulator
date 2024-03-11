using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BankSymulatorApi.Models.DTO
{
    public class JointApplicationsDto
    {
        public string ApplicationId { get; set; }
        public string Message { get; set; }
        public string Subject { get; set; }
        public string Status { get; set; }

        public DateTime SendTime { get; set; }

        public DateTime? ReceiveTime { get; set; }

        public bool IsRead { get; set; } = false;

        public bool IsAccepted { get; set; } = false;

        public bool IsRejected { get; set; } = false;

        public bool IsExpired { get; set; } = false;

        public bool NoExpirationDate { get; set; } = false;

        public DateTime? ExpireTime { get; set; }
        public string JointName { get; set; }
        public string JointSurname { get; set; }
        public string JointEmail { get; set; }
        public string JointPhoneNumber { get; set; }
        public string RequesterName { get; set; }
        public string RequesterSurname { get; set; }
        public string RequesterEmail { get; set; }
        public string RequesterPhoneNumber { get; set; }
        public string AccountNumber { get; set; }
    }
}
