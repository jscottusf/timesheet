var firebaseConfig = {
    apiKey: "AIzaSyAJnotawWK9fdhcvrfmwvAZUxiuvzdCm3Q",
    authDomain: "timesheetzrj.firebaseapp.com",
    databaseURL: "https://timesheetzrj.firebaseio.com",
    projectId: "timesheetzrj",
    storageBucket: "timesheetzrj.appspot.com",
    messagingSenderId: "590700295724",
    appId: "1:590700295724:web:f75d6066d12fdcdfc8c389"
  };

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

$('#add-employee').on('click', function(event) {
    event.preventDefault();
    let employeeName = $('#employee-name').val().trim();
    let employeeRole = $('#role').val().trim();
    let startDate = $('#start-date').val().trim();
    let monthlyRate = $('#rate').val().trim();
    let monthsWorked; //logic
    let totalBilled; //logic
    $('#employee-name').val('');
    $('#role').val('');
    $('#start-date').val('');
    $('#rate').val('');
    if (employeeName !== "" && employeeRole !== "" && startDate !== "" && monthlyRate !== "") {
        database.ref().push({
            employeeName: employeeName,
            employeeRole: employeeRole,
            startDate: startDate,
            monthlyRate: monthlyRate,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        })
    }
});

database.ref().on('child_added', function(childSnapshot){
    var name = childSnapshot.val().employeeName;
    var role = childSnapshot.val().employeeRole;
    var start = childSnapshot.val().startDate;
    var rate = childSnapshot.val().monthlyRate;
    var startFinal = moment(start).format('MM/DD/YYYY');
    monthsWorked = moment().diff(moment(start), "months");
    totalBilled = monthsWorked * rate;
    console.log(monthsWorked);
    console.log(startFinal);
    console.log(name);
    newEmployeeTR = $('<tr>');
    $('#employees').append(newEmployeeTR);
    tdName = $('<td>' + name + '</th>');
    tdRole = $('<td>' + role + '</td>');
    tdStart = $('<td>' + start + '</td>');
    tdMonths = $('<td>' + monthsWorked + '</td>');
    tdRate = $('<td>' + rate + '</td>');
    tdTotalBilled = $('<td>' + totalBilled + '</td>');
    $(newEmployeeTR).append(tdName, tdRole, tdStart, tdMonths, tdRate, tdTotalBilled);
}, function(errorObject){
    console.log("The read failed: " + errorObject.code);
});

