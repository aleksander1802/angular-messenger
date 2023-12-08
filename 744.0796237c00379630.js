"use strict";(self.webpackChunkangular_messenger=self.webpackChunkangular_messenger||[]).push([[744],{8744:(U,g,i)=>{i.r(g),i.d(g,{YoRHaModule:()=>D});var l=i(6814),_=i(4087),t=i(5879),a=i(6223),d=i(2181),p=i(676),m=i(8212),u=i(3938),f=i(2601),h=i(7466),b=i(5069);function v(o,s){if(1&o&&(t.TgZ(0,"div"),t._uU(1),t.ALo(2,"async"),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.hij(" Next update in ",t.lcZ(2,1,e.countdownSubscription)," seconds ")}}function x(o,s){if(1&o){const e=t.EpF();t.TgZ(0,"button",15),t.NdJ("click",function(){t.CHM(e);const r=t.oxw().$implicit,c=t.oxw(2);return t.KtG(c.openDeleteModal(r.id.S))}),t.ALo(1,"async"),t.TgZ(2,"mat-icon"),t._uU(3,"delete"),t.qZA()()}if(2&o){const e=t.oxw(3);t.Q6J("disabled",e.isCreateMode||t.lcZ(1,1,e.isGroupLoading$)||!1)}}function C(o,s){if(1&o&&(t.TgZ(0,"li",12)(1,"a",13),t._uU(2),t.qZA(),t.YNc(3,x,4,3,"button",14),t.qZA()),2&o){const e=s.$implicit,n=t.oxw(2);t.xp6(2),t.Oqu(e.name.S),t.xp6(1),t.Q6J("ngIf",e.createdBy.S===n.currentLocalStorageUID.uid)}}function y(o,s){if(1&o&&(t.TgZ(0,"div",9)(1,"ul",10),t.YNc(2,C,4,2,"li",11),t.qZA()()),2&o){const e=s.ngIf;t.xp6(2),t.Q6J("ngForOf",e)}}function k(o,s){if(1&o){const e=t.EpF();t.TgZ(0,"div")(1,"div",16)(2,"h2",17),t._uU(3," Are you sure you want to delete this group? "),t.qZA(),t.TgZ(4,"div",18)(5,"app-cyber-button",19),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.confirmDelete())}),t.ALo(6,"async"),t.qZA(),t.TgZ(7,"app-cyber-button",20),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.cancelGroupDelete())}),t.qZA()()()()}if(2&o){const e=t.oxw();t.xp6(5),t.Q6J("disabled",t.lcZ(6,3,e.isGroupLoading$)||!1)("buttonText","Delete"),t.xp6(2),t.Q6J("buttonText","Cancel")}}function M(o,s){1&o&&(t.TgZ(0,"small"),t._uU(1," Please enter a name "),t.qZA())}function Z(o,s){1&o&&(t.TgZ(0,"small"),t._uU(1," The name exceeds 30 characters "),t.qZA())}function T(o,s){1&o&&(t.TgZ(0,"small"),t._uU(1," The name must contain only letters, numbers, or spaces "),t.qZA())}function G(o,s){if(1&o&&(t.TgZ(0,"div",29),t.YNc(1,M,2,0,"small",5),t.YNc(2,Z,2,0,"small",5),t.YNc(3,T,2,0,"small",5),t.qZA()),2&o){const e=t.oxw(3);t.xp6(1),t.Q6J("ngIf",e.getError("name","required")),t.xp6(1),t.Q6J("ngIf",e.getError("name","maxlength")),t.xp6(1),t.Q6J("ngIf",e.getError("name","pattern"))}}const O=function(o){return{invalid:o}};function w(o,s){if(1&o){const e=t.EpF();t.TgZ(0,"form",22)(1,"h2",23),t._uU(2,"Create group"),t.qZA(),t.TgZ(3,"div",24)(4,"label",25),t._uU(5,"group name"),t.qZA(),t._UZ(6,"input",26),t.YNc(7,G,4,3,"div",27),t.qZA(),t.TgZ(8,"div",28)(9,"app-cyber-button",19),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.onCreateGroupSubmit())}),t.ALo(10,"async"),t.qZA(),t.TgZ(11,"app-cyber-button",20),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.onCancelCreate())}),t.qZA()()()}if(2&o){const e=t.oxw(2);t.Q6J("formGroup",e.groupForm),t.xp6(3),t.Q6J("ngClass",t.VKq(8,O,(null==e.name?null:e.name.touched)&&(null==e.name?null:e.name.invalid))),t.xp6(4),t.Q6J("ngIf",(null==e.name?null:e.name.touched)&&(null==e.name?null:e.name.invalid)),t.xp6(2),t.Q6J("disabled",e.groupForm.invalid||t.lcZ(10,6,e.isGroupLoading$)||!1)("buttonText","Create"),t.xp6(2),t.Q6J("buttonText","Cancel")}}function P(o,s){if(1&o&&(t.TgZ(0,"div"),t.YNc(1,w,12,10,"form",21),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.groupForm)}}function A(o,s){1&o&&(t.TgZ(0,"p"),t._uU(1,"Loading..."),t.qZA())}let I=(()=>{class o{constructor(e,n,r){this.store=e,this.fb=n,this.timerService=r,this.showDeleteModal=!1,this.isCreateMode=!1,this.countdownKey="groupTimer",this.currentGroupId=null}ngOnInit(){this.initGroupListDispatch(),this.getLocalStorageUid(),this.initForm(),this.initGroupItemsObservable(),this.initIsGroupLoadingObservable(),this.initCreateGroupErrorObservable(),this.initCountdownSubscription()}initGroupItemsObservable(){this.groupItems$=this.store.pipe((0,p.Ys)(m.F$)),this.createGroupSubscription=this.groupItems$.pipe((0,d.h)(e=>null!==e)).subscribe(()=>{this.onCancelCreate(),this.cancelGroupDelete()})}initIsGroupLoadingObservable(){this.isGroupLoading$=this.store.pipe((0,p.Ys)(m.mH))}initCreateGroupErrorObservable(){this.createGroupError$=this.store.pipe((0,p.Ys)(m.bm))}initCountdownSubscription(){this.countdownSubscription=this.timerService.getTimer(this.countdownKey)}initGroupListDispatch(){this.store.dispatch((0,u.PT)())}onRefreshClick(){this.store.dispatch((0,u.HJ)())}getLocalStorageUid(){const e=localStorage.getItem("auth");e&&(this.currentLocalStorageUID=JSON.parse(e))}initForm(){this.groupForm=this.fb.group({name:["",[a.kI.required,a.kI.maxLength(30),a.kI.pattern(/^[a-zA-Z0-9 ]*$/)]]})}get name(){return this.groupForm?.get("name")}getError(e,n){return this.groupForm?.get(e)?.hasError(n)}onCreateClick(){this.isCreateMode=!0}onCreateGroupSubmit(){if(this.groupForm?.valid){const n={name:this.groupForm.value.name,createdAt:(new Date).toISOString(),createdBy:this.currentLocalStorageUID.uid};this.store.dispatch((0,u.sS)(n))}}onCancelCreate(){this.groupForm?.reset(),this.isCreateMode=!1}openDeleteModal(e){e&&(this.currentGroupId=e),this.showDeleteModal=!0}cancelGroupDelete(){this.currentGroupId=null,this.showDeleteModal=!1}confirmDelete(){const e=this.currentGroupId;e&&this.store.dispatch((0,u.iE)({groupId:e}))}ngOnDestroy(){this.createGroupSubscription?.unsubscribe()}static#t=this.\u0275fac=function(n){return new(n||o)(t.Y36(p.yh),t.Y36(a.qu),t.Y36(f.f))};static#o=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-grouplist"]],decls:21,vars:18,consts:[[1,"group"],[1,"group__buttons"],[1,"group__buttons__create"],[3,"buttonText","disabled","click"],[1,"group__buttons__refresh"],[4,"ngIf"],[1,"group__buttons__refresh__button",3,"disabled","click"],["class","group__list",4,"ngIf","ngIfElse"],["loading",""],[1,"group__list"],[1,"group__list__items"],["class","group__list__item",4,"ngFor","ngForOf"],[1,"group__list__item"],["href","#",1,"group__list__item__link"],["type","button","class","group__list__item__delete",3,"disabled","click",4,"ngIf"],["type","button",1,"group__list__item__delete",3,"disabled","click"],[1,"group__modal"],[1,"group__modal__title"],[1,"group__modal__buttons"],[3,"disabled","buttonText","click"],[3,"buttonText","click"],["class","group__form",3,"formGroup",4,"ngIf"],[1,"group__form",3,"formGroup"],[1,"group__form__title"],[1,"group__form__control",3,"ngClass"],["for","name"],["id","name","type","name","formControlName","name","autocomplete","name"],["class","validation",4,"ngIf"],[1,"group__form__buttons"],[1,"validation"]],template:function(n,r){if(1&n&&(t.TgZ(0,"div",0)(1,"h2"),t._uU(2,"Groups"),t.qZA(),t.TgZ(3,"div",1)(4,"div",2)(5,"app-cyber-button",3),t.NdJ("click",function(){return r.onCreateClick()}),t.ALo(6,"async"),t.qZA()(),t.TgZ(7,"div",4),t.YNc(8,v,3,3,"div",5),t.ALo(9,"async"),t.TgZ(10,"button",6),t.NdJ("click",function(){return r.onRefreshClick()}),t.ALo(11,"async"),t.ALo(12,"async"),t.TgZ(13,"mat-icon"),t._uU(14,"refresh"),t.qZA()()()(),t.YNc(15,y,3,1,"div",7),t.ALo(16,"async"),t.YNc(17,k,8,5,"div",5),t.YNc(18,P,2,1,"div",5),t.YNc(19,A,2,0,"ng-template",null,8,t.W1O),t.qZA()),2&n){const c=t.MAs(20);t.xp6(5),t.Q6J("buttonText","Create")("disabled",r.showDeleteModal||t.lcZ(6,8,r.isGroupLoading$)||!1),t.xp6(3),t.Q6J("ngIf",t.lcZ(9,10,r.countdownSubscription)),t.xp6(2),t.Q6J("disabled",t.lcZ(11,12,r.countdownSubscription)||t.lcZ(12,14,r.isGroupLoading$)),t.xp6(5),t.Q6J("ngIf",t.lcZ(16,16,r.groupItems$))("ngIfElse",c),t.xp6(2),t.Q6J("ngIf",r.showDeleteModal),t.xp6(1),t.Q6J("ngIf",r.isCreateMode)}},dependencies:[l.mk,l.sg,l.O5,h.w,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,b.Hw,l.Ov],styles:['[_nghost-%COMP%]{max-width:800px;padding:1rem 2rem 1rem 1rem;width:100%}.group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.group__buttons[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;align-items:center}.group__buttons__refresh[_ngcontent-%COMP%]{display:flex;gap:1rem}.group__buttons__refresh__button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;background-color:transparent;border:none;cursor:var(--cursor-pointer)}.group__buttons__refresh__button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:1.6rem;height:1.6rem;font-size:1.6rem}.group__list__items[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.4rem;padding-right:.1rem;max-height:670px;overflow-y:auto;overflow-x:hidden}.group__list__item[_ngcontent-%COMP%]{position:relative;height:2rem;line-height:2rem;padding-left:2rem;width:96%;background-color:var(--color-mid);transition:all .3s ease}.group__list__item[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;width:10px;height:100%;background-color:var(--color-alert-trans)}.group__list__item[_ngcontent-%COMP%]:after{content:"";position:absolute;top:0;left:15px;width:3px;height:100%;background-color:var(--color-alert-trans)}.group__list__item[_ngcontent-%COMP%]:hover{background-color:var(--color-alert-trans)}.group__list__item[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]{color:var(--color-high)}.group__list__item[_ngcontent-%COMP%]:hover:before{content:"";position:absolute;top:0;left:0;width:10px;height:100%;background-color:var(--color-high)}.group__list__item[_ngcontent-%COMP%]:hover:after{content:"";position:absolute;top:0;left:15px;width:3px;height:100%;background-color:var(--color-high)}.group__list__item__delete[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;position:absolute;background-color:transparent;border:none;right:-1.6rem;top:50%;transform:translateY(-50%);cursor:var(--cursor-pointer)}.group__list__item__delete[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:1.6rem;height:1.6rem;font-size:1.6rem}.group__list__item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;color:var(--color-alert-trans);font-weight:600;text-decoration:none}',".group__form[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;margin:0 auto;padding:2rem 1.5rem;background:var(--background-auth);border-radius:10px;clip-path:polygon(0 0,calc(100% - 115px) 0,100% 115px,100% 100%,60px 100%,0 calc(100% - 60px));-webkit-mask:var(--mask);mask:var(--mask)}.group__form__title[_ngcontent-%COMP%]{margin-bottom:1rem}.group__form__control[_ngcontent-%COMP%]{color:var(--color-low)}.group__form__control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:3rem;border-color:transparent;background-color:var(--background);outline-color:var(--primary);margin-top:1rem;padding:1rem}.group__form__buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-top:1.5rem}.validation[_ngcontent-%COMP%], .invalid[_ngcontent-%COMP%]{color:var(--danger-color)}.invalid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:1px solid var(--danger-color);outline-color:var(--danger-color)}",".group__modal[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;margin:0 auto;padding:2rem 1.5rem;background:var(--background-auth);border-radius:10px;min-height:300px;clip-path:polygon(0 0,calc(100% - 115px) 0,100% 115px,100% 100%,60px 100%,0 calc(100% - 60px));-webkit-mask:var(--mask);mask:var(--mask)}.group__modal__title[_ngcontent-%COMP%]{padding-top:1rem;padding-bottom:1rem;padding-right:6rem}.group__modal__buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-top:1.5rem}"]})}return o})(),J=(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#o=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-peoplelist"]],decls:2,vars:0,template:function(n,r){1&n&&(t.TgZ(0,"p"),t._uU(1,"peoplelist works!"),t.qZA())}})}return o})();const L=function(){return["/profile"]};let S=(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#o=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-profile-link"]],decls:3,vars:2,consts:[[1,"profile"],[1,"profile__link",3,"routerLink"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0)(1,"a",1),t._uU(2,"Profile"),t.qZA()()),2&n&&(t.xp6(1),t.Q6J("routerLink",t.DdM(1,L)))},dependencies:[_.rH],styles:[".profile[_ngcontent-%COMP%]{position:absolute;bottom:16.2rem;left:-12.5rem;transform:rotate(-90deg);background-color:var(--color-alert-trans);transition:all .3s ease;box-shadow:5px 5px 1px 2px var(--font-dark)}.profile__link[_ngcontent-%COMP%]{display:inline-block;font-size:4.9rem;text-decoration:none;color:var(--color-high-trans);letter-spacing:2.4rem;font-weight:700}.profile__link[_ngcontent-%COMP%]:hover{color:var(--color-high)}.profile[_ngcontent-%COMP%]:hover{background-color:var(--font-dark);box-shadow:5px 5px 1px 2px var(--color-alert)}"]})}return o})();const F=[{path:"",component:(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#o=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-home-page"]],decls:3,vars:0,template:function(n,r){1&n&&t._UZ(0,"app-grouplist")(1,"app-peoplelist")(2,"app-profile-link")},dependencies:[I,J,S],styles:['[_nghost-%COMP%]{display:flex;justify-content:space-between;gap:2rem}[_nghost-%COMP%]:before{content:"";position:absolute;top:2rem;left:50%;transform:translate(-50%);height:calc(100% - 4rem);width:1px;background-color:var(--color-alert)}']})}return o})(),children:[]}];let N=(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#o=this.\u0275mod=t.oAB({type:o});static#e=this.\u0275inj=t.cJS({imports:[_.Bz.forChild(F),_.Bz]})}return o})();var Y=i(153);let D=(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#o=this.\u0275mod=t.oAB({type:o});static#e=this.\u0275inj=t.cJS({imports:[l.ez,Y.m,N]})}return o})()}}]);