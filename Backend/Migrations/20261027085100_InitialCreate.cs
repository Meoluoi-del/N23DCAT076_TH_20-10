using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    Fee = table.Column<decimal>(type: "TEXT", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Category", "CreatedAt", "Description", "Fee", "IsActive", "Title" },
                values: new object[,]
                {
                    { 1, "Chuyển tiền", new DateTime(2026, 10, 27, 8, 50, 56, 856, DateTimeKind.Utc).AddTicks(9717), "Miễn phí toàn bộ giao dịch chuyển khoản liên ngân hàng nhanh chóng và tiện lợi.", 0m, true, "Chuyển tiền 24/7" },
                    { 2, "Bảo mật", new DateTime(2026, 10, 27, 8, 50, 56, 856, DateTimeKind.Utc).AddTicks(9721), "Xác thực bằng khuôn mặt và vân tay với công nghệ mã hóa tối tân chuẩn quốc tế.", 0m, true, "Bảo mật Sinh trắc học" },
                    { 3, "Tiết kiệm", new DateTime(2026, 10, 27, 8, 50, 56, 856, DateTimeKind.Utc).AddTicks(9723), "Lãi suất ưu đãi vượt trội, linh hoạt rút tiền và tất toán ngay trên ứng dụng di động.", 0m, true, "Gửi tiết kiệm Online" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Services");
        }
    }
}
