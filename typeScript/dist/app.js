class StudentObject {
}
class StudentService {
    constructor() {
        this.data = this.setData();
    }
    setData() {
        let dataInStorage = localStorage.getItem('student_data');
        if (dataInStorage) {
            return JSON.parse(dataInStorage);
        }
        return [];
    }
    showListToTable() {
        let tbody = document.getElementById('tbody-list');
        let _tr = '';
        for (const obj of this.data) {
            let dtb = (obj.toan + obj.ly + obj.hoa) / 3;
            let xl = '';
            if (dtb < 5) {
                xl = "Yếu";
            }
            else if (dtb > 5 && dtb < 6) {
                xl = "TB";
            }
            else {
                xl = "Khá";
            }
            _tr += `
            <tr>
            <td>${obj.code}</td>
            <td>${obj.name}</td>
            <td>${obj.toan}</td>
            <td>${obj.ly}</td>
            <td>${obj.hoa}</td>
            <td>${dtb.toFixed(2)}</td>
            <td>${xl}</td> 
            <td><button class = "bn btn-sm btn-danger" onclick="xoa('${obj.code}')">Xóa</button></td>
        </tr>`;
        }
        tbody.innerHTML = _tr;
    }
    addStudent() {
        let std = {
            code: form.code.value,
            name: form.name.value,
            toan: parseFloat(form.toan.value),
            ly: parseFloat(form.ly.value),
            hoa: parseFloat(form.hoa.value)
        };
        this.data.push(std);
        let jsonData = JSON.stringify(this.data);
        localStorage.setItem('student_data', jsonData);
        this.showListToTable();
    }
    deleteStudent(code) {
        let index = this.data.findIndex(function (obj) {
            return obj.code === code;
        });
        this.data.splice(index, 1);
        let jsonData = JSON.stringify(this.data);
        localStorage.setItem('student_data', jsonData);
        this.showListToTable();
    }
    findByCode(code) {
        let searchData = this.data.filter(function (obj) {
            return obj.name.toLowerCase().includes(code.toLowerCase());
        });
        this.data = searchData;
        this.showListToTable();
    }
}
var stdService = new StudentService();
stdService.showListToTable();
var form = document.getElementById('std_form');
function them_moi() {
    stdService.addStudent();
}
function xoa(stdCode) {
    stdService.deleteStudent(stdCode);
}
function tim_kiem_code() {
    let search_code = document.getElementById('search_code');
    stdService.findByCode(search_code.value);
}
