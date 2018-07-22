using FoodDelivery.Data.Models;
using System.Data.Entity.ModelConfiguration;

namespace FoodDelivery.Data.ModelConfigurations
{
    public class ProductsIngredientsConfiguration : EntityTypeConfiguration<ProductsIngredients>
    {
        public ProductsIngredientsConfiguration()
        {
            this.HasKey(pi => new { pi.ProductId, pi.IngredientId });

            this.HasRequired(pi => pi.Product)
                .WithMany(p => p.Ingredients)
                .HasForeignKey(pi => pi.ProductId);

            this.HasRequired(pi => pi.Ingredient)
                .WithMany(p => p.Products)
                .HasForeignKey(pi => pi.IngredientId);
        }
    }
}