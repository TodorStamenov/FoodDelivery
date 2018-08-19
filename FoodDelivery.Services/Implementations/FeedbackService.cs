using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class FeedbackService : Service<Feedback>, IFeedbackService
    {
        public FeedbackService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public IEnumerable<ListFeedbacksViewModel> All(int page, int pageSize)
        {
            return Database.Feedbacks
                .OrderByDescending(d => d.TimeStamp)
                .Select(f => new ListFeedbacksViewModel
                {
                    Id = f.Id,
                    ProductName = f.Product.Name,
                    Rate = f.Rate,
                    TimeStamp = f.TimeStamp.ToString(),
                    Content = f.Content,
                    User = f.User.UserName
                })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }
    }
}