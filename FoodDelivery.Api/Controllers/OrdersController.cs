using FoodDelivery.Common;
using FoodDelivery.Services;
using FoodDelivery.Services.Models.BindingModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Orders;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [RoutePrefix("api/Orders")]
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    public class OrdersController : ApiController
    {
        private const int LoadElements = 10;
        private const string Order = "Order";

        private readonly IOrderService order;

        public OrdersController(IOrderService order)
        {
            this.order = order;
        }

        [HttpGet]
        [Route("history/{loadedElements?}")]
        public IEnumerable<ListOrdersModeratorViewModel> History(int loadedElements = 0)
        {
            return this.order.History(LoadElements, loadedElements);
        }

        [HttpGet]
        [Route("queue/{loadedElements?}")]
        public IEnumerable<ListOrdersModeratorViewModel> Queue(int loadedElements = 0)
        {
            return this.order.Queue(LoadElements, loadedElements);
        }

        [HttpGet]
        [Route("employeeQueue")]
        [OverrideAuthorization]
        [Authorize(Roles = CommonConstants.EmployeeRole)]
        public IEnumerable<ListOrdersEmployeeViewModel> MyQueue()
        {
            return this.order.EmployeeQueue(User.Identity.Name);
        }

        [HttpPost]
        [Route("updateQueue")]
        [OverrideAuthorization]
        [Authorize(Roles = CommonConstants.EmployeeRole)]
        public IHttpActionResult UpdateQueue(IEnumerable<UpdateOrdersBindingModel> model)
        {
            this.order.UpdateQueue(model);
            return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, Order, CommonConstants.Edited));
        }
    }
}