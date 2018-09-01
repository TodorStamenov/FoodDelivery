using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IFeedbackService : IService
    {
        void Create(Guid productId, string userId, string content, string rate);

        IEnumerable<string> Rates();

        IEnumerable<ListFeedbacksViewModel> All(int page, int pageSize);
    }
}