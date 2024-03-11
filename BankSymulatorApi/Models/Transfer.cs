﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankSymulatorApi.Models
{
    public class Transfer
    {
        [Key]
        public string TransferId { get; set; }
        public string TransferType { get; set; } = "Standard";
        public float TransferAmount { get; set; }
        public float SourceCurrencyTransferAmount { get; set; }
        public float TransferFee { get; set; } = 0.5f;
        public DateTime TransferTime { get; set; }
        [ForeignKey("FromAccount")]
        public string FromAccountNumber { get; set; }
        public Account FromAccount { get; set; }
        [ForeignKey("ToAccount")]
        public string ToAccountNumber { get; set; }
        public Account ToAccount { get; set; }
        public string Message { get; set; }
        public bool IsCompleted { get; set; }
        public float BalanceAfterOperationFromAccount { get; set; }
        public float BalanceAfterOperationToAccount{ get; set; }

    }
}
