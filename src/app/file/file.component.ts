import { Component, OnInit, Inject } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  
  public messages : string[] = [];
  public sales: VehicleSales[] = [];
  public filename = '';
  public str: string = "";
  public mostOftenSoldVehicle = '';

  constructor(private authService:AuthService ) { }


  public uploader: FileUploader = new FileUploader({
    url: environment.apiUrl + '/VehicleSale/UploadFile',
    maxFileSize: 1 * 1024 * 1024, // 1 MB,
    allowedMimeType: ['application/vnd.ms-excel'],
    headers: [{ name: 'Authorization', value : `Bearer ${this.authService.getToken()}` } ]
    
  });

  ngOnInit(): void {

    this.uploader.onCompleteItem = (item: any, res: any, status: any) => {
      if (status === 200) {
        var response = JSON.parse(res);
        if (response.isSucceeded) {
          this.sales = response.result.list;
          this.mostOftenSoldVehicle = response.result.mostOftenSoldVehicle;
          this.filename = item.file.name;
          this.messages = [];
        } else {
          this.messages = response.responseMessage;
        }
      } else {
        this.messages.push('An Internal error occurred at server side');
      }
    };

    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {

      this.messages = [];

      if (item.size > options.maxFileSize) {
        var size = options.maxFileSize / 1024 / 1024;
        this.messages.push('The maximum supported file size is ' + size + 'MB');
      }

      if (item.type > options.allowedMimeType[0]) {
        this.messages.push('Invalid file type!');
      }
    }


  }

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public cleanSales() {
  
    this.messages = [];
    this.sales.splice(0, this.sales.length);
    this.filename = '';
    this.mostOftenSoldVehicle = '';
    
  }

}


interface VehicleSales {
  dealNumber: number;
  customerName: string;
  dealershipName: string;
  vehicle: string;
  price: number;
  date: Date;
}