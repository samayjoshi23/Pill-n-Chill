using HealthCareAPI.Data;
using HealthCareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace HealthCareAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public static Product product = new Product();
        private readonly FullStackDbContext _fullStackDbContext;
        public ProductController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;

        }

        [HttpPost("addproduct")]
        public async Task<ActionResult<Product>> RegisterProducts(Productdto request)
        {
            product.name=request.ProductName;
            product.chemical=request.Chemicals;
            product.Seller=request.Seller;
            product.Power=request.Power;
            product.Price=request.Price;
            product.BrandName=request.BrandName;
            product.CategoryName=request.CategoryName;
            product.Description=request.Description;
            product.mfg=request.Mfg;
            product.Url=request.Url;
            product.exp=request.Exp;
            product.qty=request.Quantity;
            product.Type=request.Type;
            await _fullStackDbContext.Products.AddAsync(product);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(product);


        }
        [HttpPut]
        [Route("UpdateProduct/{Id}")]
        public async Task<ActionResult<Product>> updateProduct(Guid Id,Productdto request)
        {
            var product = await _fullStackDbContext.Products.FirstOrDefaultAsync(product => product.medicineId==Id);
            product.name=request.ProductName;
            product.chemical=request.Chemicals;
            product.Seller=request.Seller;
            product.Power=request.Power;
            product.Price=request.Price;
            product.BrandName=request.BrandName;
            product.CategoryId=request.CategoryId;
            product.Description=request.Description;
            product.mfg=request.Mfg;
            product.Url=request.Url;
            product.exp=request.Exp;
            product.qty=request.Quantity;
            product.Type=request.Type;
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(product);
        }
        [HttpDelete]
        [Route("deleteProduct/{Id}")]
        public async Task<ActionResult<string>> DeleteProduct(Guid Id)
        {

            var product = await _fullStackDbContext.Products.FindAsync(Id);

            _fullStackDbContext.Products.Remove(product);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();

        }

        [HttpGet]
        [Route("singleProduct/{Id}")]
        public async Task<ActionResult<List<Product>>> getSingleProduct(Guid Id)
        {
            var product = await _fullStackDbContext.Products.FirstOrDefaultAsync(product =>product.medicineId ==Id);
            if (product==null)
            {
                return NotFound("Product Not Found");
            }
            return Ok(product);
        }
        [HttpGet]
        [Route("productByName/{productName}")]
        public async Task<ActionResult<List<Product>>> getProductByName(string productName)
        {
            var product = await _fullStackDbContext.Products.FirstOrDefaultAsync(product => product.name ==productName);
            if (product==null)
            {
                return NotFound("Product Not Found");
            }
            return Ok(product);
        }
        [HttpGet]
        [Route("Products")]
        public async Task<ActionResult<List<Product>>> getProducts()
        {
            var product = await _fullStackDbContext.Products.ToListAsync();
            return Ok(product);
        }
        [HttpGet]
        [Route("TopProducts")]
        public async Task<ActionResult<List<Product>>> getTopProducts()
        {
            var product = await _fullStackDbContext.Products.ToListAsync();
            IQueryable<Product> Medicine = product.AsQueryable()
                        .Where(product=>product.qty==0);
            var category= await _fullStackDbContext.Categories.ToListAsync();
            return Ok(new { Medicine,category});
        }

    }
}
