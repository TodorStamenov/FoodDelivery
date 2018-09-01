using FoodDelivery.Data;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Services.Models.BindingModels.Feedback
{
    public class FeedbackBindingModel
    {
        [Required]
        [StringLength(DataConstants.FeedbackConstants.MaxContentLength)]
        public string Content { get; set; }

        [Required]
        public string Rate { get; set; }
    }
}