using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace AngularJSPractise2
{
    /// <summary>
    /// Summary description for CountryService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CountryService : System.Web.Services.WebService
    {

        [WebMethod]
        public void GetData()
        {
            List<Country> listCountries = new List<Country>();

            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM tblCountry; SELECT * FROM tblCity", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);

                DataView dataView = new DataView(ds.Tables[1]); //which one is tblCountry, which one is tblCity?

                foreach(DataRow countryDataRow in ds.Tables[0].Rows)
                {
                    Country country = new Country();
                    country.Id = Convert.ToInt32(countryDataRow["Id"]);
                    country.Name = countryDataRow["Name"].ToString();

                    dataView.RowFilter = "CountryId = '" + country.Id + "'";

                    List<City> listCities = new List<City>();

                    foreach(DataRowView cityDataRowView in dataView)
                    {
                        DataRow cityDataRow = cityDataRowView.Row;

                        City city = new City();
                        city.Id = Convert.ToInt32(cityDataRow["Id"]);
                        city.Name = cityDataRow["Name"].ToString();
                        city.CountryId = Convert.ToInt32(cityDataRow["CountryId"]);
                        listCities.Add(city);
                    }

                    country.Cities = listCities;
                    listCountries.Add(country);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listCountries));
        }
    }
}
