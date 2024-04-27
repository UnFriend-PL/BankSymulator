using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankSymulatorApi.Migrations
{
    /// <inheritdoc />
    public partial class nameFieldInLoans : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Application",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Application");
        }
    }
}
