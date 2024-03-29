﻿using System.ComponentModel.DataAnnotations;

namespace BankSymulatorApi.Models.DTO
{
    public class AccountDto
    {
        public string AccountId { get; set; }
        public string OwnerId { get; set; }
        [Key]
        public string AccountNumber { get; set; }
        public string Name { get; set; }
        public float Balance { get; set; }
        public float BalanceInPln { get; set; }
        public bool IsActive { get; set; }
        public bool IsSaveAccount { get; set; } = false;
        public string currency { get; set; }
        public bool isJointAccount { get; set; } = false;
        public string OwnerName { get; set; }
        public string OwnerSurname { get; set; }
        public string JointOwnerName { get; set; }
        public string JointOwnerSurname { get; set; }
        public string JointOwnerId { get; set; }

    }
}
