using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankSymulatorApi.Migrations
{
    /// <inheritdoc />
    public partial class LoanApplicationModified : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccountNumberToRepayment",
                table: "Application",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AccountToRepaymentAccountNumber",
                table: "Application",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Application",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LoanType",
                table: "Application",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Application_AccountToRepaymentAccountNumber",
                table: "Application",
                column: "AccountToRepaymentAccountNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Application_Accounts_AccountToRepaymentAccountNumber",
                table: "Application",
                column: "AccountToRepaymentAccountNumber",
                principalTable: "Accounts",
                principalColumn: "AccountNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Application_Accounts_AccountToRepaymentAccountNumber",
                table: "Application");

            migrationBuilder.DropIndex(
                name: "IX_Application_AccountToRepaymentAccountNumber",
                table: "Application");

            migrationBuilder.DropColumn(
                name: "AccountNumberToRepayment",
                table: "Application");

            migrationBuilder.DropColumn(
                name: "AccountToRepaymentAccountNumber",
                table: "Application");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Application");

            migrationBuilder.DropColumn(
                name: "LoanType",
                table: "Application");
        }
    }
}
