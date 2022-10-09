using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace HealthCareAPI.Models
{
    public class Product
    {
        [Key]
        public Guid MedicineId { get; set; }
        public string Name { get; set; }
        public string Chemical { get; set; }
        public string Exp { get; set; }
        public string Mfg { get; set; }
        public int Qty { get; set; }
        public string Power { get; set; }
        public string Category { get; set; }
        public string CategoryName { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Seller { get; set; }
        public string BrandName { get; set; }
        public float Price { get; set; }
        public string Url { get; set; }
        
    }
}
