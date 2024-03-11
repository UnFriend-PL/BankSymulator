using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public class Contributor
    {
        [Key]
        public string ContributorId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Pesel { get; set; }
        [ForeignKey("AccountNumber")]
        public string AccountNumber { get; set; }
        public Account Account { get; set; }    

    }
}
