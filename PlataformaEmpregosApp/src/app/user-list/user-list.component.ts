import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserApiService } from '../services/user-api-service';
import data from "../apiconfig.json";

interface DaysOfWeek {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-schedule-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  DaysOfWeek: DaysOfWeek[] = [{ value: '0', viewValue: 'Domingo' }, { value: '1', viewValue: 'Segunda' }, { value: '2', viewValue: 'Terça' }, { value: '3', viewValue: 'Quarta' }, { value: '4', viewValue: 'Quinta' }, { value: '5', viewValue: 'Sexta' }, { value: '6', viewValue: 'Sábado' }];

  dataSource: any[] = [];

  displayedColumns: string[] = ['Usuario', 'Role', 'Email', 'Telefone', 'Acoes'];

  constructor(private userApiService: UserApiService, private matDialogue: MatDialog) { }

  async ngOnInit() {
      
    let listUser = await this.userApiService.get();
    this.dataSource = listUser;
  }

  openDelete(user: any) {

    console.log(user);

    this.matDialogue.open(DialogRemoveSchedule, {
      data: {
        '_id': user._id
      },
    });



  }

  open(userEdit: any): void {

    console.log(userEdit);

    this.matDialogue.open(DialogEditSchedule, {
      data: {
        'userName': userEdit.userName,
        'perfil': userEdit.role,
        'email': userEdit.email,
        'telefone': userEdit.telefone,
        '_id': userEdit._id
      },
    });

  }

}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/successEditUser.html',
})
export class DialogSucessEditUser { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/successDeleteUser.html',
})
export class DialogSucessDeleteUser { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/errorRegisterUser.html',
})
export class DialogErrorEditUser { }


@Component({
  selector: 'remove-Schedule-dialog',
  templateUrl: '../dialogs/removeUser.html',
})
export class DialogRemoveSchedule {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userApiService: UserApiService, public sucessRemoveDialog: MatDialog) { }

  async DeleteUser(user: any) {

    await this.userApiService.delete(user._id);

    this.sucessRemoveDialog.open(DialogSucessDeleteUser);

  }


}

@Component({
  selector: 'edit-Schedule-dialog',
  templateUrl: '../dialogs/editUser.html',
})
export class DialogEditSchedule {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userApiService: UserApiService, public sucessEditDialog: MatDialog) { }

  Validator(user: any): boolean {

    if (user.userName == undefined || user.email == undefined || user.phone == undefined || user.role == undefined) {

      return false;
    }

    return true;


  }

  async EditUser(user: any) {

    user.userName = (<HTMLInputElement>document.getElementById(`usuario`)).value;
    user.email = (<HTMLInputElement>document.getElementById(`email`)).value;
    user.phone = (<HTMLInputElement>document.getElementById(`telefone`)).value;
    user.role = (<HTMLInputElement>document.getElementById(`perfil`)).value;

    if (!this.Validator(user)) {
      return;
    }

    try{

      await this.userApiService.put(user);

      this.sucessEditDialog.open(DialogSucessEditUser)
    }
    catch(error){
      this.sucessEditDialog.open(DialogErrorEditUser);
      return;
    }

  }
}
