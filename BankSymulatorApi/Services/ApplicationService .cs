using BankSymulatorApi.Database;
using BankSymulatorApi.Models;
using BankSymulatorApi.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace BankSymulatorApi.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly BankDbContext _context;
        public ApplicationService(BankDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse<bool>> CreateJointAccountApplicationAsync(User user, JointAccountApplicationDto model)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var jointUser = _context.Users.FirstOrDefault(u => u.Email == model.JointEmail);
                    if (jointUser == null)
                    {
                        return new ServiceResponse<bool>
                        {
                            Success = false,
                            Message = "Joint user not found.",
                            Errors = new[] { "Joint user not found." }
                        };
                    }

                    bool validName = jointUser.Name != model.JointName;
                    bool validSurname = jointUser.Surname != model.JointSurname;
                    bool validPesel = jointUser.Pesel != model.JointPesel;
                    bool validPhone = jointUser.PhoneNumber != model.jointPhoneNumber;

                    if (validName || validSurname || validPesel || validPhone)
                    {
                        return new ServiceResponse<bool>
                        {
                            Success = false,
                            Message = "Joint user data does not match.",
                            Errors = new[] { "Joint user data does not match." }
                        };
                    }

                    Account account = new Account
                    {
                        Name = model.AccountDetail.Name,
                        OwnerId = user.Id,
                        AccountNumber = Guid.NewGuid().ToString(),
                        Currency = model.AccountDetail.Currency,
                        Balance = 0,
                        JointOwnerId = jointUser.Id,
                        isJointAccount = true,
                        IsActive = false
                    };

                    _context.Accounts.Add(account);
                    await _context.SaveChangesAsync();

                    JointAccountApplication application = new JointAccountApplication
                    {
                        AccountNumber = account.AccountNumber,
                        InquirerId = user.Id,
                        JointInquirerId = jointUser.Id,
                        ApproverId = jointUser.Id,
                        JointApproverId = user.Id,
                        Status = "Pending",
                        Message = $"request for a joint account from {user.Name} {user.Surname}.\r\n Account name:{account.Name}\r\n Currency:{account.Currency}",
                        Subject = "Joint account application"
                    };

                    _context.JointAccountApplications.Add(application);
                    await _context.SaveChangesAsync();

                    transaction.Commit(); 

                    return new ServiceResponse<bool>
                    {
                        Data = true,
                        Message = "Joint account application created successfully!"
                    };
                }
                catch (Exception ex)
                {
                    transaction.Rollback(); // Rollback the transaction in case of an exception
                    return new ServiceResponse<bool>
                    {
                        Success = false,
                        Errors = new [] { ex.Message },
                        Message = $"Error with requesting for a joint account."
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<JointApplicationsDto>>> GetSentJointAccountApplicationsByUserIdAsync(string userId)
        {
            var serviceResponse = new ServiceResponse<List<JointApplicationsDto>>();
            var applications = await _context.JointAccountApplications.Where(a => a.InquirerId == userId).ToListAsync();
            if(applications.Count == 0)
            {
                serviceResponse.Success = true;
                serviceResponse.Data = new List<JointApplicationsDto>();
                serviceResponse.Message = "No sent joint account applications found.";
                return serviceResponse;
            }
            List<JointApplicationsDto> jointApplications = new List<JointApplicationsDto>();

            foreach(var application in applications)
            {
                var JointUser = _context.Users.FirstOrDefault(u => u.Id == application.JointApproverId);
                var user = _context.Users.FirstOrDefault(u => u.Id == application.JointInquirerId);
                if(JointUser == null || user == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Error with getting joint account applications.";
                    serviceResponse.Errors = new[] { "One of the joints account not found." };
                    return serviceResponse;
                }
                JointApplicationsDto jointApplication = new JointApplicationsDto
                {
                    ApplicationId = application.ApplicationId,
                    AccountNumber = application.AccountNumber,
                    Status = application.Status,
                    Message = application.Message,
                    Subject = application.Subject,
                    SendTime = application.SendTime,
                    ReceiveTime = application.ReceiveTime,
                    IsRead = application.IsRead,
                    IsAccepted = application.IsAccepted,
                    IsRejected = application.IsRejected,
                    IsExpired = application.IsExpired,
                    NoExpirationDate = application.NoExpirationDate,
                    ExpireTime = application.ExpireTime,
                    JointName = JointUser.Name,
                    JointSurname = JointUser.Surname,
                    JointEmail = JointUser.Email,
                    JointPhoneNumber = JointUser.PhoneNumber,
                    RequesterName = user.Name,
                    RequesterSurname = user.Surname,
                    RequesterEmail = user.Email,
                    RequesterPhoneNumber = user.PhoneNumber
                };
                jointApplications.Add(jointApplication);
            }

            jointApplications = applications.Select(a => new JointApplicationsDto
            {
                ApplicationId = a.ApplicationId,
                AccountNumber = a.AccountNumber,
                Status = a.Status,
                Message = a.Message,
                Subject = a.Subject,
                SendTime = a.SendTime,
                ReceiveTime = a.ReceiveTime,
                IsRead = a.IsRead,
                IsAccepted = a.IsAccepted,
                IsRejected = a.IsRejected,
                IsExpired = a.IsExpired,
                NoExpirationDate = a.NoExpirationDate,
                ExpireTime = a.ExpireTime,
                JointName = a.JointInquirer.Name,
                JointSurname = a.JointInquirer.Surname,
                JointEmail = a.JointInquirer.Email,
                JointPhoneNumber = a.JointInquirer.PhoneNumber,
                RequesterName = a.Inquirer.Name,
                RequesterSurname = a.Inquirer.Surname,
                RequesterEmail = a.Inquirer.Email,
                RequesterPhoneNumber = a.Inquirer.PhoneNumber
            }).ToList();
            serviceResponse.Data = jointApplications;
            return serviceResponse;

        }
    }
}
