import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, tap, timeout} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Location} from '@angular/common';
const DEFAULTTIMEOUT = 100000000;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public clonedRequest: any; // 重置请求参数
  public skipState = [`1000`]; // 需要处理的状态码
  constructor(
    private router: Router,
    public location: Location
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.production) {
      return this.prod_http(req, next);
    } else {
      return this.debug_http(req, next);
      // return this.prod_http(req, next);
    }
  }

  public debug_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 修改请求状态
    this.clonedRequest = req.clone({
      url: environment.url + req.url,
    });
    return next.handle(this.clonedRequest).pipe(
      timeout(DEFAULTTIMEOUT),
      tap((event: any) => {
        if (event.status === 200) {
          return of(event);
        }
        else if (event.status === 500) {
          throw event;
        }
      }),
      catchError((error: any) => {
        if (error.status === 500) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              status: error.status,
              btn: '请重试'
            }
          });
          return EMPTY;
        }else if (error.status === 200) {
          // if (error.body.status === '1002') {
          //   this.router.navigate(['/login']);
            return EMPTY;
          // } else {
          //   return EMPTY;
          // }
          // this.router.navigate(['/error'], {
          //   queryParams: {
          //     msg: error.body.msg,
          //     status: error.body.status,
          //     btn: '请重试'
          //   }
          // });
        }
      })
    );
  }

  public prod_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 修改请求状态
    this.clonedRequest = req.clone({
      url: environment.url + req.url,
      headers: req.headers
        .set('Content-type', 'application/json; charset=UTF-8')
    });
    return next.handle(this.clonedRequest).pipe(
      timeout(DEFAULTTIMEOUT),
      tap((event: any) => {
        if (event.status === 200) {
          return of(event);
        } else if (event.status === 500) {
          throw event;
        }
      }),
      catchError((error: any) => {
        if (error.status === 500) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              status: error.status,
              btn: '请重试'
            }
          });
          return EMPTY;
        }
        if (error.status === 200) {
          if (error.body.status === '1002') {
            this.router.navigate(['/login']);
            return EMPTY;
          } else {
            return EMPTY;
          }

        }
      })
    );
  }

}
