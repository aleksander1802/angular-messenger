import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
    declarations: [
    NotFoundComponent,
    ProfileComponent
  ],
    imports: [HttpClientModule],
})
export class CoreModule {}
