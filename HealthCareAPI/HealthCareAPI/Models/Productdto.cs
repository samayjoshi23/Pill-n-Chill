using System.ComponentModel.DataAnnotations;

namespace HealthCareAPI.Models
{
    public class Productdto
    {
        public string ProductName { get; set; }
        public string Chemicals { get; set; }
        public string Exp { get; set; }
        public string Mfg { get; set; }
        public int Quantity { get; set; }
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
