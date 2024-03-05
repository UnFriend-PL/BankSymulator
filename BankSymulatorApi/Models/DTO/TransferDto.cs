namespace BankSymulatorApi.Models.DTO
{
    public class TransferDto
    {
        public string FromAccountNumber { get; set; }
        public string ToAccountNumber { get; set; }
        public float TransferAmount { get; set; }
        public string TransferType { get; set; }
        public string Message { get; set; }
    }
}
