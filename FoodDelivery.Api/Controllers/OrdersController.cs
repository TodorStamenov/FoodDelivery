using FoodDelivery.Common;
using FoodDelivery.Services;
using FoodDelivery.Services.Models.ViewModels.Orders;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    [RoutePrefix("api/Orders")]
    public class OrdersController : ApiController
    {
        private readonly IOrderService order;

        public OrdersController(IOrderService order)
        {
            this.order = order;
        }

        [HttpGet]
        [Route("history")]
        public IEnumerable<ListOrdersViewModel> History()
        {
            return this.order.History();
        }

        [HttpGet]
        [Route("queue")]
        public IEnumerable<ListOrdersViewModel> Queue()
        {
            return this.order.Queue();
        }
    }
}