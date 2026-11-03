using BackendAPI.Data;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // 1. POST: api/auth/register
        // Đăng ký tài khoản mới, validate và lưu vào DB
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cleanEmail = dto.Email.Trim().ToLower();

            // Kiểm tra email đã tồn tại trong DB chưa
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == cleanEmail);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Email này đã được sử dụng. Vui lòng chọn email khác!" });
            }

            var newUser = new User
            {
                Email = cleanEmail,
                Password = dto.Password, // Lưu mật khẩu
                FullName = string.IsNullOrWhiteSpace(dto.FullName) ? cleanEmail.Split('@')[0] : dto.FullName.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Đăng ký tài khoản thành công!",
                user = new
                {
                    id = newUser.Id,
                    email = newUser.Email,
                    fullName = newUser.FullName
                }
            });
        }

        // 2. POST: api/auth/login
        // Kiểm tra thông tin đăng nhập, query DB để xác thực user
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cleanEmail = dto.Email.Trim().ToLower();

            // Query DB để tìm user có email và password khớp
            var user = await _context.Users.FirstOrDefaultAsync(u => 
                u.Email.ToLower() == cleanEmail && 
                u.Password == dto.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Email hoặc mật khẩu không chính xác!" });
            }

            return Ok(new
            {
                message = "Đăng nhập thành công!",
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    fullName = user.FullName
                }
            });
        }
    }
}
