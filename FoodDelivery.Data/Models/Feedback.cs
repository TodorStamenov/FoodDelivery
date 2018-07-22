using System;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Data.Models
{
    public class Feedback
    {
        public int Id { get; set; }

        [MaxLength(DataConstants.FeedbackConstants.MaxContentLength)]
        public string Content { get; set; }

        public Rate Rate { get; set; }

        public DateTime TimeStamp { get; set; }

        public int ProductId { get; set; }

        public virtual Product Product { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}