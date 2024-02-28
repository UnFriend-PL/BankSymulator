using Microsoft.EntityFrameworkCore;
using BankSymulatorApi.Models;
using System.Security.Cryptography.Xml;

namespace BankSymulatorApi.Database
{
    public class BankDbContext : DbContext
    {
        public BankDbContext(DbContextOptions<BankDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<User>()
            // .HasIndex(u => u.Email)
            // .IsUnique();
            //modelBuilder.Entity<ContactSubCategory>().HasIndex(c => c.ContactSubCategoryId).IsUnique();
        }
        public DbSet<User> Users => Set<User>();
        public DbSet<Account> Accounts => Set<Account>();
        public DbSet<Transfer> Transfers => Set<Transfer>();
    }
}
