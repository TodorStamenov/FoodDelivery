using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using System;
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

        public int GetTotalEntries()
        {
            return Database.Feedbacks.Count();
        }

        public void Create(Guid productId, string userId, string content, string rate)
        {
            if (!Enum.TryParse(rate, out Rate rateType))
            {
                throw new InvalidEnumException();
            }

            Database
                .Feedbacks
                .Add(new Feedback
                {
                    Content = content,
                    Rate = rateType,
                    ProductId = productId,
                    TimeStamp = DateTime.UtcNow,
                    UserId = new Guid(userId)
                });

            Database.SaveChanges();
        }

        public IEnumerable<string> Rates()
        {
            return Enum
                .GetValues(typeof(Rate))
                .Cast<Rate>()
                .Select(r => r.ToString());
        }

        public IEnumerable<ListFeedbacksViewModel> All(int page, int pageSize)
        {
            return Database.Feedbacks
                .OrderByDescending(d => d.TimeStamp)
                .Select(f => new ListFeedbacksViewModel
                {
                    Id = f.Id,
                    ProductName = f.Product.Name,
                    Rate = f.Rate.ToString(),
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