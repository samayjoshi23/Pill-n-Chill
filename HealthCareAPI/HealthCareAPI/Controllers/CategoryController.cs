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


        [HttpPost("categories/add")]
        public async Task<ActionResult<Category>> AddCategory(categorydto request)
        {
            category.CategoryName=request.CategoryName;
            category.Url=request.Url;
            category.UrlName=request.UrlName;
            await _fullStackDbContext.Categories.AddAsync(category);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(category);
        }


        [HttpPut]
        [Route("categories/{Id}")]
        public async Task<ActionResult<Category>> updateCategory(int Id,categorydto request)
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
        public async Task<ActionResult<string>> Deletecategory(int Id)
        {

            var category = await _fullStackDbContext.Categories.FindAsync(Id);

            _fullStackDbContext.Categories.Remove(category);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();

        }


        [HttpGet]
        [Route("categories/{Id}")]
        public async Task<ActionResult<List<Category>>> getSinglecategory(int Id)
        {
            var category = await _fullStackDbContext.Categories.FirstOrDefaultAsync(category => category.CategoryId ==Id);
            if (category==null)
            {
                return NotFound("category Not Found");
            }
            return Ok(category);
        }


        [HttpGet]
        [Route("Categories")]
        public async Task<ActionResult<List<Category>>> getAllCategories()
        {
            var category = await _fullStackDbContext.Categories.ToListAsync();
            return Ok(category);
        }

        //[HttpGet]
        //[Route("ProductByCategory/{Id}")]
        //public async Task<ActionResult<List<Product>>> ProductByCategory(int Id)
        //{
            //var product = await _fullStackDbContext.Products.FirstOrDefaultAsync(product => product.CategoryId ==Id);
            //if (product==null)
            //{
            //    return NotFound("Product Not Found");
            //}
            //return Ok(product);
        //}


        [HttpGet]
        [Route("products/{Type}/{Category}")]
        public async Task<ActionResult<List<Product>>> getProductByType(string Type,string Category)
        {
            var product = await _fullStackDbContext.Products.ToListAsync();
             IQueryable<Product> Medicine = product.AsQueryable()
                         .Where(product=> product.Type == Type && product.CategoryName==Category);
           
            
            if (Medicine==null)
            {
                return NotFound("Product Not Found");
            }

            return Ok(Medicine);
        }
    }
}