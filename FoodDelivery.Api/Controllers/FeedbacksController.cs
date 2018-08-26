using FoodDelivery.Common;
using FoodDelivery.Services;
using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [RoutePrefix("api/Feedbacks")]
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    public class FeedbacksController : ApiController
    {
        private const int PageSize = 10;

        private readonly IFeedbackService feedbacks;

        public FeedbacksController(IFeedbackService feedbacks)
        {
            this.feedbacks = feedbacks;
        }

        [Route("{page?}")]
        public IHttpActionResult Get(int page = 1)
        {
            if (page <= 0)
            {
                page = 1;
            }

            return Ok(new FeedbacksViewModel
            {
                CurrentPage = page,
                EntriesPerPage = PageSize,
                TotalEntries = this.feedbacks.GetTotalEntries(),
                Feedbacks = this.feedbacks.All(page, PageSize)
            });
        }

        public IHttpActionResult Post()
        {
            return Ok();
        }
    }
}