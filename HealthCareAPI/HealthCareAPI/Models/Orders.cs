using System.ComponentModel.DataAnnotations;

namespace HealthCareAPI.Models
{
    public class Orders
    {
        [Key]
        public Guid OrderId { get; set; }
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long Phone { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int Zip { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public float Total { get; set; }
        public DateTime? OrderDate { get; set; }
        public string OrderStatus { get; set; }
        public string PaymentStatus { get; set; }   
        public string PaymentMode { get; set; }
    }
}
