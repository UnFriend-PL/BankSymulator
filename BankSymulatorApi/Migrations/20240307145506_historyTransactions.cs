using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankSymulatorApi.Migrations
{
    /// <inheritdoc />
    public partial class historyTransactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BalanceAfterOperation",
                table: "Transfers",
                newName: "BalanceAfterOperationToAccount");

            migrationBuilder.AddColumn<float>(
                name: "BalanceAfterOperationFromAccount",
                table: "Transfers",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BalanceAfterOperationFromAccount",
                table: "Transfers");

            migrationBuilder.RenameColumn(
                name: "BalanceAfterOperationToAccount",
                table: "Transfers",
                newName: "BalanceAfterOperation");
        }
    }
}
