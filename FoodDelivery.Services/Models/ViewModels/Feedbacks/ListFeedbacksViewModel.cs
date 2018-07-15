using FoodDelivery.Data.Models;

namespace FoodDelivery.Services.Models.ViewModels.Feedbacks
{
    public class ListFeedbacksViewModel
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public Rate Rate { get; set; }
    }
}