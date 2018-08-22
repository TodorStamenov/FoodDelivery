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
        private const int LoadElements = 10;

        private readonly IOrderService order;

        public OrdersController(IOrderService order)
        {
            this.order = order;
        }

        [HttpGet]
        [Route("history/{loadedElements?}")]
        public IEnumerable<ListOrdersViewModel> History(int loadedElements = 0)
        {
            return this.order.History(LoadElements, loadedElements);
        }

        [HttpGet]
        [Route("queue/{loadedElements?}")]
        public IEnumerable<ListOrdersViewModel> Queue(int loadedElements = 0)
        {
            return this.order.Queue(LoadElements, loadedElements);
        }
    }
}