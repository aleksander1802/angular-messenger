"use strict";(self.webpackChunkangular_messenger=self.webpackChunkangular_messenger||[]).push([[838],{5838:(H,_,l)=>{l.r(_),l.d(_,{AuthModule:()=>K});var u=l(6814),m=l(4087),s=l(6223),c=function(e){return e.InvalidFormDataException="InvalidFormDataException",e.NotFoundException="NotFoundException",e}(c||{}),f=l(8645),p=l(9773),t=l(5879),v=l(6238),b=l(9862);let w=(()=>{class e{constructor(n){this.http=n,this.apiUrl=v.AW}loginUser(n){const{email:r,password:i}=n;return this.http.post(this.apiUrl,{email:r,password:i})}static#t=this.\u0275fac=function(r){return new(r||e)(t.LFG(b.eN))};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac})}return e})();var C=l(754),U=l(4567),T=l(7466);function F(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1," Please enter a login email "),t.qZA())}function E(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1," The login email is invalid "),t.qZA())}function S(e,o){if(1&e&&(t.TgZ(0,"div",12),t.YNc(1,F,2,0,"small",13),t.YNc(2,E,2,0,"small",13),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",n.getError("email","required")),t.xp6(1),t.Q6J("ngIf",n.getError("email","email"))}}function x(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1," Please enter a password. "),t._UZ(2,"br"),t.qZA())}function I(e,o){if(1&e&&(t.TgZ(0,"small"),t._uU(1," Your password isn't strong enough. "),t._UZ(2,"br"),t._uU(3),t.qZA()),2&e){const n=t.oxw(2);t.xp6(3),t.hij(" Recommendations: ",null==n.password||null==n.password.errors?null:n.password.errors.message," ")}}function A(e,o){if(1&e&&(t.TgZ(0,"div",12),t.YNc(1,x,3,0,"small",13),t.YNc(2,I,4,1,"small",13),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",n.getError("password","required")),t.xp6(1),t.Q6J("ngIf",n.getError("password","strongPassword"))}}const Z=function(e){return{invalid:e}};let y=(()=>{class e{constructor(n,r,i,a,h){this.fb=n,this.loginService=r,this.toastService=i,this.authService=a,this.router=h,this.isSubmitting=!1,this.hasUserChangedInput=!1,this.ngUnsubscribe=new f.x}ngOnInit(){this.initForm(),this.subscribeToFormChanges()}initForm(){this.loginForm=this.fb.group({email:["",[s.kI.required,s.kI.email]],password:["",[s.kI.required]]})}subscribeToFormChanges(){this.formChangesSubscription=this.loginForm.valueChanges.subscribe(()=>{this.hasUserChangedInput&&(this.hasUserChangedInput=!1)})}get email(){return this.loginForm.get("email")}get password(){return this.loginForm.get("password")}getError(n,r){return this.loginForm.get(n)?.hasError(r)}onSubmit(){if(this.loginForm.invalid||this.isSubmitting)return;const n=this.loginForm.value;this.isSubmitting=!0,this.hasUserChangedInput=!0,this.loginService.loginUser(n).pipe((0,p.R)(this.ngUnsubscribe)).subscribe({next:r=>this.handleLoginSuccess(r),error:r=>this.handleLoginError(r)})}handleLoginSuccess(n){this.isSubmitting=!1,this.authService.saveCredentialsToLocalStorage(n,this.loginForm.value.email),this.showToastAndRedirect()}showToastAndRedirect(){this.toastService.showToast("Login successful!",!1),this.router.navigateByUrl("/")}handleLoginError(n){if(this.isSubmitting=!1,400===n.status)switch(n.error.type){case c.InvalidFormDataException:this.handleInvalidFormDataException(n.error.message);break;case c.NotFoundException:this.handleNotFoundException(n.error.message);break;default:this.handleOtherErrors()}else this.handleOtherErrors()}handleInvalidFormDataException(n){this.toastService.showToast(n,!0)}handleNotFoundException(n){this.toastService.showToast(n,!0)}handleOtherErrors(){this.toastService.showToast("Login error",!0)}ngOnDestroy(){this.formChangesSubscription&&this.formChangesSubscription.unsubscribe(),this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}static#t=this.\u0275fac=function(r){return new(r||e)(t.Y36(s.qu),t.Y36(w),t.Y36(C.k),t.Y36(U.e),t.Y36(m.F0))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-login-page"]],decls:20,vars:11,consts:[[1,"login",3,"formGroup","ngSubmit"],[1,"login__title"],[1,"login__control",3,"ngClass"],["for","email"],["id","email","type","email","formControlName","email","autocomplete","email"],["class","validation",4,"ngIf"],["for","password"],["id","password","type","password","formControlName","password","autocomplete","current-password",3,"input"],[1,"login__link"],["routerLink","/auth/signup"],[1,"login__button-submit"],["type","submit",3,"disabled","buttonText"],[1,"validation"],[4,"ngIf"]],template:function(r,i){1&r&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return i.onSubmit()}),t.TgZ(1,"h2",1),t._uU(2,"Sign In"),t.qZA(),t.TgZ(3,"div",2)(4,"label",3),t._uU(5,"email"),t.qZA(),t._UZ(6,"input",4),t.YNc(7,S,3,2,"div",5),t.qZA(),t.TgZ(8,"div",2)(9,"label",6),t._uU(10," password "),t.qZA(),t.TgZ(11,"input",7),t.NdJ("input",function(){return null==i.password?null:i.password.markAsTouched()}),t.qZA(),t.YNc(12,A,3,2,"div",5),t.qZA(),t.TgZ(13,"div",8)(14,"span"),t._uU(15,"Don't have an account? "),t.qZA(),t.TgZ(16,"a",9),t._uU(17," Sign Up "),t.qZA()(),t.TgZ(18,"div",10),t._UZ(19,"app-cyber-button",11),t.qZA()()),2&r&&(t.Q6J("formGroup",i.loginForm),t.xp6(3),t.Q6J("ngClass",t.VKq(7,Z,(null==i.email?null:i.email.touched)&&(null==i.email?null:i.email.invalid))),t.xp6(4),t.Q6J("ngIf",(null==i.email?null:i.email.touched)&&(null==i.email?null:i.email.invalid)),t.xp6(1),t.Q6J("ngClass",t.VKq(9,Z,(null==i.password?null:i.password.touched)&&(null==i.password?null:i.password.invalid))),t.xp6(4),t.Q6J("ngIf",(null==i.password?null:i.password.touched)&&(null==i.password?null:i.password.invalid)),t.xp6(7),t.Q6J("disabled",i.loginForm.invalid||i.isSubmitting||i.hasUserChangedInput)("buttonText",i.isSubmitting?"Logging in...":"Login"))},dependencies:[u.mk,u.O5,m.rH,T.w,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u],styles:[".login[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;margin:0 auto;padding:2rem 1.5rem;background:var(--background-auth);border-radius:10px;clip-path:polygon(0 0,calc(100% - 95px) 0,100% 95px,100% 100%,70px 100%,0 calc(100% - 70px))}.login__title[_ngcontent-%COMP%]{margin-bottom:1rem}.login__control[_ngcontent-%COMP%]{color:#888}.login__control[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding-left:.5rem;margin-top:1rem}.login__control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:3rem;border-color:transparent;background-color:var(--background);transition:border-color .3s;outline-color:var(--primary);margin:.3rem auto;padding:1rem}.login__link[_ngcontent-%COMP%]{padding:1rem 0;font-size:.8rem}.login__link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--color-alert)}.login__button-submit[_ngcontent-%COMP%]{display:flex;padding-top:1rem}.validation[_ngcontent-%COMP%], .invalid[_ngcontent-%COMP%]{color:var(--danger-color)}.invalid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:1px solid var(--danger-color);outline-color:var(--danger-color)}"]})}return e})();var g=function(e){return e.InvalidFormData="InvalidFormDataException",e.UnknownFormat="Invalid post data",e.MissingParameters='Parameters "email", "name", and "password" are required',e.UserExists="PrimaryDuplicationException",e}(g||{});let P=(()=>{class e{constructor(n){this.http=n,this.apiUrl=v.WC}registerUser(n){const{name:r,email:i,password:a}=n;return this.http.post(this.apiUrl,{name:r,email:i,password:a})}static#t=this.\u0275fac=function(r){return new(r||e)(t.LFG(b.eN))};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac})}return e})();function k(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1," Please enter a name "),t.qZA())}function J(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1," The name exceeds 40 characters "),t.qZA())}function O(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1," Allowed only letters or spaces "),t.qZA())}function N(e,o){if(1&e&&(t.TgZ(0,"div",12),t.YNc(1,k,2,0,"small",13),t.YNc(2,J,2,0,"small",13),t.YNc(3,O,2,0,"small",13),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",n.getError("name","required")),t.xp6(1),t.Q6J("ngIf",n.getError("name","maxlength")),t.xp6(1),t.Q6J("ngIf",n.getError("name","pattern"))}}function M(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1,"Please enter a register email"),t.qZA())}function Y(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1,"The register email is invalid"),t.qZA())}function R(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1,"Email address is already taken"),t.qZA())}function D(e,o){if(1&e&&(t.TgZ(0,"div",12),t.YNc(1,M,2,0,"small",13),t.YNc(2,Y,2,0,"small",13),t.YNc(3,R,2,0,"small",13),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",n.getError("email","required")),t.xp6(1),t.Q6J("ngIf",n.getError("email","email")),t.xp6(1),t.Q6J("ngIf",n.isPrimaryDuplicationError||n.getError("email","taken"))}}function Q(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1,"Please enter a password. "),t._UZ(2,"br"),t.qZA())}function L(e,o){1&e&&(t.TgZ(0,"small"),t._uU(1,"At least 8 characters. "),t._UZ(2,"br"),t.qZA())}function j(e,o){if(1&e&&(t.TgZ(0,"small"),t._uU(1," Your password isn't strong enough. "),t._UZ(2,"br"),t._uU(3),t.qZA()),2&e){const n=t.oxw(2);t.xp6(3),t.hij(" Recommendations: ",null==n.password||null==n.password.errors?null:n.password.errors.message," ")}}function z(e,o){if(1&e&&(t.TgZ(0,"div",12),t.YNc(1,Q,3,0,"small",13),t.YNc(2,L,3,0,"small",13),t.YNc(3,j,4,1,"small",13),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",n.getError("password","required")),t.xp6(1),t.Q6J("ngIf",n.getError("password","minlength")),t.xp6(1),t.Q6J("ngIf",n.getError("password","strongPassword"))}}const d=function(e){return{invalid:e}},G=/^[\p{L} ]+$/u,V=[{path:"",redirectTo:"signin",pathMatch:"full"},{path:"signin",component:y},{path:"signup",component:(()=>{class e{constructor(n,r,i,a){this.fb=n,this.registerService=r,this.router=i,this.toastService=a,this.isSubmitting=!1,this.isHttpError=!1,this.isPrimaryDuplicationError=!1,this.usedEmails=[],this.emailUnsubscribe$=new f.x}ngOnInit(){this.initForm(),this.subscribeToFormChanges()}initForm(){this.registerForm=this.fb.group({name:["",[s.kI.required,s.kI.maxLength(40),s.kI.pattern(G)]],email:["",[s.kI.required,s.kI.email]],password:["",[s.kI.required,s.kI.minLength(8),e=>{const{value:o}=e,n=/[A-Z]/.test(o),r=/\d/.test(o),i=/[!@#?]/.test(o);if(n&&r&&i)return null;let a="";return n||(a+="at least one capital letter, "),r||(a+="at least one digit, "),i||(a+="at least one special character, e.g., ! @ # ? "),{strongPassword:!0,message:a}}]]})}subscribeToFormChanges(){this.registerForm.get("email")?.valueChanges.pipe((0,p.R)(this.emailUnsubscribe$)).subscribe(n=>{this.checkForDuplication(n)})}get name(){return this.registerForm.get("name")}get email(){return this.registerForm.get("email")}get password(){return this.registerForm.get("password")}getError(n,r){return this.registerForm.get(n)?.hasError(r)}onSubmit(){if(this.registerForm.invalid||this.isSubmitting)return;const n=this.registerForm.value;this.isSubmitting=!0,this.registerService.registerUser(n).pipe((0,p.R)(this.emailUnsubscribe$)).subscribe({next:()=>this.handleRegistrationSuccess(),error:r=>this.handleRegistrationError(r)})}handleRegistrationSuccess(){this.isSubmitting=!1,this.toastService.showToast("Registration successful!",!1),this.usedEmails=[],this.router.navigate(["auth","signin"])}handleRegistrationError(n){if(this.isSubmitting=!1,400===n.status)switch(n.error.type){case g.InvalidFormData||g.UnknownFormat||g.MissingParameters:this.handleInvalidFormDataException(n.error.message);break;case g.UserExists:this.handlePrimaryDuplicationException(n.error.message);break;default:this.handleOtherErrors()}else this.isHttpError=!0,this.handleOtherErrors()}handleInvalidFormDataException(n){this.toastService.showToast(n,!0)}handlePrimaryDuplicationException(n){this.toastService.showToast(n,!0),this.isPrimaryDuplicationError=!0,this.registerForm.get("email")?.setErrors({taken:!0}),this.usedEmails.push(this.registerForm.value.email)}handleOtherErrors(){this.toastService.showToast("Registration error",!0)}checkForDuplication(n){this.isPrimaryDuplicationError=this.usedEmails.includes(n),this.isPrimaryDuplicationError&&this.registerForm.get("email")?.setErrors({taken:!0})}ngOnDestroy(){this.emailUnsubscribe$.next(),this.emailUnsubscribe$.complete()}static#t=this.\u0275fac=function(r){return new(r||e)(t.Y36(s.qu),t.Y36(P),t.Y36(m.F0),t.Y36(C.k))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-register-page"]],decls:20,vars:15,consts:[[1,"register",3,"formGroup","ngSubmit"],[1,"register__title"],[1,"register__control",3,"ngClass"],["for","name"],["id","name","type","text","formControlName","name","autocomplete","name"],["class","validation",4,"ngIf"],["for","email"],["id","email","type","email","formControlName","email","autocomplete","email"],["for","password"],["id","password","type","password","formControlName","password","autocomplete","current-password",3,"input"],[1,"register__button-submit"],["type","submit",3,"disabled","buttonText"],[1,"validation"],[4,"ngIf"]],template:function(r,i){1&r&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return i.onSubmit()}),t.TgZ(1,"h2",1),t._uU(2,"Sign Up"),t.qZA(),t.TgZ(3,"div",2)(4,"label",3),t._uU(5,"name"),t.qZA(),t._UZ(6,"input",4),t.YNc(7,N,4,3,"div",5),t.qZA(),t.TgZ(8,"div",2)(9,"label",6),t._uU(10,"email"),t.qZA(),t._UZ(11,"input",7),t.YNc(12,D,4,3,"div",5),t.qZA(),t.TgZ(13,"div",2)(14,"label",8),t._uU(15," password "),t.qZA(),t.TgZ(16,"input",9),t.NdJ("input",function(){return null==i.password?null:i.password.markAsTouched()}),t.qZA(),t.YNc(17,z,4,3,"div",5),t.qZA(),t.TgZ(18,"div",10),t._UZ(19,"app-cyber-button",11),t.qZA()()),2&r&&(t.Q6J("formGroup",i.registerForm),t.xp6(3),t.Q6J("ngClass",t.VKq(9,d,(null==i.name?null:i.name.touched)&&(null==i.name?null:i.name.invalid))),t.xp6(4),t.Q6J("ngIf",(null==i.name?null:i.name.touched)&&(null==i.name?null:i.name.invalid)),t.xp6(1),t.Q6J("ngClass",t.VKq(11,d,(null==i.email?null:i.email.touched)&&(null==i.email?null:i.email.invalid))),t.xp6(4),t.Q6J("ngIf",(null==i.email?null:i.email.touched)&&(null==i.email?null:i.email.invalid)),t.xp6(1),t.Q6J("ngClass",t.VKq(13,d,(null==i.password?null:i.password.touched)&&(null==i.password?null:i.password.invalid))),t.xp6(4),t.Q6J("ngIf",(null==i.password?null:i.password.touched)&&(null==i.password?null:i.password.invalid)),t.xp6(2),t.Q6J("disabled",i.registerForm.invalid||i.isSubmitting||i.isPrimaryDuplicationError||i.isHttpError)("buttonText",i.isSubmitting?"Registering...":"Register"))},dependencies:[u.mk,u.O5,T.w,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u],styles:[".register[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;margin:0 auto;padding:2rem 1.5rem;background:var(--background-auth);border-radius:10px;clip-path:polygon(0 0,calc(100% - 115px) 0,100% 115px,100% 100%,60px 100%,0 calc(100% - 60px));-webkit-mask:var(--mask);mask:var(--mask)}.register__title[_ngcontent-%COMP%]{margin-bottom:1rem}.register__control[_ngcontent-%COMP%]{color:#888}.register__control[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding-left:.5rem;margin-top:1rem}.register__control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:3rem;border-color:transparent;background-color:var(--background);transition:border-color .3s;outline-color:var(--primary);margin:.3rem auto;padding:1rem}.register__button-submit[_ngcontent-%COMP%]{display:flex;padding-top:1rem}.validation[_ngcontent-%COMP%], .invalid[_ngcontent-%COMP%]{color:var(--danger-color)}.invalid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:1px solid var(--danger-color);outline-color:var(--danger-color)}"]})}return e})()}];let $=(()=>{class e{static#t=this.\u0275fac=function(r){return new(r||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[m.Bz.forChild(V),m.Bz]})}return e})();var B=l(153);let K=(()=>{class e{static#t=this.\u0275fac=function(r){return new(r||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({providers:[P,w],imports:[u.ez,$,B.m]})}return e})()}}]);