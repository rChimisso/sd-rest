import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';

@Injectable()
export class ApiService {
  public constructor(private readonly httpClient: HttpClient) {}

  // TODO: remove and implements actual calls.
  public anyCall<T>(result: T) {
    return of(result);
  }
}
