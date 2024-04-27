using BankSymulatorApi.Database;
using BankSymulatorApi.Models.DTO.Applications.LoanDtos;
using BankSymulatorApi.Models.Loans;

namespace BankSymulatorApi.Services.LoanService
{
    public class LoanService : ILoanService
    {
        private readonly BankDbContext _context;
        public LoanService(BankDbContext context) {
            _context = context;
        }

        public async Task<ServiceResponse<string>> ApplyForLoan(LoanRequestDto loanRequest, string userId)
        {
            var serviceResponse = new ServiceResponse<string>();

            var loanApplication = new LoanApplication()
            {
                LoanType = loanRequest.LoanType,
                TotalAmountOfLoan = loanRequest.TotalAmountOfLoan,
                LoanEndDate = loanRequest.LoanEndDate,
                LoanStartDate = loanRequest.LoanStartDate,
                AccountNumberToTransfer = loanRequest.AccountNumberToTransfer,
                AccountNumberToRepayment = loanRequest.AccountNumberToRepayment,
                ApproverId = userId,
                InquirerId = userId,
                Currency = loanRequest.Currency,
                Name = loanRequest.Name,
                Status = "Pending",
                Subject = "Loan application",
                Message = $"Loan application for {loanRequest.TotalAmountOfLoan} {loanRequest.Currency} has been submitted. Accept to sign an contract.",
            };
            await _context.loanApplications.AddAsync(loanApplication);
            await _context.SaveChangesAsync();
            serviceResponse.Data = "Loan applied successfully.";
            serviceResponse.Success = true;

            return serviceResponse;
        }
    }
}
