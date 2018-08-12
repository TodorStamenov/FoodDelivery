using FoodDelivery.Data;
using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class FeedbackService : Service, IFeedbackService
    {
        public FeedbackService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public IEnumerable<ListFeedbacksViewModel> All()
        {
            return Database.Feedbacks
                .Select(f => new ListFeedbacksViewModel
                {
                    Id = f.Id,
                    Content = f.Content,
                    Rate = f.Rate
                })
                .ToList();
        }
    }
}