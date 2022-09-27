using HealthCareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthCareAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class AllUsers : ControllerBase
    {
        private static List<demoUser> users = new(){
            new demoUser(){Username="Nikhil", role="Admin",age=22 },
            new demoUser(){Username="Samay", role="User",age=21 },
            new demoUser(){Username="Piyush", role="Admin",age=21 },
            new demoUser(){Username="Abhinav", role="User",age=22 }
        };


        [HttpGet]
        [Route("/Allusers")]
        public async Task<ActionResult<List<demoUser>>> GetUsers()
        {
         
            return Ok(users);
        }

        [HttpGet]
        [Route("/Fewusers")]
        public async Task<ActionResult<List<demoUser>>> FewUser()
        {

            return Ok(users);
        }

        [HttpGet,Authorize(Roles="admin")]
        [Route("/adminusers")]
        public async Task<ActionResult<List<demoUser>>> AdminUsers()
        {

            return Ok(users);
        }
    }
}
