import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_LOGOUT, APP_PROFILE } from '../../../../constants';
import { Observable } from 'rxjs';
import { UserProfile, UserProfileName } from '../models/profile.interface';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private apiUrl = APP_PROFILE;
    private apiUrlLogout = APP_LOGOUT;

    constructor(private http: HttpClient) {}

    getProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(this.apiUrl);
    }

    updateProfile(data: UserProfileName) {
        return this.http.put(this.apiUrl, data);
    }

    logoutProfile() {
        return this.http.delete(this.apiUrlLogout);
    }
}
