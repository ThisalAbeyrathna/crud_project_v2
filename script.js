document.addEventListener("DOMContentLoaded", function() {
    loadData();

    document.getElementById("crudForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let student_id = document.getElementById("student_id").value;
        let name = document.getElementById("name").value;

        fetch("crud.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `action=create&student_id=${encodeURIComponent(student_id)}&name=${encodeURIComponent(name)}`
        }).then(() => {
            clearFields();
            loadData();
        });
    });

    document.getElementById("updateBtn").addEventListener("click", function() {
        let checkedRow = document.querySelector('input[name="selectRow"]:checked');
        if (!checkedRow) return;

        let student_id = checkedRow.value;
        let name = document.getElementById("name").value;

        fetch("crud.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `action=update&student_id=${student_id}&name=${encodeURIComponent(name)}`
        }).then(() => {
            clearFields();
            loadData();
        });
    });
});

function loadData() {
    fetch("crud.php?action=read").then(response => response.json()).then(data => {
        let tbody = document.getElementById("dataContainer");
        tbody.innerHTML = "";
        data.forEach(row => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td><input type="checkbox" name="selectRow" value="${row.student_id}" onclick="selectRow(this, '${row.name}')"></td>
                <td>${row.student_id}</td><td>${row.name}</td>
                <td><button class="delete" onclick="deleteData(${row.student_id})">Delete</button></td>`;
            tbody.appendChild(tr);
        });
    });
}

function selectRow(checkbox, name) {
    document.querySelectorAll('input[name="selectRow"]').forEach(cb => cb.checked = false);
    checkbox.checked = true;

    document.getElementById("student_id").value = checkbox.value;
    document.getElementById("name").value = name;
    document.getElementById("updateBtn").disabled = false;
}

function clearFields() {
    document.getElementById("student_id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("updateBtn").disabled = true;
}

function deleteData(student_id) {
    fetch("crud.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "action=delete&student_id=" + student_id
    }).then(() => loadData());
}