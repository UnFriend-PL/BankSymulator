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
                    bool validPhone = jointUser.PhoneNumber != model.JointPhoneNumber;
                    bool validBirthDate = jointUser.BirthDate != model.JointBirthDate;

                    if (validName || validSurname || validPesel || validPhone || validBirthDate)
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
                        JointInquirerId = user.Id,
                        ApproverId = jointUser.Id,
                        JointApproverId = jointUser.Id,
                        SendTime = DateTime.Now,
                        Status = "Pending",
                        Message = $"request for a joint account in {account.Currency} from {user.Name} {user.Surname}",
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
                        Errors = new[] { ex.Message },
                        Message = $"Error with requesting for a joint account."
                    };
                }
            }
        }
        private async Task<User> GetUserAsync(string id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }
        private async Task<List<JointApplicationsDto>> FormatJointApplicationResponseList(List<JointAccountApplication> jointApplications)
        {
            List<JointApplicationsDto> result = new List<JointApplicationsDto>();
            foreach (var application in jointApplications)
            {
                var approver = await GetUserAsync(application.JointApproverId);
                var inquirer = await GetUserAsync(application.JointInquirerId);
                var jointApplication = new JointApplicationsDto
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
                    JointName = approver.Name,
                    JointSurname = approver.Surname,
                    JointEmail = approver.Email,
                    JointPhoneNumber = approver.PhoneNumber,
                    InquirerEmail = inquirer.Email,
                    InquirerName = inquirer.Name,
                    InquirerSurname = inquirer.Surname,
                    InquirerPhoneNumber = inquirer.PhoneNumber
                };
                result.Add(jointApplication);
            }
            return result;
            }

        private async Task<List<JointApplicationsDto>> GetSentApplicationsAsync(string userId)
        {
            var sentApplications = await _context.JointAccountApplications.Where(a => a.JointInquirerId == userId && a.Status == "Pending").ToListAsync();
            var result = await FormatJointApplicationResponseList(sentApplications);
            return result;
        }

        private async Task<List<JointApplicationsDto>> GetPendingApplicationsAsync(string userId)
        {
            var pendingApplications = await _context.JointAccountApplications.Where(a => a.JointApproverId == userId && a.Status == "Pending").ToListAsync();
            var result = await FormatJointApplicationResponseList(pendingApplications);
            return result;
        }

        private async Task<List<JointApplicationsDto>> GetArchiveApplicationsAsync(string userId)
        {
            var archiveApplications = await _context.JointAccountApplications.Where(a => a.Status == "Archived" && ( a.JointInquirerId == userId || a.JointApproverId == userId)).ToListAsync();
            var result = await FormatJointApplicationResponseList(archiveApplications);
            return result;
        }

        public async Task<ServiceResponse<List<JointApplicationsDto>>> GetJointAccountApplicationsByUserIdAsync(string userId, string status)
        {
            var serviceResponse = new ServiceResponse<List<JointApplicationsDto>>();
            List<JointApplicationsDto> jointApplications = new List<JointApplicationsDto>();
            List<JointAccountApplication> applicationList = null;
            switch (status)
            {
                case "Sent":
                    jointApplications = await GetSentApplicationsAsync(userId);

                    break;
                case "Pending":
                    jointApplications = await GetPendingApplicationsAsync(userId);
                    break;
                case "Archived":
                    jointApplications = await GetArchiveApplicationsAsync(userId);
                    break;
            }
            if (jointApplications.Count == 0)
            {
                serviceResponse.Success = true;
                serviceResponse.Data = new List<JointApplicationsDto>();
                serviceResponse.Message = "Joint applications not founded.";
                return serviceResponse;

            }
            serviceResponse.Data = jointApplications;
            return serviceResponse;

        }

        public async Task<ServiceResponse<bool>> AcceptApplicationAsync(string applicationId, string userId, bool isAccepted)
        {
            try
            {
                using (var transaction = _context.Database.BeginTransaction())
                {
                    var application = await _context.JointAccountApplications.FirstOrDefaultAsync(a => a.ApplicationId == applicationId);
                    if (application == null)
                    {
                        return new ServiceResponse<bool>
                        {
                            Success = false,
                            Message = "Application not found.",
                            Errors = new[] { "Application not found." }
                        };
                    }
                    if (application.JointApproverId != userId)
                    {
                        return new ServiceResponse<bool>
                        {
                            Success = false,
                            Message = "You are not the approver of this application.",
                            Errors = new[] { "You are not the approver of this application." }
                        };
                    }
                    application.Status = "Archived";
                    application.IsAccepted = isAccepted;
                    application.ReceiveTime = DateTime.Now;
                    var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == application.AccountNumber);
                    if (account == null)
                    {
                        return new ServiceResponse<bool>
                        {
                            Success = false,
                            Message = "Account not found.",
                            Errors = new[] { "Account not found." }
                        };
                    }
                    if (!isAccepted)
                    {
                        account.IsActive = false;
                        account.isArchived = true;
                    }
                    else
                    {
                        account.IsActive = true;
                    }
                    _context.Accounts.Update(account);

                    _context.JointAccountApplications.Update(application);
                    await _context.SaveChangesAsync();

                    transaction.Commit();

                    return new ServiceResponse<bool>
                    {
                        Data = true,
                        Message = "Joint account application accepted successfully!"
                    };
                }
            }
            catch (Exception ex)
            {
                return new ServiceResponse<bool>
                {
                    Success = false,
                    Errors = new[] { ex.Message },
                    Message = $"Error with accepting joint account application."
                };
            }

        }
    }
}
