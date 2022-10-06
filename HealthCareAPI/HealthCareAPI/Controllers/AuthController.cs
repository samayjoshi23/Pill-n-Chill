using HealthCareAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using HealthCareAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthCareAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();

        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly FullStackDbContext _fullStackDbContext;
        public AuthController(IConfiguration configuration, IUserService userService, FullStackDbContext fullStackDbContext)
        {
            _configuration = configuration;
            _userService = userService;
            _fullStackDbContext = fullStackDbContext;

        }


        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.Role="user";
            user.Age=request.Age;
            user.Email=request.Email;
            user.Phone=request.Phone;
            user.DateCreated=DateTime.Now;
            user.DateUpdated=DateTime.Now;
            user.FirstName=request.FirstName;
            user.LastName=request.LastName;
            user.TokenCreated=DateTime.Now;
            user.TokenExpires=DateTime.Now.AddDays(7);
            await _fullStackDbContext.Users.AddAsync(user);
            await _fullStackDbContext.SaveChangesAsync();
     
            return Ok(user);

        }


        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(Login request)
        {
            var user =await _fullStackDbContext.Users.FirstOrDefaultAsync(user=>user.Email==request.Email);
            if (user==null)
            {
                return BadRequest("User Not Found");

            }

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Incorrect Password");
            }
            string token = CreateToken(user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken);
            return Ok(new { token });
        }


        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = CreateToken(user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken);

            return Ok(token);
        }


        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }


        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;
        }


        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
              /*  new Claim(ClaimTypes.Name, user.Username),*/
                new Claim(ClaimTypes.Role, user.Role)

            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.
                GetBytes(_configuration.GetSection("Appsettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }


        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt=hmac.Key;
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
