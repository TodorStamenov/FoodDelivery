using System;

namespace FoodDelivery.Services.Models.ViewModels.Feedbacks
{
    public class ListFeedbacksViewModel
    {
        public Guid Id { get; set; }

        public string ProductName { get; set; }

        public string Rate { get; set; }

        public string TimeStamp { get; set; }

        public string User { get; set; }

        public string Content { get; set; }
    }
}