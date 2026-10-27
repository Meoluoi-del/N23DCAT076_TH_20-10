using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Models
{
    public class ServiceItem
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên dịch vụ không được để trống")]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Mô tả không được để trống")]
        public string Description { get; set; } = string.Empty;

        public string Category { get; set; } = "Banking";

        public decimal Fee { get; set; } = 0;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
