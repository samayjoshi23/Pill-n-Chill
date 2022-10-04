using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace HealthCareAPI.Models
{
    public class Product
    {
        [Key]
        public Guid medicineId { get; set; }
        public string name { get; set; }
        public string chemical { get; set; }
        public string exp { get; set; }
        public string mfg { get; set; }
        public int qty{ get; set; }
        public int Power { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Type { get; set; }
        [Required]
        [StringLength(75)]
        public string Description { get; set; }
        public string Seller { get; set; }
        public string BrandName { get; set; }
        public int Price { get; set; }
        public string Url { get; set; }
        
    }
}
