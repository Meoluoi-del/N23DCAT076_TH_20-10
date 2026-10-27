using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ServiceItem> Services { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed dữ liệu mẫu ban đầu khớp với giao diện Front-end
            modelBuilder.Entity<ServiceItem>().HasData(
                new ServiceItem
                {
                    Id = 1,
                    Title = "Chuyển tiền 24/7",
                    Description = "Miễn phí toàn bộ giao dịch chuyển khoản liên ngân hàng nhanh chóng và tiện lợi.",
                    Category = "Chuyển tiền",
                    Fee = 0,
                    IsActive = true
                },
                new ServiceItem
                {
                    Id = 2,
                    Title = "Bảo mật Sinh trắc học",
                    Description = "Xác thực bằng khuôn mặt và vân tay với công nghệ mã hóa tối tân chuẩn quốc tế.",
                    Category = "Bảo mật",
                    Fee = 0,
                    IsActive = true
                },
                new ServiceItem
                {
                    Id = 3,
                    Title = "Gửi tiết kiệm Online",
                    Description = "Lãi suất ưu đãi vượt trội, linh hoạt rút tiền và tất toán ngay trên ứng dụng di động.",
                    Category = "Tiết kiệm",
                    Fee = 0,
                    IsActive = true
                }
            );
        }
    }
}
