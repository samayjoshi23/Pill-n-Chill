using HealthCareAPI.Data;
using HealthCareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace HealthCareAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public static Product product = new Product();
        private readonly FullStackDbContext _fullStackDbContext;
        public ProductController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;
        }


        [HttpGet]
        [Route("admin/products")]
        public async Task<ActionResult<List<Product>>> getProductByName([FromQuery] string productName)
        {
            var products = await _fullStackDbContext.Products.ToListAsync();
            if (products==null)
            {
                return NotFound();
            }
            return Ok(products);
        }


        [HttpGet]
        [Route("products")]
        public async Task<ActionResult<List<Product>>> getProducts([FromQuery] string category, [FromQuery] string type)
        {
            if(category == "all")
            {
                var productList = await (from p in _fullStackDbContext.Products where p.Type == type select p).ToListAsync();
                return Ok(productList);
            }
            if(type == "all")
            {
                var productList = await (from p in _fullStackDbContext.Products where p.Category == category select p).ToListAsync();
                return Ok(productList);
            }
            if(category != "all" && type != "all")
            {
                var productList = await (from p in _fullStackDbContext.Products where p.Type == type && p.Category == category select p).ToListAsync();
                return Ok(productList);
            }

            return NotFound();
        }


        [HttpGet]
        [Route("products/popular")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<Product>>> getTopProducts()
        {
            var products = await (from p in _fullStackDbContext.Products select p).Take(6).ToListAsync();

            return Ok(products);
        }


        [HttpGet]
        [Route("products/{Id}")]
        public async Task<ActionResult<List<Product>>> getSingleProduct([FromRoute] Guid Id)
        {
            var product = await _fullStackDbContext.Products.FirstOrDefaultAsync(product => product.MedicineId == Id);

            if (product==null)
            {
                return NotFound("Product Not Found");
            }
            return Ok(product);
        }


        [HttpPost("admin/products/product")]
        public async Task<ActionResult<Product>> RegisterProducts([FromBody] Product newProducts)
        {
            product.MedicineId = new Guid();

            await _fullStackDbContext.Products.AddAsync(product);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();
        }


        [HttpPut]
        [Route("admin/products/{Id}")]
        public async Task<ActionResult<Product>> updateProduct([FromRoute] Guid Id, [FromBody] Product request)
        {
            var product = await _fullStackDbContext.Products.FirstOrDefaultAsync(product => product.MedicineId==Id);
            product.Name = request.Name;
            product.Chemical = request.Chemical;
            product.Seller = request.Seller;
            product.Power = request.Power;
            product.Price = request.Price;
            product.BrandName = request.BrandName;
            product.Category = request.Category;
            product.Description = request.Description;
            product.Mfg = request.Mfg;
            product.Url = request.Url;
            product.Exp = request.Exp;
            product.Qty = request.Qty;
            product.Type = request.Type;


            await _fullStackDbContext.SaveChangesAsync();
            return Ok(product);
        }


        [HttpDelete]
        [Route("admin/products/{Id}")]
        public async Task<ActionResult<string>> DeleteProduct([FromRoute] Guid Id)
        {

            var product = await _fullStackDbContext.Products.FindAsync(Id);

            _fullStackDbContext.Products.Remove(product);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();

        }

    }
}
