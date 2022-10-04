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
        [Route("admin/users"), Authorize(Roles = "admin,user")]
        public async Task<ActionResult<List<User>>> getUsers()
        {
            var user = await _fullStackDbContext.Users.ToListAsync();
            return Ok(user);
        }

    
        [HttpGet]
        [Route("admin/users/{Id}"), Authorize(Roles = "admin,user")]
        public async Task<ActionResult<List<User>>> getSingleUser(Guid Id)
        {
            var user = await _fullStackDbContext.Users.FirstOrDefaultAsync(user => user.userId==Id);
            if (user==null)
            {
                return NotFound("User Not Found");
            }
            return Ok(user);
        }
        [HttpPut]
        [Route("admin/ChangeRole/{Id}"),Authorize(Roles ="admin")]

        public async Task<ActionResult<string>> changerole(Guid Id,string newRole)
        {

            var user = await _fullStackDbContext.Users.FirstOrDefaultAsync(user => user.userId==Id);
            user.Role= newRole;
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();

        }
        [HttpDelete]
        [Route("admin/DeleteUser/{Id}"), Authorize(Roles = "admin")]
        public async Task<ActionResult<string>> DeleteUser(Guid Id)
        {

            var user = await _fullStackDbContext.Users.FindAsync(Id);
           
           _fullStackDbContext.Users.Remove(user);
            await _fullStackDbContext.SaveChangesAsync();   
            return Ok();

        }

    }
}
