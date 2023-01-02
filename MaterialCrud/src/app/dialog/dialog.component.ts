import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList=["AAAAA","BBBBBBBBB","CCCCCC"];
  productForm:FormGroup;
  actionbtn:string="Save";
  constructor( 
    private fb:FormBuilder,
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id:['',Validators.required],
      title:['',Validators.required],
      price:['',Validators.required],
      category:['',Validators.required]
    });
    // console.log(this.editData);
    if(this.editData){
      this.actionbtn="Update";
      this.productForm.controls['id'].setValue(this.editData.id),
      this.productForm.controls['category'].setValue(this.editData.category),
      this.productForm.controls['title'].setValue(this.editData.title),
      this.productForm.controls['price'].setValue(this.editData.price)
    }   
  }

  addProduct(){
    if(!this.editData){ 
      if(this.productForm.valid){
        // console.log(this.productForm.valid);
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product added successfully");
            this.productForm.reset();
            this.dialogRef.close();
          },
          error:()=>{
            alert("error while adding the product")
          }
        })
      }
    }else{
      this.updateProduct()
    }
    console.log(this.productForm.value);  
  }


  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogRef.close("update");
      },
      error:()=>{
        alert("error while updating the records")
      }
    })
  }

}
