"use strict";(self.webpackChunkangular_messenger=self.webpackChunkangular_messenger||[]).push([[351],{4351:(E,g,s)=>{s.r(g),s.d(g,{YoRHaModule:()=>j});var a=s(6814),u=s(4087),t=s(5879),l=s(6223),b=s(2181),p=s(676),m=s(8212),_=s(3938),d=s(2601),v=s(7466),h=s(5069);function x(e,r){if(1&e&&(t.TgZ(0,"div"),t._uU(1),t.ALo(2,"async"),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.hij(" Next update in ",t.lcZ(2,1,o.countdownSubscription)," seconds ")}}function C(e,r){if(1&e){const o=t.EpF();t.TgZ(0,"button",15),t.NdJ("click",function(){t.CHM(o);const i=t.oxw().$implicit,c=t.oxw(2);return t.KtG(c.openDeleteModal(i.id.S))}),t.ALo(1,"async"),t.TgZ(2,"mat-icon"),t._uU(3,"delete"),t.qZA()()}if(2&e){const o=t.oxw(3);t.Q6J("disabled",o.isCreateMode||t.lcZ(1,1,o.isGroupLoading$)||!1)}}function y(e,r){if(1&e&&(t.TgZ(0,"li",12)(1,"a",13),t._uU(2),t.qZA(),t.YNc(3,C,4,3,"button",14),t.qZA()),2&e){const o=r.$implicit,n=t.oxw(2);t.xp6(2),t.Oqu(o.name.S),t.xp6(1),t.Q6J("ngIf",o.createdBy.S===n.currentLocalStorageUID.uid)}}function O(e,r){if(1&e&&(t.TgZ(0,"div",9)(1,"ul",10),t.YNc(2,y,4,2,"li",11),t.qZA()()),2&e){const o=r.ngIf;t.xp6(2),t.Q6J("ngForOf",o)}}function P(e,r){if(1&e){const o=t.EpF();t.TgZ(0,"div")(1,"div",16)(2,"h2",17),t._uU(3," Are you sure you want to delete this group? "),t.qZA(),t.TgZ(4,"div",18)(5,"app-cyber-button",19),t.NdJ("click",function(){t.CHM(o);const i=t.oxw();return t.KtG(i.confirmDelete())}),t.ALo(6,"async"),t.qZA(),t.TgZ(7,"app-cyber-button",20),t.NdJ("click",function(){t.CHM(o);const i=t.oxw();return t.KtG(i.cancelGroupDelete())}),t.qZA()()()()}if(2&e){const o=t.oxw();t.xp6(5),t.Q6J("disabled",t.lcZ(6,3,o.isGroupLoading$)||!1)("buttonText","Delete"),t.xp6(2),t.Q6J("buttonText","Cancel")}}function M(e,r){1&e&&(t.TgZ(0,"small"),t._uU(1," Please enter a name "),t.qZA())}function Z(e,r){1&e&&(t.TgZ(0,"small"),t._uU(1," The name exceeds 30 characters "),t.qZA())}function T(e,r){1&e&&(t.TgZ(0,"small"),t._uU(1," The name must contain only letters, numbers, or spaces "),t.qZA())}function w(e,r){if(1&e&&(t.TgZ(0,"div",29),t.YNc(1,M,2,0,"small",5),t.YNc(2,Z,2,0,"small",5),t.YNc(3,T,2,0,"small",5),t.qZA()),2&e){const o=t.oxw(3);t.xp6(1),t.Q6J("ngIf",o.getError("name","required")),t.xp6(1),t.Q6J("ngIf",o.getError("name","maxlength")),t.xp6(1),t.Q6J("ngIf",o.getError("name","pattern"))}}const k=function(e){return{invalid:e}};function G(e,r){if(1&e){const o=t.EpF();t.TgZ(0,"form",22)(1,"h2",23),t._uU(2,"Create group"),t.qZA(),t.TgZ(3,"div",24)(4,"label",25),t._uU(5,"group name"),t.qZA(),t._UZ(6,"input",26),t.YNc(7,w,4,3,"div",27),t.qZA(),t.TgZ(8,"div",28)(9,"app-cyber-button",19),t.NdJ("click",function(){t.CHM(o);const i=t.oxw(2);return t.KtG(i.onCreateGroupSubmit())}),t.ALo(10,"async"),t.qZA(),t.TgZ(11,"app-cyber-button",20),t.NdJ("click",function(){t.CHM(o);const i=t.oxw(2);return t.KtG(i.onCancelCreate())}),t.qZA()()()}if(2&e){const o=t.oxw(2);t.Q6J("formGroup",o.groupForm),t.xp6(3),t.Q6J("ngClass",t.VKq(8,k,(null==o.name?null:o.name.touched)&&(null==o.name?null:o.name.invalid))),t.xp6(4),t.Q6J("ngIf",(null==o.name?null:o.name.touched)&&(null==o.name?null:o.name.invalid)),t.xp6(2),t.Q6J("disabled",o.groupForm.invalid||t.lcZ(10,6,o.isGroupLoading$)||!1)("buttonText","Create"),t.xp6(2),t.Q6J("buttonText","Cancel")}}function I(e,r){if(1&e&&(t.TgZ(0,"div"),t.YNc(1,G,12,10,"form",21),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.groupForm)}}function A(e,r){1&e&&(t.TgZ(0,"p"),t._uU(1,"Loading..."),t.qZA())}let L=(()=>{class e{constructor(o,n,i){this.store=o,this.fb=n,this.timerService=i,this.showDeleteModal=!1,this.isCreateMode=!1,this.countdownKey="groupTimer",this.currentGroupId=null}ngOnInit(){this.initGroupListDispatch(),this.getLocalStorageUid(),this.initForm(),this.initGroupItemsObservable(),this.initIsGroupLoadingObservable(),this.initCountdownSubscription()}initGroupItemsObservable(){this.groupItems$=this.store.pipe((0,p.Ys)(m.F$)),this.createGroupSubscription=this.groupItems$.pipe((0,b.h)(o=>null!==o)).subscribe(()=>{this.onCancelCreate(),this.cancelGroupDelete()})}initIsGroupLoadingObservable(){this.isGroupLoading$=this.store.pipe((0,p.Ys)(m.mH))}initCountdownSubscription(){this.countdownSubscription=this.timerService.getTimer(this.countdownKey)}initGroupListDispatch(){this.store.dispatch((0,_.PT)())}onRefreshClick(){this.store.dispatch((0,_.HJ)())}getLocalStorageUid(){const o=localStorage.getItem("auth");o&&(this.currentLocalStorageUID=JSON.parse(o))}initForm(){this.groupForm=this.fb.group({name:["",[l.kI.required,l.kI.maxLength(30),l.kI.pattern(/^[a-zA-Z0-9 ]*$/)]]})}get name(){return this.groupForm?.get("name")}getError(o,n){return this.groupForm?.get(o)?.hasError(n)}onCreateClick(){this.isCreateMode=!0}onCreateGroupSubmit(){if(this.groupForm?.valid){const n={name:this.groupForm.value.name,createdAt:(new Date).toISOString(),createdBy:this.currentLocalStorageUID.uid};this.store.dispatch((0,_.sS)(n))}}onCancelCreate(){this.groupForm?.reset(),this.isCreateMode=!1}openDeleteModal(o){o&&(this.currentGroupId=o),this.showDeleteModal=!0}cancelGroupDelete(){this.currentGroupId=null,this.showDeleteModal=!1}confirmDelete(){const o=this.currentGroupId;o&&this.store.dispatch((0,_.iE)({groupId:o}))}ngOnDestroy(){this.createGroupSubscription?.unsubscribe()}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(p.yh),t.Y36(l.qu),t.Y36(d.f))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-grouplist"]],decls:21,vars:18,consts:[[1,"group"],[1,"group__buttons"],[1,"group__buttons__create"],[3,"buttonText","disabled","click"],[1,"group__buttons__refresh"],[4,"ngIf"],[1,"group__buttons__refresh__button",3,"disabled","click"],["class","group__list",4,"ngIf","ngIfElse"],["loading",""],[1,"group__list"],[1,"group__list__items"],["class","group__list__item",4,"ngFor","ngForOf"],[1,"group__list__item"],["href","#",1,"group__list__item__link"],["type","button","class","group__list__item__delete",3,"disabled","click",4,"ngIf"],["type","button",1,"group__list__item__delete",3,"disabled","click"],[1,"group__modal"],[1,"group__modal__title"],[1,"group__modal__buttons"],[3,"disabled","buttonText","click"],[3,"buttonText","click"],["class","group__form",3,"formGroup",4,"ngIf"],[1,"group__form",3,"formGroup"],[1,"group__form__title"],[1,"group__form__control",3,"ngClass"],["for","name"],["id","name","type","name","formControlName","name","autocomplete","name"],["class","validation",4,"ngIf"],[1,"group__form__buttons"],[1,"validation"]],template:function(n,i){if(1&n&&(t.TgZ(0,"div",0)(1,"h2"),t._uU(2,"Groups"),t.qZA(),t.TgZ(3,"div",1)(4,"div",2)(5,"app-cyber-button",3),t.NdJ("click",function(){return i.onCreateClick()}),t.ALo(6,"async"),t.qZA()(),t.TgZ(7,"div",4),t.YNc(8,x,3,3,"div",5),t.ALo(9,"async"),t.TgZ(10,"button",6),t.NdJ("click",function(){return i.onRefreshClick()}),t.ALo(11,"async"),t.ALo(12,"async"),t.TgZ(13,"mat-icon"),t._uU(14,"refresh"),t.qZA()()()(),t.YNc(15,O,3,1,"div",7),t.ALo(16,"async"),t.YNc(17,P,8,5,"div",5),t.YNc(18,I,2,1,"div",5),t.YNc(19,A,2,0,"ng-template",null,8,t.W1O),t.qZA()),2&n){const c=t.MAs(20);t.xp6(5),t.Q6J("buttonText","Create")("disabled",i.showDeleteModal||t.lcZ(6,8,i.isGroupLoading$)||!1),t.xp6(3),t.Q6J("ngIf",t.lcZ(9,10,i.countdownSubscription)),t.xp6(2),t.Q6J("disabled",t.lcZ(11,12,i.countdownSubscription)||t.lcZ(12,14,i.isGroupLoading$)),t.xp6(5),t.Q6J("ngIf",t.lcZ(16,16,i.groupItems$))("ngIfElse",c),t.xp6(2),t.Q6J("ngIf",i.showDeleteModal),t.xp6(1),t.Q6J("ngIf",i.isCreateMode)}},dependencies:[a.mk,a.sg,a.O5,v.w,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,h.Hw,a.Ov],styles:['[_nghost-%COMP%]{max-width:800px;padding:1rem 2rem 1rem 1rem;width:100%}.group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.group__buttons[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;align-items:center}.group__buttons__refresh[_ngcontent-%COMP%]{display:flex;gap:1rem}.group__buttons__refresh__button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;background-color:transparent;border:none;cursor:var(--cursor-pointer)}.group__buttons__refresh__button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:1.6rem;height:1.6rem;font-size:1.6rem}.group__list__items[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.4rem;padding-right:.1rem;max-height:670px;overflow-y:auto;overflow-x:hidden}.group__list__item[_ngcontent-%COMP%]{position:relative;height:2rem;line-height:2rem;padding-left:2rem;width:96%;background-color:var(--color-mid);transition:all .3s ease}.group__list__item[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;width:10px;height:100%;background-color:var(--color-alert-trans)}.group__list__item[_ngcontent-%COMP%]:after{content:"";position:absolute;top:0;left:15px;width:3px;height:100%;background-color:var(--color-alert-trans)}.group__list__item[_ngcontent-%COMP%]:hover{background-color:var(--color-alert-trans)}.group__list__item[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]{color:var(--color-high)}.group__list__item[_ngcontent-%COMP%]:hover:before{content:"";position:absolute;top:0;left:0;width:10px;height:100%;background-color:var(--color-high)}.group__list__item[_ngcontent-%COMP%]:hover:after{content:"";position:absolute;top:0;left:15px;width:3px;height:100%;background-color:var(--color-high)}.group__list__item__delete[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;position:absolute;background-color:transparent;border:none;right:-1.6rem;top:50%;transform:translateY(-50%);cursor:var(--cursor-pointer)}.group__list__item__delete[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:1.6rem;height:1.6rem;font-size:1.6rem}.group__list__item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;color:var(--color-alert-trans);font-weight:600;text-decoration:none}',".group__form[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;margin:0 auto;padding:2rem 1.5rem;background:var(--background-auth);border-radius:10px;z-index:1;clip-path:polygon(0 0,calc(100% - 115px) 0,100% 115px,100% 100%,60px 100%,0 calc(100% - 60px));-webkit-mask:var(--mask);mask:var(--mask)}.group__form__title[_ngcontent-%COMP%]{margin-bottom:1rem}.group__form__control[_ngcontent-%COMP%]{color:var(--color-low)}.group__form__control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:3rem;border-color:transparent;background-color:var(--background);outline-color:var(--primary);margin-top:1rem;padding:1rem}.group__form__buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-top:1.5rem}.validation[_ngcontent-%COMP%], .invalid[_ngcontent-%COMP%]{color:var(--danger-color)}.invalid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:1px solid var(--danger-color);outline-color:var(--danger-color)}",".group__modal[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;margin:0 auto;padding:2rem 1.5rem;background:var(--color-high-trans);border-radius:10px;min-height:300px;z-index:1;clip-path:polygon(0 0,calc(100% - 115px) 0,100% 115px,100% 100%,60px 100%,0 calc(100% - 60px));-webkit-mask:var(--mask);mask:var(--mask)}.group__modal__title[_ngcontent-%COMP%]{padding-top:1rem;padding-bottom:1rem;padding-right:6rem}.group__modal__buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-top:1.5rem}"]})}return e})();const J=function(){return["/profile"]};let S=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-profile-link"]],decls:3,vars:2,consts:[[1,"profile"],[1,"profile__link",3,"routerLink"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0)(1,"a",1),t._uU(2,"Profile"),t.qZA()()),2&n&&(t.xp6(1),t.Q6J("routerLink",t.DdM(1,J)))},dependencies:[u.rH],styles:[".profile[_ngcontent-%COMP%]{position:absolute;bottom:16.2rem;left:-12.5rem;transform:rotate(-90deg);background-color:var(--color-alert-trans);transition:all .3s ease;box-shadow:5px 5px 1px 2px var(--font-dark)}.profile__link[_ngcontent-%COMP%]{display:inline-block;font-size:4.9rem;text-decoration:none;color:var(--color-high-trans);letter-spacing:2.4rem;font-weight:700}.profile__link[_ngcontent-%COMP%]:hover{color:var(--color-high)}.profile[_ngcontent-%COMP%]:hover{background-color:var(--font-dark);box-shadow:5px 5px 1px 2px var(--color-alert)}"]})}return e})();var f=s(3989),N=s(6331);function Y(e,r){if(1&e&&(t.TgZ(0,"div"),t._uU(1),t.ALo(2,"async"),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.hij(" Next update in ",t.lcZ(2,1,o.countdownSubscription$)," seconds ")}}function F(e,r){if(1&e&&(t.TgZ(0,"li",10)(1,"a",11),t._uU(2),t.qZA()()),2&e){const o=r.$implicit;t.xp6(2),t.Oqu(o.name.S)}}function U(e,r){if(1&e&&(t.TgZ(0,"div",7)(1,"ul",8),t.YNc(2,F,3,1,"li",9),t.qZA()()),2&e){const o=r.ngIf;t.xp6(2),t.Q6J("ngForOf",o)}}function D(e,r){1&e&&(t.TgZ(0,"p"),t._uU(1,"Loading..."),t.qZA())}let Q=(()=>{class e{constructor(o,n){this.store=o,this.timerService=n,this.countdownKey="peopleTimer"}ngOnInit(){this.initPeopleListDispatch(),this.initPeopleItemsObservable(),this.initCountdownSubscription()}initPeopleListDispatch(){this.store.dispatch((0,f.I$)())}initPeopleItemsObservable(){this.peopleItems$=this.store.pipe((0,p.Ys)(N.P7))}onUpdatePeopleList(){this.store.dispatch((0,f.ND)())}initCountdownSubscription(){this.countdownSubscription$=this.timerService.getTimer(this.countdownKey)}ngOnDestroy(){this.peopleItemSubscription&&this.peopleItemSubscription.unsubscribe()}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(p.yh),t.Y36(d.f))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-people-list"]],decls:16,vars:12,consts:[[1,"people"],[1,"people__buttons"],[1,"people__buttons__refresh"],[4,"ngIf"],[1,"people__buttons__refresh__button",3,"disabled","click"],["class","people__list",4,"ngIf","ngIfElse"],["loading",""],[1,"people__list"],[1,"people__list__items"],["class","people__list__item",4,"ngFor","ngForOf"],[1,"people__list__item"],["href","#",1,"people__list__item__link"]],template:function(n,i){if(1&n&&(t.TgZ(0,"div",0)(1,"h2"),t._uU(2,"People"),t.qZA(),t.TgZ(3,"div",1)(4,"div",2),t.YNc(5,Y,3,3,"div",3),t.ALo(6,"async"),t.TgZ(7,"button",4),t.NdJ("click",function(){return i.onUpdatePeopleList()}),t.ALo(8,"async"),t.ALo(9,"async"),t.TgZ(10,"mat-icon"),t._uU(11,"refresh"),t.qZA()()()(),t.YNc(12,U,3,1,"div",5),t.ALo(13,"async"),t.YNc(14,D,2,0,"ng-template",null,6,t.W1O),t.qZA()),2&n){const c=t.MAs(15);t.xp6(5),t.Q6J("ngIf",t.lcZ(6,4,i.countdownSubscription$)),t.xp6(2),t.Q6J("disabled",t.lcZ(8,6,i.countdownSubscription$)||t.lcZ(9,8,i.isPeopleListLoading$)),t.xp6(5),t.Q6J("ngIf",t.lcZ(13,10,i.peopleItems$))("ngIfElse",c)}},dependencies:[a.sg,a.O5,h.Hw,a.Ov],styles:['[_nghost-%COMP%]{max-width:800px;padding:1rem 1rem 1rem 2rem;width:100%}.people[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.people__buttons[_ngcontent-%COMP%]{width:100%;display:flex;min-height:55px;justify-content:space-between;align-items:center;flex-direction:row-reverse}.people__buttons__refresh[_ngcontent-%COMP%]{display:flex;gap:1rem}.people__buttons__refresh__button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;background-color:transparent;border:none;cursor:var(--cursor-pointer)}.people__buttons__refresh__button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:1.6rem;height:1.6rem;font-size:1.6rem}.people__list__items[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.4rem;padding-right:.1rem;max-height:670px;overflow-y:auto;overflow-x:hidden}.people__list__item[_ngcontent-%COMP%]{position:relative;height:2rem;line-height:2rem;padding-left:2rem;background-color:var(--color-mid);transition:all .3s ease}.people__list__item[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;width:10px;height:100%;background-color:var(--color-alert-trans)}.people__list__item[_ngcontent-%COMP%]:after{content:"";position:absolute;top:0;left:15px;width:3px;height:100%;background-color:var(--color-alert-trans)}.people__list__item[_ngcontent-%COMP%]:hover{background-color:var(--color-alert-trans)}.people__list__item[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]{color:var(--color-high)}.people__list__item[_ngcontent-%COMP%]:hover:before{content:"";position:absolute;top:0;left:0;width:10px;height:100%;background-color:var(--color-high)}.people__list__item[_ngcontent-%COMP%]:hover:after{content:"";position:absolute;top:0;left:15px;width:3px;height:100%;background-color:var(--color-high)}.people__list__item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;color:var(--color-alert-trans);font-weight:600;text-decoration:none}']})}return e})();const q=[{path:"",component:(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-home-page"]],decls:3,vars:0,template:function(n,i){1&n&&t._UZ(0,"app-grouplist")(1,"app-people-list")(2,"app-profile-link")},dependencies:[L,S,Q],styles:['[_nghost-%COMP%]{display:flex;justify-content:space-between}[_nghost-%COMP%]:before{content:"";position:absolute;top:2rem;left:50%;transform:translate(-50%);height:calc(100% - 4rem);width:1px;background-color:var(--color-alert)}']})}return e})(),children:[]}];let $=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#o=this.\u0275inj=t.cJS({imports:[u.Bz.forChild(q),u.Bz]})}return e})();var H=s(153);let j=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#o=this.\u0275inj=t.cJS({imports:[a.ez,H.m,$]})}return e})()}}]);