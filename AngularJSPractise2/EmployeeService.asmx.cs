using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace AngularJSPractise2
{
    /// <summary>
    /// Summary description for EmployeeService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class EmployeeService : System.Web.Services.WebService
    {

        [WebMethod]
        public void GetAllEmployees()
        {
            List<Employee> listEmployees = new List<Employee>();

            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("Select * from tblEmployees", con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Employee employee = new Employee();
                    employee.id = Convert.ToInt32(rdr["Id"]);
                    employee.name = rdr["Name"].ToString();
                    employee.gender = rdr["Gender"].ToString();
                    employee.salary = Convert.ToInt32(rdr["Salary"]);
                    listEmployees.Add(employee);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listEmployees));
        }
    }
}
