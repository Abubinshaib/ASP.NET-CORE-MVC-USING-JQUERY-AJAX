using System.ComponentModel.DataAnnotations;

namespace ASP.NET_CORE_MVC_USING_JQUERY_AJAX.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public long Salary { get; set; }
        public string Department { get; set; }
    }
}
