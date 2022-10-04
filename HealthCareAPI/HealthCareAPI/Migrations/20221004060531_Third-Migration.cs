using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthCareAPI.Migrations
{
    public partial class ThirdMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Mfg",
                table: "Products",
                newName: "mfg");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "Products",
                newName: "qty");

            migrationBuilder.RenameColumn(
                name: "ProductName",
                table: "Products",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Products",
                newName: "exp");

            migrationBuilder.RenameColumn(
                name: "ExpiryDate",
                table: "Products",
                newName: "chemical");

            migrationBuilder.RenameColumn(
                name: "Chemicals",
                table: "Products",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Products",
                newName: "medicineId");

            migrationBuilder.RenameColumn(
                name: "IconClass",
                table: "Categories",
                newName: "UrlName");

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Categories");

            migrationBuilder.RenameColumn(
                name: "mfg",
                table: "Products",
                newName: "Mfg");

            migrationBuilder.RenameColumn(
                name: "qty",
                table: "Products",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Products",
                newName: "ProductName");

            migrationBuilder.RenameColumn(
                name: "exp",
                table: "Products",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "chemical",
                table: "Products",
                newName: "ExpiryDate");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Products",
                newName: "Chemicals");

            migrationBuilder.RenameColumn(
                name: "medicineId",
                table: "Products",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "UrlName",
                table: "Categories",
                newName: "IconClass");
        }
    }
}
