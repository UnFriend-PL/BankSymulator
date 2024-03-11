using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BankSymulatorApi.Models
{
    public class JointAccountApplication : Application
    {

        [ForeignKey(nameof(JointInquirer))]
        public string JointInquirerId { get; set; }

        [ForeignKey(nameof(JointApprover))]
        public string JointApproverId { get; set; }

        [InverseProperty(nameof(User.JointInquirerApplications))]
        public User JointInquirer { get; set; }

        [InverseProperty(nameof(User.JointApproverApplications))]
        public User JointApprover { get; set; }
        public string AccountNumber { get; set; }

        public JointAccountApplication()
        {

        }
    }
}
