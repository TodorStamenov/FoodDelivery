using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IFeedbackService
    {
        IEnumerable<ListFeedbacksViewModel> All();
    }
}