using FoodDelivery.Data.Models;
using System.Data.Entity.ModelConfiguration;

namespace FoodDelivery.Data.ModelConfigurations
{
    public class ProductConfiguration : EntityTypeConfiguration<Product>
    {
        public ProductConfiguration()
        {
            this.HasMany(p => p.Feedbacks)
                .WithRequired(f => f.Product)
                .HasForeignKey(f => f.ProductId);

            this.HasIndex(c => c.Name)
               .IsUnique(true);
        }
    }
}