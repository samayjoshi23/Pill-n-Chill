using HealthCareAPI.Data;
using HealthCareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace HealthCareAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class OrdersController : Controller
    {
        public static Orders order = new Orders();
        private readonly FullStackDbContext _fullStackDbContext;
        public OrdersController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;
        }


        [HttpPost("users/order")]
        public async Task<ActionResult<Orders>> RegisterOrders([FromBody] Orders newOrder)
        {
            Orders order = new()
            {
                OrderId = new Guid(),
                OrderDate = DateTime.Now,
                OrderStatus = newOrder.OrderStatus,
                FirstName = newOrder.FirstName,
                LastName = newOrder.LastName,
                UserId = newOrder.UserId,
                Total = newOrder.Total,
                Street = newOrder.Street,
                State = newOrder.State,
                Phone = newOrder.Phone,
                City = newOrder.City,
                Zip = newOrder.Zip,
                PaymentMode = newOrder.PaymentMode,
                PaymentStatus = newOrder.PaymentStatus,
                Country = newOrder.Country,
                Quantity = newOrder.Quantity,
                ProductId = newOrder.ProductId,
                ProductName = newOrder.ProductName
            };

            var product = await _fullStackDbContext.Products.FirstOrDefaultAsync(prod => prod.MedicineId == order.ProductId);
            product.Qty -= order.Quantity;

            await _fullStackDbContext.Order.AddAsync(order);
            await _fullStackDbContext.SaveChangesAsync();
            
            return Ok();
        }


        [HttpGet("users/orders/{id}")]
        [Authorize(Roles = "user")]
        public async Task<ActionResult<Orders>> SpecificOrders([FromRoute] Guid id)
        {
            var orderList = await (from order in _fullStackDbContext.Order
                                   where order.UserId == id
                                   select order).ToListAsync();

            if (orderList == null)
            {
                return NotFound("No orders Found");
            }

            return Ok(orderList);
        }


        [HttpDelete]
        [Route("users/orders/{Id}")]
        [Authorize(Roles = "user")]
        public async Task<ActionResult<string>> CancelOrder([FromRoute] Guid Id)
        {
            var order = await _fullStackDbContext.Order.FindAsync(Id);
            if (order == null)
                return NotFound();


            var product = await _fullStackDbContext.Products.FirstOrDefaultAsync(prod => prod.MedicineId == order.ProductId);
            product.Qty += order.Quantity;

            _fullStackDbContext.Order.Remove(order);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();
        }


        [HttpGet]
        [Route("admin/orders")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Orders>> AllOrders()
        {
            var orders = await _fullStackDbContext.Order.ToListAsync();
            return Ok(orders);
        }

        [HttpPut]
        [Route("admin/orders/{Id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<string>> UpdateOrderStatus([FromRoute] Guid Id,[FromQuery] string updateOrder)
        {
            var CurrentorderData = await _fullStackDbContext.Order.FirstOrDefaultAsync(order => order.OrderId == Id);
            if (CurrentorderData == null)
            {
                return NotFound();
            }

            CurrentorderData.OrderStatus = updateOrder;
            await _fullStackDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
