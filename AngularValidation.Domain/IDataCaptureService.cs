using AngularValidation.Models;
using System.Collections.Generic;

namespace AngularValidation.Domain
{
    public interface IDataCaptureService
    {
        List<FieldMask> RetrieveMasks();

        List<DataCaptureField> RetrieveQuesitons();
    }
}
