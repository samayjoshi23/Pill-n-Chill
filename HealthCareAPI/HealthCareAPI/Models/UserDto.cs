namespace HealthCareAPI.Models
{
    public class UserDto
    {
        
        public string Password { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;
        public int Age { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
      
        public string Email { get; set; }
        public long Phone { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

        public DateTime TokenCreated { get; set; }

        public DateTime TokenExpires { get; set; }
    }
}
