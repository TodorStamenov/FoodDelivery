using FoodDelivery.Data.Models;
using System.Data.Entity.ModelConfiguration;

namespace FoodDelivery.Data.ModelConfigurations
{
    public class IngredientConfiguration : EntityTypeConfiguration<Ingredient>
    {
        public IngredientConfiguration()
        {
            this.HasIndex(i => i.Name)
                .IsUnique(true);
        }
    }
}