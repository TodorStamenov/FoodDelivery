using FoodDelivery.Services;
using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    public class FeedbacksController : ApiController
    {
        private readonly IFeedbackService feedbacks;

        public FeedbacksController(IFeedbackService feedbacks)
        {
            this.feedbacks = feedbacks;
        }

        [HttpGet]
        public IEnumerable<ListFeedbacksViewModel> Get()
        {
            return this.feedbacks.All();
        }
    }
}