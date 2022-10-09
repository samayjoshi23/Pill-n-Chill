using HealthCareAPI.Data;
using HealthCareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthCareAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FullStackDbContext _fullStackDbContext;
        public UserController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;
        }


        [HttpGet]
        [Route("admin/users")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var user = await _fullStackDbContext.Users.ToListAsync();
            return Ok(user);
        }

    
        [HttpGet]
        [Route("admin/users/{Id}")]
        [Authorize(Roles = "admin,user")]
        public async Task<ActionResult<List<User>>> GetSingleUser([FromRoute] Guid Id)
        {
            var user = await _fullStackDbContext.Users.FirstOrDefaultAsync(user => user.userId == Id);
            if (user==null)
            {
                return NotFound("User Not Found");
            }
            return Ok(user);
        }


        [HttpPut]
        [Route("admin/users/{Id}")]
        [Authorize(Roles ="admin")]
        public async Task<ActionResult<string>> ChangeRole([FromRoute] Guid Id, [FromQuery] string newRole)
        {
            var user = await _fullStackDbContext.Users.FirstOrDefaultAsync(user => user.userId == Id);
            
            if (user == null)
                return NotFound();
            
            user.Role= newRole;
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();
        }


        [HttpPut]
        [Route("user/users/{Id}")]
        [Authorize(Roles ="user")]
        public async Task<ActionResult<string>> UpdateUserData([FromRoute] Guid Id, [FromBody] User newUserData)
        {
            var ExistingUserData = await _fullStackDbContext.Users.FirstOrDefaultAsync(user => user.userId == Id);

            if (ExistingUserData == null)
                return NotFound();

            ExistingUserData.FirstName = newUserData.FirstName;
            ExistingUserData.LastName = newUserData.LastName;
            ExistingUserData.Phone = newUserData.Phone;

            await _fullStackDbContext.SaveChangesAsync();
            return Ok();
        }


        [HttpDelete]
        [Route("admin/users/{Id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> DeleteUser([FromRoute] Guid Id)
        {
            var user = await _fullStackDbContext.Users.FindAsync(Id);

            if (user == null)
                return NotFound();

           _fullStackDbContext.Users.Remove(user);
            await _fullStackDbContext.SaveChangesAsync();   
            return Ok();
        }
    }
}
