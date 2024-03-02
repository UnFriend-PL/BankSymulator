using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankSymulatorApi.Migrations
{
    /// <inheritdoc />
    public partial class updatedWithdrawsForTimeWithdraw : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "WithdrawTime",
                table: "Withdraws",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WithdrawTime",
                table: "Withdraws");
        }
    }
}
