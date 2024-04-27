using BankSymulatorApi.Models.DTO;
using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO.Applications;

namespace BankSymulatorApi.Services
{
    public interface IApplicationService
    {
        Task<ServiceResponse<bool>> CreateJointAccountApplicationAsync(User user, JointAccountApplicationRquestDto model);
        Task<ServiceResponse<ApplicationsResponseDto>> GetApplicationsByUserIdAsync(string userId, string status);
        Task<ServiceResponse<List<JointApplicationResponseDto>>> GetJointAccountApplicationsByUserIdAsync(string userId, string status);
        Task<ServiceResponse<bool>> AcceptApplicationAsync(string applicationId, string userId, bool isAccepted);
    }
}
