using HealthCareAPI.Data;
using HealthCareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthCareAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public static Category category = new Category();
        public static Product product = new Product();
        private readonly FullStackDbContext _fullStackDbContext;
        public CategoryController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;

        }

        [HttpGet]
        [Route("Categories")]
        public async Task<ActionResult<List<Category>>> getAllCategories()
        {
            var category = await _fullStackDbContext.Categories.ToListAsync();
            return Ok(category);
        }


        [HttpGet]
        [Route("categories/{Id}")]
        public async Task<ActionResult<List<Category>>> getSinglecategory([FromRoute]int Id)
        {
            var category = await _fullStackDbContext.Categories.FirstOrDefaultAsync(category => category.CategoryId ==Id);
            if (category==null)
            {
                return NotFound("category Not Found");
            }
            return Ok(category);
        }


        [HttpPost("categories/add")]
        public async Task<ActionResult<Category>> AddCategory([FromBody]Category request)
        {
            await _fullStackDbContext.Categories.AddAsync(request);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(category);
        }


        [HttpPut]
        [Route("categories/{Id}")]
        public async Task<ActionResult<Category>> updateCategory([FromRoute]int Id, [FromBody]Category request)
        {
            var category = await _fullStackDbContext.Categories.FirstOrDefaultAsync(category => category.CategoryId==Id);
            category.CategoryName=request.CategoryName;
            category.Url = request.Url;
            category.UrlName=request.UrlName;
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(category);
        }


        [HttpDelete]
        [Route("categories/{Id}")]
        public async Task<ActionResult<string>> Deletecategory([FromRoute] int Id)
        {

            var category = await _fullStackDbContext.Categories.FindAsync(Id);

            _fullStackDbContext.Categories.Remove(category);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();

        }
    }
}