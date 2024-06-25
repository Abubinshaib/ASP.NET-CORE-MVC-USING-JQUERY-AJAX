// Load Data in Table when document is ready
$(function () {
    loadData();
});
// Load Data function
function loadData() {
    $.ajax({
        url: '/Employee/GetAll',
        type: 'GET',
        success: function (result) {
            var html = '';
            $.each(result.data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Salary + '</td>';
                html += '<td>' + item.Department + '</td>';
                html += '<td><a href="#" class="btn btn-primary" onclick="return getbyID(' + item.Id + ')">Edit</a>  <a href="#" class="btn btn-danger" onclick="ConfirmDelete(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
// Add Employee Data Function
function Add() {
    var employee = {
        EmployeeID: $('#Id').val(),
        Name: $('#Name').val(),
        Salary: $('#Salary').val(),
        Department: $('#Department').val()
    };
    $.ajax({
        url: '@Url.Action("AddEmployee", "Employee")',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
// Function for getting the Data Based upon Employee ID
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Salary').css('border-color', 'lightgrey');
    $('#Department').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Employee/GetById/" + EmpID,
        type: "GET",
        contentType: 'application/json',
        success: function (result) {
            $('#Id').val(result.data.Id);
            $('#Name').val(result.data.Name);
            $('#Salary').val(result.data.Salary);
            $('#Department').val(result.data.Department);
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            $('#myModalLabelAddEmployee').hide();
            $('#myModalLabelUpdateEmployee').show();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
// Function for updating employee's record
function Update() {
    var employee = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Salary: $('#Salary').val(),
        Department: $('#Department').val(),
    };
    $.ajax({
        url: '@Url.Action("UpdateEmployee", "Employee")',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Name').val("");
            $('#Salary').val("");
            $('#Department').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
// Function for showing the Popup before deletion
function ConfirmDelete(EmpID) {
    $.ajax({
        url: "/Employee/GetById/" + EmpID,
        type: "GET",
        contentType: 'application/json',
        success: function (result) {
            $("#labelToUpdateName").html("<b>Name: </b>" + result.data.Name);
            $("#labelToUpdateDepartment").html("<b>Department: </b>" + result.data.Department);
            $("#labelToUpdateSalary").html("<b>Salary: </b>" + result.data.Salary);
            $('#HiddenEmployeeId').val(EmpID);
            $('#deleteConfirmationModal').modal('show');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
// Function for deleting the Employee
function Delete() {
    var ID = $('#HiddenEmployeeId').val();
    $.ajax({
        url: "/Employee/DeleteEmployee/" + ID,
        type: 'POST',
        contentType: 'application/json',
        success: function (result) {
            loadData();
            $('#deleteConfirmationModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
// Function for clearing the textboxes
function clearTextBox() {
    $('#Id').val("");
    $('#Name').val("");
    $('#Salary').val("");
    $('#Department').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#myModalLabelAddEmployee').show();
    $('#myModalLabelUpdateEmployee').hide();
    $('#Name').css('border-color', 'lightgrey');
    $('#Salary').css('border-color', 'lightgrey');
    $('#Department').css('border-color', 'lightgrey');
}

