using BankSymulatorApi.Models.DTO;
using BankSymulatorApi.Models;

namespace BankSymulatorApi.Services
{
    public interface IApplicationService
    {
        Task<ServiceResponse<bool>> CreateJointAccountApplicationAsync(User user, JointAccountApplicationDto model);
        Task<ServiceResponse<List<JointApplicationsDto>>> GetJointAccountApplicationsByUserIdAsync(string userId, string status);
        Task<ServiceResponse<bool>> AcceptApplicationAsync(string applicationId, string userId, bool isAccepted);
    }
}
