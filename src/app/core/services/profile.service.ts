import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_PROFILE } from '../../../../constants';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/profile.interface';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private apiUrl = APP_PROFILE;

    constructor(private http: HttpClient) {}

    getProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(this.apiUrl);
    }
}
