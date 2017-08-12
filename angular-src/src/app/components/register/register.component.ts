import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    name: string;
    username: string;
    email: string;
    password: string;
    private emailVal: boolean;

    constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

    ngOnInit() {
    }

    checkEmail(email){
        if(!this.validateService.validateEmail(email) && email != null && email != ""){
            return true;
        } else {
            return false;
        }
    }

    onRegisterSubmit(){
        const user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
        };

        //Required fields
        if(!this.validateService.validateRegister(user)){
            this.flashMessage.show('Please fill in all fields!', {cssClass: 'alert-danger', timeout: 3000});
            return false;
        }

        if(!this.validateService.validateEmail(user.email)){
            this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
            return false;
        }

    }
}
