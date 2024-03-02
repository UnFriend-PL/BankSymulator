namespace BankSymulatorApi.Models.DTO
{
    public class DepositDto
    {
        public string AccountNumber { get; set; }
        public float Amount { get; set; }
        public ContributorDto Contributor { get; set; }
    }
}