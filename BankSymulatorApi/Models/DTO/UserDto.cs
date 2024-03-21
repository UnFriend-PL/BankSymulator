namespace BankSymulatorApi.Models.DTO
{
    public class UserDto
    {
        public string Id { get; set; } = "";
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public string Pesel { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Adress { get; set; }

        public UserDto(User user)
        {
            Id = user.Id;
            Name = user.Name;
            Surname = user.Surname;
            BirthDate = user.BirthDate;
            Address = user.Address;
            Pesel = user.Pesel;
            Email = user.Email;
            PhoneNumber = user.PhoneNumber;
        }
        public UserDto()
        {

        }
    }
}
