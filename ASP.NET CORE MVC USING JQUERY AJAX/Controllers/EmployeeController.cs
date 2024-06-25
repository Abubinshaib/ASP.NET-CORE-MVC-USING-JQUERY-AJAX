using ASP.NET_CORE_MVC_USING_JQUERY_AJAX.ApplicationDbContext;
using ASP.NET_CORE_MVC_USING_JQUERY_AJAX.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASP.NET_CORE_MVC_USING_JQUERY_AJAX.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly EFCoreDbContext _context;
        public EmployeeController(EFCoreDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _context.Employeess.ToListAsync();

            if (employees != null)
            {
                return Json(new { data = employees });
            }
            return Json(new { success = false });
        }
        [HttpGet]
        public async Task<IActionResult> GetById(int Id)
        {
            var employee = await _context.Employeess.FindAsync(Id);
            if (employee != null)
            {
                return Json(new { data = employee });
            }
            return Json(new { success = false });
        }
        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        {
            if (ModelState.IsValid)
            {
                _context.Add(employee);
                await _context.SaveChangesAsync();
                return Json(new { success = true });
            }
            return Json(new { success = false });
        }
        [HttpPost]
        public async Task<IActionResult> UpdateEmployee([FromBody] Employee employee)
        {
            var emp = await _context.Employeess.FindAsync(employee.Id);
            if (emp == null)
            {
                return Json(new { success = false });
            }
            if (ModelState.IsValid)
            {
                emp.Salary = employee.Salary;
                emp.Department = employee.Department;
                emp.Name = employee.Name;
                // _context.Update(emp);
                await _context.SaveChangesAsync();
                return Json(new { success = true });
            }
            return Json(new { success = false });
        }
        [HttpPost]
        public async Task<IActionResult> DeleteEmployee(int Id)
        {
            var employee = await _context.Employeess.FindAsync(Id);
            if (employee == null)
            {
                return Json(new { success = false });
            }
            _context.Employeess.Remove(employee);
            await _context.SaveChangesAsync();
            return Json(new { success = true });
        }
    }
}

