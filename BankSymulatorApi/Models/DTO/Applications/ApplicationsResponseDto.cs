using BankSymulatorApi.Models.DTO.Applications.LoanDtos;

namespace BankSymulatorApi.Models.DTO.Applications
{
    public class ApplicationsResponseDto
    {
        public List<LoanApplicationResponseDto> LoansApplications { get; set; }
        public List<JointApplicationResponseDto> JointApplications { get; set; }
    }
}
