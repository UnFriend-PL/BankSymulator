using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BankSymulatorApi.Models.DTO
{
    public class JointApplicationResponseDto
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
        public string InquirerName { get; set; }
        public string InquirerSurname { get; set; }
        public string InquirerEmail { get; set; }
        public string InquirerPhoneNumber { get; set; }
        public string AccountNumber { get; set; }

        public JointApplicationResponseDto()
        {

        }
        public JointApplicationResponseDto(JointAccountApplication jointAccountApplication)
        {
            ApplicationId = jointAccountApplication.ApplicationId;
            Message = jointAccountApplication.Message;
            Subject = jointAccountApplication.Subject;
            Status = jointAccountApplication.Status;
            SendTime = jointAccountApplication.SendTime;
            ReceiveTime = jointAccountApplication.ReceiveTime;
            IsRead = jointAccountApplication.IsRead;
            IsAccepted = jointAccountApplication.IsAccepted;
            IsRejected = jointAccountApplication.IsRejected;
            IsExpired = jointAccountApplication.IsExpired;
            NoExpirationDate = jointAccountApplication.NoExpirationDate;
            ExpireTime = jointAccountApplication.ExpireTime;
            JointName = jointAccountApplication.JointInquirer.Name;
            JointSurname = jointAccountApplication.JointInquirer.Surname;
            JointEmail = jointAccountApplication.JointInquirer.Email;
            JointPhoneNumber = jointAccountApplication.JointInquirer.PhoneNumber;
            InquirerName = jointAccountApplication.Inquirer.Name;
            InquirerSurname = jointAccountApplication.Inquirer.Surname;
            InquirerEmail = jointAccountApplication.Inquirer.Email;
            InquirerPhoneNumber = jointAccountApplication.Inquirer.PhoneNumber;
            AccountNumber = jointAccountApplication.AccountNumber;
        }
    }
}
