using FoodDelivery.Data.Models;
using System.Data.Entity.ModelConfiguration;

namespace FoodDelivery.Data.ModelConfigurations
{
    public class ToppingConfiguration : EntityTypeConfiguration<Topping>
    {
        public ToppingConfiguration()
        {
            this.HasIndex(i => i.Name)
                .IsUnique(true);
        }
    }
}