using System.ComponentModel.DataAnnotations;

namespace BankSymulatorApi.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Phone { get; set; }
        public DateTime BirthDate { get; set; }

    }
}
