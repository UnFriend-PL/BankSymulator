using Microsoft.EntityFrameworkCore;
using BankSymulatorApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using BankSymulatorApi.Models.Loans;

namespace BankSymulatorApi.Database
{
    public class BankDbContext : IdentityDbContext<User>
    {
        public BankDbContext(DbContextOptions<BankDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
             .HasIndex(u => u.Email)
             .IsUnique();
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);
            modelBuilder.Entity<Account>().Property(a => a.AccountId).ValueGeneratedOnAdd().IsRequired();
            modelBuilder.Entity<Account>().HasAlternateKey(a => a.AccountId);

            modelBuilder.Entity<Application>()
                .Property(a => a.ApplicationId)
                .ValueGeneratedOnAdd()
                .IsRequired();

            modelBuilder.Entity<JointAccountApplication>()
                .Property(j => j.ApplicationId)
                .ValueGeneratedOnAdd()
                .IsRequired();
            
            modelBuilder.Entity<Deposit>()
                .Property(d => d.DepositId)
                .ValueGeneratedOnAdd()
                .IsRequired();
            
            modelBuilder.Entity<Contributor>()
                .Property(c => c.ContributorId)
                .ValueGeneratedOnAdd()
                .IsRequired();
            
            modelBuilder.Entity<Withdraw>()
                .Property(w => w.WithdrawId)
                .ValueGeneratedOnAdd()
                .IsRequired();

            modelBuilder.Entity<Transfer>()
            .Property(t => t.TransferId)
            .ValueGeneratedOnAdd()
            .IsRequired();

            modelBuilder.Entity<Loan>()
            .HasKey(l => l.Id);
            modelBuilder.Entity<Loan>()
                .Property(l => l.Id)
                .ValueGeneratedOnAdd()
                .IsRequired();

            modelBuilder.Entity<Installment>()
            .HasKey(i => i.Id);
            modelBuilder.Entity<Installment>()
                .Property(i => i.Id)
                .ValueGeneratedOnAdd()
                .IsRequired();

            // --------- relationships ------------
            modelBuilder.Entity<Account>()
                .HasOne(a => a.Owner)
                .WithMany(u => u.Accounts)
                .HasForeignKey(a => a.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Account>()
                .HasOne(a => a.JointOwner)
                .WithMany(u => u.JointOwnedAccounts)
                .HasForeignKey(a => a.JointOwnerId);

            modelBuilder.Entity<Transfer>()
                .HasOne(t => t.FromAccount)
                .WithMany(a => a.FromTransfers)
                .HasForeignKey(t => t.FromAccountNumber)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Transfer>()
                .HasOne(t => t.ToAccount)
                .WithMany(a => a.ToTransfers)
                .HasForeignKey(t => t.ToAccountNumber)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Withdraw>()
                .HasOne(w => w.Account)
                .WithMany(a => a.Withdraws)
                .HasForeignKey(w => w.AccountNumber)
                .IsRequired();

            modelBuilder.Entity<Deposit>()
                .HasOne(d => d.Account)
                .WithMany(a => a.Deposits)
                .HasForeignKey(d => d.AccountNumber)
                .IsRequired();

            modelBuilder.Entity<Contributor>()
                .HasOne(c => c.Account)
                .WithMany(a => a.Contributors)
                .HasForeignKey(c => c.AccountNumber)
                .IsRequired();

            modelBuilder.Entity<User>()
                 .HasMany(u => u.Accounts)
                 .WithOne(a => a.Owner)
                 .HasForeignKey(a => a.OwnerId)
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.JointOwnedAccounts)
                .WithOne(a => a.JointOwner)
                .HasForeignKey(a => a.JointOwnerId)
                .OnDelete(DeleteBehavior.Restrict);

             modelBuilder.Entity<Application>()
                .HasOne(p => p.Inquirer)
                .WithMany(b => b.InquirerApplications)
                .HasForeignKey(t => t.InquirerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Application>()
                .HasOne(p => p.Inquirer)
                .WithMany(b => b.InquirerApplications)
                .HasForeignKey(t => t.InquirerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<JointAccountApplication>()
                .HasOne(p => p.JointApprover)
                .WithMany(b => b.JointApproverApplications)
                .HasForeignKey(t => t.JointApproverId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<JointAccountApplication>()
                .HasOne(p => p.JointInquirer)
                .WithMany(b => b.JointInquirerApplications)
                .HasForeignKey(t => t.JointInquirerId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<User>()
                .HasMany(u => u.Loans)
                .WithOne(l => l.User)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Loan>()
                .HasOne(l => l.User) // Relacja z użytkownikiem
                .WithMany(u => u.Loans) // Użytkownik może mieć wiele pożyczek
                .HasForeignKey(l => l.UserId);

            modelBuilder.Entity<Loan>()
            .HasOne(l => l.AccountToTransfer)
            .WithMany(a => a.LoansToTransfer)
            .HasForeignKey(l => l.AccountNumberToTransfer)
            .HasConstraintName("FK_Loan_AccountToTransfer")
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Loan>()
                .HasOne(l => l.AccountToRepayment)
                .WithMany(a => a.LoansToRepayment)
                .HasForeignKey(l => l.AccountNumberToRepayment)
                .HasConstraintName("FK_Loan_AccountToRepayment")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Installment>()
                .HasOne(i => i.Loan)
                .WithMany(l => l.Installments)
                .HasForeignKey(i => i.LoanId);

            modelBuilder.Entity<LoanApplication>()
                .HasOne(la => la.AccountToTransfer);
            modelBuilder.Entity<LoanApplication>()
                .HasOne(la => la.AccountToRepayment);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<IdentityRole> IdentityRoles => Set<IdentityRole>();
        public DbSet<Account> Accounts => Set<Account>();
        public DbSet<Transfer> Transfers => Set<Transfer>();
        public DbSet<Deposit> Deposits => Set<Deposit>();
        public DbSet<Contributor> Contributors => Set<Contributor>();
        public DbSet<Withdraw> Withdraws => Set<Withdraw>();
        public DbSet<JointAccountApplication> JointAccountApplications => Set<JointAccountApplication>();
        public DbSet<LoanApplication> loanApplications => Set<LoanApplication>();
        public DbSet<Loan> Loans => Set<Loan>();    
        public DbSet<Installment> Installments => Set<Installment>();   }

}
