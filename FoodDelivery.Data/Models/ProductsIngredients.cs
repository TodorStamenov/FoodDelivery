using System;

namespace FoodDelivery.Data.Models
{
    public class ProductsIngredients
    {
        public Guid ProductId { get; set; }

        public virtual Product Product { get; set; }

        public Guid IngredientId { get; set; }

        public virtual Ingredient Ingredient { get; set; }
    }
}