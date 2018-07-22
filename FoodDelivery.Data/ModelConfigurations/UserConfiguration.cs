using FoodDelivery.Data.Models;
using System.Data.Entity.ModelConfiguration;

namespace FoodDelivery.Data.ModelConfigurations
{
    public class UserConfiguration : EntityTypeConfiguration<User>
    {
        public UserConfiguration()
        {
            this.HasMany(u => u.Feedbacks)
                 .WithRequired(f => f.User)
                 .HasForeignKey(f => f.UserId)
                 .WillCascadeOnDelete(false);

            this.HasMany(u => u.Orders)
                .WithRequired(o => o.User)
                .HasForeignKey(o => o.UserId)
                .WillCascadeOnDelete(false);

            this.HasMany(u => u.ReceivedOrders)
                .WithRequired(o => o.Executor)
                .HasForeignKey(o => o.ExecutorId)
                .WillCascadeOnDelete(false);
        }
    }
}