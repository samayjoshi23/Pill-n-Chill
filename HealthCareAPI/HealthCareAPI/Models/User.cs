namespace HealthCareAPI.Models
{
    public class User
    {
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
        public string role { get; set; }
        public int age { get; set; }
    }
}
