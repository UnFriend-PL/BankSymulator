using Microsoft.EntityFrameworkCore;
using BankSymulatorApi.Models;
using System.Security.Cryptography.Xml;
using Microsoft.AspNetCore.Identity;

namespace BankSymulatorApi.Database
{
    public class BankDbContext : DbContext
    {
        public BankDbContext(DbContextOptions<BankDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
             .HasIndex(u => u.Email)
             .IsUnique();
            modelBuilder.Entity<Account>()
               .Property(a => a.AccountId)
               .ValueGeneratedOnAdd()
               .IsRequired();

            modelBuilder.Entity<Transfer>()
            .Property(t => t.TransferId)
            .ValueGeneratedOnAdd()
            .IsRequired();

            modelBuilder.Entity<Deposit>().Property(d => d.DepositId).ValueGeneratedOnAdd().IsRequired();

            modelBuilder.Entity<Contributor>().Property(c => c.ContributorId).ValueGeneratedOnAdd().IsRequired();
            modelBuilder.Entity<Withdraw>().Property(w => w.WithdrawId).ValueGeneratedOnAdd().IsRequired();
        }
        public DbSet<User> Users { get; set; }
        public DbSet<IdentityRole> Roles { get; set; }
        public DbSet<Account> Accounts => Set<Account>();
        public DbSet<Transfer> Transfers => Set<Transfer>();
        public DbSet<Deposit> Deposits => Set<Deposit>();
        public DbSet<Contributor> Contributors => Set<Contributor>();
        public DbSet<Withdraw> Withdraws => Set<Withdraw>();
    }

}
