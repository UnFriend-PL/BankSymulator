namespace BankSymulatorApi.Models.DTO
{
    public class EditUserDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public string Pesel { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
