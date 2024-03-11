using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public string Pesel { get; set; }
        public ICollection<Account> Accounts { get; set; } = new List<Account>();
        public ICollection<Account> JointOwnedAccounts { get; set; } = new List<Account>();
        [InverseProperty("Approver")]
        public ICollection<Application> ApproverApplications { get; set; } = new List<Application>();

        [InverseProperty("Inquirer")]
        public ICollection<Application> InquirerApplications { get; set; } = new List<Application>();

        [InverseProperty("JointApprover")]
        public ICollection<JointAccountApplication> JointApproverApplications { get; set; } = new List<JointAccountApplication>();

        [InverseProperty("JointInquirer")]
        public ICollection<JointAccountApplication> JointInquirerApplications { get; set; } = new List<JointAccountApplication>();
    }

}

