using AutoMapper.QueryableExtensions;
using FoodDelivery.Data;
using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class FeedbackService : Service, IFeedbackService
    {
        public FeedbackService(FoodDeliveryDbContext db)
            : base(db)
        {
        }

        public IEnumerable<ListFeedbacksViewModel> All()
        {
            return this.db.Feedbacks
                .ProjectTo<ListFeedbacksViewModel>()
                .ToList();
        }
    }
}