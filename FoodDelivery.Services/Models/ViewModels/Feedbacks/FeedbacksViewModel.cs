using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Feedbacks
{
    public class FeedbacksViewModel : BasePageViewModel
    {
        public IEnumerable<ListFeedbacksViewModel> Feedbacks { get; set; }
    }
}