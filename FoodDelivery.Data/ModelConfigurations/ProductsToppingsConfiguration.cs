using FoodDelivery.Data.Models;
using System.Data.Entity.ModelConfiguration;

namespace FoodDelivery.Data.ModelConfigurations
{
    public class ProductsToppingsConfiguration : EntityTypeConfiguration<ProductsToppings>
    {
        public ProductsToppingsConfiguration()
        {
            this.HasKey(pt => new { pt.ProductId, pt.ToppingId });

            this.HasRequired(pt => pt.Product)
                .WithMany(p => p.Toppings)
                .HasForeignKey(pt => pt.ProductId);

            this.HasRequired(pt => pt.Topping)
                .WithMany(t => t.Products)
                .HasForeignKey(pt => pt.ToppingId);
        }
    }
}