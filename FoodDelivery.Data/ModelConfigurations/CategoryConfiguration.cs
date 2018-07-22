using FoodDelivery.Data.Models;
using System.Data.Entity.ModelConfiguration;

namespace FoodDelivery.Data.ModelConfigurations
{
    public class CategoryConfiguration : EntityTypeConfiguration<Category>
    {
        public CategoryConfiguration()
        {
            this.HasMany(c => c.Products)
                .WithRequired(p => p.Category)
                .HasForeignKey(p => p.CategoryId);

            this.HasIndex(c => c.Name)
                .IsUnique(true);
        }
    }
}