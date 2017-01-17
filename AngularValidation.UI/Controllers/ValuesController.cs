using AngularTest.Domain;
using AngularTest.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace AngularTest.Controllers
{
    [RoutePrefix("Values")]
    [AllowAnonymous]
    public class ValuesController : ApiController
    {
        private readonly IDataCaptureService _questionService;
        private const string ASYNC_PASS_CODE = "asyncPassCode";

        /// <summary>
        /// Return a list of fields for the specified bond
        /// </summary>
        /// <returns></returns>
        [HttpPost, Route(nameof(ValuesController.RetreiveFieldValues))]
        public List<FieldViewModel> RetreiveFieldValues()
        {
            return _questionService.RetrieveQuesitons();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route(nameof(ValuesController.ValidateAsyncInput))]
        public bool ValidateAsyncInput(string asyncPassCode)
        {
            if (asyncPassCode.Equals(ASYNC_PASS_CODE))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
