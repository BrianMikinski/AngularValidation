using AngularValidation.Models;
using System.Collections.Generic;

namespace AngularValidation.Domain
{
    public interface IDataCaptureService
    {
        List<DataCaptureField> RetrieveQuesitons();

        List<FieldMask> RetrieveMasks();
    }
}
