using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.Data.Models
{
    public class Feedback
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [MaxLength(DataConstants.FeedbackConstants.MaxContentLength)]
        public string Content { get; set; }

        public Rate Rate { get; set; }

        public DateTime TimeStamp { get; set; }

        public Guid ProductId { get; set; }

        public virtual Product Product { get; set; }

        public Guid UserId { get; set; }

        public virtual User User { get; set; }
    }
}