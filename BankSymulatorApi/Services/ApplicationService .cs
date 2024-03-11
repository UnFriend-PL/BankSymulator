using BankSymulatorApi.Database;

namespace BankSymulatorApi.Services
{
    public class ApplicationService : IMailService
    {
        private readonly BankDbContext _context;
        public ApplicationService(BankDbContext context)
        {
            _context = context;
        }


    }
}
