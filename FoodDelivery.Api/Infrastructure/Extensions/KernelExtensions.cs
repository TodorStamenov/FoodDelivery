using FoodDelivery.Services;
using Ninject;
using System.Linq;
using System.Reflection;

namespace FoodDelivery.Api.Infrastructure.Extensions
{
    public static class KernelExtensions
    {
        public static IKernel AddDomainServices(this IKernel services)
        {
            Assembly
                .GetAssembly(typeof(IService))
                .GetTypes()
                .Where(t => t.IsClass
                    && t.Name.ToLower().EndsWith("service")
                    && t.GetInterfaces().Any(i => i.Name == $"I{t.Name}"))
                .Select(t => new
                {
                    Interface = t.GetInterface($"I{t.Name}"),
                    Implementation = t
                })
                .ToList()
                .ForEach(s => services.Bind(s.Interface).To(s.Implementation));

            return services;
        }
    }
}