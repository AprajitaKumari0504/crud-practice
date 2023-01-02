import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employe-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !:FormGroup;

  employeeModelObj:EmployeeModel = new EmployeeModel();
  employeeData !:any;
  addModal : boolean;
 
  constructor(private formBuilder:FormBuilder,private api : ApiService) { }
   
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })

    this.getAllEmployee();
  }

  addEmployee(){
    this.addModal = true;    
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset(); 
      this.getAllEmployee();
    },
      (    err: any)=>{
      alert("Something Went Wrong...")
    })
  }

  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }

  deleteEmployee1(id : any){
    this.api.deleteEmploye(id)
    .subscribe(res=>{      
      alert("Employee deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row:any){
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    // console.log(this.employeeModelObj);
    

    this.api.updateEmploye(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Employee Updated Successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset(); 
      this.getAllEmployee();
    },
      (    err: any)=>{
      // alert("Something Went Wrong...")
      console.log(err);
      
    })
  }

}
