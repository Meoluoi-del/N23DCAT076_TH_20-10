using BackendAPI.Data;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServicesController(AppDbContext context)
        {
            _context = context;
        }

        // 1. GET: api/services
        // Lấy toàn bộ danh sách dịch vụ cho Front-end
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceItem>>> GetAll()
        {
            var services = await _context.Services.ToListAsync();
            return Ok(services);
        }

        // 2. GET: api/services/5
        // Lấy chi tiết 1 dịch vụ theo Id
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceItem>> GetById(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
            {
                return NotFound(new { message = $"Không tìm thấy dịch vụ có mã ID = {id}" });
            }

            return Ok(service);
        }

        // 3. POST: api/services
        // Nhận dữ liệu từ Front-end gửi về để tạo mới dịch vụ
        [HttpPost]
        public async Task<ActionResult<ServiceItem>> Create([FromBody] ServiceItem newService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Services.Add(newService);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = newService.Id }, newService);
        }

        // 4. PUT: api/services/5
        // Cập nhật dịch vụ theo Id
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ServiceItem updatedService)
        {
            if (id != updatedService.Id)
            {
                return BadRequest(new { message = "Mã ID trong URL không khớp với dữ liệu gửi lên" });
            }

            var existingService = await _context.Services.FindAsync(id);
            if (existingService == null)
            {
                return NotFound(new { message = $"Không tìm thấy dịch vụ có mã ID = {id}" });
            }

            existingService.Title = updatedService.Title;
            existingService.Description = updatedService.Description;
            existingService.Category = updatedService.Category;
            existingService.Fee = updatedService.Fee;
            existingService.IsActive = updatedService.IsActive;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Services.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                throw;
            }

            return Ok(new { message = "Cập nhật dịch vụ thành công", data = existingService });
        }

        // 5. DELETE: api/services/5
        // Xóa dịch vụ theo Id
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
            {
                return NotFound(new { message = $"Không tìm thấy dịch vụ có mã ID = {id}" });
            }

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Đã xóa thành công dịch vụ có mã ID = {id}" });
        }
    }
}
