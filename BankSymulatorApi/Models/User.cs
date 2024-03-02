using Microsoft.AspNetCore.Identity;

namespace BankSymulatorApi.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public string Pesel { get; set; }
}

}