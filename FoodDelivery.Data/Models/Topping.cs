using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.Data.Models
{
    public class Topping
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MinLength(DataConstants.ToppingConstants.MinNameLength)]
        [MaxLength(DataConstants.ToppingConstants.MaxNameLength)]
        public string Name { get; set; }

        public virtual List<ProductsToppings> Products { get; set; } = new List<ProductsToppings>();

        public virtual List<ProductsOrdersToppings> Orders { get; set; } = new List<ProductsOrdersToppings>();
    }
}