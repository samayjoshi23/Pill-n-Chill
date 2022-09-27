namespace HealthCareAPI.Models
{
    public class UserDto
    {
        public string UserName { get; set; } = String.Empty;
        public string Password { get; set; } = string.Empty;

        public string role { get; set; } = string.Empty;
        public int age { get; set; }
    }
}
