using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IFeedbackService : IService
    {
        IEnumerable<ListFeedbacksViewModel> All(int page, int pageSize);
    }
}