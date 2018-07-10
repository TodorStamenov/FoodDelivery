using FoodDelivery.Common.Mapping;
using FoodDelivery.Data.Models;

namespace FoodDelivery.Services.Models.ViewModels.Feedbacks
{
    public class ListFeedbacksViewModel : IMapFrom<Feedback>
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public Rate Rate { get; set; }
    }
}