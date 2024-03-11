using BankSymulatorApi.Models.DTO;
using BankSymulatorApi.Models;

namespace BankSymulatorApi.Services
{
    public interface IApplicationService
    {
        Task<ServiceResponse<bool>> CreateJointAccountApplicationAsync(User user, JointAccountApplicationDto model);
        Task<ServiceResponse<List<JointApplicationsDto>>> GetSentJointAccountApplicationsByUserIdAsync(string userId);
    }
}
