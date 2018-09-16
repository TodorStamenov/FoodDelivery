[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(FoodDelivery.Api.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(FoodDelivery.Api.App_Start.NinjectWebCommon), "Stop")]

namespace FoodDelivery.Api.App_Start
{
    using FoodDelivery.Api.Infrastructure.Extensions;
    using FoodDelivery.Data;
    using FoodDelivery.Services;
    using FoodDelivery.Services.Implementations;
    using Microsoft.Web.Infrastructure.DynamicModuleHelper;
    using Ninject;
    using Ninject.Web.Common;
    using Ninject.Web.Common.WebHost;
    using Ninject.Web.WebApi;
    using System;
    using System.Web;
    using System.Web.Http;

    public static class NinjectWebCommon
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        private static readonly Lazy<IKernel> _lazyKernel = new Lazy<IKernel>(CreateKernel);

        public static IKernel Kernel { get { return _lazyKernel.Value; } }

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start()
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }

        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }

        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
                RegisterServices(kernel);
                GlobalConfiguration.Configuration.DependencyResolver = new NinjectDependencyResolver(kernel);
                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.AddDomainServices();
            kernel.Bind<FoodDeliveryDbContext>().ToSelf().InRequestScope();
            kernel.Bind<IOrderManager>().To<OrderManager>().InSingletonScope();
        }
    }
}