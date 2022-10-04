using System;
using System.ComponentModel.DataAnnotations;

namespace HealthCareAPI.Models
{
    public class User
    {
        [Key]
        public Guid userId { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
        public string Role { get; set; }
        public int Age { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        /*   public DateOnly BirthDate { get; set; }*/
       
        public string Email { get; set; }
        public long Phone { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; }

        public DateTime TokenExpires { get; set; }
    }
}
