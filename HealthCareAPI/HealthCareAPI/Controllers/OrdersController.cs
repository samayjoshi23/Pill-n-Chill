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
            Orders order = new Orders();
            order.OrderId = new Guid();
            order.OrderDate = DateTime.Now;
            order.OrderStatus = newOrder.OrderStatus;
            order.FirstName = newOrder.FirstName;
            order.LastName = newOrder.LastName;
            order.UserId = newOrder.UserId;
            order.Total = newOrder.Total;
            order.Street = newOrder.Street;
            order.State = newOrder.State;
            order.Phone = newOrder.Phone;
            order.City = newOrder.City;
            order.Zip= newOrder.Zip;
            order.PaymentMode = newOrder.PaymentMode;
            order.PaymentStatus = newOrder.PaymentStatus;
            order.Country = newOrder.Country;
            order.Quantity = newOrder.Quantity;
            order.ProductId = newOrder.ProductId;
            order.ProductName = newOrder.ProductName;

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
