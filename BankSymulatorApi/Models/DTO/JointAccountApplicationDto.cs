namespace BankSymulatorApi.Models.DTO
{
    public class JointAccountApplicationDto
    {
        public NewAccountDto AccountDetail { get; set; }
        public string JointEmail { get; set;}
        public string JointName { get; set;}
        public string JointSurname { get; set; }
        public string JointPesel { get; set; }
        public string JointPhoneNumber { get; set; }
        public DateTime JointBirthDate { get; set; }
    }
}
