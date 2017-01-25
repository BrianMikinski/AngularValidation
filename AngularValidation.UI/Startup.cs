using Microsoft.Owin;
using Owin;
using System.Web.Http;

[assembly: OwinStartup(typeof(AngularValidation.UI.Startup))]
namespace AngularValidation.UI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseWebApi(ConfigWebAPI());
        }

        private HttpConfiguration ConfigWebAPI()
        {
            HttpConfiguration config = new HttpConfiguration();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            return config;
        }
    }
}
