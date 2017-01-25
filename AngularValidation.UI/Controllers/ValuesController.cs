using AngularValidation.Domain;
using AngularValidation.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace AngularValidation.UI.Controllers
{
    [RoutePrefix("Values")]
    [AllowAnonymous]
    public class ValuesController : ApiController
    {
        private const string ASYNC_PASS_CODE = "asyncPassCode";
        private readonly IDataCaptureService _dataCaptureService;

        /// <summary>
        /// Setup for dependency injection if required
        /// </summary>
        public ValuesController()
        {
            _dataCaptureService = new DataCaptureService();
        }

        /// <summary>
        /// Return a list of fields for the specified bond
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route(nameof(ValuesController.RetrieveDataCaptureQuestions))]
        public List<DataCaptureField> RetrieveDataCaptureQuestions()
        {
            return _dataCaptureService.RetrieveQuesitons();
        }

        /// <summary>
        /// Retrieve the list of potential input masks
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route(nameof(ValuesController.RetrieveFieldMasks))]
        public List<FieldMask> RetrieveFieldMasks()
        {
            return _dataCaptureService.RetrieveMasks();
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
