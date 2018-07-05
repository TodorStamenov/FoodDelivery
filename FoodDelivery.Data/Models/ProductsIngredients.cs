namespace FoodDelivery.Data.Models
{
    public class ProductsIngredients
    {
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }

        public int IngredientId { get; set; }

        public virtual Ingredient Ingredient { get; set; }
    }
}