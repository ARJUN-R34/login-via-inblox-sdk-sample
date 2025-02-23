import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes ,Router} from '@angular/router';
import { ValidationService } from '../../services/config/config.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../services/config/config.service';
import inblox from '@inbloxme/keyless-transactions';
const Widget = new inblox.Widget();
Widget.initLogin();
Widget.initSignTransaction({
	to: '0xB7A0acF1bcCDC7ed397D755530F94B119e0380B2',
	value: '100000000000000000',
});
Widget.initSendTransaction({
	to: '0xB7A0acF1bcCDC7ed397D755530F94B119e0380B2',
	value: '100000000000000000',
});
Widget.getUserData();
Widget.getSignedData();

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	animations: [routerTransition()],
	host: {'[@routerTransition]': ''}
})
export class LoginComponent implements OnInit {
	private loginForm : FormGroup;
	constructor(private formBuilder: FormBuilder,private router: Router, private userService:UserService,private toastr: ToastrService) { 
		this.loginForm = this.formBuilder.group({
			email: ['',  [Validators.required, ValidationService.emailValidator]],
			password: ['',[Validators.required, ValidationService.passwordValidator]]
		});
	}

	// Check if user already logged in
	ngOnInit() {
		if(localStorage.getItem('userData')) {
			this.router.navigate(['/']);
		}
	}

	// Initicate login
	doLogin(){
		let login = this.userService.doLogin(this.loginForm.value);
		this.success(login);
	}

	// Login success function
	success(data){
		if (data.code == 200) {
			localStorage.setItem('userData', JSON.stringify(data.data));
			this.router.navigate(['/']);
			this.toastr.success('Success', "Logged In Successfully");
		}else{
			this.toastr.error('Failed', "Invalid Credentials");
		}
	}

}

/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */