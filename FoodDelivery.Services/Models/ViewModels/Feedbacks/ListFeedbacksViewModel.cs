using FoodDelivery.Data.Models;

namespace FoodDelivery.Services.Models.ViewModels.Feedbacks
{
    public class ListFeedbacksViewModel
    {
        public int Id { get; set; }

        public string ProductName { get; set; }

        public Rate Rate { get; set; }

        public string TimeStamp { get; set; }

        public string User { get; set; }

        public string Content { get; set; }
    }
}