using FoodDelivery.Services;
using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FoodDelivery.Api.Controllers
{
    [EnableCors("*", "*", "*")]
    public class FeedbacksController : ApiController
    {
        private readonly IFeedbackService feedbacks;

        public FeedbacksController(IFeedbackService feedbacks)
        {
            this.feedbacks = feedbacks;
        }

        [HttpGet]
        public IEnumerable<ListFeedbacksServiceModel> Get()
        {
            return this.feedbacks.All();
        }
    }
}