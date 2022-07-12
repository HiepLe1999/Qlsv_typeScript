class StudentObject {
    code: string;
    name: string;
    toan: number;
    ly: number;
    hoa: number;
    // constructor(code: string, name: string, toan: number,ly: number, hoa: number){
    //     this.code = code;
    //     this.name = name;
    //     this.toan = toan;
    //     this.ly = ly;
    //     this.hoa = hoa;
    // }
}
class StudentService {
    data: Array<StudentObject>
    constructor(){
        this.data = this.setData();
    }
    private setData(): Array<StudentObject>{
        let dataInStorage = localStorage.getItem('student_data');// dạng chuỗi
        if(dataInStorage){
            return JSON.parse(dataInStorage);// chuyển chuỗi JSON sang mảng Object
        } return []
        // return [
        //     {code: "B123", name:"Lê Văn Hiệp", toan:9, hoa:10, ly:1},
        //     {code: "B124", name:"Nguyễn Quốc Huy", toan:5, hoa:6, ly:1}

        // ];
    }
    public showListToTable(){
        let tbody: any = document.getElementById('tbody-list');
        let _tr = '';

        for (const obj of this.data) {
            let dtb = (obj.toan + obj.ly + obj.hoa)/3;
            let xl = '';
            if(dtb < 5){
                xl = "Yếu"
            } else if(dtb> 5 && dtb <6){
                xl = "TB"
            } else{
                xl ="Khá"
            }
            _tr+=`
            <tr>
            <td>${obj.code}</td>
            <td>${obj.name}</td>
            <td>${obj.toan}</td>
            <td>${obj.ly}</td>
            <td>${obj.hoa}</td>
            <td>${dtb. toFixed(2)}</td>
            <td>${xl}</td> 
            <td><button class = "bn btn-sm btn-danger" onclick="xoa('${obj.code}')">Xóa</button></td>
        </tr>` 
        }
        tbody.innerHTML = _tr
    }
    addStudent(): void {
        let std: StudentObject = {
            code: form.code.value,
            name: form.name.value,
            toan: parseFloat(form.toan.value),
            ly: parseFloat(form.ly.value),
            hoa: parseFloat(form.hoa.value)
        };
        this.data.push(std); // thêm phần tử vào mảng có sẵn

        // chuyển mảng đối tượng sang chuỗi json
        let jsonData = JSON.stringify(this.data);
        // lưu vào storage
        localStorage.setItem('student_data',jsonData);
        this.showListToTable();//gọi phương thức load danh sách
    }
    deleteStudent(code:string): void{
        let index = this.data.findIndex(function (obj){
            return obj.code === code
        });
        //loại bỏ mảng theo index
        this.data.splice(index,1);
        let jsonData = JSON.stringify(this.data);
        // lưu vào storage
        localStorage.setItem('student_data',jsonData);
        this.showListToTable();
    }
    findByCode(code: string){
        let searchData = this.data.filter(function (obj){
            return obj.name.toLowerCase().includes(code.toLowerCase());
        });
        this.data = searchData;
        this.showListToTable();
    }
}

var stdService = new StudentService();
stdService.showListToTable();
// console.log(stdService.data);

var form: any = document.getElementById('std_form')
function them_moi(){
    stdService.addStudent();//gọi phương thức trong lớp StudentService
}
function xoa(stdCode: string){
    stdService.deleteStudent(stdCode)
}
function tim_kiem_code(){
    let search_code:any = document.getElementById('search_code');
    stdService.findByCode(search_code.value);
}
