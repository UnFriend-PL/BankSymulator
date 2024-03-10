using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models.DTO
{
    public class TransactionDto
    {
        public string TransferId { get; set; }
        public string TransferType { get; set; }
        public float TransferAmount { get; set; }
        public float TransferFee { get; set; }
        public DateTime TransferTime { get; set; }
        public string FromAccountNumber { get; set; }
        public string ToAccountNumber { get; set; }
        public string Message { get; set; }
        public bool IsCompleted { get; set; }
        public float BalanceAfterOperation { get; set; }
        public float SourceCurrencyTransferAmount { get; set; }

    }
    public class TransactionsPageDto
    {
        public List<TransactionDto> Transactions { get; set; }
        public int TotalPages { get; set; }
    }
}
